import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";

export const PrivateRoute = () => {
  const authContext = useAuth();
  const { isAuth } = authContext;
  return isAuth ? <Outlet /> : <Navigate to="/login" replace />;
};
