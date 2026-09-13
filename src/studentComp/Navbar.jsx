import React, { useState, useEffect, useContext, useRef } from "react";
import {
  BarChart3,
  BookOpen,
  ChevronRight,
  Home,
  LogOut,
  Menu,
  Search,
  Trophy,
  User,
  X,
} from "lucide-react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import StudentContext from "../context/studentContext/studentContext";

const Navbar = () => {
  const { colorMode, userMeta, studentIsAuth, viewDevice } =
    useContext(StudentContext);

  const [showModal, setShowModal] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const modalRef = useRef(null);
  const mobileMenuRef = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();

  const isMobile = viewDevice === "mobile";
  const isTablet = viewDevice === "tablet";
  const isDesktop = viewDevice === "desktop";

  const navItems = [
    {
      label: "Home",
      path: "/student",
      icon: Home,
    },
    {
      label: "Quizzes",
      path: "/student/quizzes",
      icon: BookOpen,
    },
  ];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setShowModal(false);
      }

      if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target)) {
        setShowMobileMenu(false);
      }
    };

    const handleEscape = (e) => {
      if (e.key === "Escape") {
        setShowModal(false);
        setShowMobileMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  useEffect(() => {
    setShowMobileMenu(false);
    setShowModal(false);
  }, [location.pathname]);

  function redirectSingup() {
    localStorage.setItem("redirectPath", location.pathname);

    navigate("/signup", {
      replace: true,
    });
  }

  function redirectLogin() {
    localStorage.setItem("redirectPath", location.pathname);

    navigate("/login", {
      replace: true,
    });
  }

  const handleNavigation = (path) => {
    navigate(path);
    setShowMobileMenu(false);
  };

  const isActiveRoute = (path) => { 

    if (path === "/student") {
      return location.pathname === "/student";
    }

    return (
      location.pathname === path || location.pathname.startsWith(`${path}/`)
    );
  };

  const fields = [
    {
      label: "Roll No",
      value: userMeta?.roll,
    },
    {
      label: "Branch",
      value: userMeta?.branch,
    },
    {
      label: "Section",
      value: userMeta?.section,
    },
    {
      label: "Year",
      value: userMeta?.year,
    },
  ];

  const studentName = userMeta?.student?.name?.trim() || "STUDENT";

  const studentEmail = userMeta?.student?.email || "No email available";

  const studentInitial =
    userMeta?.student?.name?.charAt(0)?.toUpperCase() || "U";

  return (
    <header
      className={`fixed w-full z-50 h-16 border-b backdrop-blur-xl transition-colors duration-200 ${
        colorMode
          ? "border-slate-700/80 bg-gray-900/95"
          : "border-slate-200 bg-white/95"
      }`}
    >
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-3 sm:px-5 lg:px-8">
        {/* =========================================================
            LEFT SECTION
        ========================================================= */}
        <div className="flex min-w-0 items-center  gap-2">
          {/* =======================================================
              DESKTOP NAVIGATION
          ======================================================= */}
          {studentIsAuth && isDesktop && (
            <nav className="ml-6 flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;

                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    end={item.path === "/student"}
                    className={({ isActive }) =>
                      `group flex cursor-pointer items-center gap-2 rounded-xl px-3.5 py-2 text-sm font-medium transition-all duration-200 ${
                        isActive
                          ? colorMode
                            ? "bg-indigo-500/10 text-indigo-400"
                            : "bg-indigo-50 text-indigo-600"
                          : colorMode
                            ? "text-slate-400 hover:bg-slate-800 hover:text-white"
                            : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                      }`
                    }
                  >
                    {({ isActive }) => {
                      const Icon = item.icon;

                      return (
                        <>
                          <Icon
                            size={16}
                            strokeWidth={2}
                            className={`transition-transform duration-200 ${
                              isActive ? "scale-105" : "group-hover:scale-105"
                            }`}
                          />
                          <span>{item.label}</span>
                        </>
                      );
                    }}
                  </NavLink>
                );
              })}
            </nav>
          )}

          {/* =======================================================
              TABLET NAVIGATION
          ======================================================= */}
          {studentIsAuth && isTablet && (
            <nav className="ml-3 flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = isActiveRoute(item.path);

                return (
                  <button
                    key={item.path}
                    title={item.label}
                    onClick={() => handleNavigation(item.path)}
                    className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl transition-all duration-200 ${
                      active
                        ? colorMode
                          ? "bg-indigo-500/10 text-indigo-400"
                          : "bg-indigo-50 text-indigo-600"
                        : colorMode
                          ? "text-slate-400 hover:bg-slate-800 hover:text-white"
                          : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                    }`}
                  >
                    <Icon size={18} strokeWidth={2} />
                  </button>
                );
              })}
            </nav>
          )}
        </div>

        {/* =========================================================
            RIGHT SECTION
        ========================================================= */}
        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          {/* =======================================================
              MOBILE SEARCH
          ======================================================= */}
          {studentIsAuth && isMobile && (
            <button
              onClick={() => handleNavigation("/search")}
              title="Search"
              aria-label="Search"
              className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl transition-all duration-200 active:scale-95 ${
                colorMode
                  ? "text-slate-300 hover:bg-slate-800 hover:text-white"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              <Search size={19} strokeWidth={2} />
            </button>
          )}

          {/* =======================================================
              MOBILE MENU
          ======================================================= */}
          {studentIsAuth && isMobile && (
            <div ref={mobileMenuRef} className="relative">
              <button
                onClick={() => setShowMobileMenu((prev) => !prev)}
                title="Menu"
                aria-label="Menu"
                aria-expanded={showMobileMenu}
                className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl transition-all duration-200 active:scale-95 ${
                  showMobileMenu
                    ? colorMode
                      ? "bg-slate-800 text-white"
                      : "bg-slate-100 text-slate-900"
                    : colorMode
                      ? "text-slate-300 hover:bg-slate-800 hover:text-white"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                {showMobileMenu ? <X size={20} /> : <Menu size={20} />}
              </button>

              {/* Mobile Navigation Dropdown */}
              {showMobileMenu && (
                <div
                  className={`absolute right-0 top-[calc(100%+10px)] w-[calc(100vw-24px)] max-w-80 overflow-hidden rounded-2xl border shadow-2xl backdrop-blur-xl ${
                    colorMode
                      ? "border-slate-700/80 bg-slate-900/95 shadow-black/40"
                      : "border-slate-200 bg-white/95 shadow-slate-300/40"
                  }`}
                >
                  {/* Menu Header */}
                  <div
                    className={`border-b px-4 py-3 ${
                      colorMode ? "border-slate-800" : "border-slate-100"
                    }`}
                  >
                    <p
                      className={`text-xs font-semibold ${
                        colorMode ? "text-white" : "text-slate-900"
                      }`}
                    >
                      Student Portal
                    </p>

                    <p
                      className={`mt-0.5 text-[10px] ${
                        colorMode ? "text-slate-500" : "text-slate-400"
                      }`}
                    >
                      Navigate through your dashboard
                    </p>
                  </div>

                  {/* Navigation Items */}
                  <div className="p-2">
                    {navItems.map((item) => {
                      const Icon = item.icon;
                      const active = isActiveRoute(item.path);

                      return (
                        <button
                          key={item.path}
                          onClick={() => handleNavigation(item.path)}
                          className={`group flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-all duration-200 ${
                            active
                              ? colorMode
                                ? "bg-indigo-500/10 text-indigo-400"
                                : "bg-indigo-50 text-indigo-600"
                              : colorMode
                                ? "text-slate-300 hover:bg-slate-800 hover:text-white"
                                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                          }`}
                        >
                          <div
                            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors ${
                              active
                                ? colorMode
                                  ? "bg-indigo-500/10"
                                  : "bg-indigo-100"
                                : colorMode
                                  ? "bg-slate-800 group-hover:bg-slate-700"
                                  : "bg-slate-100 group-hover:bg-slate-200"
                            }`}
                          >
                            <Icon size={17} />
                          </div>

                          <span className="flex-1 text-sm font-medium">
                            {item.label}
                          </span>

                          <ChevronRight
                            size={15}
                            className={`transition-transform duration-200 group-hover:translate-x-0.5 ${
                              colorMode ? "text-slate-600" : "text-slate-400"
                            }`}
                          />
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* =======================================================
              AUTHENTICATED USER
          ======================================================= */}
          {studentIsAuth ? (
            <div ref={modalRef} className="relative ml-1 sm:ml-2">
              {/* Profile Trigger */}
              <button
                onClick={() => setShowModal((prev) => !prev)}
                aria-expanded={showModal}
                aria-label="Open profile"
                className={`group flex cursor-pointer items-center gap-2 rounded-full border p-1 transition-all duration-200 active:scale-[0.98] sm:gap-3 sm:py-1.5 sm:pl-1.5 sm:pr-3 ${
                  showModal
                    ? colorMode
                      ? "border-slate-600 bg-slate-800"
                      : "border-slate-300 bg-slate-50"
                    : colorMode
                      ? "border-slate-700/80 bg-slate-900/80 hover:border-slate-600 hover:bg-slate-800"
                      : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                {/* Avatar */}
                <div className="relative shrink-0">
                  <div
                    className={`flex h-9 w-9 items-center justify-center rounded-full bg-linear-to-br from-indigo-500 via-violet-500 to-purple-600 text-sm font-bold text-white shadow-sm ring-2 ${
                      colorMode ? "ring-slate-900" : "ring-white"
                    }`}
                  >
                    {studentInitial}
                  </div>

                  {/* Online Indicator */}
                  <span
                    className={`absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 ${
                      colorMode
                        ? "border-slate-900 bg-emerald-400"
                        : "border-white bg-emerald-500"
                    }`}
                  />
                </div>

                {/* User Info */}
                <div className="hidden min-w-0 flex-col items-start sm:flex">
                  <span
                    className={`max-w-32 truncate text-xs font-semibold lg:max-w-40 lg:text-sm ${
                      colorMode ? "text-white" : "text-slate-800"
                    }`}
                  >
                    {studentName}
                  </span>

                  <span
                    className={`text-[10px] lg:text-[11px] ${
                      colorMode ? "text-slate-500" : "text-slate-400"
                    }`}
                  >
                    Roll: {userMeta?.roll || "N/A"}
                  </span>
                </div>

                {/* Chevron - Desktop only */}
                {isDesktop && (
                  <ChevronRight
                    size={14}
                    className={`hidden rotate-90 transition-transform duration-200 sm:block ${
                      colorMode ? "text-slate-500" : "text-slate-400"
                    }`}
                  />
                )}
              </button>

              {/* ===================================================
                  PROFILE DROPDOWN
              =================================================== */}
              {showModal && (
                <div
                  className={`absolute right-0 top-[calc(100%+10px)] z-50 w-[calc(100vw-24px)] max-w-84 overflow-hidden rounded-2xl border shadow-2xl backdrop-blur-xl animate-in fade-in zoom-in-95 slide-in-from-top-2 duration-200 ${
                    colorMode
                      ? "border-slate-700/80 bg-slate-900/95 text-white shadow-black/40"
                      : "border-slate-200 bg-white/95 text-slate-800 shadow-slate-300/40"
                  }`}
                >
                  {/* Profile Header */}
                  <div
                    className={`relative overflow-hidden px-4 py-4 sm:px-5 sm:py-5 ${
                      colorMode ? "bg-slate-800/40" : "bg-slate-50/80"
                    }`}
                  >
                    {/* Decorative Circles */}
                    <div
                      className={`pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full blur-2xl ${
                        colorMode ? "bg-indigo-500/10" : "bg-indigo-500/10"
                      }`}
                    />

                    <div className="relative flex items-center gap-3.5">
                      {/* Large Avatar */}
                      <div className="relative shrink-0">
                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-linear-to-br from-indigo-500 via-violet-500 to-purple-600 text-lg font-bold text-white shadow-lg shadow-indigo-500/20">
                          {studentInitial}
                        </div>

                        <span
                          className={`absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-[3px] ${
                            colorMode
                              ? "border-slate-800 bg-emerald-400"
                              : "border-white bg-emerald-500"
                          }`}
                        />
                      </div>

                      {/* User Details */}
                      <div className="min-w-0 flex-1">
                        <h2
                          className={`truncate text-[15px] font-semibold ${
                            colorMode ? "text-white" : "text-slate-900"
                          }`}
                        >
                          {studentName}
                        </h2>

                        <p
                          className={`mt-0.5 truncate text-xs ${
                            colorMode ? "text-slate-400" : "text-slate-500"
                          }`}
                        >
                          {studentEmail}
                        </p>

                        <div className="mt-1.5 flex items-center gap-1.5">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />

                          <span
                            className={`text-[10px] font-medium ${
                              colorMode
                                ? "text-emerald-400"
                                : "text-emerald-600"
                            }`}
                          >
                            Active account
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Account Information */}
                  <div
                    className={`border-y px-4 py-4 sm:px-5 ${
                      colorMode ? "border-slate-800" : "border-slate-100"
                    }`}
                  >
                    <div
                      className={`mb-3 text-[10px] font-semibold uppercase tracking-[0.12em] ${
                        colorMode ? "text-slate-500" : "text-slate-400"
                      }`}
                    >
                      Account Information
                    </div>

                    <div
                      className={`grid grid-cols-2 gap-x-5 gap-y-4 rounded-xl p-3 sm:p-4 ${
                        colorMode ? "bg-slate-950/70" : "bg-slate-50"
                      }`}
                    >
                      {fields.map((item) => (
                        <div key={item.label} className="min-w-0">
                          <span
                            className={`block text-[9px] font-semibold uppercase tracking-[0.12em] ${
                              colorMode ? "text-slate-500" : "text-slate-400"
                            }`}
                          >
                            {item.label}
                          </span>

                          {item.value ? (
                            <span
                              className={`mt-1 block truncate text-xs font-semibold sm:text-sm ${
                                colorMode ? "text-slate-200" : "text-slate-700"
                              }`}
                            >
                              {item.value}
                            </span>
                          ) : (
                            <button
                              className={`mt-1 cursor-pointer rounded-md px-2 py-1 text-[10px] font-medium transition-all duration-200 ${
                                colorMode
                                  ? "bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20"
                                  : "bg-indigo-50 text-indigo-600 hover:bg-indigo-100"
                              }`}
                            >
                              Add +
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="p-2">
                    {/* My Profile */}
                    <button
                      onClick={() => {
                        setShowModal(false);
                        navigate("/profile");
                      }}
                      className={`group flex w-full cursor-pointer items-center gap-3 rounded-xl px-3.5 py-2.5 text-left transition-all duration-200 active:scale-[0.98] ${
                        colorMode
                          ? "text-slate-300 hover:bg-slate-800 hover:text-white"
                          : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                      }`}
                    >
                      <div
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors ${
                          colorMode
                            ? "bg-slate-800 text-slate-400 group-hover:bg-slate-700 group-hover:text-white"
                            : "bg-slate-100 text-slate-500 group-hover:bg-slate-200 group-hover:text-slate-700"
                        }`}
                      >
                        <User size={16} />
                      </div>

                      <div className="flex-1">
                        <span className="block text-xs font-semibold">
                          My Profile
                        </span>

                        <span
                          className={`block text-[10px] ${
                            colorMode ? "text-slate-500" : "text-slate-400"
                          }`}
                        >
                          View and manage your account
                        </span>
                      </div>

                      <ChevronRight
                        size={15}
                        className={`transition-transform duration-200 group-hover:translate-x-0.5 ${
                          colorMode ? "text-slate-600" : "text-slate-400"
                        }`}
                      />
                    </button>

                    {/* Logout */}
                    <button
                      className={`group mt-1 flex w-full cursor-pointer items-center gap-3 rounded-xl px-3.5 py-2.5 text-left transition-all duration-200 active:scale-[0.98] ${
                        colorMode
                          ? "text-rose-400 hover:bg-rose-500/10 hover:text-rose-300"
                          : "text-rose-600 hover:bg-rose-50 hover:text-rose-700"
                      }`}
                    >
                      <div
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                          colorMode ? "bg-rose-500/10" : "bg-rose-50"
                        }`}
                      >
                        <LogOut size={16} />
                      </div>

                      <span className="text-xs font-semibold">Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* =====================================================
               GUEST AUTH BUTTONS
            ===================================================== */
            <div className="flex items-center gap-2">
              <button
                onClick={redirectLogin}
                className={`cursor-pointer rounded-xl border px-3 py-2 text-xs font-semibold transition-all duration-200 active:scale-95 sm:px-4 sm:text-sm ${
                  colorMode
                    ? "border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
                    : "border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                Sign In
              </button>

              <button
                onClick={redirectSingup}
                className="cursor-pointer rounded-xl bg-indigo-600 px-3 py-2 text-xs font-semibold text-white shadow-sm transition-all duration-200 hover:bg-indigo-700 hover:shadow-md active:scale-95 sm:px-4 sm:text-sm"
              >
                Sign Up
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
