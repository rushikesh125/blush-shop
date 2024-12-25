"use client";

import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import AdminNav from "./components/AdminNav";

const Layout = ({ children }) => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleAdminNav = () => {
    setIsNavOpen((prev) => !prev);
  };

  return (
    <>
    
      <AdminNav toggleAdminNav={toggleAdminNav} />
      <main className="flex min-h-screen">
        <Sidebar isNavOpen={isNavOpen} toggleAdminNav={toggleAdminNav} />
        <section className="flex-1 bg-gray-200 p-4">{children}</section>
      </main>
    </>
  );
};

export default Layout;
