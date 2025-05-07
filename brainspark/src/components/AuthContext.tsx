import React, { createContext, useContext, useEffect, useState} from "react";

interface AuthContextType {
    token: string | null;
    login: (token: string, email: string, rememberMe: boolean) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [token, setToken] = useState<string | null>(null);

    //Recuperar o token salvo
    useEffect(() => {
        const savedToken = localStorage.getItem("token") || sessionStorage.getItem("token");
        if (savedToken) {
          setToken(savedToken);
        }
      }, []);

    const login = (newToken: string, email: string, rememberMe: boolean) => {
        if (rememberMe) {
            localStorage.setItem("token", newToken);
            localStorage.setItem("email", email);
        } else {
            sessionStorage.setItem("token", newToken);
            sessionStorage.setItem("email", email);
        }

        setToken(newToken);
    };

    const logout = () => {
        localStorage.removeItem("token");
        sessionStorage.removeItem("token");
        setToken(null);
    }

    return(
        <AuthContext.Provider value ={{ token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth deve ser usado dentro de um AuthProvider");
    }

    return context;
}