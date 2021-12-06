/* --- DEPENDENCIES --- */
import React from 'react';
import cn from 'classnames';
import { ProjectFormFields } from '@src/app/common/validators/projectFormValidator';
import { ProjectData } from '@showroom/projects/projectData';
import { Icon, IconCatalog, IconStyle, useBodyClass } from '@arleneio/editors-common-ui';
import ProjectForm from '@organisms/Forms/ProjectForm/ProjectForm';
import './ProjectModal.scss';
/* -------------------- */

type Props = {
  readonly project: ProjectData;
  readonly onSave: (values: ProjectFormFields) => void;
  readonly onClose: () => void;
  readonly className?: string;
};

const ProjectModal: React.FC<Props> = ({ project, onSave, onClose, className }) => {
  /*------------------*/
  /*  INIT VARIABLES  */
  /*------------------*/

  /*------------------*/
  /* CLASS ASSIGNMENT */
  /*------------------*/
  const projectModalClass = cn(className, 'ase-project-modal');

  /*-------------------*/
  /* APPEND BODY CLASS */
  /*-------------------*/
  useBodyClass('opened-modal');

  /*--------------------*/
  /*       HANDLES      */
  /*--------------------*/
  const handleCancelClick = (): void => onClose();

  const handleSaveBtnClick = (values: ProjectFormFields): void => onSave(values);

  /*------------------*/
  /*    RENDER JSX    */
  /*------------------*/
  return (
    <div className={projectModalClass} aria-modal aria-hidden role="dialog">
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
          <ProjectForm className="pb-10" project={project} onSave={handleSaveBtnClick} />
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
