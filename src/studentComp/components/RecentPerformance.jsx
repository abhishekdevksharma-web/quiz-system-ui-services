import {
  BarChart3,
  BookOpen,
  Clock3, 
  FileQuestion,
  Trophy,
} from "lucide-react";
import React from "react";

function RecentPerformance({ colorMode, loading, recentPerformance }) { 

  const stats = [
    {
      label: "Questions",
      value: recentPerformance?.totalQuestions ?? "-",
      icon: FileQuestion,
      iconClass: colorMode
        ? "bg-blue-500/10 text-blue-400"
        : "bg-blue-50 text-blue-600",
    },
    {
      label: "Submitted",
      value: recentPerformance?.submitted ?? "-",
      icon: Trophy,
      iconClass: colorMode
        ? "bg-violet-500/10 text-violet-400"
        : "bg-violet-50 text-violet-600",
    },
    {
      label: "Difficulty",
      value: recentPerformance?.difficulty ?? "-",
      icon: BarChart3,
      iconClass: colorMode
        ? "bg-rose-500/10 text-rose-400"
        : "bg-rose-50 text-rose-600",
    },
    {
      label: "Duration",
      value: recentPerformance?.timing?.durationMinutes
        ? `${recentPerformance.timing.durationMinutes} min`
        : "-",
      icon: Clock3,
      iconClass: colorMode
        ? "bg-amber-500/10 text-amber-400"
        : "bg-amber-50 text-amber-600",
    },
  ];

  const percentage =
    recentPerformance.totalMarks > 0
      ? (recentPerformance.obtainedMarks / recentPerformance.totalMarks) * 100
      : 0;

  return (
    <div
      className={`rounded-3xl border px-6 py-4 shadow-sm transition-all duration-500 ${
        colorMode
          ? "border-slate-800 bg-slate-900/50 backdrop-blur-sm"
          : "border-slate-200 bg-white"
      }`}
    >
      {loading ? (
        /* Loading */
        <div className="animate-pulse">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div
                className={`h-3 w-24 rounded ${
                  colorMode ? "bg-slate-800" : "bg-slate-200"
                }`}
              />

              <div
                className={`h-5 w-48 rounded-md ${
                  colorMode ? "bg-slate-800" : "bg-slate-200"
                }`}
              />

              <div
                className={`h-3 w-20 rounded ${
                  colorMode ? "bg-slate-800" : "bg-slate-200"
                }`}
              />
            </div>

            <div
              className={`h-10 w-10 rounded-xl ${
                colorMode ? "bg-slate-800" : "bg-slate-200"
              }`}
            />
          </div>

          <div
            className={`mt-5 h-24 rounded-2xl ${
              colorMode ? "bg-slate-800/70" : "bg-slate-100"
            }`}
          />

          <div
            className={`mt-3 h-24 rounded-2xl ${
              colorMode ? "bg-slate-800/40" : "bg-slate-50"
            }`}
          />
        </div>
      ) : Object.keys(recentPerformance).length === 0 ? (
        /* No Data */
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
            No Recent Quiz Progress
          </h3>

          <p
            className={`mt-1 max-w-60 text-xs leading-5 ${
              colorMode ? "text-slate-500" : "text-slate-500"
            }`}
          >
            Your recent quiz performance will appear here once you complete a
            quiz.
          </p>
        </div>
      ) : (
        <div className="transform transition-all duration-500 ease-out">
          {/* Header */}
          <div>
            <div className="flex items-center justify-between">
              <span
                className={`text-lg font-bold tracking-wider ${
                  colorMode ? "text-white" : "text-indigo-600"
                }`}
              >
                Recent Quiz
              </span>

              <div
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${
                  colorMode
                    ? "bg-indigo-500/10 text-indigo-400"
                    : "bg-indigo-50 text-indigo-600"
                }`}
              >
                <BarChart3 size={22} />
              </div>
            </div>

            <div>
              <h2 className="mt-1 truncate text-lg font-bold">
                {recentPerformance.title}
              </h2>

              <p
                className={`mt-1 text-sm font-semibold ${
                  colorMode ? "text-indigo-400" : "text-slate-500"
                }`}
              >
                {recentPerformance.subject}
              </p>
            </div>
          </div>

          {/* Score */}
          <div
            className={`mt-6 flex items-center justify-between rounded-2xl border p-5 ${
              colorMode
                ? "border-slate-800 bg-slate-800/50"
                : "border-slate-100 bg-slate-50"
            }`}
          >
            <div>
              <p
                className={`text-xs font-medium ${
                  colorMode ? "text-slate-400" : "text-slate-500"
                }`}
              >
                Your Score
              </p>

              <div className="mt-1 flex items-baseline gap-2">
                <span
                  className={`text-4xl font-extrabold ${
                    percentage >= 80
                      ? "text-emerald-500"
                      : percentage >= 50
                        ? "text-amber-500"
                        : "text-rose-500"
                  }`}
                >
                  {percentage}%
                </span>

                <span
                  className={`text-xs font-medium ${
                    colorMode ? "text-slate-500" : "text-slate-400"
                  }`}
                >
                  overall
                </span>
              </div>
            </div>

            <div
              className={`flex h-16 w-16 items-center justify-center rounded-full border-4 ${
                recentPerformance.percentage >= 80
                  ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-500"
                  : recentPerformance.percentage >= 50
                    ? "border-amber-500/20 bg-amber-500/10 text-amber-500"
                    : "border-rose-500/20 bg-rose-500/10 text-rose-500"
              }`}
            >
              <Trophy size={25} />
            </div>
          </div>

          {/* Stats */}
          <div className="mt-3 grid grid-cols-2 gap-3">
            {stats.map((stat) => {
              const Icon = stat.icon;

              return (
                <div
                  key={stat.label}
                  className={`flex items-center gap-3 rounded-xl border p-3 ${
                    colorMode
                      ? "border-slate-800 bg-slate-900/40 hover:bg-slate-800/60"
                      : "border-slate-100 bg-white hover:bg-slate-50"
                  }`}
                >
                  <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${stat.iconClass}`}
                  >
                    <Icon size={17} />
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-[11px] font-medium text-slate-500">
                      {stat.label}
                    </p>

                    <p className="mt-0.5 text-base font-bold">{stat.value}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default RecentPerformance;
