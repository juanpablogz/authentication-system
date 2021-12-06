/* --- DEPENDENCIES --- */
import { useEffect, useState } from 'react';
import { ProjectData } from './projectData';
import { useShowroom } from '@showroom/ShowroomContext';
import { ProjectFormFields } from '@src/app/common/validators/projectFormValidator';
/* -------------------- */

interface UseProjectResponse {
  projectData: ProjectData | undefined;
  createProject: (fields: ProjectFormFields) => boolean;
  updateProject: (fields: ProjectFormFields) => boolean;
  deleteProject: (projectId: string, projectName: string) => boolean;
}

const useProject = (getCurrentJSON: any): UseProjectResponse => {
  /*  INIT STATES & CONFIG  */
  const [projectData, setProjectData] = useState<ProjectData>();
  const { showroomState } = useShowroom();

  /*------------------*/
  /*  PUBLIC METHODS  */
  /*------------------*/
  const setDataFromFields = (fields: ProjectFormFields): ProjectData => {
    return {
      shareTitle: fields.shareTitle,
      shareDesc: fields.shareDesc,
      audio: fields.audio,
      exit: {
        ask: fields.exitAsk,
        yes: {
          text: fields.exitYesText,
          'bg-color': fields.exitYesBgColor,
        },
        no: fields.exitNo,
        link: fields.exitLink,
      },
      icons: {
        touchpoint: fields.iconsTouchpoint,
        close: fields.iconsClose,
        map: fields.iconsMap,
        'audio-on': fields.iconsAudioOn,
        'audio-off': fields.iconsAudioOff,
        share: fields.iconsShare,
        'share-ios': fields.iconsShareIos,
      },
    } as Partial<ProjectData>;
  };

  const getProject = (): ProjectData => {
    const data: ProjectData = JSON.parse(getCurrentJSON()) as Partial<ProjectData>;
    return data;
    // return (window as any).ARLENE_360.project.get();
  };

  const createProject = (fields: ProjectFormFields): boolean => {
    const created = (window as any).ARLENE_360.project.createNew(setDataFromFields(fields));
    (window as any).ARLENE_360.initArleneJSTAG();
    if (created) setProjectData(getProject());
    return created;
  };

  const updateProject = (fields: ProjectFormFields) => {
    // const updated = (window as any).ARLENE_360.project.update(setDataFromFields(fields));
    // if (updated) setProjectData(getProject());
    (window as any).ARLENE_360.project.update(setDataFromFields(fields));
    setProjectData(getProject());
    console.log('updating');
    return true;
  };

  const deleteProject = (projectId: string, projectName: string) => {
    const result = window.confirm(`Do you really want to delete the project "${projectName}"?`);
    if (result) {
      const deleted = (window as any).ARLENE_360.project.delete(projectId);
      if (deleted) setProjectData(getProject());
      return deleted;
    }
    return result;
  };

  /* GET PROJECT DEFINITION */
  useEffect(() => {
    if (showroomState.isMounted) {
      const project = getProject();
      setProjectData(project);
    }
  }, [showroomState.isMounted]); // eslint-disable-line react-hooks/exhaustive-deps

  /* RETURN VALUES */
  return { projectData, createProject, updateProject, deleteProject };
};

export default useProject;
