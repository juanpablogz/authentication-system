/* --- DEPENDENCIES --- */
import React, { createContext, useContext, useState } from 'react';
/* -------------------- */

/*----------------------*/
/*  PROVIDER INTERFACE  */
/*----------------------*/
export interface MediaContext {
  mediaModal: boolean;
  setMediaModal: React.Dispatch<React.SetStateAction<boolean>>;
}
/*----------------------*/
/*  CONTEXT DEFINITION  */
/*----------------------*/
const MediaContext = createContext<MediaContext>({} as MediaContext);

/*-----------------------*/
/*  PROVIDER DEFINITION  */
/*-----------------------*/
export const MediaProvider = ({ children }): JSX.Element => {
  /*------------------*/
  /*  INIT VARIABLES  */
  /*------------------*/
  const [mediaModal, setMediaModal] = useState(false);

  /* GROUP VALUES */
  const MediaContextValue = {
    mediaModal,
    setMediaModal,
  };

  /* RENDER PROVIDER */
  return <MediaContext.Provider value={MediaContextValue}>{children}</MediaContext.Provider>;
};

/*-----------------------*/
/*   EXPORT USE METHOD   */
/*-----------------------*/
export const useMedia = (): MediaContext => {
  return useContext(MediaContext);
};
