import {
  BarChart3,
  BookOpen,
  CalendarClock,
  CheckCircle2,
  Clock3,
  FileQuestion,
  Timer,
  Users,
  XCircle,
} from "lucide-react";
import React from "react";

function QuizPreview({ quiz, colorMode, loading }) {
  if (loading) {
    return (
      <div
        className={`w-full overflow-hidden rounded-3xl border p-5 shadow-sm ${
          colorMode
            ? "border-slate-800 bg-[#0b1326]"
            : "border-slate-200 bg-white"
        }`}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-1 items-center gap-3">
            <div
              className={`h-11 w-11 animate-pulse rounded-xl ${
                colorMode ? "bg-slate-800" : "bg-slate-200"
              }`}
            />

            <div className="flex-1 space-y-2">
              <div
                className={`h-4 w-32 animate-pulse rounded ${
                  colorMode ? "bg-slate-800" : "bg-slate-200"
                }`}
              />

              <div
                className={`h-3 w-20 animate-pulse rounded ${
                  colorMode ? "bg-slate-800" : "bg-slate-200"
                }`}
              />
            </div>
          </div>

          {/* Status */}
          <div
            className={`h-6 w-16 animate-pulse rounded-full ${
              colorMode ? "bg-slate-800" : "bg-slate-200"
            }`}
          />
        </div>

        {/* Timing */}
        <div
          className={`mt-5 rounded-2xl p-4 ${
            colorMode ? "bg-slate-800/40" : "bg-slate-50"
          }`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`h-9 w-9 animate-pulse rounded-xl ${
                colorMode ? "bg-slate-800" : "bg-slate-200"
              }`}
            />

            <div className="space-y-2">
              <div
                className={`h-3 w-20 animate-pulse rounded ${
                  colorMode ? "bg-slate-800" : "bg-slate-200"
                }`}
              />

              <div
                className={`h-4 w-28 animate-pulse rounded ${
                  colorMode ? "bg-slate-800" : "bg-slate-200"
                }`}
              />
            </div>
          </div>

          <div
            className={`mt-4 h-10 w-full animate-pulse rounded-xl ${
              colorMode ? "bg-slate-800" : "bg-slate-200"
            }`}
          />
        </div>

        {/* Stats */}
        <div className="mt-3 grid grid-cols-2 gap-3">
          {[1, 2].map((item) => (
            <div
              key={item}
              className={`flex items-center gap-3 rounded-2xl border p-3 ${
                colorMode
                  ? "border-slate-800 bg-[#0e172b]"
                  : "border-slate-200 bg-white"
              }`}
            >
              <div
                className={`h-9 w-9 animate-pulse rounded-xl ${
                  colorMode ? "bg-slate-800" : "bg-slate-200"
                }`}
              />

              <div className="space-y-2">
                <div
                  className={`h-2.5 w-14 animate-pulse rounded ${
                    colorMode ? "bg-slate-800" : "bg-slate-200"
                  }`}
                />

                <div
                  className={`h-4 w-8 animate-pulse rounded ${
                    colorMode ? "bg-slate-800" : "bg-slate-200"
                  }`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (Object.keys(quiz).length === 0) {
    return (
      <div
        className={`h-fit w-full rounded-3xl border px-5 py-2 ${
          colorMode
            ? "border-slate-800 bg-slate-900/60"
            : "border-slate-200 bg-white"
        }`}
      >
        {/* Title */}
        <div className="pt-3">
          <h1
            className={`text-base font-bold ${
              colorMode ? "text-slate-100" : "text-slate-800"
            }`}
          >
            Quiz Preview
          </h1>
        </div>

        {/* Empty State */}
        <div className="flex flex-col items-center gap-3 py-8 text-center">
          <div
            className={`flex h-14 w-14 items-center justify-center rounded-2xl ${
              colorMode
                ? "bg-indigo-500/10 text-indigo-400"
                : "bg-indigo-50 text-indigo-600"
            }`}
          >
            <BookOpen size={24} />
          </div>

          <h3
            className={`text-sm font-bold ${
              colorMode ? "text-slate-100" : "text-slate-800"
            }`}
          >
            No Quiz Selected
          </h3>

          <p
            className={`max-w-[220px] text-xs leading-relaxed ${
              colorMode ? "text-slate-500" : "text-slate-400"
            }`}
          >
            Select a quiz from the recent quizzes list to preview its details.
          </p>
        </div>
      </div>
    );
  }
  const isScheduled = quiz.timing?.type === "Scheduled";
  const userTimeLimit = quiz.userTimeLimit || "--";

  const formatDate = (date) => {
    if (!date) return "--";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatTime = (date) => {
    if (!date) return "--";

    return new Date(date).toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatus = () => {
    const currentStatus = quiz.status?.toLowerCase();

    if (currentStatus === "closed") {
      return {
        icon: <XCircle size={12} />,
        className: colorMode
          ? "border-rose-500/20 bg-rose-500/10 text-rose-400"
          : "border-rose-200 bg-rose-50 text-rose-600",
      };
    }

    if (currentStatus === "scheduled") {
      return {
        icon: <CalendarClock size={12} />,
        className: colorMode
          ? "border-violet-500/20 bg-violet-500/10 text-violet-400"
          : "border-violet-200 bg-violet-50 text-violet-600",
      };
    }

    if (currentStatus === "open" || currentStatus === "active") {
      return {
        icon: <CheckCircle2 size={12} />,
        className: colorMode
          ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
          : "border-emerald-200 bg-emerald-50 text-emerald-600",
      };
    }

    return {
      icon: <Clock3 size={12} />,
      className: colorMode
        ? "border-slate-700 bg-slate-800 text-slate-400"
        : "border-slate-200 bg-slate-100 text-slate-500",
    };
  };

  const status = getStatus();

  return (
    <div
      className={`w-full h-fit overflow-hidden rounded-3xl border p-5 shadow-sm transition-all duration-300 ${
        colorMode
          ? "border-slate-800 bg-[#0b1326]"
          : "border-slate-200 bg-white"
      }`}
    >
      {/* =================================================
          HEADER
      ================================================= */}

      <div className="flex items-start justify-between gap-3 px-3">
        {/* Title */}
        <div className="min-w-0">
          <h2
            className={`truncate text-[18px] font-bold ${
              colorMode ? "text-white" : "text-slate-900"
            }`}
          >
            {quiz.title}
          </h2>

          {/* Subject */}
          <div className="mt-1 flex items-center gap-1.5">
            <BookOpen size={13} className="shrink-0 text-indigo-400" />

            <span
              className={`truncate text-sm font-medium ${
                colorMode ? "text-indigo-400" : "text-indigo-600"
              }`}
            >
              {quiz.subject}
            </span>
          </div>
        </div>

        {/* STATUS TAG */}
        <div
          className={`flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1.5 text-[10px] font-bold ${status.className}`}
        >
          {status.icon}
          {quiz.status}
        </div>
      </div>

      {/* =================================================
          TIMING SECTION
      ================================================= */}

      {isScheduled ? (
        /* ---------------- SCHEDULED ---------------- */
        <div
          className={`mt-5 rounded-2xl border p-4 ${
            colorMode
              ? "border-violet-500/10 bg-[#12172d]"
              : "border-violet-100 bg-violet-50/50"
          }`}
        >
          {/* Heading */}
          <div className="flex items-center gap-2.5">
            <div
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
                colorMode
                  ? "bg-violet-500/10 text-violet-400"
                  : "bg-violet-100 text-violet-600"
              }`}
            >
              <CalendarClock size={18} />
            </div>

            <div>
              <p
                className={`text-[10px] font-semibold uppercase tracking-wider ${
                  colorMode ? "text-slate-500" : "text-slate-400"
                }`}
              >
                Quiz Schedule
              </p>

              <p
                className={`text-sm font-bold ${
                  colorMode ? "text-slate-100" : "text-slate-800"
                }`}
              >
                Scheduled Quiz
              </p>
            </div>
          </div>

          {/* Start / End */}
          <div
            className={`mt-4 grid grid-cols-[1fr_auto_1fr] items-center gap-3 border-t pt-3.5 ${
              colorMode ? "border-slate-800" : "border-violet-100"
            }`}
          >
            {/* START */}
            <div>
              <p
                className={`text-[9px] font-semibold uppercase tracking-wider ${
                  colorMode ? "text-slate-500" : "text-slate-400"
                }`}
              >
                Starts
              </p>

              <p
                className={`mt-1 text-sm font-bold ${
                  colorMode ? "text-violet-300" : "text-violet-700"
                }`}
              >
                {formatTime(quiz.timing?.startTime)}
              </p>

              <p
                className={`mt-0.5 text-[9px] ${
                  colorMode ? "text-slate-500" : "text-slate-400"
                }`}
              >
                {formatDate(quiz.timing?.startTime)}
              </p>
            </div>

            {/* CONNECTOR */}
            <div className="flex items-center">
              <div
                className={`h-1.5 w-1.5 rounded-full ${
                  colorMode ? "bg-violet-400" : "bg-violet-500"
                }`}
              />

              <div
                className={`h-px w-7 ${
                  colorMode ? "bg-violet-500/30" : "bg-violet-200"
                }`}
              />

              <div
                className={`h-1.5 w-1.5 rounded-full ${
                  colorMode ? "bg-violet-400" : "bg-violet-500"
                }`}
              />
            </div>

            {/* END */}
            <div className="text-right">
              <p
                className={`text-[9px] font-semibold uppercase tracking-wider ${
                  colorMode ? "text-slate-500" : "text-slate-400"
                }`}
              >
                Ends
              </p>

              <p
                className={`mt-1 text-sm font-bold ${
                  colorMode ? "text-violet-300" : "text-violet-700"
                }`}
              >
                {formatTime(quiz.timing?.endTime)}
              </p>

              <p
                className={`mt-0.5 text-[9px] ${
                  colorMode ? "text-slate-500" : "text-slate-400"
                }`}
              >
                {formatDate(quiz.timing?.endTime)}
              </p>
            </div>
          </div>

          {/* Per User Limit */}
          {
            <div
              className={`mt-3 flex items-center justify-between rounded-xl px-3 py-2 ${
                colorMode ? "bg-cyan-500/5" : "bg-cyan-50"
              }`}
            >
              <div className="flex items-center gap-2">
                <Timer
                  size={14}
                  className={colorMode ? "text-cyan-400" : "text-cyan-600"}
                />

                <span
                  className={`text-[10px] font-medium ${
                    colorMode ? "text-slate-400" : "text-slate-500"
                  }`}
                >
                  Per-user time limit
                </span>
              </div>

              <span
                className={`text-xs font-bold ${
                  colorMode ? "text-cyan-400" : "text-cyan-600"
                }`}
              >
                {userTimeLimit} min
              </span>
            </div>
          }
        </div>
      ) : (
        /* ---------------- DURATION ---------------- */
        <div
          className={`mt-5 rounded-2xl border p-4 ${
            colorMode
              ? "border-cyan-500/10 bg-[#111c31]"
              : "border-cyan-100 bg-cyan-50/40"
          }`}
        >
          <div className="flex items-center justify-between gap-4">
            {/* LEFT */}
            <div className="flex min-w-0 items-center gap-2.5">
              <div
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
                  colorMode
                    ? "bg-cyan-500/10 text-cyan-400"
                    : "bg-cyan-100 text-cyan-600"
                }`}
              >
                <Clock3 size={18} />
              </div>

              <div className="min-w-0">
                <p
                  className={`text-[10px] font-semibold uppercase tracking-wider ${
                    colorMode ? "text-slate-500" : "text-slate-400"
                  }`}
                >
                  Quiz Duration
                </p>

                <p
                  className={`truncate text-sm font-bold ${
                    colorMode ? "text-slate-100" : "text-slate-800"
                  }`}
                >
                  Auto Close
                </p>
              </div>
            </div>

            {/* QUIZ DURATION */}
            <div className="text-right">
              <span
                className={`text-2xl font-bold ${
                  colorMode ? "text-cyan-400" : "text-cyan-600"
                }`}
              >
                {quiz.timing?.durationMinutes ?? 0}
              </span>

              <span
                className={`ml-1 text-xs ${
                  colorMode ? "text-slate-500" : "text-slate-400"
                }`}
              >
                min
              </span>
            </div>
          </div>

          {/* PER USER LIMIT */}
          {userTimeLimit != null && (
            <div
              className={`mt-3 flex items-center justify-between border-t pt-3 ${
                colorMode ? "border-slate-800" : "border-cyan-100"
              }`}
            >
              <div className="flex items-center gap-2">
                <Timer
                  size={14}
                  className={colorMode ? "text-amber-400" : "text-amber-600"}
                />

                <span
                  className={`text-[10px] font-medium ${
                    colorMode ? "text-slate-400" : "text-slate-500"
                  }`}
                >
                  Per-user time limit
                </span>
              </div>

              <span
                className={`text-xs font-bold ${
                  colorMode ? "text-amber-400" : "text-amber-600"
                }`}
              >
                {userTimeLimit} min
              </span>
            </div>
          )}
        </div>
      )}

      {/* =================================================
          STATS
      ================================================= */}

      <div className="mt-3 grid grid-cols-2 gap-3">
        {/* QUESTIONS */}
        <div
          className={`flex items-center gap-3 rounded-2xl border p-3 ${
            colorMode
              ? "border-slate-800 bg-[#0e172b]"
              : "border-slate-200 bg-white"
          }`}
        >
          <div
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
              colorMode
                ? "bg-blue-500/10 text-blue-400"
                : "bg-blue-50 text-blue-600"
            }`}
          >
            <FileQuestion size={17} />
          </div>

          <div>
            <p
              className={`text-[10px] ${
                colorMode ? "text-slate-500" : "text-slate-400"
              }`}
            >
              Questions
            </p>

            <p
              className={`text-sm font-bold ${
                colorMode ? "text-slate-200" : "text-slate-800"
              }`}
            >
              {quiz.totalQuestions ?? 0}
            </p>
          </div>
        </div>

        {/* ATTEMPTS */}
        <div
          className={`flex items-center gap-3 rounded-2xl border p-3 ${
            colorMode
              ? "border-slate-800 bg-[#0e172b]"
              : "border-slate-200 bg-white"
          }`}
        >
          <div
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
              colorMode
                ? "bg-purple-500/10 text-purple-400"
                : "bg-purple-50 text-purple-600"
            }`}
          >
            <Users size={17} />
          </div>

          <div>
            <p
              className={`text-[10px] ${
                colorMode ? "text-slate-500" : "text-slate-400"
              }`}
            >
              Attempts
            </p>

            <p
              className={`text-sm font-bold ${
                colorMode ? "text-slate-200" : "text-slate-800"
              }`}
            >
              {quiz.submitted ?? 0}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuizPreview;
