import React, { ReactNode, createContext, useContext, useRef, useEffect, useState } from "react";
import { Routes, Route, useLocation, useNavigate, Navigate, Outlet } from "react-router-dom";
import axios from "axios";

import { AuthProvider, useAuth } from "./components/AuthContext";

import { List } from "./components/List";
import { Login } from "./components/Login";
import { Content } from "./components/Content";
import { UserList } from "./components/UserList";
import { User } from "./components/User";
import { Setting } from "./components/Setting";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { PrivateRoute } from "./components/PrivateRoute";

function App() {
  return (
    <AuthProvider>
      <Layout>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<List />} />
            <Route path="/content" element={<Content />} />
            <Route path="/user-list" element={<UserList />} />
            <Route path="/user" element={<User />} />
            <Route path="/setting" element={<Setting />} />
          </Route>
        </Routes>
      </Layout>
    </AuthProvider>
  );
}

function Layout({ children }: { children: ReactNode }) {
  const location = useLocation();
  const notHeaderFooter = location.pathname === "/login";
  return (
    <>
      {!notHeaderFooter && <Header />}
      {children}
      {!notHeaderFooter && <Footer />}
    </>
  );
}

export default App;
