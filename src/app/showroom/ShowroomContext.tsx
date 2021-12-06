import React, { createContext, useContext, useEffect, useState } from 'react';
import { Type as HotspotType } from '@showroom/hotspots/baseHotspot/baseHotspotData';
import { GoToData } from '@showroom/hotspots/goToHotspot/goToHotspotData';
import { ImageData } from '@showroom/hotspots/imageHotspot/imageHotspotData';
import { LinkData } from '@showroom/hotspots/linkHotspot/linkHotspotData';
import { NextData } from '@showroom/hotspots/nextHotspot/nextHotspotData';
import { PreviousData } from '@showroom/hotspots/previousHotspot/previousHotspotData';
import { Product360Data } from '@showroom/hotspots/product360Hotspot/product360HotspotData';
import { VideoData } from '@showroom/hotspots/videoHotspot/videoHotspotData';
import { IframeData } from '@showroom/hotspots/iframeHotspot/iframeHotspotData';
import { ProductVideoData } from '@showroom/hotspots/productVideoHotspot/productVideoHotspotData';
import { SceneData } from '@showroom/scenes/sceneData';

/*----------------------*/
/*  PROVIDER INTERFACE  */
/*----------------------*/
export interface ShowroomContext {
  showroomState: ShowroomState;
  showroomStateScene: ShowroomState;
  toggleEditMode: (value: boolean) => void;
  editableHotspot: Hotspot | null;
  createHotspot: (type: HotspotType) => void;
  updateHotspot: (data) => void;
  getCurrentJSON: () => string;
  setIsMounted: (isMounted: boolean) => void;
  setIsMountedScene: (isMounted: boolean) => void;
  updateJsonHotspot: (data) => void;
  toggleSize: (value: string) => void;
  size: string;
}

interface ShowroomState {
  isMounted: boolean;
  scenes: Array<SceneData>;
}

export type Hotspot =
  | GoToData
  | ImageData
  | LinkData
  | NextData
  | PreviousData
  | Product360Data
  | VideoData
  | IframeData
  | ProductVideoData;

/*----------------------*/
/*  CONTEXT DEFINITION  */
/*----------------------*/
const ShowroomContext = createContext<ShowroomContext>({} as ShowroomContext);

/*-----------------------*/
/*  PROVIDER DEFINITION  */
/*-----------------------*/
export const ShowroomProvider = ({ children }): JSX.Element => {
  /* INIT PUBLIC STATES */
  const [showroomState, setShowroomState] = useState<ShowroomState>({ isMounted: false, scenes: [] });
  const [showroomStateScene, setShowroomStateScene] = useState<ShowroomState>({ isMounted: false, scenes: [] });
  const [editableHotspot, setEditableHotspot] = useState<Hotspot | null>(null);
  const [size, setSize] = useState<string>('desktop');

  /* METHODS DEFINITIONS */
  const setIsMounted = (isMounted: boolean) => setShowroomState((values) => ({ ...values, isMounted }));

  const setIsMountedScene = (isMounted: boolean) => setShowroomStateScene((values) => ({ ...values, isMounted }));

  const getCurrentJSON = (): string => (window as any).ARLENE_360.getCurrentJSON();

  const createHotspot = (type: HotspotType): void => (window as any).ARLENE_360.createNewHotspot(type);

  const editHotspot = (e): void => setEditableHotspot({ ...e.detail.data });

  const closeEditHotspot = (): void => setEditableHotspot(null);

  const updateHotspot = (data): void => (window as any).ARLENE_360.updateHotspot(data);

  const updateJsonHotspot = (data): void => (window as any).ARLENE_360.updateJsonHotspot(data);

  const toggleEditMode = (value: boolean): void => (window as any).ARLENE_360.toggleEdit(value);

  const toggleSize = (value: string): void => setSize(value);

  /* ADD EVENT LISTENERS */
  useEffect(() => {
    window.addEventListener('edit-object', editHotspot);
    window.addEventListener('edit-close', closeEditHotspot);
    return () => {
      window.removeEventListener('edit-object', editHotspot);
      window.removeEventListener('edit-close', closeEditHotspot);
    };
  }, []);

  /* GROUP VALUES */
  const showroomProviderValue = {
    showroomState,
    showroomStateScene,
    toggleEditMode,
    editableHotspot,
    createHotspot,
    updateHotspot,
    getCurrentJSON,
    setIsMounted,
    updateJsonHotspot,
    setIsMountedScene,
    toggleSize,
    size,
  };

  /* RENDER PROVIDER */
  return <ShowroomContext.Provider value={showroomProviderValue}>{children}</ShowroomContext.Provider>;
};

/*-----------------------*/
/*   EXPORT USE METHOD   */
/*-----------------------*/
export const useShowroom = (): ShowroomContext => {
  return useContext(ShowroomContext);
};
