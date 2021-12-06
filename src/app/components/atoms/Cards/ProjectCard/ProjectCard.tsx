/* --- DEPENDENCIES --- */
import React from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import { ProjectFirebaseData } from '@interfaces/data';
import { formatDate } from '@utils/utils';
import {
  isEmpty,
  DropdownMenu,
  Item,
  Icon,
  IconCatalog,
  IconStyle,
  Menu,
  MenuPlacement,
} from '@arleneio/editors-common-ui';
/* -------------------- */

type Props = {
  readonly project: ProjectFirebaseData;
  readonly projectCallbacks: any;
  readonly className?: string;
};

const ProjectCard: React.FC<Props> = ({ project, projectCallbacks, className }) => {
  /*--------------------*/
  /*  CLASS ASSIGNMENT  */
  /*--------------------*/
  const projectCardClass = cn(className, 'flex flex-col justify-around rounded-lg hover:shadow-lg cursor-pointer');
  const readableDate = project.updated_at ? formatDate(project.updated_at) : '';

  const goToProject = (): void => projectCallbacks.view(project.pid);
  const cloneProject = (): void => projectCallbacks.clone(project.pid);
  const updateProject = (): void => projectCallbacks.update(project.pid);
  const deleteProject = (): void => projectCallbacks.delete(project.pid);

  /*------------------*/
  /*    RENDER JSX    */
  /*------------------*/
  return (
    <div className={projectCardClass}>
      {/* PREVIEW */}
      <Link
        style={{ height: '170px' }}
        className="relative border border-dark-smoke rounded-t-lg overflow-hidden"
        to={`/editor/${project.pid}`}
      >
        <div
          className="relative w-full h-full overflow-hidden"
          style={{
            backgroundImage: `url("${project.data.thumbnail}")`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
          }}
        ></div>
      </Link>

      {/* FOOTER */}
      <div className="flex items-center relative bg-white border-l border-r border-b border-dark-smoke rounded-b-lg py-3 px-4">
        {/* FOOTER :: INFO */}
        <div className="flex-1 flex-col min-w-0">
          <span className="block overflow-hidden truncate font-medium">{project.data.name}</span>
          <span className="flex-shrink-0 py-1 text-xs text-light-slate">
            {!isEmpty(readableDate) && `Updated ${readableDate}`}
          </span>
        </div>

        {/* FOOTER :: ACTION */}
        <DropdownMenu>
          <div className="p-1 rounded-md hover:bg-light-primary cursor-pointer">
            <Icon
              className="text-light-slate"
              icon={IconCatalog.ellipsisV}
              iconStyle={IconStyle.regular}
              width="20"
              height="20"
            />
          </div>
          <Menu className="border border-extra-dark-snow z-20" placement={MenuPlacement.bottomRight}>
            <Item className="font-regular" onClick={goToProject}>
              <span className="mr-2">View</span>
              <Icon icon={IconCatalog.externalLink} iconStyle={IconStyle.regular} width="16" height="16" />
            </Item>
            <Item className="font-regular" onClick={updateProject}>
              <span>Rename</span>
            </Item>
            <Item className="font-regular" onClick={cloneProject}>
              <span>Duplicate</span>
            </Item>
            <Item className="font-regular" onClick={deleteProject}>
              <span className="text-default-negative">Delete</span>
            </Item>
          </Menu>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default ProjectCard;
