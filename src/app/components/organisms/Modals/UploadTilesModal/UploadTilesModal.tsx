import React, { useState } from 'react';
import axios from 'axios';

import apiConfig from '@config/config';
import { db } from '@config/firebase/firebaseConfig';
import { useAuth } from '@contexts/AuthContext';
import { Icon, IconCatalog, IconStyle } from '@arleneio/editors-common-ui';
import { useShowroom } from '@showroom/ShowroomContext';

import UpdateTilesLoader from '@atoms/Loaders/UpdateTilesLoader/UpdateTilesLoader';
import UploadTilesForm from '@organisms/Forms/UpdateTilesForm/UpdateTilesForm';

type Props = {
  readonly onClose: () => void;
};

interface RequestError {
  statusCode: number;
  error: string;
  message: string;
}

const UploadTilesModal: React.FC<Props> = ({ onClose }) => {
  const { getToken, authState } = useAuth();
  const [showForm, setShowForm] = useState(true);
  const [errors, setErrors] = useState<Array<RequestError>>([]);
  const pathname = window.location.href.split('/');
  const pid = pathname[pathname.length - 1];
  const { setIsMounted } = useShowroom();

  const closeModal = (): void => onClose();
  const hideLoader = (): void => {
    setShowForm(true);
    setErrors([]);
  };

  const updateTiles = async (formData) => {
    setShowForm(false);

    const token = await getToken();
    const updateTilesURL = apiConfig.api.uri360 + `/projects/360/${pid}/tiles`;
    const config = { headers: { Authorization: token } };

    axios
      .post(updateTilesURL, formData, config)
      .then(() => {
        const userProject = db.ref(`projects/${authState.currentUser?.uid}/360/${pid}`);
        setIsMounted(false);

        userProject.on('value', (snapshot: any): void => {
          const projectData = snapshot.val();
          if (projectData && projectData?.data.infrastructure === 'ready') {
            userProject.off('value');
            (window as any).ARLENE_360.initArleneJSTAG();
            closeModal();
          }
        });
      })
      .catch((err) => {
        console.log('err, ', err);
        setErrors([err.response.data]);
      });
  };

  return (
    <div role="dialog">
      {/* HEADER */}
      <div className="flex w-full p-6 pr-4 md:p-8 md:mb-10">
        <span className="cursor-pointer ml-auto" onClick={onClose}>
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
      <div className="flex flex-col container mx-auto px-6 md:max-w-3xl">
        {showForm ? (
          <UploadTilesForm onSuccess={updateTiles} />
        ) : (
          <UpdateTilesLoader errors={errors} hideLoader={hideLoader} />
        )}
      </div>
    </div>
  );
};

export default UploadTilesModal;
