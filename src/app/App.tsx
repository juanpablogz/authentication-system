/* --- DEPENDENCIES --- */
import React from 'react';
import { Switch, Redirect, Route, useRouteMatch } from 'react-router-dom';
import { isNullOrUndefined } from '@utils/utils';
import { useAuth } from '@contexts/AuthContext';
import { ModalProvider } from '@contexts/ModalContext';
import { MediaProvider } from '@contexts/MediaContext';
import { ShowroomProvider } from '@showroom/ShowroomContext';
import EditorNavbar from '@organisms/Navbars/EditorNavbar/EditorNavbar';
import GlobalNavbar from '@organisms/Navbars/GlobalNavbar/GlobalNavbar';
import ModalManager from '@organisms/Modals/ModalManager';
import EditorPage from '@pages/EditorPage/EditorPage';
import LoginPage from '@pages/LoginPage/LoginPage';
import DashboardPage from '@pages/DashboardPage/DashboardPage';
import NotFoundPage from '@pages/NotFoundPage/NotFoundPage';
import PrivateRoute from '@routes/PrivateRoute';
import PublicRoute from '@routes/PublicRoute';
/* -------------------- */

const App: React.FC = () => {
  /*------------------*/
  /*  INIT VARIABLES  */
  /*------------------*/
  const testId = 'App';
  const isLoginPage = useRouteMatch('/login');
  const isEditorPage = useRouteMatch('/editor');
  const { authState } = useAuth();

  /*------------------*/
  /*    RENDER JSX    */
  /*------------------*/
  if (authState.loading) return <div className="text-lg font-medium p-4">Loading...</div>;

  const renderNavbar = (): JSX.Element | null => {
    if (!isNullOrUndefined(isLoginPage)) return null;
    if (!isNullOrUndefined(isEditorPage)) return <EditorNavbar />;
    return <GlobalNavbar />;
  };

  return (
    <div className="App" data-testid={testId}>
      <ShowroomProvider>
        <ModalProvider>
          <MediaProvider>
            <ModalManager />
            {renderNavbar()}
            <Switch>
              <Route path={`/`} exact>
                <Redirect to={`/login`} />
              </Route>
              <PublicRoute path={`/login`} isAuthenticated={authState.authenticated} component={LoginPage} exact />
              <PublicRoute path={`/404`} isAuthenticated={false} component={NotFoundPage} exact />
              <PrivateRoute
                path={`/dashboard`}
                isAuthenticated={authState.authenticated}
                component={DashboardPage}
                exact
              />
              <PrivateRoute path={`/editor`} isAuthenticated={authState.authenticated} component={EditorPage} exact />
              <PrivateRoute
                path={`/editor/:pid`}
                isAuthenticated={authState.authenticated}
                component={EditorPage}
                exact
              />
            </Switch>
          </MediaProvider>
        </ModalProvider>
      </ShowroomProvider>
    </div>
  );
};

export default App;
