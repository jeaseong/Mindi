import React from 'react';
import SignIn from 'pages/User/SignIn';
import { PrivateRouteType } from 'types/router';
function PrivateRoute({ user = false, component }: PrivateRouteType) {
  if (!user) return <SignIn />;
  return component;
}

export default PrivateRoute;
