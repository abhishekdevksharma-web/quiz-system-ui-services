import React, { useContext } from "react";
import { Clock3, Timer, Info, Sparkles } from "lucide-react";
import AdminContext from "../../../context/adminContext/adminContext";

function TimeLimitField({ colorMode }) {
  const { quizMeta, setQuizMeta } = useContext(AdminContext);
  const presets = [15, 30, 45, 60];
  const handleChange = (e) => {
    const rawValue = e.target.value;

    if (rawValue === "") {
      setQuizMeta((prev) => ({
        ...prev,
        userTimeLimit: "",
      }));
      return;
    }

    const number = Number(rawValue);

    if (number >= 0 && number <= 9999) {
      setQuizMeta((prev) => ({
        ...prev,
        userTimeLimit: number,
      }));
    }
  };

  const handlePresetChange = (minutes) => {
    setQuizMeta((prev) => ({
      ...prev,
      userTimeLimit: minutes,
    }));
  };
  return (
    <div
      className={`relative overflow-hidden rounded-xl border p-2.5 ${
        colorMode
          ? "border-indigo-500/20 bg-slate-950/70"
          : "border-indigo-100 bg-white"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div
            className={`flex h-7 w-7 items-center justify-center rounded-lg ${
              colorMode
                ? "bg-indigo-500/15 text-indigo-400"
                : "bg-indigo-50 text-indigo-600"
            }`}
          >
            <Clock3 size={14} />
          </div>

          <div>
            <label
              className={`block text-[11px] font-bold ${
                colorMode ? "text-slate-100" : "text-slate-800"
              }`}
            >
              Time Limit
            </label>

            <span
              className={`block text-[9px] ${
                colorMode ? "text-slate-500" : "text-slate-400"
              }`}
            >
              Per attempt
            </span>
          </div>
        </div>

        <div
          className={`flex items-center gap-1 text-[9px] ${
            colorMode ? "text-amber-400" : "text-amber-600"
          }`}
        >
          <Info size={10} />
          Optional
        </div>
      </div>

      {/* Input + Quick Select */}
      <div className="mt-2 flex items-center gap-3">
        {/* Input */}
        <div className="relative flex-1">
          <Timer
            size={15}
            strokeWidth={2.2}
            className={`pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 ${
              colorMode ? "text-indigo-400" : "text-indigo-500"
            }`}
          />

          <input
            type="number"
            min="1"
            max="9999"
            value={quizMeta.userTimeLimit}
            onChange={handleChange}
            placeholder="30"
            aria-label="Time limit in minutes"
            className={`h-11 w-full rounded-xl border pl-9 pr-14 text-sm font-bold outline-none transition-all duration-200 ${
              colorMode
                ? "border-slate-800/80 bg-slate-900/80 text-slate-100 placeholder:text-slate-600 hover:border-slate-700 focus:border-indigo-500 focus:bg-slate-900 focus:ring-4 focus:ring-indigo-500/10"
                : "border-slate-200 bg-slate-50 text-slate-800 placeholder:text-slate-400 hover:border-slate-300 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
            }`}
          />

          <span
            className={`absolute right-1.5 top-1/2 -translate-y-1/2 rounded-lg px-2.5 py-1.5 text-[9px] font-bold ${
              colorMode
                ? "bg-indigo-500/10 text-indigo-400"
                : "bg-indigo-50 text-indigo-600"
            }`}
          >
            min
          </span>
        </div>

        {/* Quick Select */}
        <div className="shrink-0">
          <div className="flex items-center gap-1.5">
            {presets.map((minutes, index) => {
              const active = Number(quizMeta.userTimeLimit) === minutes;

              const colors = [
                active
                  ? colorMode
                    ? "border-cyan-400/40 bg-cyan-400/10 text-cyan-300 shadow-sm shadow-cyan-500/10"
                    : "border-cyan-200 bg-cyan-50 text-cyan-600"
                  : colorMode
                    ? "border-slate-800 bg-slate-900/50 text-slate-500 hover:border-cyan-500/30 hover:bg-cyan-500/5 hover:text-cyan-400"
                    : "border-slate-200 bg-white text-slate-500 hover:border-cyan-200 hover:bg-cyan-50/50 hover:text-cyan-600",

                active
                  ? colorMode
                    ? "border-blue-400/40 bg-blue-400/10 text-blue-300 shadow-sm shadow-blue-500/10"
                    : "border-blue-200 bg-blue-50 text-blue-600"
                  : colorMode
                    ? "border-slate-800 bg-slate-900/50 text-slate-500 hover:border-blue-500/30 hover:bg-blue-500/5 hover:text-blue-400"
                    : "border-slate-200 bg-white text-slate-500 hover:border-blue-200 hover:bg-blue-50/50 hover:text-blue-600",

                active
                  ? colorMode
                    ? "border-violet-400/40 bg-violet-400/10 text-violet-300 shadow-sm shadow-violet-500/10"
                    : "border-violet-200 bg-violet-50 text-violet-600"
                  : colorMode
                    ? "border-slate-800 bg-slate-900/50 text-slate-500 hover:border-violet-500/30 hover:bg-violet-500/5 hover:text-violet-400"
                    : "border-slate-200 bg-white text-slate-500 hover:border-violet-200 hover:bg-violet-50/50 hover:text-violet-600",

                active
                  ? colorMode
                    ? "border-pink-400/40 bg-pink-400/10 text-pink-300 shadow-sm shadow-pink-500/10"
                    : "border-pink-200 bg-pink-50 text-pink-600"
                  : colorMode
                    ? "border-slate-800 bg-slate-900/50 text-slate-500 hover:border-pink-500/30 hover:bg-pink-500/5 hover:text-pink-400"
                    : "border-slate-200 bg-white text-slate-500 hover:border-pink-200 hover:bg-pink-50/50 hover:text-pink-600",
              ];

              return (
                <button
                  key={minutes}
                  type="button"
                  onClick={() => handlePresetChange(minutes)}
                  className={`h-8 min-w-10 rounded-lg border px-2 text-[9px] font-bold transition-all duration-150 active:scale-95 ${colors[index]}`}
                >
                  {minutes}m
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TimeLimitField;
