import React, { memo, useState, useEffect, useRef } from "react";
import {
  UserRound,
  Mail,
  ChevronDown,
  Timer,
  BookOpen,
  Pencil,
  Hash,
  Calendar,
  GraduationCap,
  Users,
} from "lucide-react";
import QuizTimer from "./QuizTimer";

function QuizNavbar({
  colorMode,
  student,
  timeLeftRef,
  isTimerRunning,
  quiz,
  totalTime,
  setOpenStudentModal,
}) {
  const [profileOpen, setProfileOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleEdit() {
    setProfileOpen(false);
    setOpenStudentModal(true);
  }

  return (
    <nav
      className={`relative z-50 h-[76px] shrink-0 border-b backdrop-blur-xl transition-colors duration-300 ${
        colorMode
          ? "border-slate-800/60 bg-slate-950/80"
          : "border-slate-200/60 bg-white/80"
      }`}
    >
      <div className="mx-auto flex h-full items-center justify-between px-4 sm:px-6 md:px-8">
        <div
          className="relative flex flex-1 items-center justify-start"
          ref={dropdownRef}
        >
          <button
            type="button"
            onClick={() => setProfileOpen((prev) => !prev)}
            className={`group flex items-center gap-3 rounded-full border py-1.5 pl-1.5 pr-4 transition-all duration-200 cursor-pointer ${
              colorMode
                ? "border-slate-800 bg-slate-900/50 hover:border-slate-700 hover:bg-slate-800"
                : "border-slate-200 bg-slate-50/50 hover:border-slate-300 hover:bg-slate-100"
            }`}
          >
            {/* Avatar */}
            <div className="relative">
              <div
                className={`flex size-9 items-center justify-center rounded-full border ${
                  colorMode
                    ? "border-indigo-500/30 bg-indigo-500/20 text-indigo-400"
                    : "border-indigo-200 bg-indigo-100 text-indigo-600"
                }`}
              >
                <UserRound size={16} strokeWidth={2.5} />
              </div>
              {/* Online Indicator */}
              <span
                className={`absolute -bottom-0.5 -right-0.5 size-3 rounded-full border-2 ${
                  colorMode
                    ? "border-slate-900 bg-emerald-400"
                    : "border-white bg-emerald-500"
                }`}
              />
            </div>

            {/* Name */}
            <div className=" text-left sm:block">
              <p
                className={`max-w-[120px] truncate text-sm font-bold leading-none ${
                  colorMode ? "text-slate-200" : "text-slate-800"
                }`}
              >
                {student?.name.split(" ")[0] || "student"}
              </p>
            </div>

            <ChevronDown
              size={14}
              strokeWidth={3}
              className={`transition-transform duration-300 ${
                profileOpen ? "rotate-180" : ""
              } ${colorMode ? "text-slate-500" : "text-slate-400"}`}
            />
          </button>

          {/* =====================================================
              PROFILE DROPDOWN
          ====================================================== */}
          {profileOpen && (
            <div
              className={`absolute left-0 top-[calc(100%+8px)] w-[320px] overflow-hidden rounded-2xl border shadow-2xl origin-top-left animate-in fade-in zoom-in-95 duration-200 ${
                colorMode
                  ? "border-slate-700/80 bg-slate-900/95 shadow-black/50 backdrop-blur-xl"
                  : "border-slate-200 bg-white/95 shadow-slate-900/10 backdrop-blur-xl"
              }`}
            >
              {/* Header */}
              <div className="relative p-5">
                {/* Decorative gradients */}
                <div
                  className={`absolute -right-10 -top-10 size-32 rounded-full blur-3xl ${colorMode ? "bg-indigo-500/20" : "bg-indigo-500/10"}`}
                />

                <div className="relative flex items-center justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <div
                      className={`flex size-12 shrink-0 items-center justify-center rounded-2xl border ${
                        colorMode
                          ? "border-indigo-400/20 bg-indigo-500/10 text-indigo-400"
                          : "border-indigo-100 bg-indigo-50 text-indigo-600"
                      }`}
                    >
                      <UserRound size={22} strokeWidth={2} />
                    </div>
                    <div className="min-w-0">
                      <p
                        className={`truncate text-base font-bold ${colorMode ? "text-white" : "text-slate-900"}`}
                      >
                        {student?.name || "Student Profile"}
                      </p>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <Mail
                          size={12}
                          className={
                            colorMode ? "text-indigo-400" : "text-indigo-500"
                          }
                        />
                        <p
                          className={`truncate text-xs font-medium ${colorMode ? "text-slate-400" : "text-slate-500"}`}
                        >
                          {student?.email || "No email added"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleEdit}
                    className={`flex size-8 shrink-0 items-center justify-center rounded-full border transition-all ${
                      colorMode
                        ? "border-slate-700 bg-slate-800 text-slate-400 hover:border-indigo-500/50 hover:text-indigo-400"
                        : "border-slate-200 bg-slate-50 text-slate-500 hover:border-indigo-200 hover:text-indigo-600"
                    }`}
                  >
                    <Pencil size={14} />
                  </button>
                </div>
              </div>

              {/* Grid Details */}
              <div
                className={`grid grid-cols-2 gap-px border-y ${colorMode ? "border-slate-800 bg-slate-800" : "border-slate-100 bg-slate-100"}`}
              >
                <ProfileDetail
                  label="Roll No."
                  value={student?.roll}
                  icon={Hash}
                  colorMode={colorMode}
                  accent="indigo"
                />
                <ProfileDetail
                  label="Year"
                  value={student?.year}
                  icon={Calendar}
                  colorMode={colorMode}
                  accent="purple"
                />
                <ProfileDetail
                  label="Semester"
                  value={student?.sem}
                  icon={GraduationCap}
                  colorMode={colorMode}
                  accent="cyan"
                />
                <ProfileDetail
                  label="Section"
                  value={student?.section}
                  icon={Users}
                  colorMode={colorMode}
                  accent="emerald"
                />
              </div>
            </div>
          )}
        </div>

        <div className="hidden flex-1 justify-center md:flex">
          <div className="flex items-center gap-3 md:gap-4">
            {/* Subject Badge with Live Pulsing Dot */}
            <div
              className={`flex items-center gap-2 rounded-md px-2.5 py-1 transition-colors ${
                colorMode
                  ? "bg-indigo-500/10 text-indigo-400"
                  : "bg-indigo-50 text-indigo-600"
              }`}
            >
              <div className="relative flex size-2 items-center justify-center">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-400 opacity-75" />
                <span
                  className={`relative inline-flex size-1.5 rounded-full ${
                    colorMode ? "bg-indigo-500" : "bg-indigo-600"
                  }`}
                />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest">
                {quiz?.subject || "General"}
              </span>
            </div>

            {/* Subtle Vertical Divider */}
            <div
              className={`h-5 w-px rounded-full ${
                colorMode ? "bg-slate-800" : "bg-slate-200"
              }`}
            />

            {/* Quiz Title */}
            <div className="flex items-center gap-2">
              <BookOpen
                size={14}
                strokeWidth={2.5}
                className={colorMode ? "text-slate-500" : "text-slate-400"}
              />
              <p
                className={`max-w-[220px] truncate text-sm font-bold tracking-tight ${
                  colorMode ? "text-slate-200" : "text-slate-800"
                }`}
              >
                {quiz?.title || "Assessment"}
              </p>
            </div>
          </div>
        </div>

        {/* =====================================================
            RIGHT: TIMER
        ====================================================== */}
        <div className="flex flex-1 items-center justify-end gap-3">
          <div
            className={`hidden size-9 items-center justify-center rounded-xl border sm:flex ${
              colorMode
                ? "border-slate-800 bg-slate-900/50 text-slate-400"
                : "border-slate-200 bg-slate-50/50 text-slate-500"
            }`}
          >
            <Timer size={16} />
          </div>

          <QuizTimer
            totalTime={totalTime}
            colorMode={colorMode}
            timeLeftRef={timeLeftRef}
            isTimerRunning={isTimerRunning}
          />
        </div>
      </div>
    </nav>
  );
}

/* =====================================================
   SUB-COMPONENTS
====================================================== */

function ProfileDetail({ label, value, icon: Icon, colorMode, accent }) {
  const accentStyles = {
    indigo: colorMode
      ? "text-indigo-400 bg-indigo-500/10"
      : "text-indigo-600 bg-indigo-50",
    purple: colorMode
      ? "text-purple-400 bg-purple-500/10"
      : "text-purple-600 bg-purple-50",
    cyan: colorMode
      ? "text-cyan-400 bg-cyan-500/10"
      : "text-cyan-600 bg-cyan-50",
    emerald: colorMode
      ? "text-emerald-400 bg-emerald-500/10"
      : "text-emerald-600 bg-emerald-50",
  };

  return (
    <div
      className={`flex flex-col p-4 transition-colors ${
        colorMode
          ? "bg-slate-900 hover:bg-slate-900/80"
          : "bg-white hover:bg-slate-50"
      }`}
    >
      <div className="flex items-center gap-2 mb-1.5">
        <div
          className={`flex size-5 items-center justify-center rounded-md ${accentStyles[accent]}`}
        >
          <Icon size={11} strokeWidth={2.5} />
        </div>
        <p
          className={`text-[10px] font-bold uppercase tracking-wider ${
            colorMode ? "text-slate-500" : "text-slate-400"
          }`}
        >
          {label}
        </p>
      </div>

      <p
        className={`truncate text-sm font-semibold pl-7 ${
          colorMode ? "text-slate-200" : "text-slate-700"
        }`}
      >
        {value || "--"}
      </p>
    </div>
  );
}

export default memo(QuizNavbar);
