import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import httpRequest from '../utils/HttpUtil';
import Loding from './Loading';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      await httpRequest({
        url: "/api/v1/auth/validate-auth",
        method: "POST"
      });
      setIsAuthenticated(true);
    };

    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    return <Loding />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/welcome" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
