import React, { useState, useMemo, useContext } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "../components/adminComp/Navbar";
import { Outlet, Link } from "react-router-dom";
import AdminContext from "../context/adminContext/adminContext";
import { Search } from "lucide-react";

const Admin = () => {
  const location = useLocation();
  const { adminQuizHistory, colorMode } = useContext(AdminContext);
  const [search, setSearch] = useState("");

  const filteredQuizzes = useMemo(() => {
    const query = search.toLowerCase().trim();
    if (!query) return adminQuizHistory;

    return adminQuizHistory.filter((quiz) => {
      return (
        quiz.name.toLowerCase().includes(query) ||
        quiz.subject.toLowerCase().includes(query) ||
        quiz.tag.toLowerCase().includes(query) ||
        quiz.difficulty.toLowerCase().includes(query)
      );
    });
  }, [search, adminQuizHistory]);

  const hideNavbarRoutes = [
    "/admin/signup",
    "/admin/login",
    "/admin/questionbilder",
  ];

  const hideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <div
      className={
        colorMode
          ? "min-h-screen bg-slate-950 text-slate-100"
          : "min-h-screen bg-slate-100 text-slate-900"
      }
    >
      {!hideNavbar && <Navbar />}
      <Outlet />
    </div>
  );
};

export default Admin;
