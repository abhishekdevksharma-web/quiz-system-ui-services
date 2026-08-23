import React, { useContext, useEffect, useState } from "react";
import StudentContext from "../../context/studentContext/studentContext";

import { Clock } from "lucide-react";

const Timer = React.memo(({ initialTime }) => {
  const {
    colorMode,
    isTimerRunning,
    setisTimerRunning,
    userMeta,
    setUserMeta,
    timerRef,
  } = useContext(StudentContext);

  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    timerRef.current = timeLeft;
  }, [timeLeft]);

  useEffect(() => {
    setTimeLeft(initialTime * 60);
  }, [initialTime]);

  useEffect(() => {
    if (!isTimerRunning || timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isTimerRunning, timeLeft]);

  const formatTime = (seconds) => {
    const hh = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const mm = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const ss = String(seconds % 60).padStart(2, "0");

    return `${hh}:${mm}:${ss}`;
  };

  return (
    <div
      className={`flex items-center gap-2 px-4 py-1.5 rounded-full ${
        colorMode ? "bg-gray-700 text-gray-200" : "bg-indigo-50 text-indigo-700"
      }`}
    >
      <Clock size={18} />
      <span className="font-mono font-bold">{formatTime(timeLeft)}</span> 
    </div>
  );
});

export default Timer;
