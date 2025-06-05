import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import httpRequest from '../utils/HttpUtil';
import AuthModal from './authenticateUser/AuthModal';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  const isLoggedIn = sessionStorage.getItem('email') !== null;

  const location = useLocation();

  useEffect(() => {
    checkAuth();
  }, [location.pathname]);

  const checkAuth = async () => {
    try {
      await httpRequest({
        url: "/api/v1/auth/validate-auth",
        method: "POST"
      });
  
      setIsAuthenticated(true);
    } catch(error) {
      console.log("AQUI");
      setIsAuthenticated(false);
    }
  };

  if (!isAuthenticated && !isLoggedIn) {
    return <Navigate to="/welcome" replace />;
  }

  return (
    <>
      {children}
      {!isAuthenticated && isLoggedIn && <AuthModal isAuthenticated={false} />}
    </>);
};

export default ProtectedRoute;
