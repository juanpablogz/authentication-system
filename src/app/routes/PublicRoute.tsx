/* --- DEPENDENCIES --- */
import React from 'react';
import { Redirect, Route, RouteProps, RouteComponentProps } from 'react-router-dom';
/* -------------------- */

interface Props extends RouteProps {
  component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
  isAuthenticated: boolean;
}

const PublicRoute: React.FC<Props> = ({ component: Component, isAuthenticated, ...rest }) => {
  /*------------------*/
  /*    RENDER JSX    */
  /*------------------*/
  return (
    <Route
      {...rest}
      render={(props): JSX.Element =>
        isAuthenticated === false ? <Component {...props} /> : <Redirect to="/dashboard" />
      }
    />
  );
};

export default PublicRoute;
