import React, { useContext, useEffect, useState } from "react";
import AdminContext from "../../context/adminContext/adminContext";
import { CalendarDays, Check, Clock3, Copy, Notebook } from "lucide-react";
import SettingWindow from "../adminComp/SettingWindow";

const QuizHistoryCard = ({ quiz, onViewScores }) => {
  const { colorMode } = useContext(AdminContext);
  const isDark = colorMode; // descriptive boolean for easier reading
  const [scoreModalOpen, setScoreModalOpen] = useState(false);

  const [linkCopied, setLinkCopied] = useState(false);
  const quizLink = `${import.meta.env.VITE_QUIZ_REDIRECT_URL}${quiz._id}`;

  useEffect(() => {
    if (!linkCopied) return;
    setTimeout(() => {
      setLinkCopied(false);
    }, 2500);
  }, [linkCopied]);

  async function handleCopy() {
    await navigator.clipboard.writeText(quizLink);
    setLinkCopied(true);
  }

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
        <div className="flex justify-between ">
          {/* Duration Badge */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
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
              <Notebook size={13} />
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
          </div>
          <div>
            <span
              onClick={handleCopy}
              className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium cursor-pointer select-none transition-all duration-150 active:scale-90 
              ${
                linkCopied
                  ? colorMode
                    ? "bg-emerald-500/10 text-emerald-400"
                    : "bg-emerald-50 text-emerald-600"
                  : colorMode
                    ? "bg-indigo-500/10 text-indigo-300 hover:bg-indigo-500/15"
                    : "bg-indigo-50 text-indigo-600 hover:bg-indigo-100"
              }`}
            >
              {linkCopied ? <Check size={13} /> : <Copy size={13} />}
              {linkCopied ? "Copied" : "Copy"}
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between text-[11px]">
          {typeof quiz.attempts === "number" && (
            <span
              className={`font-medium ${isDark ? "text-slate-400" : "text-slate-600"}`}
            >
              {quiz.attempts} attempts
            </span>
          )}
        </div>
      </div>

      {/* Divider and Footer Details */}
      <div
        className={`pt-3 border-t space-y-3 ${isDark ? "border-slate-700/60" : "border-slate-100"}`}
      >
        {/* Action Buttons */}
        <div className="flex items-center justify-between gap-2 pt-0.5">
          {/* <button
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
          </button> */}
          <div className="flex flex-col">
            <span
              className={`text-[10px] uppercase font-semibold ${isDark ? "text-slate-600" : "text-slate-400"}`}
            >
              Created on
            </span>
            <span
              className={`text-xs font-medium ${isDark ? "text-slate-300" : "text-slate-600"}`}
            >
              {formatDate(quiz.createdAt)}
            </span>
          </div>

          <button
            type="button"
            onClick={() => setScoreModalOpen(true)}
            className={`rounded-xl px-3.5 py-2 text-xs font-semibold cursor-pointer transition-all hover:scale-105 ${
              isDark
                ? "bg-indigo-600 text-white hover:bg-indigo-500"
                : "bg-slate-900 text-white hover:bg-slate-800"
            }`}
          >
            View
          </button>
        </div>
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
