import { 
  BookOpen,
  CalendarClock, 
  Clock3,
  Users, 
} from "lucide-react"; 
function RecentQuizList({
  colorMode,
  loading,
  quizHistory,
  setSelectedPreview,
}) {
  const formatScheduledTime = (startTime, endTime) => {
    if (!startTime || !endTime) return "Schedule unavailable";

    const start = new Date(startTime);
    const end = new Date(endTime);

    const date = start.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
    });

    const startTimeFormatted = start.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
    });

    const endTimeFormatted = end.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
    });

    return `${date} • ${startTimeFormatted} – ${endTimeFormatted}`;
  };

  const getTiming = (item) => {
    if (item.timing?.type === "Scheduled") {
      return {
        icon: CalendarClock,
        text: formatScheduledTime(item.timing?.startTime, item.timing?.endTime),
        color: colorMode
          ? "bg-violet-500/10 text-violet-400"
          : "bg-violet-50 text-violet-600",
      };
    }

    return {
      icon: Clock3,
      text: `${item.timing?.durationMinutes ?? 0} min`,
      color: colorMode
        ? "bg-amber-500/10 text-amber-400"
        : "bg-amber-50 text-amber-600",
    };
  };

 

  return (
    <div
      className={`w-full overflow-hidden rounded-3xl border shadow-sm transition-all ${
        colorMode
          ? "border-slate-800 bg-slate-900/50 backdrop-blur-sm"
          : "border-slate-200 bg-white"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-7 pb-2 pt-5">
        {loading ? (
          <div
            className={`h-5 w-36 animate-pulse rounded-md ${
              colorMode ? "bg-slate-800" : "bg-slate-200"
            }`}
          />
        ) : (
          <h2
            className={`text-lg font-bold ${
              colorMode ? "text-white" : "text-slate-900"
            }`}
          >
            Recent Activity
          </h2>
        )}
      </div>
      <div className="flex flex-col gap-2 p-3">
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
                    className={`h-6 w-20 animate-pulse rounded-md ${
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
        ) : quizHistory.length === 0 ? (
          <div
            className={`flex flex-col items-center justify-center rounded-2xl px-6 py-12 text-center ${
              colorMode ? "bg-white/5" : "bg-slate-50"
            }`}
          >
            {/* Icon */}
            <div
              className={`mb-4 flex h-14 w-14 items-center justify-center rounded-2xl ${
                colorMode
                  ? "bg-indigo-500/10 text-indigo-400"
                  : "bg-indigo-50 text-indigo-500"
              }`}
            >
              <BookOpen size={24} strokeWidth={1.8} />
            </div>

            {/* Title */}
            <h3
              className={`text-sm font-bold ${
                colorMode ? "text-slate-200" : "text-slate-800"
              }`}
            >
              No quizzes yet
            </h3>

            {/* Description */}
            <p
              className={`mt-1 max-w-sm text-xs ${
                colorMode ? "text-slate-500" : "text-slate-400"
              }`}
            >
              Your recent quizzes will appear here once you create one.
            </p>
          </div>
        ) : (
          quizHistory.map((item, i) => {
            const timing = getTiming(item);
            const TimingIcon = timing.icon;

            return (
              <div
                key={item._id || item.title}
                onClick={() => setSelectedPreview(i)}
                className={`group flex cursor-pointer items-center gap-4 rounded-2xl px-4 py-3.5 transition-all duration-200 ${
                  colorMode
                    ? "bg-white/5 hover:bg-slate-800/70"
                    : "hover:bg-slate-50"
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

                {/* Quiz Info */}
                <div className="min-w-0 flex-1">
                  {/* Title + Subject */}
                  <div className="flex min-w-0 items-center gap-2">
                    <p
                      className={`min-w-0 truncate text-sm font-bold ${
                        colorMode ? "text-slate-100" : "text-slate-800"
                      }`}
                    >
                      {item.title}
                    </p>

                    <span
                      className={`shrink-0 text-[11px] ${
                        colorMode ? "text-slate-600" : "text-slate-400"
                      }`}
                    >
                      •
                    </span>

                    <p
                      className={`shrink-0 truncate text-xs font-medium ${
                        colorMode ? "text-indigo-400" : "text-indigo-600"
                      }`}
                    >
                      {item.subject}
                    </p>
                  </div>

                  {/* Meta */}
                  <div className="mt-2 flex min-w-0 items-center gap-1.5 overflow-hidden">
                    {/* Timing */}
                    <span
                      title={timing.text}
                      className={`flex min-w-0 max-w-[220px] items-center gap-1.5 truncate rounded-md px-2 py-1 text-[10px] font-semibold ${timing.color}`}
                    >
                      <TimingIcon size={12} className="shrink-0" />
                      <span className="truncate">{timing.text}</span>
                    </span>

                    {/* Attempts */}
                    <span
                      className={`flex shrink-0 items-center gap-1 rounded-md px-2 py-1 text-[10px] font-semibold ${
                        colorMode
                          ? "bg-blue-500/10 text-blue-400"
                          : "bg-blue-50 text-blue-600"
                      }`}
                    >
                      <Users size={11} />
                      {item.submitted ?? 0} attempts
                    </span>
                  </div>
                </div>

                {/* STATUS */}
                <div
                  className={`flex shrink-0 items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-[10px] font-bold ${
                    item.status?.toLowerCase() === "closed"
                      ? colorMode
                        ? "border-rose-500/20 bg-rose-500/10 text-rose-400"
                        : "border-rose-200 bg-rose-50 text-rose-600"
                      : item.status?.toLowerCase() === "scheduled"
                        ? colorMode
                          ? "border-violet-500/20 bg-violet-500/10 text-violet-400"
                          : "border-violet-200 bg-violet-50 text-violet-600"
                        : colorMode
                          ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
                          : "border-emerald-200 bg-emerald-50 text-emerald-600"
                  }`}
                >
                  {item.status}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default RecentQuizList;
