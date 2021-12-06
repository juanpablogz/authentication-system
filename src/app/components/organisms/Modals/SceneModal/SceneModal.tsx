/* --- DEPENDENCIES --- */
import React from 'react';
import cn from 'classnames';
import { SceneFormFields } from '@src/app/common/validators/sceneFormValidator';
import { SceneData } from '@showroom/scenes/sceneData';
import { Icon, IconCatalog, IconStyle, useBodyClass } from '@arleneio/editors-common-ui';
import SceneForm from '@organisms/Forms/SceneForm/SceneForm';
import './SceneModal.scss';
import { useModal } from '@src/app/common/contexts/ModalContext';
/* -------------------- */

type Props = {
  readonly scene: SceneData;
  readonly onSave: (values: SceneFormFields) => void;
  readonly onClose: () => void;
  readonly className?: string;
};

const SceneModal: React.FC<Props> = ({ scene, onSave, onClose, className }) => {
  /*------------------*/
  /*  INIT VARIABLES  */
  /*------------------*/
  const { setCurrentModal } = useModal();
  /*------------------*/
  /* CLASS ASSIGNMENT */
  /*------------------*/
  const sceneModalClass = cn(className, 'ase-scene-modal');
  /*-------------------*/
  /* APPEND BODY CLASS */
  /*-------------------*/
  useBodyClass('opened-modal');

  /*--------------------*/
  /*       HANDLES      */
  /*--------------------*/
  const handleCancelClick = (): void => onClose();
  const handleCloseClick = (): void => setCurrentModal(null);
  const handleSaveBtnClick = (values: SceneFormFields): void => onSave(values);

  /*------------------*/
  /*    RENDER JSX    */
  /*------------------*/
  return (
    <div className={sceneModalClass} aria-modal aria-hidden role="dialog">
      <div className="bg-white h-full mb-20">
        {/* HEADER */}
        <div className="flex w-full p-6 pr-4 md:p-8 md:mb-10">
          <span className="cursor-pointer ml-auto" onClick={handleCancelClick}>
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
          <SceneForm onClose={handleCloseClick} scene={scene} onSave={handleSaveBtnClick} />
        </div>
      </div>
    </div>
  );
};

export default SceneModal;
