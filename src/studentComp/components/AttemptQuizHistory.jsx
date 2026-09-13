import { ArrowRight, BookOpen } from "lucide-react";
import { useEffect, useState } from "react";
import { handFetchStudentQuizApi } from "../../services/student.service";
import QuizHistoryModal from "./QuizHistoryModal";

function AttemptQuizHistory({
  colorMode,
  studentIsAuth,
  setRecentPerformance,
}) {
  const [loading, setLoading] = useState(false);
  const [quizHistory, setQuizHistory] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [showHistoryModal, setShowHistoryModal] = useState(false);

  useEffect(() => {
    if (!studentIsAuth) return;

    const fetchQuiz = async () => {
      try {
        setLoading(true);

        const response = await handFetchStudentQuizApi(pageNumber,5);

        if (response.success === true) {
          setQuizHistory(response.data); 
          // setRecentPerformance(response.data[0]);
        }
      } catch (error) {
        console.error("Failed to fetch student quizzes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [studentIsAuth, pageNumber]);

  useEffect(() => {
    if (showHistoryModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showHistoryModal]);

  const hasData = quizHistory.length > 0;

  return (
    <>
      <div
        className={`overflow-hidden rounded-3xl border shadow-sm transition-all ${
          colorMode
            ? "border-slate-800 bg-slate-900/50 backdrop-blur-sm"
            : "border-slate-200 bg-white"
        }`}
      >
        {/* Header */}
        {loading ? (
          <div className="flex items-center justify-between px-7 pb-2 pt-5">
            {/* Title Skeleton */}
            <div
              className={`h-5 w-36 animate-pulse rounded-md ${
                colorMode ? "bg-slate-800" : "bg-slate-200"
              }`}
            />

            {/* View All Skeleton */}
            <div
              className={`h-4 w-14 animate-pulse rounded-md ${
                colorMode ? "bg-slate-800" : "bg-slate-200"
              }`}
            />
          </div>
        ) : hasData ? (
          <div className="flex items-center justify-between px-7 pb-2 pt-5">
            <h2 className="text-lg font-bold">Recent Activity</h2>

            <button
              onClick={() => setShowHistoryModal(true)}
              className={`text-xs font-semibold transition ${
                colorMode
                  ? "text-indigo-400 hover:text-indigo-300"
                  : "text-indigo-600 hover:text-indigo-700"
              }`}
            >
              View All
            </button>
          </div>
        ) : null}

        {/* Content */}
        <div className="max-h-[400px] overflow-y-auto overflow-x-hidden p-3">
          <div className="flex flex-col gap-2">
            {/* Loading */}
            {loading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-4 rounded-2xl px-4 py-4 ${
                    colorMode ? "bg-gray-950" : "bg-slate-50"
                  }`}
                >
                  {/* Icon */}
                  <div
                    className={`h-11 w-11 shrink-0 animate-pulse rounded-xl ${
                      colorMode ? "bg-slate-800" : "bg-slate-200"
                    }`}
                  />

                  {/* Content */}
                  <div className="min-w-0 flex-1">
                    <div
                      className={`h-4 w-40 animate-pulse rounded ${
                        colorMode ? "bg-slate-800" : "bg-slate-200"
                      }`}
                    />

                    <div className="mt-2 flex gap-2">
                      <div
                        className={`h-6 w-20 animate-pulse rounded-md ${
                          colorMode ? "bg-slate-800" : "bg-slate-200"
                        }`}
                      />

                      <div
                        className={`h-6 w-24 animate-pulse rounded-md ${
                          colorMode ? "bg-slate-800" : "bg-slate-200"
                        }`}
                      />

                      <div
                        className={`h-6 w-14 animate-pulse rounded-md ${
                          colorMode ? "bg-slate-800" : "bg-slate-200"
                        }`}
                      />
                    </div>
                  </div>

                  {/* Arrow */}
                  <div
                    className={`h-8 w-8 shrink-0 animate-pulse rounded-lg ${
                      colorMode ? "bg-slate-800" : "bg-slate-200"
                    }`}
                  />
                </div>
              ))
            ) : !hasData ? (
              /* Empty State */

              <div className="flex min-h-[280px] flex-col items-center justify-center text-center">
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl ${
                    colorMode
                      ? "bg-indigo-500/10 text-indigo-400"
                      : "bg-indigo-50 text-indigo-600"
                  }`}
                >
                  <BookOpen size={25} strokeWidth={2} />
                </div>

                <h3
                  className={`mt-4 text-base font-bold ${
                    colorMode ? "text-white" : "text-slate-800"
                  }`}
                >
                  No Quiz History
                </h3>

                <p
                  className={`mt-1 max-w-60 text-xs leading-5 ${
                    colorMode ? "text-slate-500" : "text-slate-500"
                  }`}
                >
                  You haven't attempted any quizzes yet. Your completed quizzes
                  will appear here.
                </p>
              </div>
            ) : (
              /* Data */
              quizHistory.map((item, i) => (
                <div
                  onClick={() => {
                    setRecentPerformance[i];
                  }}
                  key={item._id}
                  className={`group flex cursor-pointer items-center gap-4 rounded-2xl px-4 py-4 transition-all duration-200 ${
                    colorMode
                      ? "bg-white/5 hover:border-indigo-500/30 hover:bg-slate-800/70"
                      : "hover:border-indigo-100 hover:bg-slate-50"
                  }`}
                >
                  {/* Icon */}
                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-transform duration-200 group-hover:scale-105 ${
                      colorMode
                        ? "bg-indigo-500/15 text-indigo-400"
                        : "bg-indigo-50 text-indigo-600"
                    }`}
                  >
                    <BookOpen size={19} />
                  </div>

                  {/* Quiz Info */}
                  <div className="min-w-0 flex-1">
                    <p
                      className={`truncate text-sm font-bold ${
                        colorMode ? "text-slate-100" : "text-slate-800"
                      }`}
                    >
                      {item.title}
                    </p>

                    <div className="mt-2 flex flex-wrap items-center gap-2">
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
                        className={`rounded-md px-2 py-1 text-[11px] font-semibold ${
                          colorMode
                            ? "bg-emerald-500/10 text-emerald-400"
                            : "bg-emerald-50 text-emerald-600"
                        }`}
                      >
                        {item.totalQuestions} Questions
                      </span>

                      <span
                        className={`rounded-md px-2 py-1 text-[11px] font-semibold ${
                          colorMode
                            ? "bg-amber-500/10 text-amber-400"
                            : "bg-amber-50 text-amber-600"
                        }`}
                      >
                        {item.timing?.durationMinutes} min
                      </span>
                    </div>
                  </div>

                  {/* Arrow */}
                  <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-all duration-200 group-hover:translate-x-1 ${
                      colorMode
                        ? "bg-slate-800 text-slate-400 group-hover:bg-indigo-500/10 group-hover:text-indigo-400"
                        : "bg-slate-50 text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600"
                    }`}
                  >
                    <ArrowRight size={16} />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <QuizHistoryModal
        isOpen={showHistoryModal}
        onClose={() => setShowHistoryModal(false)}
        quizHistory={quizHistory}
        colorMode={colorMode}
      />
    </>
  );
}

export default AttemptQuizHistory;
