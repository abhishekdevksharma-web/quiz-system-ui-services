import React, { useContext, useEffect, useRef, useState } from "react";
import { CircleDot, ChevronDown, Check } from "lucide-react";
import AdminContext from "../../context/adminContext/adminContext";

function StatusField() {
  const { quizMeta, setQuizMeta, colorMode } = useContext(AdminContext);

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const status = quizMeta.status || "Draft";

  const statusConfig = {
    Draft: {
      dot: "bg-amber-400",
      iconBg: colorMode
        ? "bg-amber-500/15 text-amber-400"
        : "bg-amber-50 text-amber-600",
      active: colorMode
        ? "bg-amber-500/10 text-amber-300"
        : "bg-amber-50 text-amber-700",
    },

    Open: {
      dot: "bg-emerald-400",
      iconBg: colorMode
        ? "bg-emerald-500/15 text-emerald-400"
        : "bg-emerald-50 text-emerald-600",
      active: colorMode
        ? "bg-emerald-500/10 text-emerald-300"
        : "bg-emerald-50 text-emerald-700",
    },

    Closed: {
      dot: "bg-rose-400",
      iconBg: colorMode
        ? "bg-rose-500/15 text-rose-400"
        : "bg-rose-50 text-rose-600",
      active: colorMode
        ? "bg-rose-500/10 text-rose-300"
        : "bg-rose-50 text-rose-700",
    },
  };

  const current = statusConfig[status];

  const handleStatusChange = (newStatus) => {
    setQuizMeta((prev) => ({
      ...prev,
      status: newStatus,
    }));

    setIsOpen(false);
  };

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Escape to close
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <div
      ref={dropdownRef}
      className={`group relative flex items-center h-10 max-w-sm rounded-xl border px-3 gap-2.5 text-sm transition-all duration-200 shadow-sm select-none
      ${
        colorMode
          ? "bg-slate-900/90 border-slate-800 hover:border-slate-700"
          : "bg-white border-slate-200 hover:border-slate-300"
      }
      ${
        isOpen
          ? colorMode
            ? "border-indigo-500 ring-4 ring-indigo-500/15"
            : "border-indigo-500 ring-4 ring-indigo-500/10"
          : ""
      }`}
    >
      {/* Status Icon */}
      <div
        className={`flex items-center justify-center w-7 h-7 rounded-lg shrink-0 transition-all duration-200 ${current.iconBg}`}
      >
        <CircleDot size={14} strokeWidth={2.2} />
      </div>

      {/* Divider */}
      <div
        className={`h-4 w-px shrink-0 ${
          colorMode ? "bg-slate-800" : "bg-slate-200"
        }`}
      />

      {/* Label */}
      <span
        className={`text-sm shrink-0 ${
          colorMode ? "text-slate-500" : "text-slate-400"
        }`}
      >
        Status:
      </span>

      {/* Custom Dropdown */}
      <div className="relative flex-1 min-w-0">
        {/* Selected value */}
        <button
          type="button"
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((prev) => !prev)}
          className={`w-full h-8 flex items-center justify-between gap-2 px-2 rounded-lg text-sm font-semibold outline-none transition-all duration-150
          ${
            colorMode
              ? "text-slate-100 hover:bg-slate-800/70"
              : "text-slate-800 hover:bg-slate-100"
          }`}
        >
          <span className="flex items-center gap-2">
            <span
              className={`w-1.5 h-1.5 rounded-full shrink-0 ${current.dot}`}
            />

            <span>{status}</span>
          </span>

          <ChevronDown
            size={15}
            strokeWidth={2}
            className={`shrink-0 transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            } ${
              colorMode
                ? "text-slate-500"
                : "text-slate-400"
            }`}
          />
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div
            role="listbox"
            className={`absolute left-0 right-0 top-[calc(100%+6px)] z-100
              rounded-xl border p-1.5 shadow-2xl
              animate-in fade-in zoom-in-95 duration-150
              ${
                colorMode
                  ? "bg-slate-900 border-slate-700/80 shadow-black/40"
                  : "bg-white border-slate-200 shadow-slate-300/40"
              }`}
          >
            {Object.entries(statusConfig).map(
              ([option, config]) => {
                const active = status === option;

                return (
                  <button
                    key={option}
                    type="button"
                    role="option"
                    aria-selected={active}
                    onClick={() =>
                      handleStatusChange(option)
                    }
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all duration-150
                    ${
                      active
                        ? config.active
                        : colorMode
                          ? "text-slate-400 hover:bg-slate-800 hover:text-slate-100"
                          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                    }`}
                  >
                    <span className="flex items-center gap-2.5">
                      <span
                        className={`w-2 h-2 rounded-full ${config.dot}`}
                      />

                      <span>{option}</span>
                    </span>

                    {active && (
                      <Check
                        size={15}
                        strokeWidth={2.5}
                        className={
                          colorMode
                            ? "text-indigo-400"
                            : "text-indigo-600"
                        }
                      />
                    )}
                  </button>
                );
              }
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default StatusField;