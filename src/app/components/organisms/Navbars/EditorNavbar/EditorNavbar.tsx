import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import cn from 'classnames';
import { useAuth } from '@contexts/AuthContext';
import { useModal, Modals } from '@contexts/ModalContext';
import { useShowroom } from '@showroom/ShowroomContext';
import useProject from '@showroom/projects/useProject';
import { ProjectFormFields } from '@validators/projectFormValidator';
import AddHobspotMenu, { OptionMenu as AddHobspotOptionMenu } from '@atoms/AddHotspotMenu/AddHotspotMenu';
import { db } from '@config/firebase/firebaseConfig';
import {
  Icon,
  IconCatalog,
  IconStyle,
  Item,
  Logo,
  LogoColor,
  LogoSize,
  LogoType,
  Menu,
  MenuPlacement,
  DropdownMenu,
  Switch,
  SwitchSize,
  Button,
} from '@arleneio/editors-common-ui';
import './EditorNavbar.scss';

type Props = {
  readonly className?: string;
};

const EditorNavbar: React.FC<Props> = ({ className }) => {
  /*------------------*/
  /*  INIT VARIABLES  */
  /*------------------*/
  const testId = 'EditorNavbar';
  const { createHotspot, getCurrentJSON, showroomState, toggleEditMode } = useShowroom();
  const [editMode, setEditMode] = useState(true);
  const { projectData, updateProject } = useProject(getCurrentJSON);
  const { setCurrentModal } = useModal();
  const history = useHistory();
  const { authState, logout } = useAuth();
  const [url, setUrl] = useState('');

  /*--------------------*/
  /*  CLASS ASSIGNMENT  */
  /*--------------------*/
  const editorNavbarClass = cn(className, 'ase-editor-navbar', {
    'bg-white border-b border-extra-dark-snow': true,
  });

  /*--------------------*/
  /*       HANDLES      */
  /*--------------------*/
  const handleGoBackBtnClick = (): void => history.push('/dashboard');

  const handleAddItemOptionClick = (option: AddHobspotOptionMenu): void => createHotspot(option);

  const handleEditModeSwitchChange = (): void => {
    console.log('edit:', editMode);
    setEditMode(!editMode);
    toggleEditMode(!editMode);
  };

  const handleShareClick = (): void => {
    setCurrentModal({
      name: Modals.ExportShowroomModal,
      props: {
        jsonCode: getCurrentJSON(),
        onClose: (): void => {
          setCurrentModal(null);
        },
      },
    });
  };

  const handleEditSceneClick = (): void => {
    setCurrentModal({
      name: Modals.ProjectModal,
      props: {
        project: projectData,
        onClose: (): void => setCurrentModal(null),
        onSave: (values: ProjectFormFields): void => {
          updateProject(values);
          setCurrentModal(null);
        },
      },
    });
  };

  const handleLogoutClick = (): void => {
    logout().then(() => history.push('/'));
  };

  const getURLFromFirebase = (): void => {
    const currentUrl = window.location.href.split('/');
    const projectId = currentUrl[currentUrl.length - 1];
    const url = db.ref(`projects/${authState.currentUser?.uid}/360/${projectId}`);
    url.on(
      'value',
      (snapshot: any): void => {
        console.log(snapshot.val());
        setUrl(snapshot.val()?.data.url);
      },
      (errorObject: any): void => {
        console.log(`The read failed: ${errorObject.name}`);
      },
    );
  };

  useEffect(() => {
    getURLFromFirebase();
  }, []);

  /*------------------*/

  /*    RENDER JSX    */
  /*------------------*/
  return (
    <nav data-testid={testId} className={editorNavbarClass}>
      {/* DESKTOP */}
      <div className="max-w-7xl mx-auto px-6 hidden md:flex">
        <div className="relative flex-1 flex items-center justify-between h-16">
          {showroomState.isMounted ? (
            <div className="flex items-center">
              {/* GO TO  DASHBOARD BTN */}
              <div className="p-1 rounded-md hover:bg-light-primary cursor-pointer" onClick={handleGoBackBtnClick}>
                <Icon icon={IconCatalog.chevronLeft} iconStyle={IconStyle.regular} width="22" height="22" />
              </div>

              {/* PROJECT DROPDOWN MENU */}
              <DropdownMenu>
                <div className="hover:bg-dark-snow cursor-pointer rounded-md text-sm px-3 py-2 flex items-center space-x-2">
                  <span className="truncate font-medium" style={{ maxWidth: '12rem' }}>
                    {projectData && projectData.shareTitle ? projectData.shareTitle : 'Unknown Project'}
                  </span>
                  <Icon icon={IconCatalog.chevronDown} iconStyle={IconStyle.regular} width="16" height="16" />
                </div>
                <Menu className="border border-extra-dark-snow z-20" placement={MenuPlacement.bottomRight}>
                  <Item className="font-regular" onClick={handleEditSceneClick}>
                    <span>Project settings</span>
                  </Item>
                </Menu>
              </DropdownMenu>
            </div>
          ) : (
            <div className="flex-shrink-0 flex items-center flex-1">
              <Logo className="block" size={LogoSize.md} color={LogoColor.default} type={LogoType.complete}></Logo>
            </div>
          )}

          {/* TOOLBAR */}
          {showroomState.isMounted && (
            <div className="flex items-center absolute right-1/2 justify-center flex-1">
              <AddHobspotMenu className="ase-navbar__add-hotspot-menu" onItemClick={handleAddItemOptionClick} />
            </div>
          )}

          {/* NAVBAR OPTIONS  */}
          <div className="navbar-options flex items-center ml-auto">
            {/* PREVIEW MODE :: FULL SCREEN
            <Tooltip text="Preview" color={TooltipColor.black} position={TooltipPosition.bottom} size={TooltipSize.sm}>
              <div className="p-2 rounded-md hover:bg-light-primary cursor-pointer">
                <Icon icon={IconCatalog.play} iconStyle={IconStyle.solid} width="20" height="20" />
              </div>
            </Tooltip>
            */}

            {/* <div className="flex pr-4">
              <img
                className="pr-2 cursor-pointer"
                src="https://res.cloudinary.com/dutj1bbos/image/upload/v1638362179/smartphone_u57rhc.png"
                alt=""
                onClick={() => toggleSize('mobile')}
              />
              <img
                className="pr-2 cursor-pointer"
                src="https://res.cloudinary.com/dutj1bbos/image/upload/v1638362236/monitor_spcbzs.png"
                alt=""
                onClick={() => toggleSize('desktop')}
              />
              <img
                className="pr-2 cursor-pointer"
                src="https://res.cloudinary.com/dutj1bbos/image/upload/v1638362263/tablet_zccmm2.png"
                alt=""
                onClick={() => toggleSize('tablet')}
              />
            </div> */}

            <Button className="mr-4">
              <a href={url} target="_blank" rel="noreferrer">
                View Project
              </a>
            </Button>

            {showroomState.isMounted && (
              <>
                {/* PREVIEW MODE */}
                <div className="flex items-center space-x-3">
                  <Switch
                    className="cursor-pointer"
                    defaultValue={editMode}
                    size={SwitchSize.sm}
                    onChange={handleEditModeSwitchChange}
                  />
                  <label className="text-sm font-medium cursor-pointer" onClick={handleEditModeSwitchChange}>
                    {editMode ? 'Edit mode' : 'View mode'}
                  </label>
                </div>

                {/* VERTICAL DIVIDER */}
                <div className="border-r border-dark-smoke h-6 mr-3 ml-6"></div>

                {/* SHARE OPTION */}
                <div className="ase-navbar__option text-sm" onClick={handleShareClick}>
                  Share
                </div>
              </>
            )}

            {authState.authenticated && (
              <DropdownMenu className="border-l border-default-smoke ml-3">
                <div className="hover:bg-dark-snow cursor-pointer rounded-md text-sm ml-4 px-3 py-2 flex items-center space-x-2">
                  <span>{authState.currentUser?.data.displayName}</span>
                  <Icon icon={IconCatalog.chevronDown} iconStyle={IconStyle.regular} width="16" height="16" />
                </div>
                <Menu className="border border-extra-dark-snow z-20">
                  <Item className="font-medium" onClick={handleLogoutClick}>
                    <span>Logout</span>
                  </Item>
                </Menu>
              </DropdownMenu>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default EditorNavbar;
