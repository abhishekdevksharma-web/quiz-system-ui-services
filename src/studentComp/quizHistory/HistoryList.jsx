import React from "react";
import {
  BookOpen,
  CheckCircle2,
  CircleX,
  Clock3,
  Target,
  ArrowRight,
} from "lucide-react";

function HistoryList({ quiz, colorMode, onViewResult }) {
  const {
    quizMeta,
    answer,
    validatedAnswer,
    submittedInSec,
    obtainMarks,
    quizTotalMarks,
    notAnswered,
    createdAt,
    quizId,
  } = quiz || {};

  const { title, subject } = quizMeta;

  const totalQuestions = answer.length;

  const correctQuestions = validatedAnswer.filter(
    (answer) => answer?.isCorrect === true,
  ).length;

  const skippedQuestions = Number(notAnswered) || 0;

  const wrongQuestions = Math.max(
    totalQuestions - correctQuestions - skippedQuestions,
    0,
  );

  const percentage =
    quizTotalMarks > 0
      ? Math.round(((Number(obtainMarks) || 0) / Number(quizTotalMarks)) * 100)
      : 0;

  return (
    <div
      className={`group rounded-xl border p-3 transition-all duration-200 ${
        colorMode
          ? "border-slate-800/80 bg-[#101a30] hover:border-indigo-500/30 hover:bg-[#121e36]"
          : "border-slate-200 bg-white hover:border-indigo-200 hover:shadow-sm"
      }`}
    >
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        {/* Quiz Info */}
        <div className="flex min-w-0 items-center gap-3">
          <div
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
              colorMode
                ? "bg-indigo-500/10 text-indigo-400"
                : "bg-indigo-50 text-indigo-600"
            }`}
          >
            <BookOpen size={18} strokeWidth={1.8} />
          </div>

          <div className="min-w-0">
            <h3
              className={`truncate text-sm font-semibold ${
                colorMode ? "text-slate-100" : "text-slate-900"
              }`}
            >
              {title || `Quiz ${quizId?.slice(-6) || "Attempt"}`}
            </h3>

            <p
              className={`mt-0.5 text-xs ${
                colorMode ? "text-slate-500" : "text-slate-500"
              }`}
            >
              {subject || "General"} • {formatDate(createdAt)}
            </p>
          </div>
        </div>

        {/* Stats + View */}
        <div className="flex flex-wrap items-center gap-2">
          <Stat
            icon={Target}
            label={`${percentage}%`}
            title="Score"
            type="score"
            colorMode={colorMode}
          />

          <Stat
            icon={CheckCircle2}
            label={correctQuestions}
            title="Correct"
            type="correct"
            colorMode={colorMode}
          />

          <Stat
            icon={CircleX}
            label={wrongQuestions}
            title="Wrong"
            type="wrong"
            colorMode={colorMode}
          />

          <Stat
            icon={Clock3}
            label={formatDuration(submittedInSec)}
            title="Time"
            type="time"
            colorMode={colorMode}
          />

          <button
            type="button"
            onClick={() => onViewResult?.(quiz)}
            className="flex cursor-pointer items-center gap-1.5 rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-indigo-500"
          >
            View
            <ArrowRight size={13} />
          </button>
        </div>
      </div>
    </div>
  );
}

function Stat({ icon: Icon, label, title, type, colorMode }) {
  const colors = {
    score: colorMode
      ? "bg-indigo-500/10 text-indigo-400"
      : "bg-indigo-50 text-indigo-600",

    correct: colorMode
      ? "bg-emerald-500/10 text-emerald-400"
      : "bg-emerald-50 text-emerald-600",

    wrong: colorMode
      ? "bg-rose-500/10 text-rose-400"
      : "bg-rose-50 text-rose-600",

    time: colorMode
      ? "bg-amber-500/10 text-amber-400"
      : "bg-amber-50 text-amber-600",
  };

  return (
    <div
      title={title}
      className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium ${colors[type]}`}
    >
      <Icon size={14} strokeWidth={1.8} />
      <span>{label}</span>
    </div>
  );
}

function formatDuration(seconds) {
  const sec = Number(seconds) || 0;

  if (sec < 60) {
    return `${sec}s`;
  }

  const minutes = Math.floor(sec / 60);
  const remainingSeconds = sec % 60;

  return remainingSeconds ? `${minutes}m ${remainingSeconds}s` : `${minutes}m`;
}

function formatDate(date) {
  if (!date) return "Unknown date";

  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default HistoryList;
