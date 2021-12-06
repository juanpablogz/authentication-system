import React from 'react';
import { formatDate } from '@utils/utils';
import { DropdownMenu, Item, Menu, MenuPlacement, Icon, IconCatalog, IconStyle } from '@arleneio/editors-common-ui';

const ProjectList = ({ project, projectCallbacks }) => {
  const goToProject = (): void => projectCallbacks.view(project.pid);
  const cloneProject = (): void => projectCallbacks.clone(project.pid);
  const updateProject = (): void => projectCallbacks.update(project.pid);
  const deleteProject = (): void => projectCallbacks.delete(project.pid);

  return (
    <div className="grid grid-cols-3 gap-4 pl-8">
      <div className="text-lg block overflow-hidden truncate font-medium self-center">{project.data.name}</div>
      <div className="text-light-slate self-center">Updated {formatDate(project.updated_at)}</div>
      <DropdownMenu className="ml-auto mr-3">
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
  );
};

export default ProjectList;
