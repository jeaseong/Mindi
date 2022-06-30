import React from 'react';
import SignIn from 'pages/User/SignIn';
import { PrivateRouteType } from 'types/router';
function PrivateRoute({
  isLogin = false,
  isFetching,
  component,
}: PrivateRouteType) {
  if (!isFetching && !isLogin) {
    return <SignIn />;
  }
  return component;
}

export default PrivateRoute;
