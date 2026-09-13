import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-6">
      <div className="text-center max-w-lg">
        {/* 404 */}
        <div className="relative mb-6">
          <h1 className="text-[120px] md:text-[160px] font-black leading-none tracking-tight text-indigo-100 dark:text-indigo-950">
            404
          </h1>

          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-6xl md:text-7xl font-black text-indigo-600 dark:text-indigo-400">
              ?
            </span>
          </div>
        </div>

        {/* Content */}
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-3">
          Page Not Found
        </h2>

        <p className="text-slate-500 dark:text-slate-400 leading-relaxed mb-8">
          Looks like this page isn't part of the quiz yet. The page you're
          looking for may have been removed, moved, or never existed.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="w-full sm:w-auto px-6 py-3 rounded-xl
                       bg-indigo-600 hover:bg-indigo-700
                       text-white font-semibold
                       transition-all duration-200
                       shadow-lg shadow-indigo-500/20"
          >
            Back to Home
          </Link>

          <button
            onClick={() => window.history.back()}
            className="w-full sm:w-auto px-6 py-3 rounded-xl
                       border border-slate-200 dark:border-slate-800
                       bg-white dark:bg-slate-900
                       text-slate-700 dark:text-slate-300
                       hover:bg-slate-100 dark:hover:bg-slate-800
                       font-semibold transition-all duration-200"
          >
            Go Back
          </button>
        </div>

        {/* Small footer text */}
        <p className="mt-10 text-xs text-slate-400 dark:text-slate-600">
          Quiz System • Page unavailable
        </p>
      </div>
    </div>
  );
};

export default NotFound;
