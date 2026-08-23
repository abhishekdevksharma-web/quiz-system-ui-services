import {
  BookOpen,
  CalendarDays,
  ChevronDown,
  Clock3,
  ClockFading,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";
export default function StatCard({
  colorMode,
  title,
  value,
  subtitle,
  options = [],
  optionLabel = "title",
}) {
  const [isOpen, setisOpen] = useState(false);
  const [selected, setSelected] = useState(options[0] || null);
 

  function onToggle() {
    setisOpen(!isOpen);
  }

  useEffect(() => {
    if (options.length > 0 && !selected) {
      setSelected(options[0]);
    }
  }, [options]);

  function onChange(i) {
    setSelected(options[i]);
  }

  function formatDate(date) {
    if (!date) return "--";

    return new Date(date).toLocaleDateString("en-IN", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }

  function formatTime(date) {
    if (!date) return "--";

    return new Date(date).toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  }
  return (
    <div className="flex gap-5">
      <div
        className={`rounded-2xl border shadow-sm transition-all w-full max-w-74 ${
          colorMode
            ? "bg-slate-900 border-slate-800"
            : "bg-white border-slate-200"
        }`}
      >
        {/* Card */}
        <div className="flex h-28 flex-col px-5 py-4">
          {/* Title */}
          <p
            className={`text-sm font-medium ${
              colorMode ? "text-slate-400" : "text-slate-500"
            }`}
          >
            {title}
          </p>

          {/* Center */}
          <div className="flex flex-1 flex-col justify-center">
            <h2
              className={`text-5xl font-bold ${
                colorMode ? "text-white" : "text-slate-900"
              }`}
            >
              {value}
            </h2>

            {subtitle && (
              <p
                className={`mt-2 text-sm ${
                  colorMode ? "text-slate-500" : "text-slate-400"
                }`}
              >
                {subtitle}
              </p>
            )}
          </div>
        </div>

        {/* Bottom Dropdown */}
        <div className="h-14 ">
          {options.length > 0 && (
            <div className="relative h-full">
              <button
                onClick={onToggle}
                className={`rounded-2xl flex h-full w-full items-center justify-between border-t px-5 py-3 transition ${
                  colorMode
                    ? "border-slate-800 bg-slate-950 hover:bg-slate-900 text-slate-200"
                    : "border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700"
                }`}
              >
                <span className="truncate">
                  {selected?.[optionLabel] || "Select"}
                </span>

                <ChevronDown
                  size={18}
                  className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
                />
              </button>

              {isOpen && (
                <div
                  className={`absolute left-0 right-0 top-full z-30 mt-3 max-h-96 overflow-y-auto rounded-2xl border p-2 shadow-2xl backdrop-blur-xl transition-all duration-200 ${
                    colorMode
                      ? "border-slate-700 bg-slate-900/95"
                      : "border-slate-200 bg-white"
                  }`}
                >
                  <div className="flex flex-col gap-2">
                    {options.map((item, i) => {
                      const isSelected = value === i;

                      return (
                        <button
                          key={item._id}
                          onClick={() => {
                            onChange(i);
                            onToggle();
                          }}
                          className={`group relative flex w-full cursor-pointer items-center gap-4 overflow-hidden rounded-2xl border p-4 transition-all duration-300 ${
                            isSelected
                              ? colorMode
                                ? "border-blue-500 bg-linear-to-r from-blue-500/15 to-indigo-500/10 shadow-lg shadow-blue-500/20"
                                : "border-blue-200 bg-blue-50"
                              : colorMode
                                ? "border-slate-700 bg-[#111827] hover:-translate-y-1 hover:border-blue-500/40 hover:bg-[#1C2538] hover:shadow-[0_15px_35px_rgba(37,99,235,.18)]"
                                : "border-slate-200 bg-white hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
                          }`}
                        >
                          <div className="flex items-center gap-4 min-w-0 flex-1">
                            {/* Modern Glow/Glassmorphism Icon Wrapper */}
                            <div
                              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-all duration-300 backdrop-blur-md shadow-sm ${
                                colorMode
                                  ? "bg-slate-800/60 text-indigo-400 border border-slate-700/50 group-hover:bg-indigo-500 group-hover:text-white group-hover:border-indigo-400 group-hover:shadow-[0_0_15px_rgba(99,102,241,0.3)]"
                                  : "bg-white text-indigo-600 border border-slate-200/80 group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600 group-hover:shadow-[0_4px_12px_rgba(79,70,229,0.15)]"
                              }`}
                            >
                              <BookOpen
                                size={16}
                                className="transition-transform duration-300 group-hover:scale-110"
                              />
                            </div>

                            {/* Content Wrapper */}
                            <div className="flex flex-col justify-center min-w-0">
                              {/* Top Row: Title & Premium Subject Badge */}
                              <div className="flex items-center gap-2.5 min-w-0">
                                <span
                                  className={`font-semibold tracking-tight truncate max-w-[180px] sm:max-w-[260px] md:max-w-[340px] transition-colors duration-200 text-[14px] sm:text-[15px] flex flex-1 ${
                                    colorMode
                                      ? "text-slate-100 group-hover:text-white"
                                      : "text-slate-800 group-hover:text-indigo-950"
                                  }`}
                                  title={item.title}
                                >
                                  {item.title}
                                </span>

                                <span
                                  className={`shrink-0 rounded-md px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider transition-all duration-300 border backdrop-blur-sm ${
                                    colorMode
                                      ? "bg-slate-800/80 text-slate-300 border-slate-700/60 group-hover:border-indigo-500/30 group-hover:text-indigo-300"
                                      : "bg-slate-50 text-slate-600 border-slate-200 group-hover:bg-indigo-50/50 group-hover:text-indigo-600 group-hover:border-indigo-100"
                                  }`}
                                >
                                  {item.subject || "General"}
                                </span>
                              </div>
                            </div>
                          </div>
                          <span
                            className={`ml-4 shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold tracking-wide border ${
                              item.status === "Active"
                                ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                                : item.status === "Scheduled"
                                  ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                                  : item.status === "Draft"
                                    ? "bg-sky-500/10 text-sky-400 border-sky-500/20"
                                    : colorMode
                                      ? "bg-slate-800 text-slate-400 border-slate-700"
                                      : "bg-slate-100 text-slate-500 border-slate-200"
                            }`}
                          >
                            {item.status}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      {options.length > 0 && (
        <div
          className={`rounded-2xl border shadow-sm transition-all w-full px-5 py-4 ${
            colorMode
              ? "bg-slate-900 border-slate-800"
              : "bg-white border-slate-200"
          }`}
        >
          {selected.timing.type === "Duration" && (
            <p
              className={`text-sm font-medium ${
                colorMode ? "text-slate-400" : "text-slate-500"
              }`}
            >
              Quiz Schedule
            </p>
          )}

          {/* Duration / Schedule */}
          {selected.timing.type === "Duration" ? (
            <div className="flex h-full items-center justify-between">
              <div>
                <div className="mt-1 flex items-end gap-2">
                  <h3
                    className={`text-4xl font-bold ${
                      colorMode ? "text-white" : "text-slate-900"
                    }`}
                  >
                    {selected?.timing?.durationMinutes ?? "--"}
                  </h3>

                  <span
                    className={`mb-1 text-sm font-medium ${
                      colorMode ? "text-slate-400" : "text-slate-500"
                    }`}
                  >
                    min
                  </span>
                </div>

                <div
                  className={`mt-3 inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
                    colorMode
                      ? "bg-blue-500/10 text-blue-400"
                      : "bg-blue-50 text-blue-600"
                  }`}
                >
                  ⏱ Duration Mode
                </div>
              </div>

              <div
                className={`flex h-16 w-16 items-center justify-center rounded-2xl ${
                  colorMode ? "bg-slate-800" : "bg-slate-100"
                }`}
              >
                <Clock3
                  size={30}
                  className={colorMode ? "text-blue-400" : "text-blue-600"}
                />
              </div>
            </div>
          ) : (
            <div className="flex h-full flex-col justify-center px-5 overflow-hidden ">
              {/* Timeline */}
              <div
                className={` rounded-xl border px-3 py-2 text-sm ${
                  colorMode
                    ? "border-slate-800 bg-slate-800/50 text-slate-300"
                    : "border-slate-200 bg-slate-50 text-slate-700"
                }`}
              >
                {formatDate(selected.timing.startTime)}
              </div>
              <div className="flex items-center gap-3 my-2">
                <div className="text-center">
                  <p
                    className={`text-x font-bold ${
                      colorMode ? "text-white" : "text-slate-900"
                    }`}
                  >
                    {formatTime(selected?.timing?.startTime)}
                  </p>

                  <p
                    className={`text-xs ${
                      colorMode ? "text-slate-500" : "text-slate-400"
                    }`}
                  >
                    Start
                  </p>
                </div>

                <div className="relative flex-1">
                  <div
                    className={`h-1 rounded-full ${
                      colorMode ? "bg-slate-700" : "bg-slate-300"
                    }`}
                  />

                  <div className="absolute left-0 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-emerald-500" />

                  <div className="absolute right-0 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-red-500" />
                </div>

                <div className="text-center">
                  <p
                    className={`text-x font-bold ${
                      colorMode ? "text-white" : "text-slate-900"
                    }`}
                  >
                    {formatTime(selected?.timing?.endTime)}
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
              <div
                className={`flex  gap-2 items-center rounded-xl border px-3 py-2 text-sm ${
                  colorMode
                    ? "border-slate-800 bg-slate-800/50 text-slate-300"
                    : "border-slate-200 bg-slate-50 text-slate-700"
                }`}
              >
                <ClockFading size={18} /> Starts in{" "}
                <span className="font-semibold">8h 42m</span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
