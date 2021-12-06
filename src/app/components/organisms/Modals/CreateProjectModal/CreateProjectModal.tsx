import React, { useState, useEffect } from 'react';
import axios from 'axios';

import apiConfig from '@config/config';
import { db } from '@config/firebase/firebaseConfig';
import { useAuth } from '@contexts/AuthContext';
import { Icon, IconCatalog, IconStyle } from '@arleneio/editors-common-ui';

import ModalLoader from '@atoms/Loaders/ModalLoader/ModalLoader';
import CreateProjectForm from '@organisms/Forms/CreateProjectForm/CreateProjectForm';

type Props = {
  readonly onClose: () => void;
};

interface RequestError {
  statusCode: number;
  error: string;
  message: string;
}

const loaderSteps = [
  'Creating new project',
  'Preparing project template',
  'Uploading project files',
  'Preparing project URL',
  'Finishing and loading editor',
];
let currentLoadStep = 0;
const TOTAL_TIME = 30000; // 30 seconds in average

const CreateProjectModal: React.FC<Props> = ({ onClose }) => {
  const { getToken, authState } = useAuth();
  const [showForm, setShowForm] = useState(true);
  const [loaderMsg, setLoaderMsg] = useState('');
  const [isReady, setIsReady] = useState(false);
  const [projectId, setProjectId] = useState('');
  const [clientList, setClientList] = useState([]);
  const [errors, setErrors] = useState<Array<RequestError>>([]);

  const closeModal = (): void => onClose();
  const hideLoader = (): void => setShowForm(true);
  const createProject = async (formData: any): Promise<void> => {
    setShowForm(false);
    const createProjectURL = apiConfig.api.uri360 + '/projects/360/'; // TODO create API constant
    const token = await getToken();
    const headers = {
      headers: { Authorization: token },
    };

    setLoaderMsg(loaderSteps[currentLoadStep]);
    currentLoadStep++;
    axios
      .post(createProjectURL, formData, headers)
      .then((response) => {
        const { project_id } = response.data;
        const userProject = db.ref(`projects/${authState.currentUser?.uid}/360/${project_id}`);

        setProjectId(project_id);

        // Checking firebase change when project is ready
        userProject.on('value', (snapshot: any): void => {
          const projectData = snapshot.val();
          if (projectData && projectData?.data.infrastructure === 'ready') {
            userProject.off('value');
            setIsReady(true);
          }
        });
      })
      .catch((err) => {
        setErrors([err.response.data]);
      });

    setTimeout(fakeLoaderSteps, TOTAL_TIME / loaderSteps.length);
  };

  function fakeLoaderSteps() {
    setLoaderMsg(loaderSteps[currentLoadStep]);
    currentLoadStep++;

    if (currentLoadStep < loaderSteps.length) {
      setTimeout(fakeLoaderSteps, TOTAL_TIME / loaderSteps.length);
    }
  }

  useEffect(() => {
    const clients = db.ref(`clients`);

    clients.once(
      'value',
      (snapshot: any): void => {
        const clientsData = snapshot.val();
        setClientList(clientsData);
      },
      (errorObject: any): void => {
        console.log(`The read failed: ${errorObject.name}`);
      },
    );
  }, [authState]); // TOCHECK why I cant watch clientList state

  return (
    <div role="dialog">
      {/* HEADER */}
      <div className="flex w-full p-6 pr-4 md:p-8 md:mb-10">
        <span className="cursor-pointer ml-auto" onClick={closeModal}>
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
          <CreateProjectForm onSuccess={createProject} clientList={clientList} />
        ) : (
          <ModalLoader
            message={loaderMsg}
            isReady={isReady}
            projectId={projectId}
            closeModal={closeModal}
            errors={errors}
            hideLoader={hideLoader}
          />
        )}
      </div>
    </div>
  );
};

export default CreateProjectModal;
