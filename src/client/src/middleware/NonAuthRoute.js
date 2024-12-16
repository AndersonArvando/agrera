import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const NonAuthRoute = () => {
  const isAuthenticated = localStorage.getItem('authToken');
  return isAuthenticated ? <Navigate to="/user/" /> : <Outlet />;
};

export default NonAuthRoute;