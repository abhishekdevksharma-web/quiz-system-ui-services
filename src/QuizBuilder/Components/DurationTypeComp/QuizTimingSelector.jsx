import { Clock3, CalendarClock } from "lucide-react";
import { useContext, useEffect, useState } from "react"; 
import DurationModal from "./DurationModal";
import ScheduledModal from "./ScheduledModal";
import AdminContext from "../../../context/adminContext/adminContext";

function QuizTiming({ onChange }) {
  const { colorMode, quizMeta, setQuizMeta } = useContext(AdminContext);

  const [isOpenDurationModal, setIsOpenDurationModal] = useState(false);
  const [isOpenScheduleModal, setIsOpenScheduleModal] = useState(false);

  const [duration, setDuration] = useState(
    quizMeta.timing.durationMinutes || 30,
  );

  const getTodayAtMidnight = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}T00:00`;
  };

  const [startTime, setStartTime] = useState(
    quizMeta.timing.startTime || getTodayAtMidnight(),
  );

  const [endTime, setEndTime] = useState(
    quizMeta.timing.endTime || getTodayAtMidnight(),
  );

  // useEffect(() => {
  //   console.log('run');

  //   if (new Date(startTime) > new Date(endTime)) {
  //     setEndTime(startTime);
  //   }
  // }, [startTime, endTime]);

  const handleSaveSchedule = () => {
    if (!startTime || !endTime) {
      alert("Please select start and end time.");
      return;
    }

    const start = new Date(startTime);
    const end = new Date(endTime);

    if (end <= start) {
      alert("End time must be after Start time.");
      return;
    }

    setQuizMeta((prev) => ({
      ...prev,
      timing: {
        ...prev.timing,
        type: "Scheduled",

        // Reset duration
        durationMinutes: "",

        // Save schedule
        startTime,
        endTime,
      },
    }));

    setIsOpenScheduleModal(false);
  };

  function onChange(value) {
    setQuizMeta((prev) => ({
      ...prev,
      timing: {
        ...prev.timing,
        type: value,
      },
    }));
  }

  const handleSaveDuration = () => {
    setQuizMeta((prev) => ({
      ...prev,
      timing: {
        ...prev.timing,
        type: "Duration",
        durationMinutes: duration,

        // Reset schedule fields
        startTime: "",
        endTime: "",
      },
    }));

    setIsOpenDurationModal(false);
  };

  return (
    <div className="relative inline-block">
      {/* Selector */}
      <div
        className={`inline-flex h-9 items-center rounded-lg border px-1 ${
          colorMode
            ? "border-slate-700 bg-[#0f172a]"
            : "border-slate-300 bg-white"
        }`}
      >
        {/* Duration */}
        <button
          type="button"
          onClick={() => {
            onChange("Duration");
            setIsOpenDurationModal((prev) => !prev);
            setIsOpenScheduleModal(false);
          }}
          className={`flex h-7 items-center gap-2 rounded-md px-3 text-sm font-medium transition-all ${
            quizMeta.timing.type === "Duration"
              ? colorMode
                ? "bg-slate-700 text-green-400"
                : "bg-slate-100 text-green-600"
              : colorMode
                ? "text-slate-300 hover:bg-slate-800"
                : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          <Clock3 size={15} />

          {quizMeta.timing.type === "Duration"
            ? `${quizMeta.timing.durationMinutes} M`
            : "Duration"}
        </button>

        {/* Duration Popup */}
        {isOpenDurationModal && (
          <DurationModal
            colorMode={colorMode}
            duration={duration}
            handleSaveDuration={handleSaveDuration}
            setIsOpenDurationModal={setIsOpenDurationModal}
            setDuration={setDuration}
          />
        )}

        <div
          className={`mx-1 h-4 w-px ${
            colorMode ? "bg-slate-700" : "bg-slate-300"
          }`}
        />

        {/* Scheduled */}
        <button
          type="button"
          onClick={() => {
            onChange("Scheduled");
            setIsOpenScheduleModal((prev) => !prev);
            setIsOpenDurationModal(false);
          }}
          className={`flex h-7 items-center gap-2 rounded-md px-3 text-sm font-medium transition-all ${
            quizMeta.timing.type === "Scheduled"
              ? colorMode
                ? "bg-slate-700 text-green-400"
                : "bg-slate-100 text-green-600"
              : colorMode
                ? "text-slate-300 hover:bg-slate-800"
                : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          <CalendarClock size={15} />
          Scheduled
        </button>

        {isOpenScheduleModal && (
          <ScheduledModal
            colorMode={colorMode}
            setStartTime={setStartTime}
            setEndTime={setEndTime}
            startTime={startTime}
            endTime={endTime}
            setIsOpenScheduleModal={setIsOpenScheduleModal}
            // Schedule={Schedule}
            handleSaveSchedule={handleSaveSchedule}
            // setSchedule={setSchedule}
          />
        )}
      </div>
    </div>
  );
}

export default QuizTiming;
