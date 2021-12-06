import React from 'react';
import cn from 'classnames';
import Scenes from './Scenes/Scenes';
import useScene from '@showroom/scenes/useScene';
import { useModal, Modals } from '@contexts/ModalContext';
import { SceneFormFields } from '@src/app/common/validators/sceneFormValidator';
import { Icon, IconCatalog, IconStyle, Item, Menu, MenuPlacement, DropdownMenu } from '@arleneio/editors-common-ui';
import './Sidebar.scss';

type Props = {
  readonly className?: string;
};

const Sidebar: React.FC<Props> = ({ className }) => {
  /*------------------------*/
  /*  INIT STATES & CONFIG  */
  /*------------------------*/
  const testId = 'Sidebar';
  const { setCurrentModal } = useModal();
  const { createScene } = useScene();

  /*--------------------*/
  /*  CLASS ASSIGNMENT  */
  /*--------------------*/
  const sidebarClass = cn(
    className,
    'ase-sidebar relative bg-white border-r border-dark-smoke flex flex-shrink-0 flex-col text-sm',
  );

  /*--------------------*/
  /*       HANDLES      */
  /*--------------------*/
  const addScene = () => {
    setCurrentModal({
      name: Modals.SceneModal,
      props: {
        onClose: (): void => setCurrentModal(null),
        onSave: (values: SceneFormFields): void => {
          createScene(values);
          setCurrentModal(null);
        },
      },
    });
  };

  const addTiles = () => {
    setCurrentModal({
      name: Modals.UploadTilesModal,
      props: {
        onClose: (): void => setCurrentModal(null),
      },
    });
  };

  /*------------------*/
  /*    RENDER JSX    */
  /*------------------*/
  return (
    <div data-testid={testId} className={sidebarClass} style={{ width: '240px' }}>
      {/* HEADER */}
      <div className="text-xs bg-default-snow border-b border-default-smoke p-4 font-semi-bold flex justify-between items-center">
        Scenes
        <DropdownMenu>
          <div className="hover:bg-dark-snow cursor-pointer rounded-md text-sm px-3 py-2 flex items-center space-x-2">
            <Icon icon={IconCatalog.plus} iconStyle={IconStyle.regular} width="16" height="16" />
          </div>
          <Menu className="border border-extra-dark-snow z-20" placement={MenuPlacement.bottomLeft}>
            <Item className="font-regular" onClick={addScene}>
              <span>Add Scene</span>
            </Item>
            <Item className="font-regular" onClick={addTiles}>
              <span>Add Tiles</span>
            </Item>
          </Menu>
        </DropdownMenu>
      </div>

      {/* OPTIONS */}
      <div className="sidebar-content">
        <Scenes />
      </div>
    </div>
  );
};

export default Sidebar;
