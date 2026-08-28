 
export default function StatCard({ colorMode, title, value, subtitle }) {
  return (
    <div className="flex gap-5">
      <div
        className={`rounded-2xl border shadow-sm transition-all w-full max-w-74 ${
          colorMode
            ? "bg-slate-900 border-slate-800"
            : "bg-white border-slate-200"
        }`}
      >
        {/* Card */}
        <div className="flex h-28 flex-col px-5 py-4">
          {/* Title */}
          <p
            className={`text-sm font-medium ${
              colorMode ? "text-slate-400" : "text-slate-500"
            }`}
          >
            {title}
          </p>

          {/* Center */}
          <div className="flex flex-1 flex-col justify-center">
            <h2
              className={`text-5xl font-bold ${title === "Active Quizzes" ? "text-green-400" : ""} ${
                colorMode ? "" : "text-slate-900"
              }`}
            >
              {value}
            </h2>

            {subtitle && (
              <p
                className={`mt-2 text-sm ${
                  colorMode ? "text-slate-500" : "text-slate-400"
                }`}
              >
                {subtitle}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
