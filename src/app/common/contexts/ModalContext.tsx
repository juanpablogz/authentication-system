/* --- DEPENDENCIES --- */
import React, { createContext, useContext, useState } from 'react';
/* -------------------- */

export enum Modals {
  ExportShowroomModal = 'ExportShowroomModal',
  ImportProjectModal = 'ImportProjectModal',
  CreateProjectModal = 'CreateProjectModal',
  ProjectModal = 'ProjectModal',
  SceneModal = 'SceneModal',
  UploadTilesModal = 'UploadTilesModal',
  DeleteHotspotModal = 'DeleteHotspotModal',
}

interface CurrentModal {
  name: Modals;
  props: any;
}

/*----------------------*/
/*  PROVIDER INTERFACE  */
/*----------------------*/
export interface ModalContext {
  currentModal: CurrentModal | null;
  setCurrentModal: React.Dispatch<React.SetStateAction<CurrentModal | null>>;
}

/*----------------------*/
/*  CONTEXT DEFINITION  */
/*----------------------*/
const ModalContext = createContext<ModalContext>({} as ModalContext);

/*-----------------------*/
/*  PROVIDER DEFINITION  */
/*-----------------------*/
export const ModalProvider = ({ children }): JSX.Element => {
  /*------------------*/
  /*  INIT VARIABLES  */
  /*------------------*/
  const [currentModal, setCurrentModal] = useState<CurrentModal | null>(null);

  /* GROUP VALUES */
  const modalProviderValue = {
    currentModal,
    setCurrentModal,
  };

  /* RENDER PROVIDER */
  return <ModalContext.Provider value={modalProviderValue}>{children}</ModalContext.Provider>;
};

/*-----------------------*/
/*   EXPORT USE METHOD   */
/*-----------------------*/
export const useModal = (): ModalContext => {
  return useContext(ModalContext);
};
