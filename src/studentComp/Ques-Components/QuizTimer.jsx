import { useEffect, useState } from "react";

export default function QuizTimer({
  totalTime,
  colorMode,
  timeLeftRef,
  isTimerRunning,
}) {
  const [timeLeft, setTimeLeft] = useState(0);
 
  useEffect(() => {
    const time = Number(totalTime);

    if (!Number.isFinite(time) || time <= 0) return;

    timeLeftRef.current = time;
    setTimeLeft(time);
  }, [totalTime]);

  // Timer
  useEffect(() => {
    if (!isTimerRunning) return;

    const timer = setInterval(() => {
      if (timeLeftRef.current <= 0) {
        clearInterval(timer);
        return;
      }

      timeLeftRef.current -= 1;

      // THIS forces React render
      setTimeLeft(timeLeftRef.current);
    }, 1000);

    return () => clearInterval(timer);
  }, [isTimerRunning]);

  const safeTime = Math.max(0, timeLeft);
  const safeTotalTime = Math.max(1, Number(totalTime) || 1);

  const minutes = Math.floor(safeTime / 60);
  const seconds = safeTime % 60;

  const remainingPercentage = (safeTime / safeTotalTime) * 100;

  const isCritical = remainingPercentage <= 5;
  const isWarning = remainingPercentage <= 20 && !isCritical;

  const progress = Math.min(remainingPercentage, 100);

  return (
    <div className="relative flex h-full items-center">
      <div
        className={`relative flex items-center overflow-hidden rounded-xl border px-3 py-2 ${
          isCritical
            ? colorMode
              ? "border-red-500/30 bg-red-500/10"
              : "border-red-200 bg-red-50"
            : isWarning
              ? colorMode
                ? "border-amber-500/30 bg-amber-500/10"
                : "border-amber-200 bg-amber-50"
              : colorMode
                ? "border-indigo-500/20 bg-slate-900"
                : "border-indigo-100 bg-indigo-50/50"
        }`}
      >
        <div className="px-5">
          <p
            className={`text-[9px] font-bold uppercase leading-none tracking-wider ${
              colorMode ? "text-slate-500" : "text-slate-400"
            }`}
          >
            Time Left
          </p>

          <p
            className={`mt-1 font-mono text-base font-black leading-none tabular-nums ${
              isCritical
                ? "text-red-500"
                : isWarning
                  ? "text-amber-500"
                  : colorMode
                    ? "text-white"
                    : "text-slate-900"
            }`}
          >
            {String(minutes).padStart(2, "0")}:
            {String(seconds).padStart(2, "0")}
          </p>
        </div>

        <div
          className={`absolute bottom-0 left-0 h-0.5 w-full ${
            colorMode ? "bg-slate-800" : "bg-slate-200"
          }`}
        >
          <div
            className={`h-full transition-[width] duration-1000 ease-linear ${
              isCritical
                ? "bg-red-500"
                : isWarning
                  ? "bg-amber-500"
                  : "bg-indigo-500"
            }`}
            style={{
              width: `${progress}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
}
