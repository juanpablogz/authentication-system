/* --- DEPENDENCIES --- */
import React, { useCallback, useState } from 'react';
import cn from 'classnames';
import { useModal, Modals } from '@contexts/ModalContext';
import { SceneFormFields } from '@src/app/common/validators/sceneFormValidator';
import useScene from '@showroom/scenes/useScene';
import Scene from '@atoms/Scene/Scene';
/* -------------------- */

type Props = {
  readonly className?: string;
};

const Scenes: React.FC<Props> = ({ className }) => {
  /*------------------------*/
  /*  INIT STATES & CONFIG  */
  /*------------------------*/
  const testId = 'Scenes';
  const { sceneData, switchScene, reorderScenes, updateScene, deleteScene } = useScene();
  const [activeSceneIndex, setActiveSceneIndex] = useState(0);
  const { setCurrentModal } = useModal();

  const configScenes = (index = 0) => {
    setActiveSceneIndex(index);
    switchScene(index);
  };

  /*--------------------*/
  /*  CLASS ASSIGNMENT  */
  /*--------------------*/
  const scenesClass = cn(className);

  /*-----------------------*/
  /*   PRIVATE FUNCTIONS   */
  /*-----------------------*/

  const findScene = (sceneId: string) => sceneData.find((scene) => scene.id === sceneId);

  /*--------------------*/
  /*       HANDLES      */
  /*--------------------*/
  const handlerMoveScene = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      reorderScenes(dragIndex, hoverIndex);
    },
    [reorderScenes],
  );

  const handleSceneClick = (sceneId: string, index: number) => configScenes(index);

  const handleEditSceneClick = (sceneId: string, index: number) => {
    setCurrentModal({
      name: Modals.SceneModal,
      props: {
        scene: findScene(sceneId),
        onClose: (): void => setCurrentModal(null),
        onSave: (values: SceneFormFields): void => {
          const updated = updateScene(values);
          if (updated) configScenes(index);
          setCurrentModal(null);
        },
      },
    });
  };

  const handleDeleteSceneClick = (sceneId: string, sceneName: string) => {
    const deleted = deleteScene(sceneId, sceneName);
    if (deleted) setTimeout(() => configScenes(0));
  };

  /*------------------*/
  /*    RENDER JSX    */
  /*------------------*/
  const sceneList = sceneData.map((scene, index) => (
    <Scene
      key={scene.id}
      sceneIndex={index}
      id={scene.id}
      defaultName={scene.name}
      activeSceneIndex={activeSceneIndex}
      moveScene={handlerMoveScene}
      onClick={handleSceneClick}
      onEditClick={handleEditSceneClick}
      onDeleteClick={handleDeleteSceneClick}
    />
  ));

  return (
    <div data-testid={testId} className={scenesClass}>
      {/* SCENES */}
      {sceneList}
    </div>
  );
};

export default Scenes;
