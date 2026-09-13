import React, { memo } from "react";
import { Check, Flag } from "lucide-react";

function MobileQuestionNavigator({
  questions = [],
  userAnswer = [],
  currentQuesIndex = 0,
  setCurrentQuesIndex,
  colorMode = false,
  quiz = {},
}) {
  const { title = "Untitled Quiz", subject = "" } = quiz;

  const answeredCount = userAnswer.filter(
    (q) => q?.status === "answered",
  ).length;

  const totalQuestions = questions.length;

  const progress =
    totalQuestions > 0 ? Math.round((answeredCount / totalQuestions) * 100) : 0;

  return (
    <div
      className={`w-full shrink-0 overflow-hidden rounded-2xl border shadow-sm ${
        colorMode
          ? "border-slate-800/90 bg-slate-950 shadow-black/10"
          : "border-slate-200 bg-white shadow-slate-200/40"
      }`}
    >
      {/* Quiz Header */}
      <div className="flex items-center justify-between gap-4 px-4 py-3.5">
        <div className="min-w-0 flex-1">
          <h2
            className={`truncate text-[13px] font-semibold leading-5 tracking-[-0.01em] ${
              colorMode ? "text-slate-100" : "text-slate-800"
            }`}
          >
            {title}
          </h2>

          {subject && (
            <div className="mt-1 flex items-center gap-1.5">
              <span
                className={`h-1 w-1 shrink-0 rounded-full ${
                  colorMode ? "bg-indigo-400" : "bg-indigo-500"
                }`}
              />

              <p
                className={`truncate text-[10px] font-medium ${
                  colorMode ? "text-slate-500" : "text-slate-400"
                }`}
              >
                {subject}
              </p>
            </div>
          )}
        </div>

        {/* Progress Summary */}
        <div className="flex shrink-0 items-center gap-3">
          <div className="text-right">
            <p
              className={`text-[9px] font-semibold uppercase tracking-[0.08em] ${
                colorMode ? "text-slate-600" : "text-slate-400"
              }`}
            >
              Answered
            </p>

            <p
              className={`mt-0.5 text-[11px] font-semibold ${
                colorMode ? "text-slate-200" : "text-slate-700"
              }`}
            >
              {answeredCount}
              <span
                className={`mx-1 font-normal ${
                  colorMode ? "text-slate-700" : "text-slate-300"
                }`}
              >
                /
              </span>
              {totalQuestions}
            </p>
          </div>

          <div
            className={`flex size-9 items-center justify-center rounded-full border-[1.5px] text-[9px] font-bold transition-colors ${
              progress === 100
                ? colorMode
                  ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-400"
                  : "border-emerald-200 bg-emerald-50 text-emerald-600"
                : colorMode
                  ? "border-indigo-500/35 bg-indigo-500/10 text-indigo-400"
                  : "border-indigo-200 bg-indigo-50 text-indigo-600"
            }`}
          >
            {progress}%
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div
        className={`h-1 w-full ${colorMode ? "bg-slate-900" : "bg-slate-100"}`}
      >
        <div
          className={`h-full rounded-r-full transition-[width] duration-500 ease-out ${
            progress === 100 ? "bg-emerald-500" : "bg-indigo-500"
          }`}
          style={{
            width: `${progress}%`,
          }}
        />
      </div>

      {/* Question Navigator */}
      <div className="px-4 pb-3.5 pt-3">
        <div className="mb-2.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <p
              className={`text-[10px] font-semibold uppercase tracking-[0.08em] ${
                colorMode ? "text-slate-400" : "text-slate-500"
              }`}
            >
              Questions
            </p>

            <span
              className={`rounded-md px-1.5 py-0.5 text-[9px] font-semibold ${
                colorMode
                  ? "bg-slate-900 text-slate-500"
                  : "bg-slate-50 text-slate-400"
              }`}
            >
              {totalQuestions}
            </span>
          </div>

          <p
            className={`text-[9px] ${
              colorMode ? "text-slate-600" : "text-slate-400"
            }`}
          >
            Swipe to navigate
          </p>
        </div>

        <div className="-mx-1 flex gap-1.5 overflow-x-auto px-1 pb-0.5 scrollbar-none">
          {userAnswer.map((question, index) => {
            const questionNumber = index + 1;

            const isCurrent = currentQuesIndex === index;
            const isAnswered = question?.status === "answered";
            const isFlagged = question?.flagged === true;

            return (
              <button
                key={question?._id || questionNumber}
                type="button"
                onClick={() => setCurrentQuesIndex(index)}
                aria-label={`Question ${questionNumber}`}
                aria-current={isCurrent ? "true" : undefined}
                className={`relative flex size-8 shrink-0 items-center justify-center rounded-lg border text-[10px] font-semibold transition-all duration-150 active:scale-95 ${
                  isCurrent
                    ? colorMode
                      ? "border-indigo-400 bg-indigo-500 text-white shadow-md shadow-indigo-950/40"
                      : "border-indigo-600 bg-indigo-600 text-white shadow-md shadow-indigo-100"
                    : isAnswered
                      ? colorMode
                        ? "border-emerald-500/25 bg-emerald-500/8 text-emerald-400 hover:border-emerald-500/45 hover:bg-emerald-500/12"
                        : "border-emerald-200 bg-emerald-50 text-emerald-600 hover:border-emerald-300 hover:bg-emerald-100/70"
                      : colorMode
                        ? "border-slate-800 bg-slate-900 text-slate-500 hover:border-slate-700 hover:bg-slate-800 hover:text-slate-300"
                        : "border-slate-200 bg-slate-50 text-slate-400 hover:border-slate-300 hover:bg-slate-100 hover:text-slate-600"
                }`}
              >
                {isAnswered && !isCurrent ? (
                  <Check size={13} strokeWidth={2.6} />
                ) : (
                  questionNumber
                )}

                {isFlagged && (
                  <span
                    className={`absolute -right-1 -top-1 flex size-3 items-center justify-center rounded-full ring-2 ${
                      colorMode
                        ? "bg-amber-500 text-slate-950 ring-slate-950"
                        : "bg-amber-500 text-white ring-white"
                    }`}
                  >
                    <Flag size={6} fill="currentColor" strokeWidth={2} />
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default memo(MobileQuestionNavigator);
