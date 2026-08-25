import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AdminContext from "../../context/adminContext/adminContext";
import StatsCardWithDropdown from "./Dashbord_Stats";
import StatCard from "./Dashbord_Stats";

import { BookOpen, Clock3, Users, CalendarDays } from "lucide-react";

function Home() {
  const {
    fetchRecentQuizes,
    adminRecentQuizHistory,
    setadminRecentQuizHistory,
    userDetails,
    setuserDetails,
    colorMode,
    Dashboard,
    adminAuthenticate,
    setadminAuthenticate, 
  } = useContext(AdminContext);

  const navigate = useNavigate();

  const [isfechedRecentQuiz, setisfechedRecentQuiz] = useState(false);
  const [isFetchingStats, setIsFetchingStats] = useState(true);
  const [stats, setStats] = useState([]);

  useEffect(() => {
    async function initialFetches() {
      try {
        setisfechedRecentQuiz(true);

        const { user, loginStatus, activeQuizzes } = await Dashboard(); 
        

        if (loginStatus) {
          setadminAuthenticate(true);

          setStats([
            {
              title: "Total Quizzes",
              value: user.totalQuizs || 0,
              span: 1,
            },
            {
              title: "Active Quizzes",
              value: activeQuizzes.length,
              option: activeQuizzes,
              span: 2, // Ye 2 columns lega
            },
            {
              title: "Quick Action",
              value: "...",
              span: 1,
            },
          ]);

          setuserDetails({
            name: user.name,
            email: user.email,
          });

          setadminRecentQuizHistory(user.recentQuizzes);
        } else navigate("/admin/login");
      } catch (error) {
      } finally {
        setisfechedRecentQuiz(false);
        setIsFetchingStats(false);
      }
    } 
  }, []);
  const spanClass = {
    1: "lg:col-span-1",
    2: "lg:col-span-2",
    3: "lg:col-span-3",
    4: "lg:col-span-4",
  };

  return (
    <div
      className={
        "min-h-screen transition-colors duration-300 pt-15 " +
        (colorMode
          ? "bg-slate-950 text-slate-100"
          : "bg-slate-50 text-slate-900")
      }
    >
      <main className="mx-auto max-w-7xl px-6 py-8 space-y-6">
        {/* Stats grid */}

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {(isFetchingStats ? new Array(4).fill({ span: 1 }) : stats).map(
            (item, i) => (
              <div key={i} className={spanClass[item.span] || "lg:col-span-1"}>
                <StatCard
                  colorMode={colorMode}
                  title={item.title}
                  value={item.value}
                  options={item.option}
                />
              </div>
            ),
          )}
        </div>

        {/* Recent Quizzes + Actions */}
        <div className="grid h-full max-h-100 gap-6 lg:grid-cols-3">
          {/* Recent Quizzes */}
          <div
            className={
              "lg:col-span-2 rounded-2xl transition-colors duration-300 border-2 " +
              (colorMode
                ? "bg-slate-900 border border-slate-800 shadow-sm"
                : "bg-white border border-slate-200 shadow-sm")
            }
          >
            <div
              className={
                "flex justify-between items-center border-b px-5 py-2 " +
                (colorMode ? "border-gray-800" : "border-gray-200")
              }
            >
              <h3
                className={
                  "text-sm font-semibold " +
                  (colorMode ? "text-slate-100" : "text-slate-800")
                }
              >
                Recent Quizzes
              </h3>
              <span
                className={
                  "text-xs cursor-pointer " +
                  (colorMode ? "text-indigo-300" : "text-indigo-600")
                }
              >
                View All
              </span>
            </div>

            <div className="space-y-3 px-5 py-5 rounded-b-xl">
              {!isfechedRecentQuiz ? (
                adminRecentQuizHistory.length > 0 ? (
                  adminRecentQuizHistory.map((quiz, index) => (
                    <div
                      key={quiz._id || index}
                      className={`flex items-center justify-between rounded-xl px-4 py-3 transition cursor-pointer group h-14 min-h-14 ${
                        colorMode
                          ? "bg-slate-900 hover:bg-slate-800/80 border border-slate-800 hover:border-slate-700"
                          : "bg-white hover:bg-slate-50 border border-slate-100 shadow-xs"
                      }`}
                    >
                      {/* Left Section */}
                      <div className="flex items-center gap-4 min-w-0 flex-1">
                        {/* Modern Glow/Glassmorphism Icon Wrapper */}
                        <div
                          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-all duration-300 backdrop-blur-md shadow-sm ${
                            colorMode
                              ? "bg-slate-800/60 text-indigo-400 border border-slate-700/50 group-hover:bg-indigo-500 group-hover:text-white group-hover:border-indigo-400 group-hover:shadow-[0_0_15px_rgba(99,102,241,0.3)]"
                              : "bg-white text-indigo-600 border border-slate-200/80 group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600 group-hover:shadow-[0_4px_12px_rgba(79,70,229,0.15)]"
                          }`}
                        >
                          <BookOpen
                            size={16}
                            className="transition-transform duration-300 group-hover:scale-110"
                          />
                        </div>

                        {/* Content Wrapper */}
                        <div className="flex flex-col justify-center min-w-0">
                          {/* Top Row: Title & Premium Subject Badge */}
                          <div className="flex items-center gap-2.5 min-w-0">
                            <span
                              className={`font-semibold tracking-tight truncate max-w-[180px] sm:max-w-[260px] md:max-w-[340px] transition-colors duration-200 text-[14px] sm:text-[15px] ${
                                colorMode
                                  ? "text-slate-100 group-hover:text-white"
                                  : "text-slate-800 group-hover:text-indigo-950"
                              }`}
                              title={quiz.title}
                            >
                              {quiz.title}
                            </span>

                            {/* Ultra-Crisp Small Subject Badge */}
                            <span
                              className={`shrink-0 rounded-md px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider transition-all duration-300 border backdrop-blur-sm ${
                                colorMode
                                  ? "bg-slate-800/80 text-slate-300 border-slate-700/60 group-hover:border-indigo-500/30 group-hover:text-indigo-300"
                                  : "bg-slate-50 text-slate-600 border-slate-200 group-hover:bg-indigo-50/50 group-hover:text-indigo-600 group-hover:border-indigo-100"
                              }`}
                            >
                              {quiz.subject || "General"}
                            </span>
                          </div>

                          {/* Bottom Row: Minimalist Metadata */}
                          <div
                            className={`flex items-center gap-3.5 mt-1 text-xs font-medium transition-colors duration-200 ${
                              colorMode
                                ? "text-slate-400/90 group-hover:text-slate-300"
                                : "text-slate-500 group-hover:text-slate-600"
                            }`}
                          >
                            {/* Duration / Timing */}
                            <div className="flex items-center gap-1.5">
                              <Clock3
                                size={13}
                                className={`transition-colors ${colorMode ? "text-slate-500 group-hover:text-indigo-400" : "text-slate-400 group-hover:text-indigo-500"}`}
                              />
                              <span>
                                {quiz.timing.type === "Duration"
                                  ? `${quiz.timing.durationMinutes} mins`
                                  : "Scheduled"}
                              </span>
                            </div>

                            {/* Custom Clean Separator Dot */}
                            <span
                              className={`text-[10px] ${colorMode ? "text-slate-700" : "text-slate-300"}`}
                            >
                              •
                            </span>

                            {/* Submissions Count */}
                            <div className="flex items-center gap-1.5">
                              <Users
                                size={13}
                                className={`transition-colors ${colorMode ? "text-slate-500 group-hover:text-indigo-400" : "text-slate-400 group-hover:text-indigo-500"}`}
                              />
                              <span>
                                {quiz.submitted}{" "}
                                {quiz.submitted === 1 ? "attempt" : "attempts"}
                              </span>
                            </div>

                            {/* Date Display (Sirf tab dikhega jab scheduled ho) */}
                            {quiz.timing.type === "Scheduled" &&
                              quiz.timing.startTime && (
                                <>
                                  <span
                                    className={`text-[10px] ${colorMode ? "text-slate-700" : "text-slate-300"}`}
                                  >
                                    •
                                  </span>
                                  <div className="flex items-center gap-1.5">
                                    <CalendarDays
                                      size={13}
                                      className={`transition-colors ${colorMode ? "text-slate-500 group-hover:text-indigo-400" : "text-slate-400 group-hover:text-indigo-500"}`}
                                    />
                                    <span>
                                      {new Date(
                                        quiz.timing.startTime,
                                      ).toLocaleDateString("en-IN", {
                                        day: "numeric",
                                        month: "short",
                                      })}
                                    </span>
                                  </div>
                                </>
                              )}
                          </div>
                        </div>
                      </div>

                      {/* Right Section: Status Badge (Professional Look) */}
                      <span
                        className={`ml-4 shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold tracking-wide border ${
                          quiz.status === "Active"
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                            : quiz.status === "Scheduled"
                              ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                              : quiz.status === "Draft"
                                ? "bg-sky-500/10 text-sky-400 border-sky-500/20"
                                : colorMode
                                  ? "bg-slate-800 text-slate-400 border-slate-700"
                                  : "bg-slate-100 text-slate-500 border-slate-200"
                        }`}
                      >
                        {quiz.status}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center py-10 rounded-b-2xl">
                    <div
                      className={`flex h-16 w-16 items-center justify-center rounded-2xl ${
                        colorMode
                          ? "bg-slate-800 text-slate-500"
                          : "bg-slate-100 text-slate-400"
                      }`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.8}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 17v-6m6 6V7M5 20h14M4 4h16v12H4V4z"
                        />
                      </svg>
                    </div>

                    <h3
                      className={`mt-5 text-base font-semibold ${
                        colorMode ? "text-slate-200" : "text-slate-800"
                      }`}
                    >
                      No Recent Quizzes
                    </h3>

                    <p
                      className={`mt-2 max-w-xs text-center text-sm ${
                        colorMode ? "text-slate-400" : "text-slate-500"
                      }`}
                    >
                      Your recently created or attempted quizzes will appear
                      here.
                    </p>
                  </div>
                )
              ) : (
                // skeleton list
                <div className="space-y-3">
                  {new Array(4).fill(0).map((_, i) => (
                    <div
                      key={i}
                      className={
                        "flex justify-between items-center p-3 rounded-xl " +
                        (colorMode ? "bg-slate-800" : "bg-slate-50")
                      }
                    >
                      <div className="space-y-2">
                        <div className="w-40 h-3 rounded bg-slate-700/40 animate-pulse" />
                        <div className="w-24 h-2 rounded bg-slate-700/30 animate-pulse" />
                      </div>
                      <div className="w-16 h-6 rounded-full bg-slate-700/30 animate-pulse" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Panel - Quick Actions */}
          <div
            className={
              "rounded-2xl p-5 transition-colors duration-300 " +
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

            <div className="text-sm flex flex-col gap-3">
              <Link
                to="/admin/questionbilder"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button
                  className={
                    "w-full p-3 rounded-xl font-medium transition cursor-pointer " +
                    (colorMode
                      ? "bg-indigo-600 text-white hover:bg-indigo-500"
                      : "bg-indigo-50 text-indigo-700 hover:bg-indigo-100")
                  }
                >
                  Create New Quiz
                </button>
              </Link>

              <Link to="/admin/reports">
                <button
                  className={
                    "w-full p-3 rounded-xl font-medium transition cursor-pointer " +
                    (colorMode
                      ? "bg-slate-800 text-slate-100 hover:bg-slate-700"
                      : "bg-slate-100 hover:bg-slate-200")
                  }
                >
                  Export Reports
                </button>
              </Link>

              <Link to="/admin/manage">
                <button
                  className={
                    "w-full p-3 rounded-xl font-medium transition ring cursor-pointer " +
                    (colorMode
                      ? "bg-rose-700/10 text-rose-300 hover:bg-rose-700/20 border-red-400"
                      : "bg-red-50 text-red-600 hover:bg-red-400")
                  }
                >
                  Close Active Quizzes
                </button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;
