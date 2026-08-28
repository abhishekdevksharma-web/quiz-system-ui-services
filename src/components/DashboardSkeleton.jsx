export default function DashboardSkeleton() {
  return (
    <div className="w-full min-h-screen px-4 sm:px-6 lg:px-8 py-6 animate-pulse">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6 max-w-[670px]">
        <div className="h-[125px] rounded-2xl bg-slate-800/70 border border-slate-700">
          <div className="p-6">
            <div className="h-4 w-28 bg-slate-700 rounded mb-5"></div>
            <div className="h-10 w-12 bg-slate-700 rounded"></div>
          </div>
        </div>

        <div className="h-[125px] rounded-2xl bg-slate-800/70 border border-slate-700">
          <div className="p-6">
            <div className="h-4 w-28 bg-slate-700 rounded mb-5"></div>
            <div className="h-10 w-12 bg-slate-700 rounded"></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_430px] gap-6">
        {/* Recent Quizzes */}
        <div className="h-[345px] rounded-2xl bg-slate-800/70 border border-slate-700">
          {/* Header */}
          <div className="h-11 px-5 border-b border-slate-700 flex items-center justify-between">
            <div className="h-4 w-28 bg-slate-700 rounded"></div>
            <div className="h-3 w-14 bg-slate-700 rounded"></div>
          </div>

          {/* Empty content skeleton */}
          <div className="flex flex-col items-center justify-center h-[290px]">
            <div className="w-16 h-16 rounded-2xl bg-slate-700 mb-5"></div>

            <div className="h-5 w-40 bg-slate-700 rounded mb-4"></div>

            <div className="h-3 w-64 bg-slate-700 rounded mb-2"></div>
            <div className="h-3 w-52 bg-slate-700 rounded"></div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="h-[345px] rounded-2xl bg-slate-800/70 border border-slate-700 p-5">
          <div className="h-5 w-28 bg-slate-700 rounded mb-5"></div>

          <div className="space-y-4">
            <div className="h-12 w-full bg-slate-700 rounded-xl"></div>

            <div className="h-12 w-full bg-slate-700 rounded-xl"></div>

            <div className="h-12 w-full bg-slate-700 rounded-xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
