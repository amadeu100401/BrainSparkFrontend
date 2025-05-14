import React, { createContext, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import { httpRequest } from '../utils/HttpRequestsUtil';

interface AuthContextType {
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
  const navigate = useNavigate();

  const logout = async () => {
    clearMemory();
    try {
      await httpRequest("/api/v1/auth/logout", "POST");
    } catch (e) {
      console.error("Erro ao fazer logout:", e);
    }
    navigate("/welcome");
  };

  return (
    <AuthContext.Provider value={{ logout }}>
      {children}
    </AuthContext.Provider>
  );
};
