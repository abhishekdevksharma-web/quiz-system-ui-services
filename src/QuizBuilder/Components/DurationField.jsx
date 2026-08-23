import React, { useContext } from "react";
import { Clock, Pencil } from "lucide-react";
import AdminContext from "../../context/adminContext/adminContext";

function DurationField() {
  const { quizMeta, setQuizMeta, colorMode } = useContext(AdminContext);

  return (
    <div
      className={`flex flex-1 items-center h-9 rounded-lg border px-2 gap-2 text-sm transition-all
      ${
        colorMode
          ? "bg-slate-900 border-slate-700 text-slate-100 focus-within:border-indigo-500"
          : "bg-white border-slate-300 text-slate-900 focus-within:border-indigo-500"
      }`}
    >
       
      <Clock
        size={16}
        className={colorMode ? "text-slate-400" : "text-slate-500"}
      />

       
      <span
        className={`text-xs font-medium ${
          colorMode ? "text-slate-400" : "text-slate-500"
        }`}
      >
        Duration
      </span>

       
      <span className="mx-1 text-slate-400">|</span>

       
      <button
        onClick={() =>
          setQuizMeta((prev) => ({
            ...prev,
            durationMinutes: Math.max(0, Number(prev.durationMinutes) - 1),
          }))
        }
        className={`h-6 w-6 flex items-center justify-center rounded border-2 border-white/10
          ${
            colorMode
              ? "hover:bg-slate-800 text-slate-400"
              : "hover:bg-slate-100 text-slate-500"
          }`}
      >
        −
      </button>

       
      <input
        type="number"
        value={quizMeta.durationMinutes}
        onChange={(e) =>
          setQuizMeta((prev) => ({
            ...prev,
            durationMinutes: Number(e.target.value),
          }))
        }
        className="w-10 bg-transparent text-center outline-none text-sm font-medium
        [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
      />

       
      <span
        className={`text-[10px] font-semibold px-1.5 py-0.5 rounded
        ${
          colorMode
            ? "bg-slate-800 text-slate-400"
            : "bg-slate-100 text-slate-500"
        }`}
      >
        MIN
      </span>

       
      <button
        onClick={() =>
          setQuizMeta((prev) => ({
            ...prev,
            durationMinutes: Number(prev.durationMinutes) + 1,
          }))
        }
        className={`h-6 w-6 flex items-center justify-center rounded border-2 border-white/10
          ${
            colorMode
              ? "hover:bg-slate-800 text-slate-400"
              : "hover:bg-slate-100 text-slate-500"
          }`}
      >
        +
      </button>
    </div>
  );
}

export default DurationField;
