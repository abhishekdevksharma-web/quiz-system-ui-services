import React, { useContext } from "react";
import { BookOpen, Pencil } from "lucide-react";
import AdminContext from "../../context/adminContext/adminContext";

function SubjectField() {
  const { quizMeta, setQuizMeta, colorMode } = useContext(AdminContext);

  return (
    <div
      className={`
        group flex items-center h-10 rounded-xl border px-3 gap-2.5
        text-sm transition-all duration-200
        shadow-sm
        ${
          colorMode
            ? `
              bg-slate-900/90
              border-slate-700
              text-slate-100
              hover:border-slate-600
              focus-within:border-indigo-500
              focus-within:ring-2
              focus-within:ring-indigo-500/10
            `
            : `
              bg-white
              border-slate-200
              text-slate-900
              hover:border-slate-300
              focus-within:border-indigo-500
              focus-within:ring-2
              focus-within:ring-indigo-500/10
            `
        }
      `}
    >
      {/* Subject Icon */}
      <div
        className={`
          flex items-center justify-center shrink-0
          w-6 h-6 rounded-md
          ${
            colorMode
              ? "bg-slate-800 text-slate-400"
              : "bg-slate-100 text-slate-500"
          }
        `}
      >
        <BookOpen size={14} strokeWidth={2} />
      </div>

      {/* Divider */}
      <span
        className={`h-5 w-px ${
          colorMode ? "bg-slate-700" : "bg-slate-200"
        }`}
      />

      {/* Subject Input */}
      <input
        required
        type="text"
        value={quizMeta.subject}
        onChange={(e) =>
          setQuizMeta((prev) => ({
            ...prev,
            subject: e.target.value,
          }))
        }
        placeholder="Subject"
        className={`
          min-w-20 flex-1 bg-transparent outline-none
          text-sm font-medium
          ${
            colorMode
              ? "text-slate-100 placeholder:text-slate-500"
              : "text-slate-800 placeholder:text-slate-400"
          }
        `}
      />

      {/* Edit Icon */}
      <div
        className={`
          flex items-center justify-center shrink-0
          w-6 h-6 rounded-md transition-all duration-200
          group-focus-within:text-indigo-500
          ${
            colorMode
              ? "text-slate-500 group-hover:bg-slate-800"
              : "text-slate-400 group-hover:bg-slate-100"
          }
        `}
      >
        <Pencil size={13} strokeWidth={2} />
      </div>
    </div>
  );
}

export default SubjectField;