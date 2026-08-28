import { useState, useRef, useEffect, useContext } from "react";
import { ChevronDown } from "lucide-react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import Avatar from "./Avatar";
import AdminContext from "../../context/adminContext/adminContext";
import {
  Sun,
  Moon,
  Settings,
  LogOut,
  LayoutDashboard,
  Sparkles,
} from "lucide-react";
import { handleLogoutApi } from "../../services/auth.service";
import AuthAlertModal from "./AlertModal";

export default function Navbar() {
  const navigate = useNavigate();
  const { colorMode, setcolorMode, IsAuthenticate, userDetails } =
    useContext(AdminContext);

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Outside click listener
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  async function handleLogout() {
    const res = await handleLogoutApi();
    if (res.success) {
      navigate("/admin/login", { replace: true });
    }
  }

  return (
    <header
      className={
        "fixed w-full border-b transition duration-300 " +
        (colorMode
          ? "bg-slate-900 text-slate-100 border-slate-800 shadow-[0_2px_6px_rgba(0,0,0,0.5)]"
          : "bg-white text-gray-800 border-gray-200 shadow-sm")
      }
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 h-16">
        {/* Nav Links */}
        <div></div>
        <ul className="hidden md:flex items-center gap-2 relative text-sm font-medium">
          {[
            { name: "Dashboard", path: "/admin", end: true },
            { name: "Quizes", path: "/admin/quizes" },
            { name: "About", path: "/admin/about" },
          ].map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.end}
              className={({ isActive }) =>
                [
                  "relative px-5 py-2 rounded-xl transition-all duration-300 z-10",
                  "hover:-translate-y-px",
                  isActive
                    ? colorMode
                      ? "text-white"
                      : "text-indigo-700"
                    : colorMode
                      ? "text-slate-300 hover:text-white"
                      : "text-slate-700 hover:text-slate-900",
                ].join(" ")
              }
            >
              {({ isActive }) => (
                <>
                  {/* Floating indicator */}
                  {isActive && (
                    <span
                      className={
                        "absolute inset-0 -z-10 rounded-xl transition-all duration-300 " +
                        (colorMode
                          ? "bg-linear-to-r from-indigo-600 to-violet-600 shadow-lg shadow-indigo-600/30"
                          : "bg-indigo-100 shadow-sm")
                      }
                    />
                  )}

                  {item.name}
                </>
              )}
            </NavLink>
          ))}
        </ul>

        {/* Profile Dropdown and auth*/}
        {IsAuthenticate ? (
          <div className="relative  " ref={dropdownRef}>
            <button
              onClick={() => setOpen(!open)}
              className={
                "flex items-center gap-2 cursor-pointer px-2 py-1 rounded-2xl focus:border " +
                (colorMode ? "hover:bg-white/10" : "hover:bg-gray-100")
              }
            >
              <div className="w-10 h-10">
                <Avatar char="A" />
              </div>
              <ChevronDown
                size={18}
                className={colorMode ? "text-slate-200" : "text-gray-600"}
              />
            </button>
            {open && (
              <div
                role="menu"
                className={`absolute right-0 mt-3 w-80 rounded-2xl p-2 z-50 border backdrop-blur-xl transition-all duration-200 animate-in fade-in zoom-in-95 slide-in-from-top-2 ${
                  colorMode
                    ? "bg-slate-900/95 border-slate-700/50 text-slate-100 shadow-xl shadow-black/50"
                    : "bg-white/95 border-indigo-100 text-slate-700 shadow-2xl shadow-indigo-200/50" // Light mode: Indigo border & colorful shadow
                }`}
              >
                {/* --- Header: Vibrant linear Card --- */}
                <div
                  className={`relative p-4 mb-2 rounded-xl border shadow-sm z-100 ${
                    colorMode
                      ? "bg-linear-to-br from-slate-800 to-slate-800/50 border-slate-700"
                      : "bg-linear-to-br from-violet-600 to-indigo-600 border-transparent text-white shadow-indigo-500/30" // Light mode: Purple/Indigo Gradient
                  }`}
                >
                  <div className="flex items-start justify-between mb-1">
                    <div>
                      <h3 className="font-bold text-base tracking-tight">
                        {userDetails.name}
                      </h3>

                      <div
                        className={`flex items-center gap-1.5 mt-1 ${
                          colorMode ? "text-slate-400" : "text-indigo-100" // Whiteish text on gradient
                        }`}
                      >
                        <div
                          className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold ${
                            colorMode
                              ? "bg-slate-700 text-slate-300"
                              : "bg-white/20 text-white backdrop-blur-md" // Glassy icon
                          }`}
                        >
                          @
                        </div>
                        <p className="text-xs font-medium truncate opacity-90">
                          {userDetails.email}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* --- Appearance Toggle --- */}
                <div
                  className={`flex items-center justify-between p-2 mb-2 rounded-xl transition-colors ${
                    colorMode
                      ? "bg-slate-800/40 border border-transparent"
                      : "bg-indigo-50/50 border border-indigo-100" // Light mode: Subtle tint
                  }`}
                >
                  <div className="flex items-center gap-2.5 ml-1">
                    <div
                      className={`p-1.5 rounded-lg ${
                        colorMode
                          ? "bg-slate-700 text-purple-400"
                          : "bg-white text-indigo-600 shadow-sm ring-1 ring-indigo-100"
                      }`}
                    >
                      <Sparkles size={16} />
                    </div>
                    <div
                      className={`text-xs font-semibold tracking-wide ${
                        colorMode ? "opacity-90" : "text-indigo-900"
                      }`}
                    >
                      Appearance
                    </div>
                  </div>

                  <button
                    onClick={() => setcolorMode(!colorMode)}
                    className={`relative h-6 w-11 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                      colorMode ? "bg-indigo-600" : "bg-indigo-200"
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 left-0.5 bg-white rounded-full h-5 w-5 shadow-sm transition-transform duration-300 flex items-center justify-center ${
                        colorMode ? "translate-x-5" : "translate-x-0"
                      }`}
                    >
                      {colorMode ? (
                        <Moon size={10} className="text-indigo-600" />
                      ) : (
                        <Sun size={10} className="text-amber-500" />
                      )}
                    </span>
                  </button>
                </div>

                {/* --- Navigation options --- */}
                <nav className="flex flex-col gap-1">
                  <button
                    onClick={() => {}}
                    className={`group flex items-center gap-3 w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 ${
                      colorMode
                        ? "hover:bg-slate-800 text-slate-300 hover:text-white"
                        : "text-slate-600 hover:bg-linear-to-r hover:from-indigo-50 hover:to-violet-50 hover:text-indigo-700" // Gradient Hover
                    }`}
                  >
                    <LayoutDashboard
                      size={18}
                      className={`${
                        colorMode ? "text-slate-400" : "text-slate-400"
                      } group-hover:text-indigo-500 transition-colors duration-200`}
                    />
                    <span className="flex-1 opacity-90 group-hover:opacity-100">
                      Dashboard
                    </span>
                  </button>

                  <button
                    onClick={() => {}}
                    className={`group flex items-center gap-3 w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 ${
                      colorMode
                        ? "hover:bg-slate-800 text-slate-300 hover:text-white"
                        : "text-slate-600 hover:bg-linear-to-r hover:from-indigo-50 hover:to-violet-50 hover:text-indigo-700"
                    }`}
                  >
                    <Settings
                      size={18}
                      className={`${
                        colorMode ? "text-slate-400" : "text-slate-400"
                      } group-hover:text-indigo-500 transition-colors duration-200`}
                    />
                    <span className="flex-1 opacity-90 group-hover:opacity-100">
                      Settings
                    </span>
                  </button>
                </nav>

                {/* --- Footer / Sign Out --- */}
                <div
                  className={`mt-2 border-t pt-2  ${
                    colorMode ? "border-slate-700/50" : "border-indigo-50"
                  }`}
                >
                  <button
                    onClick={handleLogout}
                    className={`flex cursor-pointer items-center gap-3 w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors group focus:ring-2 focus:ring-red-500 hover:bg-red-700 ${
                      colorMode
                        ? "hover:bg-red-900/10 text-red-400"
                        : "hover:bg-red-50 text-red-600"
                    }`}
                  >
                    <LogOut
                      size={18}
                      className="group-hover:text-red-500 transition-colors"
                    />
                    <span className="">Sign out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="space-x-2">
            <Link to="/admin/login" className="flex-1">
              <button
                className={
                  "cursor-pointer rounded-xl px-4 py-2.5 text-sm font-medium transition " +
                  (colorMode
                    ? "bg-indigo-600 text-white hover:bg-indigo-500"
                    : "bg-slate-900 text-white hover:bg-slate-800")
                }
              >
                Login
              </button>
            </Link>

            <Link to="/admin/signup" className="flex-1">
              <button
                className={
                  "cursor-pointer rounded-xl px-4 py-2.5 text-sm font-medium transition border " +
                  (colorMode
                    ? "border-slate-600 text-slate-200 hover:bg-slate-800"
                    : "border-slate-300 text-slate-900 hover:bg-slate-100")
                }
              >
                Sign Up
              </button>
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
