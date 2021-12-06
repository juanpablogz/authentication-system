/* --- DEPENDENCIES --- */
import React from 'react';
import { Redirect, Route, RouteProps, RouteComponentProps } from 'react-router-dom';
/* -------------------- */

interface Props extends RouteProps {
  component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
  isAuthenticated: boolean;
}

const PrivateRoute: React.FC<Props> = ({ component: Component, isAuthenticated, ...rest }) => {
  /*------------------*/
  /*    RENDER JSX    */
  /*------------------*/
  return (
    <Route
      {...rest}
      render={(props): JSX.Element =>
        isAuthenticated === true ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        )
      }
    />
  );
};

export default PrivateRoute;
