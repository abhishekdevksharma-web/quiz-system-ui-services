import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowUpRight, GraduationCap, FileDown, X, Plus } from "lucide-react";

function QuickActions({ colorMode, confirm }) {
  const navigate = useNavigate();

  const handleSwitchToStudent = async () => {
    const result = await confirm({
      title: "Switch to Student Mode?",
      message: "Are you sure you want to switch to Student Mode?",
    });

    if (result) navigate("/student");
  };
  const handleCloseAllQuiz = async () => {
    const result = await confirm({
      title: "Close All Active Quizzes?",
      message: "Are you sure you want to close all active quizzes?",
    });
  };

  return (
    <div
      className={
        "w-full h-fit rounded-2xl p-5 transition-colors duration-300 " +
        (colorMode
          ? "bg-slate-900 border border-slate-800 shadow-sm"
          : "bg-white border border-slate-200 shadow-sm")
      }
    >
      <h3
        className={
          "text-sm font-semibold mb-3 " +
          (colorMode ? "text-slate-100" : "text-slate-800")
        }
      >
        Quick Actions
      </h3>

      <div className="flex flex-col gap-3 text-sm">
        {/* Create Quiz */}
        <Link
          to="/create-question"
          // target="_blank"
          // rel="noopener noreferrer"
          className={`group w-full rounded-2xl border p-3 font-semibold transition-all duration-300 ${
            colorMode
              ? "border-indigo-500 bg-indigo-600/50 text-white hover:bg-indigo-600 hover:shadow-lg hover:shadow-indigo-500/25"
              : "border-indigo-200 bg-indigo-50 text-indigo-700 hover:border-indigo-300 hover:bg-indigo-100"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-3">
              <span
                className={`flex h-9 w-9 items-center justify-center rounded-xl ${
                  colorMode
                    ? "bg-indigo-500 text-white"
                    : "bg-white text-indigo-600 shadow-sm"
                }`}
              >
                <Plus size={18} strokeWidth={2.5} />
              </span>

              <span className="flex flex-col">
                <span>Create New Quiz</span>
              </span>
            </span>
          </div>
        </Link>

        {/* Student Mode */}
        <button
          type="button"
          onClick={handleSwitchToStudent}
          className={`group w-full rounded-2xl border p-3 font-semibold transition-all duration-300 ${
            colorMode
              ? "border-emerald-500 bg-emerald-600/50 text-white hover:bg-emerald-600 hover:shadow-lg hover:shadow-emerald-500/25"
              : "border-emerald-200 bg-emerald-50 text-emerald-700 hover:border-emerald-300 hover:bg-emerald-100"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-3">
              <span
                className={`flex h-9 w-9 items-center justify-center rounded-xl ${
                  colorMode
                    ? "bg-emerald-500 text-white"
                    : "bg-white text-emerald-600 shadow-sm"
                }`}
              >
                <GraduationCap size={19} strokeWidth={2.5} />
              </span>

              <span className="flex flex-col">
                <span>Switch to Student Mode</span>
              </span>
            </span>
          </div>
        </button>
        {/* Reports */}
        <Link
          to="/reports"
          className={`group w-full rounded-2xl border p-3 font-semibold transition-all duration-300 ${
            colorMode
              ? "border-slate-600 bg-slate-800/50 text-white hover:border-slate-800 hover:bg-slate-700 hover:shadow-lg"
              : "border-slate-200 bg-slate-100 text-slate-700 hover:bg-slate-200"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-3">
              <span
                className={`flex h-9 w-9 items-center justify-center rounded-xl ${
                  colorMode
                    ? "bg-slate-700 text-slate-200"
                    : "bg-white text-slate-600 shadow-sm"
                }`}
              >
                <FileDown size={17} />
              </span>

              <span className="flex flex-col">
                <span>Export Reports</span>
              </span>
            </span>
          </div>
        </Link>

        {/* Close Active Quizzes */}
        <button
          onClick={handleCloseAllQuiz}
          type="button"
          className={`group w-full rounded-2xl border p-3 text-left font-semibold transition-all duration-300 cursor-pointer ${
            colorMode
              ? "border-rose-500 bg-rose-600/50 text-white hover:bg-rose-600 hover:shadow-lg hover:shadow-rose-500/25"
              : "border-red-200 bg-red-50 text-red-700 hover:border-red-300 hover:bg-red-100"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-3">
              <span
                className={`flex h-9 w-9 items-center justify-center rounded-xl transition-transform duration-300 group-hover:rotate-90 ${
                  colorMode
                    ? "bg-rose-500 text-white"
                    : "bg-white text-red-600 shadow-sm"
                }`}
              >
                <X size={17} strokeWidth={2.5} />
              </span>

              <span className="flex flex-col">
                <span>Close Active Quizzes</span>
              </span>
            </span>
          </div>
        </button>
      </div>
    </div>
  );
}

export default QuickActions;
