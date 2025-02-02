import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface AuthContextType {
  isAuth: boolean;
}

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const AuthContext = createContext<AuthContextType>({ isAuth: true });

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuth, setIsAuth] = useState<boolean>(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/auth`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setIsAuth(data))
      .catch(() => setIsAuth(false));
  }, []);

  return <AuthContext.Provider value={{ isAuth }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
