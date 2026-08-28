import React, { useContext } from "react";
import { CircleDot, ChevronDown } from "lucide-react";
import AdminContext from "../../context/adminContext/adminContext";

function StatusField() {
  const { quizMeta, setQuizMeta, colorMode } = useContext(AdminContext);
 
  const getStatusTheme = () => {
    const status = quizMeta.status || "Draft";
    if (status === "Open") {
      return colorMode
        ? "bg-emerald-500/15 text-emerald-400 group-focus-within:bg-emerald-500/25"
        : "bg-emerald-50 text-emerald-600 group-focus-within:bg-emerald-100";
    }
    if (status === "Closed") {
      return colorMode
        ? "bg-rose-500/15 text-rose-400 group-focus-within:bg-rose-500/25"
        : "bg-rose-50 text-rose-600 group-focus-within:bg-rose-100";
    } 
    return colorMode
      ? "bg-slate-800/80 text-slate-400 group-focus-within:bg-slate-700"
      : "bg-slate-100 text-slate-500 group-focus-within:bg-slate-200";
  };

  return (
    <div
      className={`group relative flex items-center h-10 max-w-sm rounded-xl border px-3 gap-2.5 text-sm transition-all duration-200 shadow-sm select-none
      ${
        colorMode
          ? "bg-slate-900/90 border-slate-800 hover:border-slate-700 focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-500/15"
          : "bg-white border-slate-200 hover:border-slate-300 focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-500/10"
      }`}
    > 
      <div
        className={`flex items-center justify-center w-7 h-7 rounded-lg transition-colors duration-300 shrink-0 ${getStatusTheme()}`}
      >
        <CircleDot size={14} strokeWidth={2.2} />
      </div>
 
      <div
        className={`h-4 w-px shrink-0 ${
          colorMode ? "bg-slate-800" : "bg-slate-200"
        }`}
      />
 
      <span
        className={`text-sm shrink-0 transition-colors ${
          colorMode ? "text-slate-500" : "text-slate-400"
        }`}
      >
        Status:
      </span>
 
      <div className="relative flex-1 flex items-center h-full">
        <select
          id="quiz-status-select"
          aria-label="Quiz Status"
          value={quizMeta.status || "Draft"}
          onChange={(e) =>
            setQuizMeta((prev) => ({
              ...prev,
              status: e.target.value,
            }))
          }
          className={`w-full h-full appearance-none bg-transparent outline-none cursor-pointer text-sm font-medium transition-colors z-10 pr-6 ${
            colorMode ? "text-slate-100" : "text-slate-800"
          }`}
        >
          <option value="Draft" className={colorMode ? "bg-slate-800 text-slate-100" : "bg-white text-slate-900"}>
            Draft
          </option>
          <option value="Open" className={colorMode ? "bg-slate-800 text-slate-100" : "bg-white text-slate-900"}>
            Open
          </option>
          <option value="Closed" className={colorMode ? "bg-slate-800 text-slate-100" : "bg-white text-slate-900"}>
            Closed
          </option>
        </select>
 
        <ChevronDown
          size={14}
          className={`absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none transition-all duration-200 opacity-40 group-hover:opacity-75 group-focus-within:opacity-100 ${
            colorMode
              ? "text-slate-400 group-focus-within:text-indigo-400"
              : "text-slate-400 group-focus-within:text-indigo-600"
          }`}
        />
      </div>
    </div>
  );
}

export default StatusField;