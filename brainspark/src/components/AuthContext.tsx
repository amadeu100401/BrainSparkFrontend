import React, { createContext, useContext, useEffect, useState } from "react";
import Cookies from 'js-cookie';

interface AuthContextType {
  token: string | null;
  login: (token: string, email: string, rememberMe: boolean) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const clearMemory = () => {
  Cookies.remove('token');
  Cookies.remove('email');
  Cookies.remove('rememberMe');
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("email");
  sessionStorage.removeItem("mainPage");
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);

  // Recuperar o token salvo
  useEffect(() => {
    const savedToken = Cookies.get('token');
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  const login = (newToken: string, email: string, rememberMe: boolean) => {
    if (rememberMe) {
      clearMemory();
      Cookies.set('token', newToken, { expires: 7 });
      Cookies.set('email', email, { expires: 7 });
      Cookies.set('rememberMe', rememberMe, { expires: 7 });
    } else {
      clearMemory();
      sessionStorage.setItem("token", newToken);
      sessionStorage.setItem("email", email);
    }

    setToken(newToken);
  };

  const logout = () => {
    clearMemory();
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }

  return context;
};
