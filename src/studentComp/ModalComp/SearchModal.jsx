import React, { useState, useEffect, useContext } from "react";
import {
  Search,
  X,
  Clock, 
  ArrowRight, 
} from "lucide-react";
import StudentContext from "../../context/studentContext/studentContext";
import { handleSearchQuizApi } from "../../services/quiz.service";
import SearchList from "../components/SearchList";
import { useNavigate } from "react-router-dom";

function SearchModal({ isOpen, onClose }) {
  const { colorMode } = useContext(StudentContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);
  const [quizSelect, setQuizSelect] = useState("");

  const navigate = useNavigate()

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const searchQuiz = async (value) => {
    try {
      setSearchLoading(true);

      const res = await handleSearchQuizApi(value);

      setSearchResults(res.quizzes || []);
    } catch (error) {
      console.error("Search failed:", error);
      setSearchResults([]);
    } finally {
      setTimeout(() => {
        setSearchLoading(false);
      }, 1000);
    }
  };

  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    const timer = setTimeout(() => { 
      searchQuiz(searchQuery);
    }, 400);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  if (!isOpen) return null;

  const recentSearches = [];
  const suggestions = [
    // {
    //   title: "JavaScript Fundamentals",
    //   icon: <Code size={16} />,
    //   type: "Quiz",
    // },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 pb-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div
        className={`flex flex-col justify-between relative w-full max-w-2xl min-h-[80%] overflow-hidden rounded-3xl border shadow-2xl transition-all animate-in fade-in zoom-in-95 duration-200 ${
          colorMode
            ? "border-slate-800 bg-[#0B1120] shadow-[0_0_50px_-15px_rgba(99,102,241,0.3)]"
            : "border-slate-200 bg-white shadow-indigo-500/10"
        }`}
      >
        {/* Search Input Area */}
        <div
          className={`flex items-center px-6 py-4 border-b ${colorMode ? "border-slate-800" : "border-slate-100"}`}
        >
          <Search
            size={22}
            className={colorMode ? "text-indigo-400" : "text-indigo-500"}
          />
          <input
            type="text"
            className={`flex-1 bg-transparent px-4 py-2 outline-none text-lg ${
              colorMode
                ? "text-white placeholder:text-slate-500"
                : "text-slate-900 placeholder:text-slate-400"
            }`}
            placeholder="Search for quizzes, subjects, or topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            autoFocus
          />
          {searchQuery ? (
            <button
              onClick={() => setSearchQuery("")}
              className={`rounded-full p-1 transition-colors ${colorMode ? "hover:bg-slate-800 text-slate-400" : "hover:bg-slate-100 text-slate-500"}`}
            >
              <X size={18} />
            </button>
          ) : (
            <div
              className={`hidden sm:flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-lg border ${
                colorMode
                  ? "border-slate-700 text-slate-400 bg-slate-800/50"
                  : "border-slate-200 text-slate-400 bg-slate-50"
              }`}
            >
              <span>ESC</span>
            </div>
          )}
        </div>

        {/* Modal Body */}
        <div
          className={`flex-1 overflow-y-auto px-4 py-4 sm:px-6 ${colorMode ? "bg-slate-900/50" : "bg-slate-50/50"}`}
        >
          {/* Default State (When input is empty) */}
          {!searchQuery && (
            <div className="space-y-6">
              {/* Recent Searches */}
              <div>
                <h3
                  className={`mb-3 px-2 text-xs font-bold uppercase tracking-wider ${colorMode ? "text-slate-500" : "text-slate-400"}`}
                >
                  Recent Searches
                </h3>
                <div className="space-y-1">
                  {recentSearches.map((item, index) => (
                    <button
                      key={index}
                      className={`group flex w-full items-center gap-3 rounded-2xl px-4 py-3 transition-colors ${
                        colorMode
                          ? "hover:bg-slate-800/80 text-slate-300"
                          : "hover:bg-white hover:shadow-sm text-slate-600"
                      }`}
                    >
                      <Clock
                        size={16}
                        className={
                          colorMode ? "text-slate-500" : "text-slate-400"
                        }
                      />
                      <span className="flex-1 text-left text-sm font-medium">
                        {item}
                      </span>
                      <ArrowRight
                        size={16}
                        className={`opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-1 ${colorMode ? "text-indigo-400" : "text-indigo-500"}`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Suggestions */}
              <div>
                <h3
                  className={`mb-3 px-2 text-xs font-bold uppercase tracking-wider ${colorMode ? "text-slate-500" : "text-slate-400"}`}
                >
                  Suggested
                </h3>
                <div className="space-y-1">
                  {suggestions.map((item, index) => (
                    <button
                      key={index}
                      className={`group flex w-full items-center gap-4 rounded-2xl px-4 py-3 transition-colors ${
                        colorMode
                          ? "hover:bg-slate-800/80 text-slate-300"
                          : "hover:bg-white hover:shadow-sm text-slate-600"
                      }`}
                    >
                      <div
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                          colorMode
                            ? "bg-indigo-500/10 text-indigo-400"
                            : "bg-indigo-50 text-indigo-600"
                        }`}
                      >
                        {item.icon}
                      </div>
                      <div className="flex-1 text-left flex flex-col">
                        <span className="text-sm font-bold">{item.title}</span>
                        <span
                          className={`text-[11px] ${colorMode ? "text-slate-500" : "text-slate-400"}`}
                        >
                          {item.type}
                        </span>
                      </div>
                      <ArrowRight
                        size={16}
                        className={`opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-1 ${colorMode ? "text-indigo-400" : "text-indigo-500"}`}
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Search Results State (When user is typing) */}
          {searchLoading && (
            <div className="flex items-center justify-center py-8">
              <div className="h-5 w-5 rounded-full border-2 border-indigo-500/30 border-t-indigo-500 animate-spin" />
              <span className="ml-2 text-sm text-slate-400">Searching...</span>
            </div>
          )}

          {!searchLoading &&
            searchQuery.trim() &&
            searchResults.length === 0 && (
              <div className="py-8 text-center">
                <p className="text-sm font-semibold text-slate-400">
                  No quizzes found
                </p>
                <p className="mt-1 text-xs text-slate-600">
                  Try searching with a different keyword
                </p>
              </div>
            )}

          {!searchLoading && searchResults.length > 0 && (
            <div className="flex flex-col gap-2">
              {searchResults.map((quiz) => (
                <SearchList
                  key={quiz._id}
                  quiz={quiz}
                  onSelect={() => navigate(`/student/${quiz._id}`)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div
          className={`flex items-center justify-between border-t px-6 py-4 text-xs ${
            colorMode
              ? "border-slate-800 bg-[#0B1120]"
              : "border-slate-200 bg-white"
          }`}
        >
          <div
            className={`flex items-center gap-4 ${colorMode ? "text-slate-500" : "text-slate-400"}`}
          >
            <span className="flex items-center gap-1">
              <kbd
                className={`rounded border px-1.5 py-0.5 font-sans font-bold ${colorMode ? "border-slate-700 bg-slate-800" : "border-slate-200 bg-slate-100"}`}
              >
                ↵
              </kbd>{" "}
              to select
            </span>
            <span className="hidden sm:flex items-center gap-1">
              <kbd
                className={`rounded border px-1.5 py-0.5 font-sans font-bold ${colorMode ? "border-slate-700 bg-slate-800" : "border-slate-200 bg-slate-100"}`}
              >
                ↑
              </kbd>
              <kbd
                className={`rounded border px-1.5 py-0.5 font-sans font-bold ${colorMode ? "border-slate-700 bg-slate-800" : "border-slate-200 bg-slate-100"}`}
              >
                ↓
              </kbd>{" "}
              to navigate
            </span>
          </div>
          <p className="font-semibold text-slate-500">Search powered by App</p>
        </div>
      </div>
    </div>
  );
}

export default SearchModal;
