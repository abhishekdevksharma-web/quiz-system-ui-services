import React, { useContext } from "react";
import { FileText, Pencil } from "lucide-react";
import AdminContext from "../../context/adminContext/adminContext";

function TitleField() {
  const { quizMeta, setQuizMeta, colorMode } = useContext(AdminContext);

  return (
    <div
      className={`flex flex-1 items-center h-9 rounded-lg border px-3 gap-2 text-sm transition-all
      ${
        colorMode
          ? "bg-slate-900 border-slate-700 text-slate-100 focus-within:border-indigo-500"
          : "bg-white border-slate-300 text-slate-900 focus-within:border-indigo-500"
      }`}
    >
      <FileText
        size={16}
        className={colorMode ? "text-slate-400" : "text-slate-500"}
      />

      {/* <span
        className={`text-xs font-medium ${
          colorMode ? "text-slate-400" : "text-slate-500"
        }`}
      >
        Title
      </span> */}

      {/* Divider */}
      <span className="mx-1 text-slate-400">|</span>

      <input
        required
        type="text"
        value={quizMeta.title}
        onChange={(e) =>
          setQuizMeta((prev) => ({
            ...prev,
            title: e.target.value,
          }))
        }
        placeholder="Quiz Title"
        className="w-30 bg-transparent outline-none text-sm placeholder:text-slate-400"
      />

      <Pencil
        size={14}
        className={colorMode ? "text-slate-400" : "text-slate-500"}
      />
    </div>
  );
}

export default TitleField;
