import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const AuthRoute = () => {
  const isAuthenticated = localStorage.getItem('authToken');
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default AuthRoute;