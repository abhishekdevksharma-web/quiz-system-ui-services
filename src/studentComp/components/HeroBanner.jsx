import { ArrowRight, Flame, Play } from "lucide-react";
import React from "react";

function HeroBanner({ name, colorMode, loading, setSearchModalIsOpen }) {
  if (loading) {
    return (
      <section
        className={
          "relative overflow-hidden rounded-2xl border p-6 sm:p-8 " +
          (colorMode
            ? "border-slate-800 bg-slate-900"
            : "border-slate-200 bg-white")
        }
      >
        <div className="relative max-w-2xl animate-pulse">
          {/* Badge skeleton */}
          <div
            className={
              "mb-4 h-6 w-48 rounded-full " +
              (colorMode ? "bg-slate-800" : "bg-slate-200")
            }
          />

          {/* Heading skeleton */}
          <div
            className={
              "h-9 w-80 max-w-full rounded-lg sm:h-10 " +
              (colorMode ? "bg-slate-800" : "bg-slate-200")
            }
          />

          {/* Description skeleton */}
          <div className="mt-4 space-y-2">
            <div
              className={
                "h-4 w-full max-w-xl rounded " +
                (colorMode ? "bg-slate-800" : "bg-slate-200")
              }
            />
            <div
              className={
                "h-4 w-4/5 max-w-lg rounded " +
                (colorMode ? "bg-slate-800" : "bg-slate-200")
              }
            />
          </div>

          {/* Buttons skeleton */}
          <div className="mt-6 flex flex-wrap gap-3">
            <div
              className={
                "h-10 w-36 rounded-xl " +
                (colorMode ? "bg-slate-800" : "bg-slate-200")
              }
            />
          </div>
        </div>

        {/* Decorative background */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 right-20 h-56 w-56 rounded-full bg-purple-500/10 blur-3xl" />
      </section>
    );
  }

  return (
    <section
      className={
        "relative overflow-hidden rounded-2xl border p-6 sm:p-8 " +
        (colorMode
          ? "border-slate-800 bg-slate-900"
          : "border-slate-200 bg-white")
      }
    >
      <div className="relative max-w-2xl">
        <div
          className={
            "mb-3 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold " +
            (colorMode
              ? "bg-indigo-500/10 text-indigo-400"
              : "bg-indigo-50 text-indigo-600")
          }
        >
          <Flame size={14} />
          Keep learning, keep growing
        </div>

        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
          Welcome back, {name.trim().split(/\s+/)[0]} 👋
        </h1>

        <p
          className={
            "mt-3 max-w-xl text-sm leading-6 sm:text-base " +
            (colorMode ? "text-slate-400" : "text-slate-500")
          }
        >
          Continue your learning journey, attempt new quizzes and track your
          performance from one place.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            onClick={() => setSearchModalIsOpen(true)}
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
          >
            <Play size={17} />
            Start New Quiz
          </button>
        </div>
      </div>

      {/* Decorative background */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 right-20 h-56 w-56 rounded-full bg-purple-500/10 blur-3xl" />
    </section>
  );
}

export default HeroBanner;
