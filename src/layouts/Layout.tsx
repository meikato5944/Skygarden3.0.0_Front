import React, { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { Header } from "../components/common/Header";
import { Footer } from "../components/common/Footer";

export const Layout = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const notHeaderFooter = location.pathname === "/login";
  return (
    <>
      {!notHeaderFooter && <Header />}
      {children}
      {!notHeaderFooter && <Footer />}
    </>
  );
};
