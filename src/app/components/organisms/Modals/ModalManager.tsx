/* --- DEPENDENCIES --- */
import React from 'react';
import cn from 'classnames';
import ExportShowroomModal from './ExportShowroomModal/ExportShowroomModal';
import SceneModal from './SceneModal/SceneModal';
import ProjectModal from './ProjectModal/ProjectModal';
import ImportProjectModal from './ImportProjectModal/ImportProjectModal';
import CreateProjectModal from './CreateProjectModal/CreateProjectModal';
import UploadTilesModal from './UploadTilesModal/UploadTilesModal';
import DeleteHotspotModal from './DeleteHotspotModal/DeleteHotspotModal';
import { useModal } from '@contexts/ModalContext';
import './ModalManager.scss';
/* -------------------- */

const Modals = {
  ExportShowroomModal,
  SceneModal,
  ProjectModal,
  ImportProjectModal,
  CreateProjectModal,
  UploadTilesModal,
  DeleteHotspotModal,
};

const ModalManager = (): JSX.Element | null => {
  /*------------------*/
  /*  INIT VARIABLES  */
  /*------------------*/
  const { currentModal, setCurrentModal } = useModal();

  /*--------------------*/
  /*  CLASS ASSIGNMENT  */
  /*--------------------*/
  const modalManagerClass = cn('ase-modal-manager');

  /*------------------*/
  /*      HANDLES     */
  /*------------------*/
  const handleCloseClick = (): void => setCurrentModal(null);

  /*------------------*/
  /*    RENDER JSX    */
  /*------------------*/
  if (currentModal) {
    const ModalComponent = Modals[currentModal.name];
    return (
      <div className={modalManagerClass}>
        <ModalComponent onClose={handleCloseClick} {...currentModal.props} />
      </div>
    );
  }
  return null;
};

export default ModalManager;
