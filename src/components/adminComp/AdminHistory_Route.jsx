import React, { useEffect, useState, useContext } from "react";
import Navbar from "./Navbar";
import AdminContext from "../../context/adminContext/adminContext";
import QuizHistoryCard from "../components/AdminQuizHistory_Card";

const AdminQuizHistory = () => {
  const {
    colorMode,
    onViewScores,
    fetchUserAllQuizes,
    adminAuthenticate,
    setadminAuthenticate,
  } = useContext(AdminContext);

  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAllQuizes() {
      setLoading(true);
      const QuizData = await fetchUserAllQuizes();
      setadminAuthenticate(true);
      setQuizzes(QuizData);
      setLoading(false);
    }
    fetchAllQuizes();
  }, []);

  return (
    <main
      className={
        "h-screen w-screen overflow-y-auto sm:px-6 sm:py-8 space-y-6 transition " +
        (colorMode
          ? "bg-slate-900 text-slate-100"
          : "bg-slate-100 text-slate-900")
      }
    >
      {/* Loading State */}
      {loading && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 pt-16 px-10 pb-10">
          {Array.from({ length: 9 }).map((_, i) => (
            <div
              key={i}
              className={
                "rounded-3xl p-5 animate-pulse " +
                (colorMode
                  ? "bg-slate-800 border border-slate-700"
                  : "bg-white border border-slate-200")
              }
            >
              {/* Header */}
              <div className="flex justify-between items-start">
                <div className="space-y-2 w-3/4">
                  <div
                    className={
                      "h-4 w-2/3 rounded " +
                      (colorMode ? "bg-slate-700" : "bg-slate-200")
                    }
                  />
                  <div
                    className={
                      "h-3 w-1/2 rounded " +
                      (colorMode ? "bg-slate-700" : "bg-slate-200")
                    }
                  />
                </div>

                <div
                  className={
                    "h-6 w-16 rounded-full " +
                    (colorMode ? "bg-slate-700" : "bg-slate-200")
                  }
                />
              </div>

              {/* Created on */}
              <div
                className={
                  "mt-3 h-3 w-1/3 rounded " +
                  (colorMode ? "bg-slate-700" : "bg-slate-200")
                }
              />

              {/* Pills */}
              <div className="mt-4 flex flex-wrap gap-2">
                {[1, 2, 3, 4].map((x) => (
                  <div
                    key={x}
                    className={
                      "h-7 w-20 rounded-full " +
                      (colorMode ? "bg-slate-700" : "bg-slate-200")
                    }
                  />
                ))}
              </div>

              {/* Footer */}
              <div className="mt-6 flex justify-between items-center">
                <div
                  className={
                    "h-4 w-24 rounded " +
                    (colorMode ? "bg-slate-700" : "bg-slate-200")
                  }
                />
                <div
                  className={
                    "h-9 w-28 rounded-full " +
                    (colorMode ? "bg-slate-700" : "bg-slate-200")
                  }
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Quiz Cards */}
      {!loading && (
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 pt-16 px-10 pb-10">
          {quizzes.map((quiz) => (
            <QuizHistoryCard
              key={quiz._id}
              quiz={quiz}
              onViewScores={onViewScores}
            />
          ))}

          {quizzes.length === 0 && (
            <div
              className={
                "col-span-full rounded-3xl border border-dashed p-6 text-center text-sm transition " +
                (colorMode
                  ? "border-slate-600 bg-slate-800 text-slate-300"
                  : "border-slate-300 bg-white/80 text-slate-500")
              }
            >
              No quizzes found.
            </div>
          )}
        </section>
      )}
    </main>
  );
};

export default AdminQuizHistory;
