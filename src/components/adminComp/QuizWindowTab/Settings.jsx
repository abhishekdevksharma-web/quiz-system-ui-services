import React, { useContext, useEffect, useState } from "react";
import {
  Save,
  ShieldCheck,
  Clock3,
  CheckCircle2,
  Info,
  CircleAlert,
} from "lucide-react";

import AdminContext from "../../../context/adminContext/adminContext";
import { handleUpdateQuizApi } from "../../../services/quiz.service";

function Settings({ colorMode, quiz }) {
  const [defaultSecurityChecks, setDefaultSecurityChecks] = useState({
    autoSubmitOnChromeClose: false,
    autoSubmitOnMinimize: false,
    autoSubmitOnNewTab: false,
    autoSubmitOnOtherApp: false,
    fullscreenRequired: false,
    ignoreResize: false,
  });

  const [timeLimit, setTimeLimit] = useState("0");

  const [saved, setSaved] = useState(false);
  const [alertModal, setAlertModal] = useState(false);

  useEffect(() => {
    if (!quiz.securityCheckType) return;
    setDefaultSecurityChecks(quiz.securityCheckType);
    setTimeLimit(quiz.userTimeLimit || 0);
  }, []);

  const handleTimeChange = (e) => {
    setTimeLimit(e.target.value);
    setAlertModal(false);
    setSaved("");
  };

  const handleSave = async () => {
    try {
      const ReqJsonBody = {
        defaultSecurityChecks,
        timeLimit,
        quizId: quiz._id,
      };
      const res = await handleUpdateQuizApi(ReqJsonBody);
      console.log(res);

      if (!res.success) {
        setAlertModal(true);
        setSaved(false);
        setTimeout(() => {
          setAlertModal(false);
        }, 2500);
        return;
      }
      setSaved(true);
      setTimeout(() => {
        setAlertModal(false);
      }, 2500);
    } catch (error) {
      console.log(error);
    }
  };
  function onChange(field, value) {
    setDefaultSecurityChecks((prev) => ({ ...prev, [field]: value }));
  }

  const fields = [
    {
      key: "autoSubmitOnNewTab",
      title: "Auto Submit on New Tab",
      description: "Detect when the user switches away from the quiz tab.",
    },
    {
      key: "autoSubmitOnChromeClose",
      title: "Auto Submit on Close",
      description: "Automatically submit when the quiz page is closed.",
    },
    {
      key: "autoSubmitOnOtherApp",
      title: "Auto Submit on Other App",
      description: "Detect when the quiz window loses focus.",
    },
    {
      key: "autoSubmitOnMinimize",
      title: "Auto Submit on Minimize",
      description: "Automatically submit when the quiz window is minimized.",
    },
    {
      key: "fullscreenRequired",
      title: "Fullscreen Required",
      description: "Require the user to remain in fullscreen mode.",
    },
    {
      key: "ignoreResize",
      title: "Ignore Window Resize",
      description: "Window resizing will not count as a violation.",
    },
  ];

  const enabledCount = Object.values(defaultSecurityChecks).filter(
    Boolean,
  ).length;

  return (
    <div
      className={`min-h-full ${
        colorMode ? "bg-slate-950 text-slate-100" : "bg-slate-50 text-slate-900"
      }`}
    >
      <div className="mx-auto max-w-4xl p-5 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          {alertModal && (
            <div
              className={`flex right-10 absolute shrink-0 items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium ${
                saved
                  ? colorMode
                    ? "bg-emerald-500/10 text-emerald-400"
                    : "bg-emerald-50 text-emerald-700"
                  : colorMode
                    ? "bg-red-500/10 text-red-400"
                    : "bg-red-50 text-red-700"
              }`}
            >
              {saved ? <CheckCircle2 size={14} /> : <CircleAlert size={14} />}
              {saved ? "Saved" : "Try Again"}
            </div>
          )}
        </div>

        <div className="space-y-5">
          {/* Time Limit */}
          <section
            className={`rounded-2xl border ${
              colorMode
                ? "border-slate-800 bg-slate-900"
                : "border-slate-200 bg-white"
            }`}
          >
            <div
              className={`flex items-center gap-3 border-b px-5 py-4 ${
                colorMode ? "border-slate-800" : "border-slate-200"
              }`}
            >
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                  colorMode
                    ? "bg-blue-500/10 text-blue-400"
                    : "bg-blue-50 text-blue-600"
                }`}
              >
                <Clock3 size={16} />
              </div>

              <div>
                <h2 className="text-sm font-semibold">Time Limit</h2>
                <p className="text-[11px] text-slate-500">
                  Set how long users can attempt this quiz.
                </p>
              </div>
            </div>

            <div className="p-5">
              <div className="max-w-sm">
                <label className="mb-1.5 block text-xs font-medium text-slate-500">
                  Duration
                </label>

                <div className="relative">
                  <input
                    type="number"
                    min="1"
                    value={timeLimit}
                    onChange={handleTimeChange}
                    className={`h-10 w-full rounded-lg border px-3 pr-16 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 ${
                      colorMode
                        ? "border-slate-700 bg-slate-950 text-slate-100"
                        : "border-slate-300 bg-white text-slate-900"
                    }`}
                  />

                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-500">
                    minutes
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* Security */}
          <section
            className={`rounded-2xl border ${
              colorMode
                ? "border-slate-800 bg-slate-900"
                : "border-slate-200 bg-white"
            }`}
          >
            <div
              className={`flex items-center justify-between border-b px-5 py-4 ${
                colorMode ? "border-slate-800" : "border-slate-200"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                    colorMode
                      ? "bg-amber-500/10 text-amber-400"
                      : "bg-amber-50 text-amber-600"
                  }`}
                >
                  <ShieldCheck size={16} />
                </div>

                <div>
                  <h2 className="text-sm font-semibold">
                    Security & Monitoring
                  </h2>

                  <p className="text-[11px] text-slate-500">
                    Control user activity during the quiz.
                  </p>
                </div>
              </div>

              <span
                className={`rounded-full px-2.5 py-1 text-[10px] font-medium ${
                  colorMode
                    ? "bg-indigo-500/10 text-indigo-400"
                    : "bg-indigo-50 text-indigo-600"
                }`}
              >
                {enabledCount} enabled
              </span>
            </div>

            <div className="p-5">
              <div className="space-y-2">
                {fields.map((field) => {
                  const enabled = defaultSecurityChecks[field.key];

                  return (
                    <div
                      key={field.key}
                      className={`flex items-center justify-between gap-4 rounded-xl border p-3.5 transition-colors ${
                        colorMode
                          ? "border-slate-800 bg-slate-950/40 hover:bg-slate-950/70"
                          : "border-slate-200 bg-slate-50/70 hover:bg-slate-50"
                      }`}
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <p
                            className={`text-sm font-medium ${
                              colorMode ? "text-slate-200" : "text-slate-800"
                            }`}
                          >
                            {field.title}
                          </p>

                          {enabled && (
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                          )}
                        </div>

                        <p className="mt-0.5 text-[11px] leading-4 text-slate-500">
                          {field.description}
                        </p>
                      </div>

                      <button
                        type="button"
                        role="switch"
                        aria-checked={enabled}
                        onClick={(e) => onChange(field.key, !enabled)}
                        className={`relative h-6 w-10 shrink-0 cursor-pointer rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 ${
                          enabled
                            ? "bg-indigo-600"
                            : colorMode
                              ? "bg-slate-700"
                              : "bg-slate-300"
                        }`}
                      >
                        <span
                          className={`absolute left-1 top-1 h-4 w-4 rounded-full bg-white shadow-sm transition-transform duration-200 ${
                            enabled ? "translate-x-4" : "translate-x-0"
                          }`}
                        />
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Info */}
              <div
                className={`mt-4 flex gap-2.5 rounded-lg p-3 text-[11px] leading-4 ${
                  colorMode
                    ? "bg-slate-800/60 text-slate-400"
                    : "bg-slate-50 text-slate-500"
                }`}
              >
                <Info size={14} className="mt-0.5 shrink-0" />

                <p>
                  Activity monitoring is performed by the browser. Some
                  activities, such as closing the browser or switching to
                  another application, may only be detected indirectly.
                </p>
              </div>
            </div>
          </section>

          {/* Bottom action */}
          <div
            className={`flex items-center justify-between rounded-xl border p-3 ${
              colorMode
                ? "border-slate-800 bg-slate-900"
                : "border-slate-200 bg-white"
            }`}
          >
            <p className="hidden text-xs text-slate-500 sm:block">
              Changes will be applied to this quiz.
            </p>

            <button
              type="button"
              onClick={handleSave}
              className="ml-auto flex h-9 items-center gap-2 rounded-lg bg-indigo-600 px-4 text-xs font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-500/20 active:translate-y-0"
            >
              <Save size={14} />
              Save Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
