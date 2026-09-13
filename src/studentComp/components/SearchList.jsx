import React from "react";
import { ArrowRight, Layers } from "lucide-react";

function SearchList({ quiz, onSelect }) {
  return (
    <div
      onClick={ onSelect}
      className="group relative flex items-center justify-between gap-3 px-3 py-3 rounded-xl border border-slate-800 bg-slate-900/40 cursor-pointer transition-all duration-200 hover:bg-slate-800/80 hover:border-indigo-500/30 hover:shadow-lg hover:shadow-indigo-500/5"
    >
      <div className="flex items-center gap-3 min-w-0">
        <div className="shrink-0 h-10 w-10 rounded-xl flex items-center justify-center bg-linear-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/20 group-hover:border-indigo-400/40 transition-all">
          <Layers size={18} className="text-indigo-400" />
        </div>

        <div className="min-w-0">
          <div className="flex items-center gap-2 min-w-0">
            <h3 className="text-sm font-bold text-slate-200 truncate group-hover:text-white transition-colors">
              {quiz.title}
            </h3>

            <span
              className={`shrink-0 px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wide ${
                quiz.status === "Open"
                  ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                  : quiz.status === "Scheduled"
                    ? "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20"
                    : "bg-slate-500/10 text-slate-400 border border-slate-500/20"
              }`}
            >
              {quiz.status}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mt-1.5 text-[11px]">
            <span className="text-indigo-400 font-semibold">
              {quiz.subject}
            </span>

            <span className="text-slate-700">•</span>

            <span className="px-1.5 py-0.5 rounded bg-yellow-500/10 text-yellow-400 font-semibold">
              {quiz.difficulty}
            </span>

            <span className="text-slate-700">•</span>

            <span className="text-slate-500">
              {quiz.totalQuestions} Questions
            </span>

            <span className="text-slate-700">•</span>

            <span className="text-purple-400 font-medium">
              {quiz.timing?.durationMinutes} min
            </span>
          </div>
        </div>
      </div>

      <div className="shrink-0 h-8 w-8 rounded-lg flex items-center justify-center bg-slate-800/60 text-slate-600 group-hover:bg-indigo-500/15 group-hover:text-indigo-400 group-hover:translate-x-0.5 transition-all">
        <ArrowRight size={15} />
      </div>
    </div>
  );
}

export default SearchList;
