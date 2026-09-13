import React from "react";
import {
  X,
  BookOpen,
  BarChart3,
  ListTodo,
  CheckCircle2,
  Sparkles,
  CalendarDays,
  Timer,
  XCircle,
  CircleMinus,
  Award,
} from "lucide-react";

const ResultModal = ({ open, data, onClose }) => {
  const {
    title,
    subject,
    totalQuestions,
    attemptedQuestions,
    totalMarks,
    obtainedMarks,
    submittedAt,
    submittedIn,
    correctAnswers,
    wrongAnswers,
    notAnswered,
  } = data;

  if (!open) return null;
  const hasResultData =
    totalQuestions > 0 ||
    totalMarks > 0 ||
    obtainedMarks > 0 ||
    attemptedQuestions > 0;

  const percentage = totalMarks > 0 ? (obtainedMarks / totalMarks) * 100 : 0;

  const getGrade = () => {
    const score = totalMarks > 0 ? obtainedMarks / totalMarks : 0;

    if (score >= 0.9) return "A+";
    if (score >= 0.8) return "A";
    if (score >= 0.7) return "B+";
    if (score >= 0.6) return "B";
    if (score >= 0.5) return "C";
    if (score >= 0.4) return "D";
    return "F";
  };

  const grade = getGrade();
  const passed = percentage >= 40;

  const formattedDate = new Date(submittedAt).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const formatSubmittedTime = (seconds) => {
    if (seconds < 60) {
      return `${seconds} sec`;
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return remainingSeconds
      ? `${minutes}m ${remainingSeconds}s`
      : `${minutes}m`;
  };

  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center bg-slate-950/5 p-3 backdrop-blur-sm dark:bg-black/75">
      {!hasResultData ? (
        <div className="flex flex-col items-center justify-center px-5 py-10 text-center border border-white/20 rounded-3xl ">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-400 dark:bg-slate-900 dark:text-slate-500">
            <BarChart3 size={28} strokeWidth={1.7} />
          </div>

          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            Result Not Available
          </h3>

          <p className="mt-1.5 max-w-[280px] text-xs leading-5 text-slate-500 dark:text-slate-400">
            We couldn't find any result data for this quiz. Your result details
            will appear here once the quiz has been evaluated.
          </p>

          <button
            type="button"
            onClick={onClose}
            className="mt-5 rounded-xl bg-slate-900 px-5 py-2.5 text-xs font-semibold text-white transition-all hover:bg-slate-800 active:scale-[0.98] dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
          >
            Close
          </button>
        </div>
      ) : (
        <>
          <div
            role="dialog"
            aria-modal="true"
            className="relative w-full max-w-[430px] overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_25px_70px_-20px_rgba(15,23,42,0.35)] animate-in zoom-in-95 fade-in duration-200 dark:border-slate-800 dark:bg-slate-950"
          >
            {/* ================= HEADER ================= */}

            <div className="relative border-b border-slate-100 px-5 py-4 dark:border-slate-800">
              <div className="flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <h2 className="truncate text-[17px] font-bold tracking-tight text-slate-900 dark:text-white">
                    {title}
                  </h2>

                  <div className="mt-1 flex items-center gap-1.5">
                    <BookOpen
                      size={12}
                      strokeWidth={2}
                      className="text-slate-400"
                    />

                    <span className="truncate text-[11px] font-medium text-slate-500 dark:text-slate-400">
                      {subject}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-400 transition-all hover:border-slate-300 hover:bg-slate-50 hover:text-slate-700 active:scale-95 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700 dark:hover:bg-slate-800 dark:hover:text-white"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* ================= CONTENT ================= */}

            <div className="space-y-3.5 p-4">
              {/* ================= SCORE ================= */}

              <div className="relative overflow-hidden rounded-2xl border border-indigo-400/20 bg-[#11183D] p-4 text-white shadow-xl shadow-indigo-950/30 dark:border-slate-700 dark:bg-slate-900 dark:shadow-none">
                {/* Colorful Ambient Lights */}
                <div className="pointer-events-none absolute -right-10 -top-12 h-32 w-32 rounded-full bg-fuchsia-500/20 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-12 -left-10 h-32 w-32 rounded-full bg-cyan-400/20 blur-3xl" />
                <div className="pointer-events-none absolute right-1/3 top-1/2 h-24 w-24 rounded-full bg-violet-500/10 blur-3xl" />

                <div className="relative">
                  {/* Header */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <div className="mb-1 flex items-center gap-1.5">
                        <div className="flex h-5 w-5 items-center justify-center rounded-md bg-amber-400/10 ring-1 ring-amber-300/20">
                          <Sparkles size={12} className="text-amber-300" />
                        </div>

                        <p className="text-[11px] font-semibold text-indigo-100">
                          Your Score
                        </p>
                      </div>

                      {/* Score */}
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-[2.4rem] font-extrabold leading-none tracking-tight text-white">
                          {obtainedMarks}
                        </span>

                        <span className="text-sm font-medium text-indigo-300">
                          / {totalMarks}
                        </span>
                      </div>
                    </div>

                    {/* Score Circle */}
                    <div className="relative flex h-[76px] w-[76px] shrink-0 items-center justify-center rounded-full bg-slate-950/30 ring-1 ring-white/10">
                      <svg
                        className="absolute inset-0 h-full w-full -rotate-90"
                        viewBox="0 0 76 76"
                      >
                        {/* Track */}
                        <circle
                          cx="38"
                          cy="38"
                          r="33"
                          fill="none"
                          stroke="rgba(255,255,255,0.08)"
                          strokeWidth="5"
                        />

                        {/* Progress */}
                        <circle
                          cx="38"
                          cy="38"
                          r="33"
                          fill="none"
                          stroke="#818cf8"
                          strokeWidth="5"
                          strokeLinecap="round"
                          strokeDasharray={2 * Math.PI * 33}
                          strokeDashoffset={
                            2 * Math.PI * 33 -
                            (2 * Math.PI * 33 * Math.min(percentage, 100)) / 100
                          }
                          className="transition-all duration-1000 ease-out"
                          style={{
                            filter:
                              "drop-shadow(0 0 3px rgba(129,140,248,0.5))",
                          }}
                        />
                      </svg>

                      {/* Content */}
                      <div className="relative flex flex-col items-center">
                        <span className="text-lg font-extrabold leading-none text-white">
                          {percentage.toFixed(0)}
                          <span className="text-[10px] text-indigo-300">%</span>
                        </span>

                        <span className="mt-1 text-[8px] font-semibold uppercase tracking-wider text-slate-400">
                          Percent
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Result Details */}
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    {/* Result */}
                    <div
                      className={`flex items-center justify-between rounded-xl border px-3 py-2 ${
                        passed
                          ? "border-emerald-400/20 bg-emerald-400/8"
                          : "border-rose-400/20 bg-rose-400/8"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className={`flex h-7 w-7 items-center justify-center rounded-lg ${
                            passed
                              ? "bg-emerald-400/10 text-emerald-400"
                              : "bg-rose-400/10 text-rose-400"
                          }`}
                        >
                          <CheckCircle2 size={14} />
                        </div>

                        <div>
                          <p className="text-[9px] font-medium text-slate-400">
                            Result
                          </p>

                          <p
                            className={`text-[11px] font-bold ${
                              passed ? "text-emerald-400" : "text-rose-400"
                            }`}
                          >
                            {passed ? "Passed" : "Failed"}
                          </p>
                        </div>
                      </div>

                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          passed
                            ? "bg-emerald-400 shadow-[0_0_7px_rgba(52,211,153,0.8)]"
                            : "bg-rose-400 shadow-[0_0_7px_rgba(251,113,133,0.8)]"
                        }`}
                      />
                    </div>

                    {/* Grade */}
                    <div className="flex items-center justify-between rounded-xl border border-violet-400/20 bg-violet-400/[0.07] px-3 py-2">
                      <div className="flex items-center gap-2">
                        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-violet-400/10 ring-1 ring-violet-300/10">
                          <span className="text-xs font-extrabold text-violet-300">
                            A
                          </span>
                        </div>

                        <div>
                          <p className="text-[9px] font-medium text-slate-400">
                            Grade
                          </p>

                          <p className="text-sm font-extrabold leading-none text-white">
                            {grade}
                          </p>
                        </div>
                      </div>

                      <Award size={14} className="text-violet-400" />
                    </div>
                  </div>
                </div>
              </div>

              {/* ================= STATS ================= */}

              <div className="grid grid-cols-4 gap-2.5">
                {/* Questions */}
                <div className="flex flex-col items-center gap-2.5 rounded-xl border border-blue-100 bg-blue-50/70 p-2.5 dark:border-blue-500/10 dark:bg-blue-500/[0.07]">
                  <p className="truncate text-[10px] font-medium text-slate-500 dark:text-slate-400">
                    Questions
                  </p>

                  <div className="min-w-0 flex items-center gap-2">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-500/15 dark:text-blue-400">
                      <ListTodo size={15} />
                    </div>

                    <p className="mt-0.5 text-lg font-bold leading-none text-slate-900 dark:text-white">
                      {totalQuestions}
                    </p>
                  </div>
                </div>

                {/* Correct */}
                <div className="flex flex-col items-center gap-2.5 rounded-xl border border-emerald-100 bg-emerald-50/70 p-2.5 dark:border-emerald-500/10 dark:bg-emerald-500/[0.07]">
                  <p className="truncate text-[10px] font-medium text-slate-500 dark:text-slate-400">
                    Correct
                  </p>

                  <div className="min-w-0 flex items-center gap-2">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-400">
                      <CheckCircle2 size={15} />
                    </div>

                    <p className="mt-0.5 text-lg font-bold leading-none text-emerald-600 dark:text-emerald-400">
                      {correctAnswers}
                    </p>
                  </div>
                </div>

                {/* Wrong */}
                <div className="flex flex-col items-center gap-2.5 rounded-xl border border-red-100 bg-red-50/70 p-2.5 dark:border-red-500/10 dark:bg-red-500/[0.07]">
                  <p className="truncate text-[10px] font-medium text-slate-500 dark:text-slate-400">
                    Wrong
                  </p>

                  <div className="min-w-0 flex items-center gap-2">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-600 dark:bg-red-500/15 dark:text-red-400">
                      <XCircle size={15} />
                    </div>

                    <p className="mt-0.5 text-lg font-bold leading-none text-red-600 dark:text-red-400">
                      {wrongAnswers}
                    </p>
                  </div>
                </div>

                {/* Not Answered */}
                <div className="flex flex-col items-center gap-2.5 rounded-xl border border-amber-100 bg-amber-50/70 p-2.5 dark:border-amber-500/10 dark:bg-amber-500/[0.07]">
                  <p className="truncate text-[10px] font-medium text-slate-500 dark:text-slate-400">
                    Not Answered
                  </p>

                  <div className="min-w-0 flex items-center gap-2">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-amber-600 dark:bg-amber-500/15 dark:text-amber-400">
                      <CircleMinus size={15} />
                    </div>

                    <p className="mt-0.5 text-lg font-bold leading-none text-amber-600 dark:text-amber-400">
                      {notAnswered}
                    </p>
                  </div>
                </div>
              </div>

              {/* ================= SUBMISSION INFO ================= */}

              <div className="grid grid-cols-2 gap-2.5">
                {/* Submitted Date */}

                <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50/70 px-3 py-2.5 dark:border-slate-800 dark:bg-slate-900/50">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400">
                    <CalendarDays size={15} />
                  </div>

                  <div className="min-w-0">
                    <p className="text-[10px] text-slate-400">Submitted on</p>

                    <p className="truncate text-xs font-semibold text-slate-800 dark:text-slate-200">
                      {formattedDate}
                    </p>
                  </div>
                </div>

                {/* Submitted In */}

                <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50/70 px-3 py-2.5 dark:border-slate-800 dark:bg-slate-900/50">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-100 text-cyan-600 dark:bg-cyan-500/10 dark:text-cyan-400">
                    <Timer size={15} />
                  </div>

                  <div className="min-w-0">
                    <p className="text-[10px] text-slate-400">Submitted in</p>

                    <p className="truncate text-xs font-semibold text-slate-800 dark:text-slate-200">
                      {formatSubmittedTime(submittedIn)}
                    </p>
                  </div>
                </div>
              </div>

              {/* ================= MARKS SUMMARY ================= */}

              <div className="rounded-xl border border-slate-200 bg-slate-50/70 dark:border-slate-800 dark:bg-slate-900/50">
                <div className="flex items-center justify-between border-b border-slate-200 px-3.5 py-2.5 dark:border-slate-800">
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    Total Marks
                  </span>

                  <span className="text-xs font-bold text-slate-900 dark:text-white">
                    {totalMarks}
                  </span>
                </div>

                <div className="flex items-center justify-between px-3.5 py-2.5">
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    Obtained Marks
                  </span>

                  <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
                    {obtainedMarks}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ResultModal;
