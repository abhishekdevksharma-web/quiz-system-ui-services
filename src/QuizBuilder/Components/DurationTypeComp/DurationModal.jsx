import React from "react";

function DurationModal({
  colorMode,
  duration,
  handleSaveDuration,
  setDuration,
  setIsOpenDurationModal,
}) {
  return (
    <div
      className={`absolute right-1/2 top-full mt-2 mx-2 z-50 w-80 overflow-hidden rounded-2xl border shadow-2xl ${
        colorMode
          ? "border-slate-700 bg-slate-900 text-white"
          : "border-slate-200 bg-white text-slate-900"
      }`}
    >
      {/* Header */}
      <div
        className={`flex items-center justify-between border-b px-4 py-3 ${
          colorMode ? "border-slate-700" : "border-slate-200"
        }`}
      >
        <div>
          <h3 className="text-sm font-semibold">Quiz Duration</h3>
        </div>
      </div>

      {/* Body */}
      <div className="space-y-5 p-5">
        {/* Quick Select */}
        <div>
          <p
            className={`mb-3 text-xs font-medium uppercase tracking-wide ${
              colorMode ? "text-slate-400" : "text-slate-500"
            }`}
          >
            Quick Select
          </p>

          <div className="grid grid-cols-4 gap-2">
            {[15, 30, 45, 60].map((item) => (
              <button
                key={item}
                onClick={() => setDuration(item)}
                className={`rounded-lg border px-2 py-2 text-sm font-medium transition ${
                  duration === item
                    ? "border-green-500 bg-green-500 text-white"
                    : colorMode
                      ? "border-slate-700 hover:bg-slate-800"
                      : "border-slate-300 hover:bg-slate-100"
                }`}
              >
                {item}m
              </button>
            ))}
          </div>
        </div>

        {/* Custom Input */}
        <div>
          <label
            className={`mb-2 block text-xs font-medium uppercase tracking-wide ${
              colorMode ? "text-slate-400" : "text-slate-500"
            }`}
          >
            Custom Duration
          </label>

          <div
            className={`flex items-center rounded-xl border px-4 py-3 ${
              colorMode
                ? "border-slate-700 bg-slate-800"
                : "border-slate-300 bg-slate-50"
            }`}
          >
            <input
              type="number"
              min={1}
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              className="w-full bg-transparent text-lg font-semibold outline-none"
            />

            <span
              className={`text-sm ${
                colorMode ? "text-slate-400" : "text-slate-500"
              }`}
            >
              min
            </span>
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
            Selected Duration
          </p>

          <p className="mt-1 text-lg font-semibold text-green-500">
            {duration} Minutes
          </p>
        </div>
      </div>

      {/* Footer */}

      <div
        className={`flex items-center justify-end gap-2 border-t px-4 py-3 ${
          colorMode ? "border-slate-700" : "border-slate-200"
        }`}
      >
        <button
          onClick={() => setIsOpenDurationModal(false)}
          className={`rounded-lg px-3 py-1.5 text-sm font-medium cursor-pointer ${
            colorMode ? "hover:bg-slate-800" : "hover:bg-slate-100"
          }`}
        >
          Cancel
        </button>

        <button
          onClick={handleSaveDuration}
          className="rounded-lg bg-green-500 px-4 py-1.5 text-sm font-medium text-white hover:bg-green-600 cursor-pointer"
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default DurationModal;
