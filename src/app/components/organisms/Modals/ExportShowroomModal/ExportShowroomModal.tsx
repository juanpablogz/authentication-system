/* --- DEPENDENCIES --- */
import React, { useState } from 'react';
import axios from 'axios';
import apiConfig from '@config/config';
import cn from 'classnames';
import { db } from '@config/firebase/firebaseConfig';
import { useAuth } from '@contexts/AuthContext';
import { exportJsonFile } from '@utils/utils';
import { UnControlled as CodeMirror } from 'react-codemirror2';
import { Button, ButtonSize, ButtonUse, Icon, IconCatalog, IconStyle, useBodyClass } from '@arleneio/editors-common-ui';

import UpdateJsonLoader from '@atoms/Loaders/UpdateJsonLoader/UpdateJsonLoader';
import './ExportShowroomModal.scss';
/* -------------------- */

interface RequestError {
  statusCode: number;
  error: string;
  message: string;
}

type Props = {
  readonly jsonCode: string;
  readonly onClose: () => void;
  readonly className?: string;
};

const ExportShowroomModal: React.FC<Props> = ({ jsonCode, onClose, className }) => {
  /*------------------*/
  /*  INIT VARIABLES  */
  /*------------------*/
  const { getToken, authState } = useAuth();
  const [errors, setErrors] = useState<Array<RequestError>>([]);
  const [isReady, setIsReady] = useState(false);
  const [isDeploying, setIsDeploying] = useState(false);
  const [showCodeMirror, setShowCodeMirror] = useState(true);
  const codeMirrorOptions = {
    mode: { name: 'javascript', json: true },
    theme: 'material',
    lineNumbers: true,
    readOnly: true,
    scrollbarStyle: 'overlay',
  };

  /*------------------*/
  /* CLASS ASSIGNMENT */
  /*------------------*/
  const exportShowroomModalClass = cn(className, 'ase-export-showroom-modal');

  /*-------------------*/
  /* APPEND BODY CLASS */
  /*-------------------*/
  useBodyClass('opened-modal');

  /*--------------------*/
  /*       HANDLES      */
  /*--------------------*/
  const handleCopyCodeClick = (): void => {
    console.log('Copy code');
  };

  const handleCancelClick = (): void => {
    onClose();
  };

  const handleExportJSONClick = (): void => {
    exportJsonFile(jsonCode, 'data', 'application/json');
  };

  const hideLoader = (): void => {
    setShowCodeMirror(true);
    setErrors([]);
    setIsReady(false);
  };

  const deployProject = async () => {
    setShowCodeMirror(false);

    const token = await getToken();
    const jsonData = JSON.parse(jsonCode);
    const pathname = window.location.href.split('/');
    const pid = pathname[pathname.length - 1];

    // URL to update JSON on first plane
    const uploadJSON = `${apiConfig.api.uriMedia}/media/360/${pid}/json`;

    // URL to update entire project repo from the backend
    const deployURL = `${apiConfig.api.uri360}/projects/360/${pid}/json`;
    const currentProject = db.ref(`projects/${authState.currentUser?.uid}/360/${pid}`);
    const headers = {
      headers: { Authorization: token },
    };

    setIsDeploying(true);

    // After update bucket file:
    const successJsonRes = (res) => {
      console.log('Updated:', res.data);
      // wait until json is real updated on the bucket storage
      setTimeout(setIsReady, 1000, true);
    };

    // After update git repo:
    const successFirebaseRes = () => {
      currentProject.on('value', (snapshot: any): void => {
        const projectData = snapshot.val();

        if (projectData && projectData?.data.infrastructure === 'ready') {
          currentProject.off('value');
          setIsReady(true);
          console.log('Project ready!');
        }
      });
    };

    const errorRes = (err) => {
      setIsDeploying(false);

      if (err.response) {
        const { data } = err.response;

        setErrors([data]);
      }
    };

    // Upload JSON directly to the bucket for faster deployment!
    const jsonB64 = btoa(jsonCode);
    const fileData = {
      filename: 'data.json',
      file: jsonB64,
      type: 'application/json',
      size: jsonB64.length,
    };
    axios.post(uploadJSON, fileData, headers).then(successJsonRes).catch(errorRes);

    // Upload it also to the backend to update the git repo
    axios.post(deployURL, jsonData, headers).then(successFirebaseRes).catch(errorRes);
  };

  const codeMirrorJSX = (
    <div className="flex flex-col container mx-auto px-6 md:max-w-3xl">
      {/* HEADER */}
      <div className="flex items-center mb-4">
        <div className="text-2xl font-medium">Grab the JSON code</div>
        <Button className="ml-auto hidden" use={ButtonUse.secondary} size={ButtonSize.xs} onClick={handleCopyCodeClick}>
          Copy code
        </Button>
      </div>

      {/* BODY */}
      <div className="flex mb-6">
        <CodeMirror
          className="font-mono w-full rounded-lg overflow-hidden"
          value={jsonCode}
          options={codeMirrorOptions}
        />
      </div>

      {/* FOOTER */}
      <div className="flex items-center justify-end space-x-3">
        <Button use={ButtonUse.tertiary} size={ButtonSize.sm} onClick={handleCancelClick}>
          Cancel
        </Button>
        <Button use={ButtonUse.secondary} size={ButtonSize.sm} onClick={deployProject}>
          Deploy
        </Button>
        <Button use={ButtonUse.primary} size={ButtonSize.sm} onClick={handleExportJSONClick}>
          Export JSON
        </Button>
      </div>
    </div>
  );

  /*------------------*/
  /*    RENDER JSX    */
  /*------------------*/
  return (
    <div className={exportShowroomModalClass} aria-modal aria-hidden role="dialog">
      <div className="bg-white h-full mb-10">
        {/* HEADER */}
        <div className="flex w-full pt-4 pr-4">
          <span className="cursor-pointer ml-auto" onClick={handleCancelClick}>
            <Icon
              icon={IconCatalog.close}
              iconStyle={IconStyle.light}
              className="text-default-slate"
              width="24"
              height="24"
            />
          </span>
        </div>

        {/* CONTENT */}
        {showCodeMirror ? (
          codeMirrorJSX
        ) : (
          <div className="flex flex-col container mx-auto px-6 md:max-w-3xl">
            <UpdateJsonLoader
              errors={errors}
              hideLoader={hideLoader}
              isReady={isReady}
              isDeploying={isDeploying}
              closeModal={handleCancelClick}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ExportShowroomModal;
