import React, { ReactNode } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import { List } from "./components/List";
import { Login } from "./components/Login";
import { Content } from "./components/Content";
import { ElementItem } from "./components/ElementItem";
import { UserList } from "./components/UserList";
// import { User } from "./components/User";
import { Setting } from "./components/Setting";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<List />} />
        <Route path="/login" element={<Login />} />
        <Route path="/content" element={<Content />} />
        <Route path="/element-item" element={<ElementItem />} />
        <Route path="/user-list" element={<UserList />} />
        {/* <Route path="/user" element={<User />} /> */}
        <Route path="/setting" element={<Setting />} />
      </Routes>
    </Layout>
  );
}

function Layout({ children }: { children: ReactNode }) {
  // childrenに型を指定
  const location = useLocation();
  const notHeaderFooter = location.pathname === "/login" || location.pathname === "/element-item"; // 修正
  return (
    <>
      {!notHeaderFooter && <Header />}
      {children}
      {!notHeaderFooter && <Footer />}
    </>
  );
}

export default App;
