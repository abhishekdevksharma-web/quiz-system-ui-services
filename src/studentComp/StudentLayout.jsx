import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../studentComp/Navbar";

function StudentLayout() {
  return (
    <div className="min-h-screen">
      {/* Fixed Navbar */}
      <Navbar />

      {/* Space reserved for fixed navbar */}
      <div className="h-16" />

      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default StudentLayout;
