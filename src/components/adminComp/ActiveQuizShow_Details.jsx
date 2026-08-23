import { Clock3 } from "lucide-react";
import AdminContext from "../../context/adminContext/adminContext";
import { useContext } from "react";

export default function ActiveQuizDetailsStats({
  timingType = "Scheduled", // Scheduled | Duration
  durationMinutes = null,
  startTime,
  endTime,
  status = "none", // live | scheduled | ended | none
  timeText = "--",
}) {
  const { colorMode } = useContext(AdminContext);

  const formatTime = (time) => {
    if (!time) return "--";

    return new Date(time).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const statusMap = {
    live: {
      badge: "🟢 Live",
      color: "text-emerald-400",
      text: `⏳ ${timeText}`,
    },
    scheduled: {
      badge: "🟡 Starts In",
      color: "text-amber-400",
      text: `⏰ ${timeText}`,
    },
    ended: {
      badge: "🔴 Ended",
      color: "text-red-400",
      text: "✔ Closed",
    },
    none: {
      badge: "--",
      color: colorMode ? "text-slate-500" : "text-slate-400",
      text: "--",
    },
  };

  const current = statusMap[status];

  return (
    <div
      className={
        "flex h-28 flex-col justify-between px-5 py-4" +
        (colorMode
          ? "bg-slate-900 border-slate-800"
          : "bg-white border-slate-200")
      }
    >
      {/* Title */}
      <p
        className={`text-sm font-medium ${
          colorMode ? "text-slate-400" : "text-slate-500"
        }`}
      >
        Quiz Schedule
      </p>

      {/* Duration / Schedule */}
      {timingType === "Duration" ? (
        <div className="flex flex-1 items-center justify-between">
          <div>
            <p
              className={`text-2xl font-bold ${
                colorMode ? "text-white" : "text-slate-900"
              }`}
            >
              {durationMinutes ?? "--"} min
            </p>

            <p
              className={`text-xs ${
                colorMode ? "text-slate-500" : "text-slate-400"
              }`}
            >
              Duration
            </p>
          </div>

          <Clock3
            size={28}
            className={colorMode ? "text-slate-600" : "text-slate-300"}
          />
        </div>
      ) : (
        <div className="flex items-center justify-between">
          <div>
            <p
              className={`text-lg font-semibold ${
                colorMode ? "text-white" : "text-slate-900"
              }`}
            >
              {formatTime(startTime)}
            </p>
            <p
              className={`text-xs ${
                colorMode ? "text-slate-500" : "text-slate-400"
              }`}
            >
              Start
            </p>
          </div>

          <div
            className={`mx-4 h-px flex-1 ${
              colorMode ? "bg-slate-700" : "bg-slate-300"
            }`}
          />

          <div className="text-right">
            <p
              className={`text-lg font-semibold ${
                colorMode ? "text-white" : "text-slate-900"
              }`}
            >
              {formatTime(endTime)}
            </p>
            <p
              className={`text-xs ${
                colorMode ? "text-slate-500" : "text-slate-400"
              }`}
            >
              End
            </p>
          </div>
        </div>
      )}

      {/* Status */}
      <div className="flex items-center justify-between">
        <span className={`text-sm font-medium ${current.color}`}>
          {current.badge}
        </span>

        <div
          className={`flex items-center gap-1 text-sm ${
            colorMode ? "text-slate-300" : "text-slate-700"
          }`}
        >
          <Clock3 size={14} />
          <span>{current.text}</span>
        </div>
      </div>
    </div>
  );
}
