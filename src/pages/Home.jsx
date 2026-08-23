// Home.jsx
import React, { useContext } from "react";
import { Link } from "react-router-dom";
// import NoteContext from "../context/adminContext/adminState";

export default function Home() {
  // const { colorMode } = useContext(NoteContext);
  const colorMode = true;

  return (
    <div
      className={
        "min-h-screen flex items-center justify-center px-4 py-6 transition-colors duration-300 " +
        (colorMode
          ? "bg-linear-to-br from-slate-900 to-slate-800"
          : "bg-linear-to-br from-slate-300 to-slate-200")
      }
    >
      {/* Glass Window Container */}
      <div
        className={
          "w-full max-w-md sm:max-w-lg md:max-w-5xl rounded-3xl p-6 sm:p-8 md:p-10 shadow-xl transition-colors duration-300 " +
          (colorMode
            ? "bg-slate-900/70 border border-slate-800 text-slate-100"
            : "bg-white/70 border border-gray-200 text-slate-900")
        }
      >
        {/* Title */}
        <div className="text-center mb-8 sm:mb-10">
          <h1
            className={
              "text-xl sm:text-2xl md:text-3xl font-semibold font-seoge transition-colors duration-300 " +
              (colorMode ? "text-slate-100" : "text-slate-900")
            }
          >
            Make Your Exam Digital With Our Software
          </h1>
          <p
            className={
              "text-xs sm:text-sm mt-1 transition-colors duration-300 " +
              (colorMode ? "text-slate-400" : "text-slate-500")
            }
          >
            Select your entry point to continue
          </p>
        </div>

        {/* Entry Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {/* Admin Card */}
          <Link
            to="/admin"
            target="_blank"
            rel="noopener noreferrer"
            className={
              "group relative overflow-hidden rounded-2xl sm:rounded-3xl px-4 py-5 sm:px-6 sm:py-6 transition-all flex h-full flex-col " +
              (colorMode
                ? "bg-slate-800 border border-slate-700 hover:border-violet-500/40 hover:shadow-[0_10px_40px_rgba(99,102,241,0.06)]"
                : "bg-white border-3 border-slate-200 hover:border-indigo-400 hover:shadow-indigo-200")
            }
          >
            <div
              className={
                "absolute -top-10 -right-10 h-28 w-28 sm:h-32 sm:w-32 rounded-full blur-3xl transition-opacity duration-300 " +
                (colorMode
                  ? "bg-violet-600/10 opacity-80"
                  : "bg-indigo-500/10 opacity-0 group-hover:opacity-100")
              }
            />

            <div className="flex items-center justify-between mb-3 sm:mb-4 relative z-10 gap-2">
              <div className="flex gap-3 items-center">
                <div
                  className={
                    "h-10 w-10 sm:h-11 sm:w-11 rounded-2xl flex items-center justify-center text-lg sm:text-xl transition-colors duration-300 " +
                    (colorMode
                      ? "bg-violet-900 text-violet-300"
                      : "bg-indigo-50 text-indigo-600")
                  }
                >
                  🛠
                </div>
                <div>
                  <h2
                    className={
                      "font-semibold text-base sm:text-lg transition-colors duration-300 " +
                      (colorMode ? "text-slate-100" : "text-slate-900")
                    }
                  >
                    Admin Portal
                  </h2>
                  <p
                    className={
                      "text-[10px] sm:text-xs transition-colors duration-300 " +
                      (colorMode ? "text-slate-400" : "text-slate-500")
                    }
                  >
                    Full management access
                  </p>
                </div>
              </div>
              <span
                className={
                  "text-[10px] sm:text-[11px] px-2.5 sm:px-3 py-1 rounded-full whitespace-nowrap transition-colors duration-300 " +
                  (colorMode
                    ? "bg-emerald-900/20 text-emerald-300"
                    : "bg-emerald-50 text-emerald-600")
                }
              >
                Admin
              </span>
            </div>

            <p
              className={
                "text-xs sm:text-sm mb-4 sm:mb-6 relative z-10 transition-colors duration-300 " +
                (colorMode ? "text-slate-300" : "text-slate-500")
              }
            >
              Create quizzes and manage everything from one place.
            </p>

            <div className="mt-auto flex justify-between items-center relative z-10">
              <span
                className={
                  "text-sm font-medium transition-colors duration-300 " +
                  (colorMode ? "text-violet-300" : "text-indigo-600")
                }
              >
                Enter Admin →
              </span>
              <span
                className={
                  "text-[10px] sm:text-xs transition-colors duration-300 " +
                  (colorMode ? "text-slate-400" : "text-slate-400")
                }
              >
                Secure access
              </span>
            </div>
          </Link>

          {/* Student Card */}
          <Link
            to="/student"
            target="_blank"
            rel="noopener noreferrer"
            className={
              "group relative overflow-hidden rounded-2xl sm:rounded-3xl px-4 py-5 sm:px-6 sm:py-6 transition-all flex h-full flex-col " +
              (colorMode
                ? "bg-slate-800 border border-slate-700 hover:border-sky-400/30 hover:shadow-[0_10px_40px_rgba(56,189,248,0.04)]"
                : "bg-white border-3 border-slate-200 hover:border-sky-400 hover:shadow-sky-200")
            }
          >
            <div
              className={
                "absolute -top-10 -right-10 h-28 w-28 sm:h-32 sm:w-32 rounded-full blur-3xl transition-opacity duration-300 " +
                (colorMode
                  ? "bg-sky-500/8 opacity-80"
                  : "bg-sky-500/10 opacity-0 group-hover:opacity-100")
              }
            />

            <div className="flex items-center justify-between mb-3 sm:mb-4 relative z-10 gap-2">
              <div className="flex gap-3 items-center">
                <div
                  className={
                    "h-10 w-10 sm:h-11 sm:w-11 rounded-2xl flex items-center justify-center text-lg sm:text-xl transition-colors duration-300 " +
                    (colorMode
                      ? "bg-sky-900 text-sky-300"
                      : "bg-sky-50 text-sky-600")
                  }
                >
                  🎓
                </div>
                <div>
                  <h2
                    className={
                      "font-semibold text-base sm:text-lg transition-colors duration-300 " +
                      (colorMode ? "text-slate-100" : "text-slate-900")
                    }
                  >
                    Student Portal
                  </h2>
                  <p
                    className={
                      "text-[10px] sm:text-xs transition-colors duration-300 " +
                      (colorMode ? "text-slate-400" : "text-slate-500")
                    }
                  >
                    Attempt assigned quizzes
                  </p>
                </div>
              </div>
              <span
                className={
                  "text-[10px] sm:text-[11px] px-2.5 sm:px-3 py-1 rounded-full whitespace-nowrap transition-colors duration-300 " +
                  (colorMode
                    ? "bg-sky-900/20 text-sky-300"
                    : "bg-sky-50 text-sky-600")
                }
              >
                Student
              </span>
            </div>

            <p
              className={
                "text-xs sm:text-sm mb-4 sm:mb-6 relative z-10 transition-colors duration-300 " +
                (colorMode ? "text-slate-300" : "text-slate-500")
              }
            >
              Join quizzes assigned to you and attempt them safely.
            </p>

            <div className="mt-auto flex justify-between items-center relative z-10">
              <span
                className={
                  "text-sm font-medium transition-colors duration-300 " +
                  (colorMode ? "text-sky-300" : "text-sky-600")
                }
              >
                Enter Student →
              </span>
              <span
                className={
                  "text-[10px] sm:text-xs transition-colors duration-300 " +
                  (colorMode ? "text-slate-400" : "text-slate-400")
                }
              >
                Safe mode
              </span>
            </div>
          </Link>
        </div>

        {/* Footer tiny text */}
        <p
          className={
            "mt-6 sm:mt-8 text-center text-[10px] sm:text-[11px] transition-colors duration-300 " +
            (colorMode ? "text-slate-400" : "text-slate-400")
          }
        >
          Modern Interface • Mobile Friendly • Light & Dark Mode Ready
        </p>
      </div>
    </div>
  );
}
