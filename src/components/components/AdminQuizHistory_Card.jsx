import React, { useContext, useState } from "react";
import AdminContext from "../../context/adminContext/adminContext"; 
import { CalendarDays, Clock3 } from "lucide-react"; 
import SettingWindow from "../adminComp/SettingWindow";

const QuizHistoryCard = ({ quiz, onViewScores }) => {
  const { colorMode } = useContext(AdminContext);
  const isDark = colorMode; // descriptive boolean for easier reading
  const [scoreModalOpen, setScoreModalOpen] = useState(false);
  const canViewScores = quiz.status === "Closed" && quiz.scoresGenerated;
 

  const formatDate = (dateString) => {
    if (!dateString) return "Date not available";
    const d = new Date(dateString);
    if (Number.isNaN(d.getTime())) return "Invalid date";
    return d.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatSchedule = (startTime, endTime) => {
    if (!startTime || !endTime) return "--";

    const date = new Date(startTime).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
    });

    const start = new Date(startTime).toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    const end = new Date(endTime).toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    return `${date} • ${start} - ${end}`;
  };

  // Modernized dynamic status pill styling
  const getStatusStyles = (status) => {
    switch (status) {
      case "Open":
        return isDark
          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
          : "bg-emerald-50 text-emerald-700 border-emerald-200";

      case "Closed":
        return isDark
          ? "bg-rose-500/10 text-rose-400 border-rose-500/20"
          : "bg-rose-50 text-rose-700 border-rose-200";

      case "Scheduled":
        return isDark
          ? "bg-sky-500/10 text-sky-400 border-sky-500/20"
          : "bg-sky-50 text-sky-700 border-sky-200";

      case "Draft":
        return isDark
          ? "bg-slate-700/50 text-slate-300 border-slate-600"
          : "bg-slate-50 text-slate-600 border-slate-200";

      case "Paused":
        return isDark
          ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
          : "bg-amber-50 text-amber-700 border-amber-200";

      default:
        return isDark
          ? "bg-slate-700/50 text-slate-300 border-slate-600"
          : "bg-slate-50 text-slate-600 border-slate-200";
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  return (
    <article
      className={`group rounded-2xl border p-5 flex flex-col justify-between gap-4 transition-all duration-300 hover:shadow-md ${
        isDark
          ? "bg-slate-800/90 border-slate-700/80 shadow-slate-950/20"
          : "bg-white border-slate-200 shadow-slate-100/80"
      }`}
    >
      {/* Upper Content wrapper */}
      <div className="space-y-3.5">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <span
              className={`text-[11px] font-semibold tracking-wider uppercase ${
                isDark ? "text-indigo-400" : "text-indigo-600"
              }`}
            >
              {quiz.subject}
            </span>
            <h3
              className={`text-base font-bold leading-snug transition-colors ${
                isDark ? "text-slate-100" : "text-slate-900"
              }`}
            >
              {quiz.title}
            </h3>
          </div>

          {/* Status pill */}
          <span
            className={`shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-semibold tracking-wide border transition-colors ${getStatusStyles(
              quiz.status,
            )}`}
          >
            {quiz.status || "Unknown"}
          </span>
        </div>

        {/* Metadata Badges Row */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          {/* Duration Badge */}
          <span
            className={`inline-flex items-center gap-1 rounded-md px-2 py-1 font-medium ${
              isDark
                ? "bg-slate-700/60 text-slate-200"
                : "bg-slate-100 text-slate-700"
            }`}
          >
            {quiz.timing.type === "Duration" ? (
              <Clock3 size={13} />
            ) : (
              <CalendarDays size={13} />
            )}
            {quiz.timing?.type === "Scheduled"
              ? formatSchedule(quiz.timing.startTime, quiz.timing.endTime)
              : `${quiz.timing?.durationMinutes ?? "--"} mins`}
          </span>

          {/* Questions Badge */}
          <span
            className={`inline-flex items-center gap-1 rounded-md px-2 py-1 font-medium ${
              isDark
                ? "bg-slate-700/60 text-slate-200"
                : "bg-slate-100 text-slate-700"
            }`}
          >
            <svg
              className="w-3.5 h-3.5 opacity-70"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            {quiz.totalQuestions} Qs
          </span>

          {/* Difficulty Badge */}
          <span
            className={`rounded-md px-2 py-1 font-medium tracking-wide border ${
              isDark
                ? "bg-slate-800 text-slate-300 border-slate-700"
                : "bg-white text-slate-600 border-slate-200"
            }`}
          >
            {quiz.difficulty}
          </span>

          {/* Optional Tag Badge */}
          {quiz.tag && (
            <span
              className={`rounded-md px-2 py-1 font-medium ${
                isDark
                  ? "bg-indigo-950/50 text-indigo-300 border border-indigo-900/50"
                  : "bg-indigo-50 text-indigo-700"
              }`}
            >
              #{quiz.tag}
            </span>
          )}
        </div>
      </div>

      {/* Divider and Footer Details */}
      <div
        className={`pt-3 border-t space-y-3 ${isDark ? "border-slate-700/60" : "border-slate-100"}`}
      >
        <div className="flex items-center justify-between text-[11px]">
          <span
            className={`inline-flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-[11px] font-medium ${
              isDark
                ? "bg-slate-700/50 text-slate-300"
                : "bg-slate-100 text-slate-600"
            }`}
          >
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>

            <span>{formatDate(quiz.createdAt)}</span>
          </span>

          {typeof quiz.attempts === "number" && (
            <span
              className={`font-medium ${isDark ? "text-slate-400" : "text-slate-600"}`}
            >
              {quiz.attempts} attempts
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between gap-2 pt-0.5">
          <button
            type="button"
            className={`text-xs font-semibold tracking-wide transition-colors focus:outline-none cursor-pointer ${
              isDark
                ? "text-slate-300 hover:text-indigo-400"
                : "text-slate-600 hover:text-indigo-600"
            }`}
            onClick={() => {
              setSelectedQuiz(quiz);
              setIsModalOpen(true);
            }}
          >
            View
          </button>
          {/* <QuizDetailsModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            quiz={quiz}
            colorMode={colorMode}
          /> */}
          {quiz.scoresGenerated && (
            <div
              className={`rounded-lg px-3 py-2 text-[11px] border ${
                isDark
                  ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                  : "bg-emerald-50 text-emerald-700 border-emerald-200"
              }`}
            >
              Score generated successfully
            </div>
          )}

          {true ? (
            <button
              type="button"
              onClick={() => setScoreModalOpen(true)}
              className={`rounded-xl px-3.5 py-2 text-xs font-semibold cursor-pointer transition-all hover:scale-105 ${
                isDark
                  ? "bg-indigo-600 text-white hover:bg-indigo-500"
                  : "bg-slate-900 text-white hover:bg-slate-800"
              }`}
            >
              View Scores
            </button>
          ) : (
            <span
              className={`rounded-xl px-3.5 py-2 text-xs font-medium ${
                isDark
                  ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                  : "bg-amber-50 text-amber-700 border border-amber-200"
              }`}
            >
              {quiz.status === "Open"
                ? "Quiz Live"
                : quiz.status === "Scheduled"
                  ? "Not Started"
                  : quiz.status === "Draft"
                    ? "Draft Mode"
                    : quiz.status === "Paused"
                      ? "Quiz Paused"
                      : "Scores Pending"}
            </span>
          )}
        </div>
        {!canViewScores && (
          <div
            className={`rounded-lg px-3 py-2 text-[11px] ${
              quiz.scoreStatus === "failed"
                ? isDark
                  ? "bg-red-500/10 text-red-400 border border-red-500/20"
                  : "bg-red-50 text-red-700 border border-red-200"
                : isDark
                  ? "bg-slate-700/30 text-slate-300"
                  : "bg-slate-50 text-slate-600"
            }`}
          >
            {quiz.status === "Open" &&
              "Scores will be available after the quiz is closed."}

            {quiz.status === "Scheduled" && "Quiz has not started yet."}

            {quiz.status === "Draft" && "This quiz is currently in draft mode."}

            {quiz.status === "Paused" && "Quiz is temporarily paused."}

            {quiz.status === "Closed" &&
              !quiz.scoresGenerated &&
              quiz.scoreStatus !== "failed" &&
              "Scores are being generated."}

            {quiz.scoreStatus === "failed" &&
              "Score report could not be generated due to a system issue. Please try again later."}
          </div>
        )}
        {/* <QuizScoresModal
          quiz={quiz}
          open={scoreModalOpen}
          onClose={() => setScoreModalOpen(false)}
          colorMode={colorMode}
        /> */}
        <SettingWindow
          quiz={quiz}
          open={scoreModalOpen}
          onClose={() => setScoreModalOpen(false)}
          colorMode={colorMode}
        />
      </div>
    </article>
  );
};

export default QuizHistoryCard;
