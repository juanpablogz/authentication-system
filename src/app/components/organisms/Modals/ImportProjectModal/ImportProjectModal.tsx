import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '@contexts/AuthContext';
import { db } from '@config/firebase/firebaseConfig';
import { Icon, IconCatalog, IconStyle } from '@arleneio/editors-common-ui';
import LoadJsonForm from '@organisms/Forms/LoadJsonForm/LoadJsonForm';
import './ImportProjectModal.scss';

type Props = {
  readonly project: any;
  readonly onClose: () => void;
};
const basePath = window.location.origin;
const thumbnailPath = `${basePath}/assets/images/default-thumbnail.jpeg`;
const ImportProjectModal: React.FC<Props> = ({ project, onClose }) => {
  const history = useHistory();
  const { authState } = useAuth();
  const [projectData, setProjectData] = useState({});
  const [uidExist, setUidExist] = useState(false);

  const closeModal = (): void => onClose();
  const goToEditor = (projectId: string): void => history.push(`/editor/${projectId}`);
  const saveInFireBase = (data: any) => {
    const userRef = db.ref(`projects/${authState.currentUser?.uid}/360/`);
    const urlProject = data.url.replace('data.json', '');
    const newProject = userRef.push({
      data: {
        json: data.url,
        name: data.name,
        client: data.client,
        thumbnail: data.thumbnail || thumbnailPath,
        url: urlProject,
      },
    });

    const projectId = newProject.key || 'default';
    const project = userRef.child(projectId);
    project.update({
      uid: projectId,
      updated_at: Date.now() / 1000,
    });

    return projectId;
  };

  const loadProject = (data: any): void => {
    const projectId = saveInFireBase(data);
    goToEditor(projectId);
    closeModal();
  };

  const updateProject = (data: any, projectId: string): void => {
    const project = db.ref(`projects/${authState.currentUser?.uid}/360/${projectId}`);
    const urlProject = data.url.replace('data.json', '');
    project.update({
      data: {
        json: data.url,
        name: data.name,
        client: data.client,
        thumbnail: data.thumbnail || thumbnailPath,
        url: urlProject,
      },
      updated_at: Date.now() / 1000,
    });
    closeModal();
  };

  const getProject = (projectId: string) => {
    const project = db.ref(`projects/${authState.currentUser?.uid}/360/${projectId}`);
    project.on(
      'value',
      (snapshot: any): void => {
        const dataProject = snapshot.val().data;
        dataProject.uid = projectId;
        setProjectData(dataProject);
      },
      (errorObject: any): void => {
        console.log(`The read failed: ${errorObject.name}`);
      },
    );
  };

  useEffect(() => {
    if ('uid' in project) {
      setUidExist(true);
      getProject(project.uid);
    }
  }, [project, uidExist]); // eslint-disable-line react-hooks/exhaustive-deps

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
        <LoadJsonForm className="mb-6" onSuccess={uidExist ? updateProject : loadProject} projectData={projectData} />
        <span className="font-medium mr-2 mb-2">Project Samples:</span>
        <p className="text-sm">https://showroom.arlene.io/ka-imaging/reveal-35c/</p>
        <p className="text-sm">https://showroom.arlene.io/united-imaging/modality-hall/</p>
        <p className="text-sm">https://showroom.arlene.io/virtual-office/v-digital-services/</p>
      </div>
    </div>
  );
};

export default ImportProjectModal;
