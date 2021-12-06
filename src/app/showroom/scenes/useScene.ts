/* --- DEPENDENCIES --- */
import { useEffect, useState } from 'react';
import { SceneData } from './sceneData';
import { useShowroom } from '@showroom/ShowroomContext';
import { SceneFormFields } from '@src/app/common/validators/sceneFormValidator';
/* -------------------- */

interface UseSceneResponse {
  sceneData: Array<SceneData>;
  switchScene: (index: number) => void;
  reorderScenes: (startIndex: number, endIndex: number) => void;
  createScene: (fields: SceneFormFields) => boolean;
  updateScene: (fields: SceneFormFields) => boolean;
  deleteScene: (sceneId: string, sceneName: string) => boolean;
}

const useScene = (): UseSceneResponse => {
  /*  INIT STATES & CONFIG  */
  const [sceneData, setSceneData] = useState<Array<SceneData>>([]);
  const { showroomStateScene, setIsMountedScene } = useShowroom();
  /*------------------*/
  /*  PUBLIC METHODS  */
  /*------------------*/
  const getScenes = (): Array<SceneData> => JSON.parse(JSON.stringify((window as any).ARLENE_360.scenes.getAll()));

  const switchScene = (index: number) => {
    (window as any).ARLENE_360.switchScene(index);
  };

  const reorderScenes = (startIndex: number, endIndex: number) => {
    const result = Array.from(sceneData);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    setSceneData(result);
  };

  const createScene = (fields: SceneFormFields): boolean => {
    const scene = {
      id: fields.id,
      name: fields.name,
      [`${fields.type}`]: fields.url,
    } as Partial<SceneData>;
    const created = (window as any).ARLENE_360.scenes.createNew(scene);
    if (created) {
      setSceneData(getScenes());
      setIsMountedScene(true);
    }
    return created;
  };

  const updateScene = (fields: SceneFormFields) => {
    const scene = {
      id: fields.id,
      name: fields.name,
      [`${fields.type}`]: fields.url,
    } as Partial<SceneData>;
    const updated = (window as any).ARLENE_360.scenes.update(scene);
    if (updated) setSceneData(getScenes());
    return updated;
  };

  const deleteScene = (sceneId: string, sceneName: string) => {
    const result = window.confirm(`Do you really want to delete the scene "${sceneName}"?`);
    if (result) {
      const deleted = (window as any).ARLENE_360.scenes.delete(sceneId);
      if (deleted) setSceneData(getScenes());
      return deleted;
    }
    return result;
  };

  /* GET SCENES */
  useEffect(() => {
    if (showroomStateScene.isMounted) {
      const scenes = getScenes();
      setSceneData(scenes);
      setIsMountedScene(false);
    } else if (showroomStateScene.isMounted === undefined) {
      setSceneData([]);
    }
  }, [showroomStateScene.isMounted]);

  /* RETURN VALUES */
  return { sceneData, switchScene, reorderScenes, createScene, updateScene, deleteScene };
};

export default useScene;
