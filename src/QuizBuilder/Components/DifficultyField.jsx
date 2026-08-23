import React, { useContext, useState } from "react";
import { Gauge, ChevronDown } from "lucide-react";
import AdminContext from "../../context/adminContext/adminContext";

const levels = ["Easy", "Medium", "Hard"];

const badgeStyle = {
  Easy: "bg-emerald-100 text-emerald-700",
  Medium: "bg-green-100 text-green-700",
  Hard: "bg-rose-100 text-rose-700",
};

export default function DifficultyField() {
  const { quizMeta, setQuizMeta, colorMode } = useContext(AdminContext);

  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((p) => !p)}
        className={`flex h-9 items-center gap-2 rounded-lg border px-3 transition
        ${
          colorMode
            ? "bg-slate-900 border-slate-700"
            : "bg-white border-slate-300"
        }`}
      >
        <Gauge
          size={16}
          className={colorMode ? "text-slate-400" : "text-slate-500"}
        />

        <span className="mx-1 text-slate-400">|</span>

        <span
          className={`rounded-md px-2 py-1 text-xs font-semibold ${
            badgeStyle[quizMeta.difficulty]
          }`}
        >
          {quizMeta.difficulty}
        </span>

        <ChevronDown size={14} />
      </button>

      {open && (
        <div
          className={`absolute left-0 mt-2 w-36 rounded-lg border shadow-lg z-20
          ${
            colorMode
              ? "bg-slate-900 border-slate-700"
              : "bg-white border-slate-200"
          }`}
        >
          {levels.map((level) => (
            <button
              key={level}
              onClick={() => {
                setQuizMeta((prev) => ({
                  ...prev,
                  difficulty: level,
                }));
                setOpen(false);
              }}
              className={`flex w-full items-center justify-between px-3 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-800`}
            >
              {level}

              {quizMeta.difficulty === level && (
                <span className="text-green-500">✓</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}