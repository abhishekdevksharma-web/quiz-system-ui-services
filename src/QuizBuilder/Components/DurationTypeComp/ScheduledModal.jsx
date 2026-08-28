import React from "react";

function DurationModal({
  colorMode,
  Schedule,
  handleSaveSchedule,
  setStartTime,
  setEndTime,
  startTime,
  endTime,
  setIsOpenScheduleModal,
}) { 

  return (
    <div
      className={`absolute left-1/2 top-full border-b px-4 pt-3 mt-2 mx-2 z-50 w-120 overflow-hidden rounded-2xl border shadow-2xl ${
        colorMode
          ? "border-slate-700 bg-slate-900 text-white"
          : "border-slate-200 bg-white text-slate-900"
      }`}
    >
      {/* Header */}
      <div
        className={`border-b px-5 py-2 ${
          colorMode ? "border-slate-700" : "border-slate-200"
        }`}
      >
        <h3 className="text-base font-semibold">Schedule Quiz</h3>
 
      </div>

      {/* Body */}
      <div className="space-y-4 p-4">
        <div className="grid grid-cols-2 gap-3">
          {/* Start */}
          <div>
            <label
              className={`mb-2 block text-xs font-medium uppercase tracking-wide ${
                colorMode ? "text-slate-400" : "text-slate-500"
              }`}
            >
              Start
            </label>

            <input
              type="datetime-local"
              value={startTime || ""}
              onChange={(e) => setStartTime(e.target.value)}
              className={`datetime-input w-full rounded-xl border px-3 py-2.5 text-sm outline-none ${
                colorMode
                  ? "border-slate-700 bg-slate-800"
                  : "border-slate-300 bg-slate-50"
              }`}
            />
          </div>

          {/* End */}
          <div>
            <label
              className={`mb-2 block text-xs font-medium uppercase tracking-wide ${
                colorMode ? "text-slate-400" : "text-slate-500"
              }`}
            >
              End
            </label>

            <input
              type="datetime-local"
              value={endTime || ""}
              onChange={(e) => setEndTime(e.target.value)}
              className={`datetime-input w-full rounded-xl border px-3 py-2.5 text-sm outline-none ${
                colorMode
                  ? "border-slate-700 bg-slate-800"
                  : "border-slate-300 bg-slate-50"
              }`}
            />
          </div>
        </div>

        {/* Preview */}
        <div
          className={`rounded-xl border p-3 ${
            colorMode
              ? "border-slate-700 bg-slate-800"
              : "border-slate-200 bg-slate-50"
          }`}
        >
          <p
            className={`text-xs ${
              colorMode ? "text-slate-400" : "text-slate-500"
            }`}
          >
            Schedule Preview
          </p>

          <div className="mt-2 space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-500">Start</span>
              <span className="font-medium">{startTime || "--"}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-500">End</span>
              <span className="font-medium">{endTime || "--"}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}

      <div
        className={`flex justify-end gap-2 border-t px-4 py-3  ${
          colorMode ? "border-slate-700" : "border-slate-200"
        }`}
      >
        <button
          onClick={() => setIsOpenScheduleModal(false)}
          className={`rounded-lg px-4 py-2 text-sm font-medium cursor-pointer ${
            colorMode ? "hover:bg-slate-800" : "hover:bg-slate-100"
          }`}
        >
          Cancel
        </button>

        <button
          onClick={handleSaveSchedule}
          className="rounded-lg bg-green-500 px-5 py-2 text-sm font-medium text-white hover:bg-green-600 cursor-pointer"
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default DurationModal;
