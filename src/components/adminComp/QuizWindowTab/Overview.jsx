import React from "react";
import { CheckCircle2, AlertTriangle, HelpCircle } from "lucide-react";

export default function OverviewTab({ quiz, colorMode }) {
  // Graceful empty state
  if (!quiz?.questions || quiz.questions.length === 0) {
    return (
      <div
        className={`flex flex-col items-center justify-center p-12 rounded-2xl border text-center ${
          colorMode
            ? "border-slate-700 bg-slate-900 text-slate-400"
            : "border-slate-200 bg-slate-50/50 text-slate-500"
        }`}
      >
        <HelpCircle size={40} className="mb-3 opacity-60" />
        <h3
          className={`text-base font-semibold ${colorMode ? "text-slate-200" : "text-slate-700"}`}
        >
          No questions found
        </h3>
        <p className="mt-1 text-sm max-w-xs">
          This quiz doesn't have any questions added to it yet.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6 max-w-4xl mx-auto">
      {quiz.questions.map((question, index) => {
        const hasNoCorrectAnswer =
          question.correctOptionIndex === null ||
          question.correctOptionIndex === undefined ||
          question.correctOptionIndex === "";

        return (
          <div
            key={question._id || index}
            className={`rounded-2xl border p-6 transition-all duration-200 shadow-sm ${
              colorMode
                ? "border-slate-800 bg-slate-800 shadow-black/10"
                : "border-slate-200 bg-white shadow-slate-100"
            }`}
          >
            {/* Header Structure */}
            <div className="mb-6 flex items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                {/* Clean, Modern Number Badge */}
                <div
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-sm font-bold tracking-wide ${
                    colorMode
                      ? "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20"
                      : "bg-indigo-50 text-indigo-600 border border-indigo-100"
                  }`}
                >
                  {String(index + 1).padStart(2, "0")}
                </div>

                <div>
                  <h3
                    className={`text-lg font-semibold leading-snug tracking-tight ${
                      colorMode ? "text-slate-100" : "text-slate-900"
                    }`}
                  >
                    {question.questionText}
                  </h3>

                  {/* Styled Marks Badge */}
                  <div className="mt-2.5 flex items-center">
                    <span
                      className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium tracking-wide ${
                        colorMode
                          ? "bg-slate-800 text-slate-400 border border-slate-700"
                          : "bg-slate-100 text-slate-600 border border-slate-200"
                      }`}
                    >
                      {question.marks} {question.marks === 1 ? "Mark" : "Marks"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Options Matrix */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {question.options?.map((option, optionIndex) => {
                const correctIndex =
                  question.correctOptionIndex !== null &&
                  question.correctOptionIndex !== undefined &&
                  question.correctOptionIndex !== ""
                    ? Number(question.correctOptionIndex)
                    : -1;

                const isCorrect = optionIndex === correctIndex;

                return (
                  <div
                    key={optionIndex}
                    className={`flex items-center justify-between rounded-xl border px-4 py-3.5 transition-all duration-200 ${
                      isCorrect
                        ? colorMode
                          ? "border-emerald-500/40 bg-emerald-500/5 shadow-inner"
                          : "border-emerald-500 bg-emerald-50/60"
                        : colorMode
                          ? "border-slate-800 bg-slate-950/40 hover:border-slate-700"
                          : "border-slate-200 bg-slate-50/50 hover:border-slate-300"
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0 pr-2">
                      {/* Option Letter Indicator */}
                      <div
                        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-bold transition-colors ${
                          isCorrect
                            ? "bg-emerald-500 text-white"
                            : colorMode
                              ? "bg-slate-800 text-slate-400"
                              : "bg-slate-200/80 text-slate-600"
                        }`}
                      >
                        {String.fromCharCode(65 + optionIndex)}
                      </div>

                      <span
                        className={`text-sm font-medium truncate ${
                          isCorrect
                            ? colorMode
                              ? "text-emerald-400"
                              : "text-emerald-900"
                            : colorMode
                              ? "text-slate-300"
                              : "text-slate-700"
                        }`}
                      >
                        {option}
                      </span>
                    </div>

                    {isCorrect && (
                      <div className="flex items-center gap-1.5 text-emerald-500 shrink-0">
                        <CheckCircle2 size={16} strokeWidth={2.5} />
                        <span className="text-xs font-semibold uppercase tracking-wider hidden sm:inline">
                          Correct
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Missing Answer Alert Banner */}
            {hasNoCorrectAnswer && (
              <div
                className={`mt-4 flex items-center gap-3 rounded-xl border px-4 py-3 text-sm ${
                  colorMode
                    ? "border-amber-500/20 bg-amber-500/5 text-amber-400"
                    : "border-amber-200 bg-amber-50 text-amber-800"
                }`}
              >
                <AlertTriangle size={18} className="shrink-0 text-amber-500" />
                <p className="font-medium">
                  No correct answer has been assigned to this question yet.
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
