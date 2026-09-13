import React, { useContext, useMemo, useState } from "react";
import { Outlet } from "react-router-dom";

import Navbar from "../components/adminComp/Navbar";
import AdminContext from "../context/adminContext/adminContext";

const Admin = () => {
  const { colorMode } = useContext(AdminContext);

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        colorMode
          ? "bg-slate-950 text-slate-100"
          : "bg-slate-100 text-slate-900"
      }`}
    >
      {/* Fixed Navbar */}
      <Navbar />

      {/* Space reserved for fixed navbar */}
      <div className="h-16" />

      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Admin;
