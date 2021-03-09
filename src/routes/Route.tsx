import React from 'react';
import {
  RouteProps as ReactDOMRouteProps,
  Route as ReactDOMRoute,
  Redirect
} from 'react-router-dom';

import { useAuth } from '../contexts/authContext';

interface RouteProps extends ReactDOMRouteProps {
  isPrivate?: boolean;
  component: React.ComponentType;
}

const Route: React.FC<RouteProps> = ({
  isPrivate = false,
  component: Component,
  ...rest
}) => {
  const { token, email, id } = useAuth();

  return (
    <ReactDOMRoute 
      {...rest}
      render = {({ location }) => {
        return isPrivate === !!email || !!token || !!id ? (
          <Component />
        ) : (
          <Redirect 
            to = {{
              pathname: isPrivate ? '/' : '/home',
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
}

export default Route;