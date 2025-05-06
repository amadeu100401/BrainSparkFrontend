import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const isAuthenticated = localStorage.getItem('token');
  console.log(isAuthenticated)

  if (!isAuthenticated) {
    return <Navigate to="/welcome" replace />;
  }

  console.log(localStorage.getItem("token"))
  return children;
};

export default ProtectedRoute;
