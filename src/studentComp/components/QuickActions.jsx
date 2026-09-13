import { ArrowRight, Play, Sparkles } from "lucide-react"; 

function QuickActions({ colorMode, setSearchModalIsOpen, loading }) {
  return (
    <div
      className={`rounded-3xl border p-6 shadow-sm transition-all duration-500 ${
        colorMode
          ? "border-slate-800 bg-slate-900/50 backdrop-blur-sm"
          : "border-slate-200 bg-white"
      }`}
    >
      {loading ? (
        /* Loading */
        <div className="animate-pulse">
          {/* Heading */}
          <div
            className={`h-5 w-32 rounded-md ${
              colorMode ? "bg-slate-800" : "bg-slate-200"
            }`}
          />

          {/* Buttons */}
          <div className="mt-5 flex flex-col gap-2.5">
            <div
              className={`h-12 w-full rounded-xl ${
                colorMode ? "bg-slate-800" : "bg-slate-100"
              }`}
            />

            <div
              className={`h-12 w-full rounded-xl ${
                colorMode ? "bg-slate-800/70" : "bg-slate-50"
              }`}
            />
          </div>
        </div>
      ) : (
        /* Actual Content */
        <div className={`transform transition-all duration-500 ease-out `}>
          <h2 className="mb-4 text-lg font-bold">Quick Actions</h2>

          <div className="flex w-full flex-col gap-2.5">
            {/* Start New Quiz */}
            <button
              onClick={() => setSearchModalIsOpen(true)}
              className={`group relative flex h-12 w-full cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-xl px-5 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 ${
                colorMode
                  ? "bg-linear-to-r from-indigo-600 via-violet-600 to-indigo-600 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30"
                  : "bg-linear-to-r from-indigo-600 via-violet-600 to-indigo-600 shadow-md shadow-indigo-500/20 hover:shadow-lg"
              }`}
            >
              <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

              <Play size={17} fill="currentColor" />

              <span className="relative">Start New Quiz</span>

              <ArrowRight
                size={17}
                className="relative transition-transform duration-300 group-hover:translate-x-1"
              />
            </button>

            {/* Switch to Creator Mode */}
            <button
              onClick={() => {}}
              className={`group relative flex h-12 w-full cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-xl border px-5 text-sm font-bold transition-all duration-300 hover:-translate-y-0.5 ${
                colorMode
                  ? "border-emerald-500/20 bg-linear-to-r from-emerald-500/10 via-cyan-500/10 to-emerald-500/10 text-emerald-300 shadow-lg shadow-emerald-500/5 hover:border-emerald-400/40 hover:shadow-emerald-500/10"
                  : "border-emerald-200 bg-linear-to-r from-emerald-50 via-cyan-50 to-emerald-50 text-emerald-700 shadow-sm hover:border-emerald-300 hover:shadow-md"
              }`}
            >
              <span className="absolute inset-0 bg-linear-to-r from-transparent via-emerald-400/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <Sparkles
                size={17}
                className="relative text-emerald-400 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110"
              />

              <span className="relative">Switch to Creator Mode</span>

              <ArrowRight
                size={16}
                className="relative opacity-60 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100"
              />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default QuickActions;
