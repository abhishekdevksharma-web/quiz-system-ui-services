import React, { useContext } from "react";
import { CircleDot, ChevronDown } from "lucide-react";
import AdminContext from "../../context/adminContext/adminContext";

function StatusField() {
  const { quizMeta, setQuizMeta, colorMode } = useContext(AdminContext);

  return (
    <div
      className={`relative flex flex-1 items-center h-9 rounded-lg border px-3 gap-2 text-sm
      ${
        colorMode
          ? "bg-slate-900 border-slate-700 text-slate-100"
          : "bg-white border-slate-300 text-slate-900"
      }`}
    >
      <CircleDot
        size={16}
        className={colorMode ? "text-slate-400" : "text-slate-500"}
      />

      <span
        className={`text-xs font-medium ${
          colorMode ? "text-slate-400" : "text-slate-500"
        }`}
      >
        Status
      </span>

      <span className="mx-1 text-slate-400">|</span>

      <div className="relative">
        <select
          value={quizMeta.status}
          onChange={(e) =>
            setQuizMeta((prev) => ({
              ...prev,
              status: e.target.value,
            }))
          }
          className="appearance-none bg-transparent pr-6 outline-none cursor-pointer text-sm"
        >
          <option className="bg-white text-slate-900" value="Draft">
            Draft
          </option>
          <option className="bg-white text-slate-900" value="Open">
            Open
          </option>
          <option className="bg-white text-slate-900" value="Closed">
            Closed
          </option>
        </select>

        {/* Arrow */}
        <ChevronDown
          size={14}
          className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-slate-400"
        />
      </div>
    </div>
  );
}

export default StatusField;
