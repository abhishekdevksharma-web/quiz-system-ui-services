import { useContext, useEffect, useState } from "react";
import {
  Clock,
  Layers,
  Hash,
  ArrowRight,
  Target,
  AlertCircle,
  CalendarDays,
} from "lucide-react";

import { useNavigate, useParams } from "react-router-dom"; 

const QuizCardModal = ({ quizData, loading, handleStartQuiz }) => {

  const navigate = useNavigate();

  const formatDate = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const formatTime = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleTimeString("en-IN", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  // ================= DIFFICULTY =================
  const difficultyStyle = {
    Easy: "bg-emerald-500/20 text-emerald-400",
    Medium: "bg-yellow-500/20 text-yellow-400",
    Hard: "bg-red-500/20 text-red-400",
  };

  async function handleStartQuiz() {
    navigate(`/student/start-quiz/${quizData.quiz._id}`, { replace: true });
  }

  return (
    <div className="group relative w-full max-w-md">
      {/* Glow */}
      <div className="absolute -inset-2 rounded-3xl blur-2xl opacity-20 bg-linear-to-r from-indigo-600 to-purple-600"></div>

      {/* Card */}
      <div
        className={`relative rounded-3xl border border-slate-800 bg-linear-to-b from-slate-900 to-slate-950 
        shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)]
        transition-all duration-500 ease-in-out
        
        ${loading ? "p-6 scale-90" : "p-9 scale-100"}`}
      >
        {/* ================= LOADING ================= */}
        {loading ? (
          <div className="flex flex-col items-center justify-center h-[250px] gap-4">
            <div className="w-12 h-12 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin"></div>
            <p className="text-sm text-slate-400 font-semibold">
              Loading Quiz...
            </p>
          </div>
        ) : (
          <>
            {/* ================= NOT FOUND ================= */}
            {!quizData.success && (
              <div className="flex flex-col items-center justify-center h-[260px] gap-4 text-center">
                <div className="h-14 w-14 rounded-full bg-red-500/10 flex items-center justify-center">
                  <AlertCircle className="text-red-400" size={28} />
                </div>

                <h3 className="text-xl font-extrabold text-white">
                  Quiz Not Found
                </h3>

                <p className="text-sm text-slate-400 max-w-xs">
                  The quiz you are looking for doesn’t exist or may have been
                  removed.
                </p>

                <button
                  onClick={() => window.location.reload()}
                  className="mt-2 px-4 py-2 rounded-lg bg-red-500/20 text-red-300 text-sm font-bold hover:bg-red-500/30 transition"
                >
                  Retry
                </button>
              </div>
            )}

            {/* ================= DATA ================= */}
            {!loading && quizData.success && (
              <>
                {/* Top Meta */}
                <div className="flex items-center justify-between mb-7">
                  <div className="flex items-center gap-2 px-3.5 py-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-xs font-bold">
                    <Clock size={14} />

                    {quizData.quiz.timing.type === "Duration"
                      ? `${quizData.quiz.timing.durationMinutes} Min`
                      : `Starts ${formatTime(quizData.quiz.timing.startTime)}`}
                  </div>

                  <span
                    className={`px-3 py-1.5 rounded-full text-xs font-bold ${
                      quizData.quiz.status === "Open"
                        ? "bg-emerald-500/15 text-emerald-400"
                        : quizData.quiz.status === "Scheduled"
                          ? "bg-indigo-500/15 text-indigo-300"
                          : "bg-slate-700/70 text-slate-400"
                    }`}
                  >
                    {quizData.quiz.status}
                  </span>
                </div>

                {/* Quiz Identity */}
                <div className="mb-7">
                  <div className="flex items-center gap-2 mb-3">
                    <Target size={16} className="text-indigo-400" />

                    <span className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-400">
                      {quizData.quiz.subject}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight mb-4">
                    {quizData.quiz.title}
                  </h3>

                  <span
                    className={`inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-bold ${
                      difficultyStyle[quizData.quiz.difficulty]
                    }`}
                  >
                    {quizData.quiz.difficulty}
                  </span>
                </div>

                {/* Quiz Stats */}
                <div className="grid grid-cols-2 gap-4 mb-7">
                  {/* Questions */}
                  <div className="rounded-2xl bg-slate-800/50 p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Layers size={18} className="text-purple-400" />

                      <span className="text-xs font-semibold text-slate-400">
                        Questions
                      </span>
                    </div>

                    <p className="text-xl font-extrabold text-white">
                      {quizData.quiz.totalQuestions}
                    </p>
                  </div>

                  {/* Duration */}
                  <div className="rounded-2xl bg-slate-800/50 p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Clock size={18} className="text-indigo-400" />

                      <span className="text-xs font-semibold text-slate-400">
                        Duration
                      </span>
                    </div>

                    <p className="text-xl font-extrabold text-white">
                      {quizData.quiz.timing.type === "Duration"
                        ? `${quizData.quiz.timing.durationMinutes} min`
                        : "Scheduled"}
                    </p>
                  </div>
                </div>

                {/* Scheduled Quiz */}
                {quizData.quiz.timing.type === "Scheduled" && (
                  <div className="mb-7 rounded-2xl  bg-slate-800/50 p-5">
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <p className="text-[11px] uppercase tracking-wider text-slate-500 mb-1">
                          Starts
                        </p>

                        <p className="text-sm font-bold text-white">
                          {formatDate(quizData.quiz.timing.startTime)}
                        </p>

                        <p className="text-sm text-indigo-300 mt-0.5">
                          {formatTime(quizData.quiz.timing.startTime)}
                        </p>
                      </div>

                      <div>
                        <p className="text-[11px] uppercase tracking-wider text-slate-500 mb-1">
                          Ends
                        </p>

                        <p className="text-sm font-bold text-white">
                          {formatDate(quizData.quiz.timing.endTime)}
                        </p>

                        <p className="text-sm text-indigo-300 mt-0.5">
                          {formatTime(quizData.quiz.timing.endTime)}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Footer */}
                <div className="flex items-center justify-between gap-4 pt-2">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-linear-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-400/20 flex items-center justify-center">
                      <CalendarDays size={17} className="text-indigo-400" />
                    </div>

                    <div>
                      <p className="text-[11px] uppercase tracking-wider font-semibold text-slate-500">
                        Added On
                      </p>

                      <p className="text-sm font-bold text-indigo-200">
                        {new Date(quizData.quiz.createdAt).toLocaleDateString(
                          "en-IN",
                          {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          },
                        )}
                      </p>
                    </div>
                  </div>

                  {/* CTA */}
                  <button
                    disabled={quizData.quiz.status !== "Open"}
                    onClick={handleStartQuiz}
                    className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm transition-all ${
                      quizData.quiz.status === "Open"
                        ? "bg-linear-to-r from-indigo-600 to-purple-600 text-white hover:scale-[1.02] hover:shadow-lg hover:shadow-indigo-500/20 cursor-pointer"
                        : "bg-slate-700 text-slate-400 cursor-not-allowed"
                    }`}
                  >
                    {quizData.quiz.status === "Open"
                      ? "Start Quiz"
                      : quizData.quiz.status === "Scheduled"
                        ? "Not Started"
                        : "Quiz Closed"}

                    {quizData.quiz.status === "Open" && (
                      <ArrowRight size={16} />
                    )}
                  </button>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default QuizCardModal;
