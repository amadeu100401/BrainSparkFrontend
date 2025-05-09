import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import Cookies from 'js-cookie';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  var { token } = useAuth();

  if (Cookies.get("rememberMe") === true) {
    token = Cookies.get("token");
  }

  if (!token) {
    return <Navigate to="/welcome" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;

