import React from "react";
import { Clock3 } from "lucide-react";

function TimeLimitField({ value, onChange, colorMode }) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <Clock3
          size={15}
          className={colorMode ? "text-slate-400" : "text-slate-500"}
        />

        <label
          className={`text-xs font-semibold ${
            colorMode ? "text-slate-300" : "text-slate-700"
          }`}
        >
          Time Limit
        </label>
      </div>

      <div className="relative">
        <input
          type="number"
          min="1"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          placeholder="30"
          className={`
            w-full h-10 pl-3 pr-20 rounded-lg border
            outline-none text-sm font-medium
            transition-all
            ${
              colorMode
                ? `
                  bg-slate-950
                  border-slate-700
                  text-slate-100
                  placeholder:text-slate-600
                  focus:border-indigo-500
                  focus:ring-2
                  focus:ring-indigo-500/10
                `
                : `
                  bg-white
                  border-slate-200
                  text-slate-800
                  placeholder:text-slate-400
                  focus:border-indigo-500
                  focus:ring-2
                  focus:ring-indigo-500/10
                `
            }
          `}
        />

        <span
          className={`
            absolute right-3 top-1/2
            -translate-y-1/2
            text-xs font-medium
            ${
              colorMode
                ? "text-slate-500"
                : "text-slate-400"
            }
          `}
        >
          minutes
        </span>
      </div>

      <p className="mt-1.5 text-[11px] text-slate-500">
        Time available for each user's quiz attempt.
      </p>
    </div>
  );
}

export default TimeLimitField;