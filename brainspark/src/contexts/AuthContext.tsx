import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import httpRequest, { ContextEnum } from '../utils/HttpUtil';

interface AuthContextType {
  isAuthenticated: boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const clearMemory = () => {
  Cookies.remove('email');
  Cookies.remove('rememberMe');
  sessionStorage.removeItem("email");
  sessionStorage.removeItem("mainPage");
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const checkAuth = async () => {
    try {
      const response = await httpRequest({
        url: "/api/v1/auth/validate-auth",
        method: "POST"
      });

      setIsAuthenticated(response);
    } catch (e) {
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const logout = async () => {
    clearMemory();
    navigate("/welcome");
    try {
      await httpRequest({
        url: ContextEnum.auth + "/logout",
        method: "POST"
      });
    } catch (e: any) {
      console.error("Erro ao fazer logout:", e.message);
    } finally {
      setIsAuthenticated(false);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
