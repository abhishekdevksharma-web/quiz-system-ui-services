import React, { useState, useEffect, useContext, useRef } from "react";
import StudentContext from "../../context/studentContext/studentContext";

import {
  ChevronLeft,
  ChevronRight,
  Flag,
  Clock,
  Layout,
  CheckCircle2,
  Circle,
  CircleDot,
  User,
  LogOut,
} from "lucide-react";
import Timer from "./Timer";

const Navbar = () => {
  const {
    colorMode,
    setcolorMode,
    UserStartQuiz,
    setUserStartQuiz,
    userMeta,
    setUserMeta,
    isTimerRunning,
    setisTimerRunning,
  } = useContext(StudentContext);

  const [showModal, setShowModal] = useState(false);

  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setShowModal(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fields = [
    { label: "Roll No", value: userMeta.roll },
    { label: "Branch", value: userMeta.branch },
    { label: "Section", value: userMeta.section },
    { label: "Year", value: userMeta.year },
  ];

  return (
    <header
      className={`${colorMode ? "bg-gray-800 border-gray-700" : "bg-white border-slate-200"} h-16 border-b flex items-center justify-between px-8 sticky top-0 z-10`}
    >
      <div className="flex items-center gap-2"></div>

      <div className="relative flex items-center gap-6">
        <div>
          <button
            onClick={() => setShowModal(true)}
            className={`group flex items-center gap-3 rounded-full transition-all duration-300 hover:scale-[1.03] cursor-pointer ${
              colorMode
                ? "bg-slate-800/90 hover:bg-slate-700 border border-slate-700 shadow-lg"
                : "bg-white hover:bg-slate-50 border border-slate-200 shadow-md"
            }`}
          >
            {/* Avatar */}
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                colorMode
                  ? "bg-linear-to-br from-indigo-500 to-purple-600"
                  : "bg-linear-to-br from-indigo-400 to-purple-500"
              }`}
            >
              <User size={18} className="text-white" />
            </div>

            <div className="flex flex-col items-start pr-2">
              <span
                className={`text-sm font-semibold ${
                  colorMode ? "text-white" : "text-slate-800"
                }`}
              >
                {userMeta.student.name.length == 0
                  ? "STUDENT"
                  : userMeta.student.name}
              </span>
            </div>
          </button>

          {showModal && (
            <div
              ref={modalRef}
              className={`absolute top-14 right-0 w-80 rounded-2xl shadow-2xl overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-200 ${
                colorMode
                  ? "bg-slate-800 border border-slate-700 text-white"
                  : "bg-white border border-slate-200 text-slate-800"
              }`}
            >
              {/* Header */}
              <div
                className={`p-5 flex items-center gap-4 ${
                  colorMode ? "border-slate-700" : "border-slate-200"
                }`}
              >
                <div className="w-14 h-14 rounded-full bg-linear-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white text-xl font-bold shadow-lg">
                  {userMeta.student.name?.charAt(0)?.toUpperCase() || "U"}
                </div>

                <div className="overflow-hidden">
                  <h2 className="font-semibold text-lg truncate">
                    {userMeta.student.name || "Unknown User"}
                  </h2>

                  <p
                    className={`text-sm truncate ${
                      colorMode ? "text-slate-400" : "text-slate-500"
                    }`}
                  >
                    {userMeta.student.email || "No email"}
                  </p>
                </div>
              </div>

              <div
                className={`px-5 py-4 space-y-3 border-y ${
                  colorMode ? "border-slate-700" : "border-slate-200"
                }`}
              >
                {fields.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between"
                  >
                    <span
                      className={`text-sm ${
                        colorMode ? "text-slate-400" : "text-slate-500"
                      }`}
                    >
                      {item.label}
                    </span>

                    {item.value ? (
                      <span className="font-medium text-sm">{item.value}</span>
                    ) : (
                      <button className="text-sm px-2 py-1 rounded-md text-indigo-500 hover:bg-indigo-50 dark:hover:bg-slate-700 transition">
                        Add +
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {/* Footer */}

              <div className="p-2 space-y-1">
                {/* Profile Button */}
                <button
                  className={`w-full text-left px-4 py-2.5 rounded-xl transition-all duration-200 flex items-center gap-3 group active:scale-[0.98] ${
                    colorMode
                      ? "text-slate-200 hover:bg-slate-800/80 hover:text-white"
                      : "text-slate-700 hover:bg-slate-100/80 hover:text-slate-900"
                  }`}
                >
                  <User
                    size={18}
                    className="opacity-70 group-hover:opacity-100 transition-opacity"
                  />
                  <span className="text-sm font-medium">My Profile</span>
                </button>

                {/* Logout Button */}
                <button
                  className={`w-full text-left px-4 py-2.5 rounded-xl transition-all duration-200 flex items-center gap-3 group active:scale-[0.98] ${
                    colorMode
                      ? "text-rose-400 hover:bg-rose-500/10 hover:text-rose-300"
                      : "text-rose-600 hover:bg-rose-50 hover:text-rose-700"
                  }`}
                >
                  <LogOut
                    size={18}
                    className="opacity-80 group-hover:translate-x-0.5 transition-transform"
                  />
                  <span className="text-sm font-medium">Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>

        <Timer initialTime={userMeta.quizDuration} />
      </div>
    </header>
  );
};

export default Navbar;
