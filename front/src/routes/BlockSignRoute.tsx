import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PrivateRouteType } from 'types/router';
function PrivateRoute({
  isLogin = false,
  isFetching,
  component,
}: PrivateRouteType) {
  const navigate = useNavigate();
  if (isLogin) {
    navigate('/main');
    return <></>;
  } else return component;
}

export default PrivateRoute;
