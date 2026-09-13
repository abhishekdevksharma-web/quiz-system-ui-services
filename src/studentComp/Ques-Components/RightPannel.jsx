import React, { memo } from "react";
import { ChevronRight, Check, Flag, Loader2 } from "lucide-react"; 

function RightPannel({
  colorMode,
  questions,
  submitLoading,
  currentQuesIndex,
  onSubmit,
  setCurrentQuesIndex,
  userAnswer,
}) {

  const answeredCount = userAnswer.filter(
    (q) => q.status === "answered",
  ).length;

  const progress =
    questions.length > 0
      ? Math.round((answeredCount / questions.length) * 100)
      : 0;

  return (
    <aside
      className={`w-84 border-l transition-colors duration-300 flex flex-col h-full shadow-2xl ${
        colorMode
          ? "bg-gray-900 border-gray-800 text-gray-100"
          : "bg-white border-slate-200 text-slate-800"
      }`}
    >
      {/* ================= QUIZ PROGRESS ================= */}

      <div
        className={`px-4 py-4 border-b ${
          colorMode
            ? "border-slate-800 bg-slate-900/60"
            : "border-slate-200 bg-white"
        }`}
      >
        {/* Header */}

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2.5">
            <div
              className={`flex size-8 items-center justify-center rounded-lg ${
                colorMode
                  ? "bg-indigo-500/15 text-indigo-400"
                  : "bg-indigo-50 text-indigo-600"
              }`}
            >
              <span className="text-sm font-black">✓</span>
            </div>

            <div>
              <p
                className={`text-sm font-bold leading-none ${
                  colorMode ? "text-white" : "text-slate-800"
                }`}
              >
                Quiz Progress
              </p>

              <p
                className={`mt-1 text-[10px] font-medium ${
                  colorMode ? "text-slate-500" : "text-slate-400"
                }`}
              >
                {answeredCount}/{questions.length} answered
              </p>
            </div>
          </div>

          {/* Percentage */}

          <div
            className={`rounded-lg px-2.5 py-1.5 text-xs font-black ${
              progress === 100
                ? colorMode
                  ? "bg-emerald-500/15 text-emerald-400"
                  : "bg-emerald-50 text-emerald-600"
                : colorMode
                  ? "bg-indigo-500/15 text-indigo-400"
                  : "bg-indigo-50 text-indigo-600"
            }`}
          >
            {progress}%
          </div>
        </div>

        {/* Progress */}

        <div
          className={`relative h-2 w-full overflow-hidden rounded-full ${
            colorMode ? "bg-slate-800" : "bg-slate-100"
          }`}
        >
          <div
            className={`h-full rounded-full transition-all duration-500 ease-out ${
              progress === 100
                ? "bg-linear-to-r from-emerald-400 to-teal-500"
                : "bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500"
            }`}
            style={{
              width: `${progress}%`,
            }}
          />

          {/* Shine */}

          {progress > 0 && progress < 100 && (
            <div className="absolute inset-y-0 left-0 w-full animate-pulse bg-white/10" />
          )}
        </div>
      </div>

      {/* ================= QUESTION NAVIGATOR ================= */}

      <div className="flex-1 overflow-y-auto p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p
              className={`text-xs font-bold uppercase tracking-widest ${
                colorMode ? "text-gray-500" : "text-slate-400"
              }`}
            >
              Question Navigator
            </p>
          </div>
        </div>

        {/* Question Grid */}

        <div className="grid grid-cols-5 gap-3">
          {userAnswer.map((question, index) => {
            const questionNumber = index + 1;

            const isCurrent = currentQuesIndex + 1 === questionNumber;

            const isAnswered = question.status === "answered";

            const isFlagged = question.flagged === true;

            return (
              <button
                key={questionNumber}
                type="button"
                onClick={() => setCurrentQuesIndex(questionNumber - 1)}
                className={`relative h-11 w-11 rounded-xl text-sm font-bold flex items-center justify-center transition-all duration-200 cursor-pointer ${
                  isCurrent
                    ? "bg-linear-to-br from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/30 scale-105"
                    : isAnswered
                      ? colorMode
                        ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/25"
                        : "bg-emerald-50 text-emerald-600 border border-emerald-100 hover:bg-emerald-100"
                      : colorMode
                        ? "bg-gray-800 text-gray-400 border border-gray-700 hover:border-indigo-500 hover:text-indigo-400"
                        : "bg-slate-50 text-slate-400 border border-slate-200 hover:border-indigo-300 hover:text-indigo-500"
                }`}
              >
                {isAnswered && !isCurrent ? (
                  <Check size={16} />
                ) : (
                  questionNumber
                )}

                {isFlagged && (
                  <span className="absolute -top-1.5 -right-1.5 flex size-4 items-center justify-center rounded-full bg-amber-500 text-white shadow-sm">
                    <Flag size={9} fill="currentColor" />
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* ================= LEGEND ================= */}

        <div
          className={`mt-6 rounded-xl border p-3 ${
            colorMode
              ? "border-gray-800 bg-gray-800/40"
              : "border-slate-100 bg-slate-50"
          }`}
        >
          <div className="grid grid-cols-2 gap-y-3 text-[10px] font-semibold">
            <Legend
              color="bg-emerald-500"
              label="Answered"
              colorMode={colorMode}
            />

            <Legend
              color="bg-gray-500"
              label="Not Answered"
              colorMode={colorMode}
            />

            <Legend
              color="bg-indigo-500"
              label="Current"
              colorMode={colorMode}
            />

            <Legend
              color="bg-amber-500"
              label="Flagged"
              colorMode={colorMode}
            />
          </div>
        </div>
      </div>

      {/* ================= FOOTER ================= */}

      <div
        className={`p-6 border-t border-inherit ${
          colorMode ? "bg-gray-900/50" : "bg-slate-50/50"
        }`}
      >
        <button
          onClick={onSubmit}
          type="button"
          className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all duration-300 group cursor-pointer ${
            colorMode
              ? "bg-indigo-600 hover:bg-indigo-500 text-white shadow-xl shadow-indigo-900/40 "
              : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-xl shadow-indigo-200  "
          }`}
        >
          {submitLoading ? (
            <>
              <Loader2 size={17} className="animate-spin" />
              Submitting...
            </>
          ) : (
            "Submit Quiz"
          )}

          <ChevronRight
            size={18}
            className="group-hover:translate-x-1 transition-transform"
          />
        </button>
      </div>
    </aside>
  );
}

/* ================= LEGEND ================= */

function Legend({ color, label, colorMode }) {
  return (
    <div className="flex items-center gap-2">
      <span className={`size-2 rounded-full ${color}`} />

      <span className={colorMode ? "text-gray-500" : "text-slate-500"}>
        {label}
      </span>
    </div>
  );
}

export default memo(RightPannel);
