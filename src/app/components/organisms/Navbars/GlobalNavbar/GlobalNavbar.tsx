import React from 'react';
import { useHistory } from 'react-router-dom';
import cn from 'classnames';
import { useAuth } from '@contexts/AuthContext';
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
  DropdownMenu,
} from '@arleneio/editors-common-ui';
import './GlobalNavbar.scss';

type Props = {
  readonly className?: string;
};

const GlobalNavbar: React.FC<Props> = ({ className }) => {
  /*------------------*/
  /*  INIT VARIABLES  */
  /*------------------*/
  const testId = 'GlobalNavbar';
  const history = useHistory();
  const { authState, logout } = useAuth();

  /*--------------------*/
  /*  CLASS ASSIGNMENT  */
  /*--------------------*/
  const editorNavbarClass = cn(className, 'ase-editor-navbar', {
    'bg-white border-b border-extra-dark-snow': true,
  });

  /*--------------------*/
  /*       HANDLES      */
  /*--------------------*/
  const handleLogoutClick = (): void => {
    logout().then(() => history.push('/'));
  };

  /*------------------*/
  /*    RENDER JSX    */
  /*------------------*/
  return (
    <nav data-testid={testId} className={editorNavbarClass}>
      {/* DESKTOP */}
      <div className="max-w-7xl mx-auto px-6 hidden md:flex">
        <div className="relative flex-1 flex items-center justify-between h-16">
          <div className="flex-shrink-0 flex items-center flex-1">
            <Logo className="block" size={LogoSize.md} color={LogoColor.default} type={LogoType.complete}></Logo>
          </div>

          {/* NAVBAR OPTIONS  */}
          <div className="navbar-options flex items-center ml-auto">
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

export default GlobalNavbar;
