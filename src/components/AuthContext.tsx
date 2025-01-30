import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface AuthContextType {
  isAuth: boolean;
}

const AuthContext = createContext<AuthContextType>({ isAuth: true });

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuth, setIsAuth] = useState<boolean>(true);

  useEffect(() => {
    fetch("http://localhost:8080/webadmin/auth", {
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
