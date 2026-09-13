import { X, BookOpen, Clock3, CircleCheck } from "lucide-react";

function QuizHistoryModal({ isOpen, onClose, quizHistory, colorMode }) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative flex max-h-[85vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl border shadow-2xl ${
          colorMode
            ? "border-slate-800 bg-slate-950"
            : "border-slate-200 bg-white"
        }`}
      >
        {/* Header */}
        <div
          className={`flex shrink-0 items-center justify-between border-b px-6 py-5 ${
            colorMode ? "border-slate-800" : "border-slate-200"
          }`}
        >
          <div>
            <h2
              className={`text-lg font-bold ${
                colorMode ? "text-white" : "text-slate-900"
              }`}
            >
              Quiz History
            </h2>

            <p
              className={`mt-1 text-xs ${
                colorMode ? "text-slate-400" : "text-slate-500"
              }`}
            >
              View all your attempted quizzes
            </p>
          </div>

          <button
            onClick={onClose}
            className={`flex h-9 w-9 items-center justify-center rounded-xl transition ${
              colorMode
                ? "bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white"
                : "bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-800"
            }`}
          >
            <X size={18} />
          </button>
        </div>

        {/* History List */}
        <div className="min-h-0 flex-1 overflow-y-auto p-4">
          {quizHistory?.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div
                className={`mb-4 flex h-14 w-14 items-center justify-center rounded-2xl ${
                  colorMode
                    ? "bg-indigo-500/10 text-indigo-400"
                    : "bg-indigo-50 text-indigo-500"
                }`}
              >
                <BookOpen size={25} />
              </div>

              <h3
                className={`text-sm font-bold ${
                  colorMode ? "text-slate-100" : "text-slate-800"
                }`}
              >
                No Quiz History
              </h3>

              <p
                className={`mt-1 text-xs ${
                  colorMode ? "text-slate-400" : "text-slate-500"
                }`}
              >
                You haven't attempted any quizzes yet.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {quizHistory.map((item) => (
                <div
                  key={item._id}
                  className={`group flex items-center gap-4 rounded-2xl p-4 transition ${
                    colorMode
                      ? "bg-white/5 hover:bg-slate-800/70"
                      : "bg-slate-50 hover:bg-slate-100"
                  }`}
                >
                  {/* Icon */}
                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                      colorMode
                        ? "bg-indigo-500/15 text-indigo-400"
                        : "bg-indigo-50 text-indigo-600"
                    }`}
                  >
                    <BookOpen size={19} />
                  </div>

                  {/* Content */}
                  <div className="min-w-0 flex-1">
                    <p
                      className={`truncate text-sm font-bold ${
                        colorMode ? "text-slate-100" : "text-slate-800"
                      }`}
                    >
                      {item.title}
                    </p>

                    <div className="mt-2 flex flex-wrap gap-2">
                      <span
                        className={`rounded-md px-2 py-1 text-[11px] font-semibold ${
                          colorMode
                            ? "bg-violet-500/10 text-violet-400"
                            : "bg-violet-50 text-violet-600"
                        }`}
                      >
                        {item.subject}
                      </span>

                      <span
                        className={`flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-semibold ${
                          colorMode
                            ? "bg-emerald-500/10 text-emerald-400"
                            : "bg-emerald-50 text-emerald-600"
                        }`}
                      >
                        <CircleCheck size={12} />
                        {item.totalQuestions} Questions
                      </span>

                      <span
                        className={`flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-semibold ${
                          colorMode
                            ? "bg-amber-500/10 text-amber-400"
                            : "bg-amber-50 text-amber-600"
                        }`}
                      >
                        <Clock3 size={12} />
                        {item.timing?.durationMinutes} min
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default QuizHistoryModal;
