import React, { useContext, useEffect, useRef, useState } from "react";
import {
  BookOpen,
  ChevronDown,
  Search,
  Columns2,
  Filter,
  RotateCcw,
  LayoutGrid,
  List,
  Layers,
  ArrowUpDown,
  Check,
} from "lucide-react";

import StudentContext from "../../context//studentContext//studentContext.js";
import HistoryList from "./HistoryList";
import HistoryCard from "./HistoryCard";
import { handFetchStudentQuizApi } from "../../services/student.service.js";

export default function StudentQuizHistory() {
  const { colorMode, studentIsAuth } = useContext(StudentContext);

  const [search, setSearch] = useState("");

  const [subject, setSubject] = useState("All Subjects");
  const [subjectOptions, setSubjectOptions] = useState([]);

  const [status, setStatus] = useState("All Status");
  const [sort, setSort] = useState("Newest First");
  const [viewMode, setViewMode] = useState("double");
  const [openMenu, setOpenMenu] = useState(null);

  const [pageNumber, setPageNumber] = useState(0);
  const [quizHistory, setQuizHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!studentIsAuth) return;

    const fetchQuizHistory = async () => {
      try {
        setLoading(true);

        const response = await handFetchStudentQuizApi(pageNumber, 10);

        if (response.success) {
          setQuizHistory(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch quiz history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizHistory();
  }, [studentIsAuth, pageNumber]);

  useEffect(() => {
    const uniqueSubjects = [
      ...new Set(
        quizHistory.map((item) => item.quizMeta?.subject).filter(Boolean),
      ),
    ];

    setSubjectOptions(uniqueSubjects);
  }, [quizHistory]);

  const menuRef = useRef(null);

  const filteredHistory = quizHistory
    .filter((item) => {
      // Search
      const searchText = search.trim().toLowerCase();

      if (searchText) {
        const matchesSearch =
          item.quizMeta.title?.toLowerCase().includes(searchText) ||
          item.quizMeta.subject?.toLowerCase().includes(searchText);

        if (!matchesSearch) return false;
      }

      // Subject
      if (subject !== "All Subjects" && item.quizMeta.subject !== subject) {
        return false;
      }

      // Status
      if (status !== "All Status") {
        if (status === "Completed") {
          return item.notAnswered === 0;
        }

        if (status === "Missed") {
          return item.notAnswered === item.answer?.length;
        }

        if (status === "In Progress") {
          return false;
        }
      }

      return true;
    })
    .sort((a, b) => {
      switch (sort) {
        case "Newest First":
          return new Date(b.createdAt) - new Date(a.createdAt);

        case "Oldest First":
          return new Date(a.createdAt) - new Date(b.createdAt);

        case "Highest Score":
          return (b.percentage || 0) - (a.percentage || 0);

        case "Duration":
          return (b.submittedInSec || 0) - (a.submittedInSec || 0);

        default:
          return 0;
      }
    });

  const statuses = ["All Status"];

  const sortOptions = [
    "Newest First",
    "Highest Score",
    "Duration",
    "Oldest First",
  ];

  /* Close dropdown on outside click */
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenu(null);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setOpenMenu(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const hasFilters =
    search.trim() ||
    subject !== "All Subjects" ||
    status !== "All Status" ||
    sort !== "Newest First";

  const clearFilters = () => {
    setSearch("");
    setSubject("All Subjects");
    setStatus("All Status");
    setSort("Newest First");
    setOpenMenu(null);
  };

  const toggleMenu = (menu) => {
    setOpenMenu((prev) => (prev === menu ? null : menu));
  };

  return (
    <div
      className={`min-h-screen px-4 py-4 sm:px-6 md:px-8 ${
        colorMode ? "bg-[#080d1c] text-slate-100" : "bg-slate-50 text-slate-900"
      }`}
    >
      {/* =====================================================
          FIXED FILTER BAR
      ====================================================== */}

      <div
        ref={menuRef}
        className={`fixed left-4 right-4 top-[76px] z-50 rounded-xl border p-2 shadow-xl backdrop-blur-xl sm:left-6 sm:right-6 md:left-8 md:right-8 ${
          colorMode
            ? "border-slate-800/80 bg-[#0d1528]/95 shadow-black/30"
            : "border-slate-200 bg-white/95 shadow-slate-200/60"
        }`}
      >
        <div className="flex flex-col gap-2 lg:flex-row lg:items-center">
          {/* Search */}
          <div className="relative min-w-0 flex-1 lg:min-w-60">
            <Search
              size={15}
              strokeWidth={2}
              className={`absolute left-3 top-1/2 -translate-y-1/2 ${
                colorMode ? "text-slate-500" : "text-slate-400"
              }`}
            />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by topic, tag or title..."
              className={`h-9 w-full rounded-lg border pl-9 pr-8 text-xs outline-none transition-all sm:text-sm ${
                colorMode
                  ? "border-slate-800/80 bg-[#131c33] text-white placeholder:text-slate-500 focus:border-indigo-500/70 focus:ring-2 focus:ring-indigo-500/10"
                  : "border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-500/10"
              }`}
            />

            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className={`absolute right-2.5 top-1/2 -translate-y-1/2 cursor-pointer text-sm ${
                  colorMode
                    ? "text-slate-500 hover:text-slate-200"
                    : "text-slate-400 hover:text-slate-700"
                }`}
              >
                ×
              </button>
            )}
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
            <Dropdown
              icon={BookOpen}
              label={subject}
              value={subject}
              options={subjectOptions}
              isOpen={openMenu === "subject"}
              onToggle={() => toggleMenu("subject")}
              onSelect={(value) => {
                setSubject(value);
                setOpenMenu(null);
              }}
              colorMode={colorMode}
            />

            <Dropdown
              icon={Filter}
              label={status}
              value={status}
              options={statuses}
              isOpen={openMenu === "status"}
              onToggle={() => toggleMenu("status")}
              onSelect={(value) => {
                setStatus(value);
                setOpenMenu(null);
              }}
              colorMode={colorMode}
            />

            <Dropdown
              icon={ArrowUpDown}
              label={sort}
              value={sort}
              options={sortOptions}
              isOpen={openMenu === "sort"}
              onToggle={() => toggleMenu("sort")}
              onSelect={(value) => {
                setSort(value);
                setOpenMenu(null);
              }}
              colorMode={colorMode}
            />
          </div>

          {/* View Switcher */}
          <div className="flex items-center justify-between gap-2 lg:justify-start">
            <div
              className={`flex h-9 rounded-lg border p-0.5 ${
                colorMode
                  ? "border-slate-800 bg-[#131c33]"
                  : "border-slate-200 bg-slate-100"
              }`}
            >
              {/* List */}
              <ViewButton
                active={viewMode === "list"}
                onClick={() => setViewMode("list")}
                title="Single List View"
                colorMode={colorMode}
              >
                <List size={15} />
              </ViewButton>

              {/* Double */}
              <ViewButton
                active={viewMode === "double"}
                onClick={() => setViewMode("double")}
                title="Double Column View"
                colorMode={colorMode}
              >
                <Columns2 size={15} />
              </ViewButton>

              {/* Grid */}
              <ViewButton
                active={viewMode === "grid"}
                onClick={() => setViewMode("grid")}
                title="Grid View"
                colorMode={colorMode}
              >
                <LayoutGrid size={15} />
              </ViewButton>
            </div>

            {/* Reset */}
            {hasFilters && (
              <button
                type="button"
                onClick={clearFilters}
                title="Reset Filters"
                className={`flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-lg border transition-all ${
                  colorMode
                    ? "border-slate-800 bg-[#131c33] text-slate-400 hover:border-rose-500/30 hover:bg-rose-500/10 hover:text-rose-400"
                    : "border-slate-200 bg-slate-50 text-slate-500 hover:border-rose-200 hover:bg-rose-50 hover:text-rose-500"
                }`}
              >
                <RotateCcw size={13} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* =====================================================
          CONTENT
      ====================================================== */}

      {/* 58px = fixed filter height reserve */}
      <main className="pt-[58px]">
        <div
          className={`min-h-[calc(100vh-145px)] rounded-2xl border p-3 sm:p-4 ${
            colorMode
              ? "border-slate-800/70 bg-[#0b1222]"
              : "border-slate-200/80 bg-white"
          }`}
        >
          {/* History Content */}
          {loading ? (
            <HistoryLoading colorMode={colorMode} />
          ) : quizHistory.length === 0 ? (
            <EmptyState colorMode={colorMode} />
          ) : filteredHistory.length === 0 ? (
            <div className="flex min-h-[420px] items-center justify-center">
              <div className="text-center">
                <div
                  className={`mx-auto flex h-12 w-12 items-center justify-center rounded-xl ${
                    colorMode
                      ? "bg-slate-800 text-slate-400"
                      : "bg-slate-100 text-slate-400"
                  }`}
                >
                  <Search size={20} />
                </div>

                <h3
                  className={`mt-3 text-sm font-semibold ${
                    colorMode ? "text-slate-100" : "text-slate-800"
                  }`}
                >
                  No matching quizzes
                </h3>

                <p
                  className={`mt-1 text-xs ${
                    colorMode ? "text-slate-500" : "text-slate-500"
                  }`}
                >
                  Try changing your search or filters.
                </p>

                <button
                  onClick={clearFilters}
                  className="mt-3 text-xs font-semibold text-indigo-500 hover:text-indigo-600"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* History View */}
              {viewMode === "list" ? (
                // LIST VIEW
                <div className="flex flex-col gap-2.5">
                  {quizHistory.map((item) => (
                    <HistoryList
                      key={item._id}
                      quiz={item}
                      colorMode={colorMode}
                    />
                  ))}
                </div>
              ) : viewMode === "double" ? (
                // DOUBLE VIEW
                <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
                  {quizHistory.map((item) => (
                    <HistoryList
                      key={item._id}
                      quiz={item}
                      colorMode={colorMode}
                    />
                  ))}
                </div>
              ) : (
                // GRID VIEW
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {quizHistory.map((item) => (
                    <HistoryCard
                      key={item._id}
                      quiz={item}
                      colorMode={colorMode}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}

/* =========================================================
   DROPDOWN
========================================================= */

function Dropdown({
  icon: Icon,
  label,
  value,
  options,
  isOpen,
  onToggle,
  onSelect,
  colorMode,
}) {
  return (
    <div className="relative min-w-0 sm:w-[180px]">
      <button
        type="button"
        onClick={onToggle}
        className={`flex h-9 w-full cursor-pointer items-center justify-between rounded-lg border px-2.5 text-xs transition-all ${
          isOpen
            ? colorMode
              ? "border-indigo-500/60 bg-indigo-500/5 ring-2 ring-indigo-500/10"
              : "border-indigo-400 bg-indigo-50/40 ring-2 ring-indigo-500/10"
            : colorMode
              ? "border-slate-800/80 bg-[#131c33] text-slate-200 hover:border-slate-700"
              : "border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300 hover:bg-white"
        }`}
      >
        <span className="flex min-w-0 items-center gap-2">
          <Icon
            size={14}
            strokeWidth={1.8}
            className={`shrink-0 ${
              isOpen
                ? "text-indigo-400"
                : colorMode
                  ? "text-slate-500"
                  : "text-slate-400"
            }`}
          />

          <span className="truncate">{label}</span>
        </span>

        <ChevronDown
          size={13}
          className={`ml-2 shrink-0 transition-transform duration-150 ${
            isOpen
              ? "rotate-180 text-indigo-400"
              : colorMode
                ? "text-slate-500"
                : "text-slate-400"
          }`}
        />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div
          className={`absolute left-0 top-[calc(100%+6px)] z-100 max-h-60 w-full min-w-[180px] overflow-y-auto rounded-xl border p-1.5 shadow-2xl ${
            colorMode
              ? "border-slate-700/80 bg-[#101a30] shadow-black/50"
              : "border-slate-200 bg-white shadow-slate-300/40"
          }`}
        >
          {options.map((option) => {
            const selected = option === value;

            return (
              <button
                key={option}
                type="button"
                onClick={() => onSelect(option)}
                className={`flex w-full cursor-pointer items-center justify-between rounded-lg px-2.5 py-2 text-left text-xs transition-all ${
                  selected
                    ? colorMode
                      ? "bg-indigo-500/10 font-medium text-indigo-400"
                      : "bg-indigo-50 font-medium text-indigo-600"
                    : colorMode
                      ? "text-slate-300 hover:bg-slate-800/70 hover:text-white"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <span>{option}</span>

                {selected && (
                  <Check
                    size={13}
                    strokeWidth={2.5}
                    className="text-indigo-500"
                  />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* =========================================================
   VIEW BUTTON
========================================================= */

function ViewButton({ active, onClick, title, colorMode, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={`flex h-full w-8 cursor-pointer items-center justify-center rounded-md transition-all ${
        active
          ? colorMode
            ? "bg-indigo-600 text-white shadow-sm"
            : "bg-white text-indigo-600 shadow-sm"
          : colorMode
            ? "text-slate-500 hover:bg-slate-800/60 hover:text-slate-200"
            : "text-slate-400 hover:bg-white/70 hover:text-slate-600"
      }`}
    >
      {children}
    </button>
  );
}

/* =========================================================
   EMPTY STATE
========================================================= */

function EmptyState({ colorMode }) {
  return (
    <div className="flex min-h-[420px] items-center justify-center px-4">
      <div className="flex max-w-sm flex-col items-center text-center">
        <h3
          className={`text-base font-semibold sm:text-lg ${
            colorMode ? "text-slate-100" : "text-slate-900"
          }`}
        >
          No Quiz History Yet
        </h3>

        <p
          className={`mt-1.5 max-w-xs text-xs leading-5 sm:text-sm ${
            colorMode ? "text-slate-500" : "text-slate-500"
          }`}
        >
          You haven't attempted any quizzes yet. Start practicing to build your
          quiz history.
        </p>

        <button
          type="button"
          className="mt-4 flex cursor-pointer items-center gap-1.5 rounded-lg bg-linear -to-r from-indigo-600 to-violet-600 px-4 py-2 text-xs font-medium text-white shadow-md shadow-indigo-600/20 transition-all hover:-translate-y-0.5 hover:from-indigo-500 hover:to-violet-500"
        >
          Explore Quizzes
        </button>
      </div>
    </div>
  );
}
function HistoryLoading({ colorMode }) {
  return (
    <div className="flex min-h-[calc(100vh-190px)] items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div
          className={`h-8 w-8 animate-spin rounded-full border-2 border-t-transparent ${
            colorMode
              ? "border-indigo-400 border-t-transparent"
              : "border-indigo-600 border-t-transparent"
          }`}
        />

        <p
          className={`text-xs font-medium ${
            colorMode ? "text-slate-500" : "text-slate-400"
          }`}
        >
          Loading history...
        </p>
      </div>
    </div>
  );
}
