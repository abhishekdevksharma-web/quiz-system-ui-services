import React from "react";
import {
  Trophy,
  Clock3,
  CalendarDays,
  CheckCircle2,
  CircleX,
  HelpCircle,
  Flag,
  Copy,
} from "lucide-react";

function HistoryCard({ quiz, colorMode }) { 

  const {
    quizId,
    student,
    answer,
    validatedAnswer,
    quizDuration,
    submittedInSec,
    obtainMarks,
    quizTotalMarks,
    notAnswered,
    correctAnswers,
    percentage,
    createdAt,
    quizMeta,
  } = quiz || {};

  const { title, subject } = quizMeta;

  const totalQuestions = answer.length;

  const skippedQuestions = Number(notAnswered) || 0;

  const correctQuestions =
    Number(correctAnswers) ||
    validatedAnswer.filter((item) => item.isCorrect === true).length;

  const attemptedQuestions = Math.max(totalQuestions - skippedQuestions, 0);

  const wrongQuestions = Math.max(attemptedQuestions - correctQuestions, 0);

  const resultPercentage =
    Number(percentage) ||
    (quizTotalMarks > 0 ? Math.round((obtainMarks / quizTotalMarks) * 100) : 0);

  const flaggedQuestions = answer.filter(
    (item) => item.flagged === true,
  ).length;

  const formatDate = (date) => {
    if (!date) return "Unknown date";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatTime = (seconds) => {
    const sec = Number(seconds) || 0;

    if (sec < 60) return `${sec}s`;

    const minutes = Math.floor(sec / 60);
    const remaining = sec % 60;

    return remaining ? `${minutes}m ${remaining}s` : `${minutes}m`;
  };

  const getStatus = () => {
    if (resultPercentage >= 80) return "Excellent";
    if (resultPercentage >= 60) return "Good";
    if (resultPercentage >= 40) return "Average";
    return "Needs Practice";
  };

  const status = getStatus();

  return (
    <div
      className={`group relative w-full overflow-hidden rounded-2xl border p-4 transition-all duration-200 ${
        colorMode
          ? "border-[#263650] bg-[#1b293f] hover:border-[#344764]"
          : "border-slate-200 bg-white hover:border-slate-300"
      }`}
    >
      {/* ================= HEADER ================= */}

      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          {/* Subject */}
          <p
            className={`text-[11px] font-medium ${
              colorMode ? "text-indigo-400" : "text-indigo-600"
            }`}
          >
            {subject || "Quiz"}
          </p>

          {/* Title */}
          <h3
            className={`mt-1 truncate text-[14px] font-bold ${
              colorMode ? "text-slate-100" : "text-slate-900"
            }`}
          >
            {title || `Quiz ${quizId?.slice(-6) || "Attempt"}`}
          </h3>

          {/* Student */}
          <p
            className={`mt-1 text-[10px] ${
              colorMode ? "text-slate-500" : "text-slate-400"
            }`}
          >
            {student.name || "Unknown Student"}
          </p>
        </div>

        {/* Status */}
        <span
          className={`shrink-0 rounded-full border px-2.5 py-1 text-[9px] font-medium ${
            resultPercentage >= 60
              ? colorMode
                ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
                : "border-emerald-100 bg-emerald-50 text-emerald-600"
              : colorMode
                ? "border-rose-500/20 bg-rose-500/10 text-rose-400"
                : "border-rose-100 bg-rose-50 text-rose-600"
          }`}
        >
          {status}
        </span>
      </div>

      {/* ================= META ROW ================= */}

      <div className="flex justify-between py-2">
        <MetaPill
          icon={Clock3}
          value={formatTime(submittedInSec)}
          variant="blue"
          colorMode={colorMode}
        />

        <MetaPill
          icon={Trophy}
          value={`${totalQuestions} Qs`}
          variant="violet"
          colorMode={colorMode}
        />

        <MetaPill
          icon={CheckCircle2}
          value={`${correctQuestions} Correct`}
          variant="green"
          colorMode={colorMode}
        />

        <MetaPill
          icon={CircleX}
          value={`${wrongQuestions} Wrong`}
          variant="red"
          colorMode={colorMode}
        />

        <MetaPill
          icon={HelpCircle}
          value={`${skippedQuestions} Skipped`}
          variant="amber"
          colorMode={colorMode}
        />

        {flaggedQuestions > 0 && (
          <MetaPill
            icon={Flag}
            value={`${flaggedQuestions} Flagged`}
            variant="orange"
            colorMode={colorMode}
          />
        )}
      </div>

      {/* ================= SCORE ================= */}

      <div
        className={`mt-4 flex items-center justify-between rounded-xl border px-3 py-2.5 ${
          colorMode
            ? "border-[#263650] bg-[#162338]"
            : "border-slate-100 bg-slate-50"
        }`}
      >
        <div>
          <p
            className={`text-[8px] font-medium uppercase tracking-wider ${
              colorMode ? "text-slate-600" : "text-slate-400"
            }`}
          >
            Score
          </p>

          <div className="mt-0.5 flex items-baseline gap-1">
            <span
              className={`text-[17px] font-bold ${
                colorMode ? "text-slate-100" : "text-slate-900"
              }`}
            >
              {obtainMarks}
            </span>

            <span className="text-[10px] text-slate-500">
              / {quizTotalMarks}
            </span>
          </div>
        </div>

        {/* Percentage */}
        <div className="text-right">
          <p
            className={`text-[8px] font-medium uppercase tracking-wider ${
              colorMode ? "text-slate-600" : "text-slate-400"
            }`}
          >
            Result
          </p>

          <p
            className={`mt-0.5 text-[17px] font-bold ${
              resultPercentage >= 60
                ? colorMode
                  ? "text-emerald-400"
                  : "text-emerald-600"
                : resultPercentage >= 40
                  ? colorMode
                    ? "text-amber-400"
                    : "text-amber-600"
                  : colorMode
                    ? "text-rose-400"
                    : "text-rose-600"
            }`}
          >
            {resultPercentage}%
          </p>
        </div>
      </div>

      {/* ================= FOOTER ================= */}

      <div
        className={`mt-4 flex items-center justify-between border-t pt-3 ${
          colorMode ? "border-[#263650]" : "border-slate-100"
        }`}
      >
        <div className="flex items-center gap-2">
          <CalendarDays
            size={12}
            className={colorMode ? "text-slate-600" : "text-slate-400"}
          />

          <span
            className={`text-[10px] ${
              colorMode ? "text-slate-500" : "text-slate-400"
            }`}
          >
            {formatDate(createdAt)}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Copy Quiz ID */}
          <button
            type="button"
            onClick={() => {
              if (quizId) {
                navigator.clipboard?.writeText(quizId);
              }
            }}
            title="Copy Quiz ID"
            className={`flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg transition-all ${
              colorMode
                ? "bg-[#202f47] text-slate-500 hover:bg-[#293b57] hover:text-slate-300"
                : "bg-slate-50 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
            }`}
          >
            <Copy size={13} />
          </button>

          {/* View */}
          <button
            type="button"
            // onClick={() => onViewResult?.(quiz)}
            className={`cursor-pointer rounded-lg px-4 py-2 text-[10px] font-semibold text-white transition-all ${
              colorMode
                ? "bg-indigo-600 hover:bg-indigo-500"
                : "bg-indigo-600 hover:bg-indigo-500"
            }`}
          >
            View
          </button>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   META PILL
========================================================= */

function MetaPill({ icon: Icon, value, variant, colorMode }) {
  const variants = {
    blue: colorMode
      ? "border-blue-400/20 bg-blue-400/10 text-blue-300"
      : "border-blue-200 bg-blue-50 text-blue-600",

    violet: colorMode
      ? "border-violet-400/20 bg-violet-400/10 text-violet-300"
      : "border-violet-200 bg-violet-50 text-violet-600",

    green: colorMode
      ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-300"
      : "border-emerald-200 bg-emerald-50 text-emerald-600",

    red: colorMode
      ? "border-rose-400/20 bg-rose-400/10 text-rose-300"
      : "border-rose-200 bg-rose-50 text-rose-600",

    amber: colorMode
      ? "border-amber-400/20 bg-amber-400/10 text-amber-300"
      : "border-amber-200 bg-amber-50 text-amber-600",

    orange: colorMode
      ? "border-orange-400/20 bg-orange-400/10 text-orange-300"
      : "border-orange-200 bg-orange-50 text-orange-600",
  };

  return (
    <div
      className={`inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-[9px] font-medium ${variants[variant]}`}
    >
      <Icon size={11} strokeWidth={1.8} />
      <span>{value}</span>
    </div>
  );
}
export default HistoryCard;
