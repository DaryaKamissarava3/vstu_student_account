import React from 'react';
import {Navigate, Outlet} from 'react-router-dom';

export const ProtectedRoute = ({isAuthorized, userRoles, children}) => {
  console.log(userRoles);

  if (!isAuthorized) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};