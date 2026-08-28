import React, { useContext, useState } from "react";
import { Settings2, X, Save, AlertCircle, Loader2 } from "lucide-react";

import AdminContext from "../../../context/adminContext/adminContext";

import TimeLimitField from "./TimeLimitField";
import SecurityFields from "./SecurityFields";

function IndexModal({ onClose, handleSubmit }) {
  const { colorMode, quizMeta, setQuizMeta } = useContext(AdminContext);

  const [timeLimit, setTimeLimit] = useState(30);
  const [securityChecks, setSecurityChecks] = useState({
    autoSubmitOnNewTab: false,
    autoSubmitOnChromeClose: false,
    autoSubmitOnOtherApp: false,
    autoSubmitOnMinimize: false,
    fullscreenRequired: false,
    ignoreResize: true,
  });

  const [saveLoading, setSaveLoading] = useState(false);

  function onchange(field, value) {
    setSecurityChecks((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  const handleSave = () => {
    setSaveLoading(true);
    setTimeout(() => {
      const updated = {
        ...quizMeta.securityCheckType,
        ...securityChecks,
      };

      setQuizMeta((prev) => ({
        ...prev,
        userTimeLimit: timeLimit,
        securityCheckType: updated,
      }));
      setSaveLoading(false);
    }, 1000);
  };

  const handleSaveAndPublice = () => {
    const updated = {
      ...quizMeta.securityCheckType,
      ...securityChecks,
    };

    setQuizMeta((prev) => ({
      ...prev,
      userTimeLimit: timeLimit,
      securityCheckType: updated,
    }));
    handleSubmit();
  };

  return (
    <div
      className={`min-w-1/2 min-h-[90%] max-h-[90%] overflow-hidden flex flex-col rounded-2xl border shadow-2xl ${
        colorMode
          ? "bg-slate-900 border-slate-700"
          : "bg-white border-slate-200"
      }`}
    >
      {/* Header */}
      <div
        className={`flex items-center justify-between px-5 py-4 border-b shrink-0 ${
          colorMode ? "border-slate-700" : "border-slate-200"
        }`}
      >
        <div className="flex items-center gap-3">
          <div
            className={`flex items-center justify-center w-9 h-9 rounded-xl ${
              colorMode
                ? "bg-indigo-500/10 text-indigo-400"
                : "bg-indigo-50 text-indigo-600"
            }`}
          >
            <Settings2 size={18} />
          </div>

          <div>
            <h2
              className={`text-sm font-semibold ${
                colorMode ? "text-slate-100" : "text-slate-900"
              }`}
            >
              Quiz Settings
            </h2>

            <p className="mt-0.5 text-xs text-slate-500">
              Configure quiz behavior
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className={`flex items-center justify-center w-8 h-8 rounded-lg transition-colors ${
            colorMode
              ? "text-slate-400 hover:bg-slate-700 hover:text-slate-200"
              : "text-slate-400 hover:bg-slate-100 hover:text-slate-600"
          }`}
        >
          <X size={17} />
        </button>
      </div>

      {/* Body */}
      <div className="flex-1 p-5 space-y-5 overflow-auto">
        <TimeLimitField
          value={timeLimit}
          onChange={(value) => setTimeLimit(value)}
          colorMode={colorMode}
        />

        <SecurityFields
          data={securityChecks}
          onChange={onchange}
          colorMode={colorMode}
        />
      </div>

      {/* Footer */}
      <div
        className={`flex items-center justify-end gap-2 px-5 py-3.5 border-t shrink-0 ${
          colorMode
            ? "border-slate-700 bg-slate-900/40"
            : "border-slate-200 bg-slate-50/80"
        }`}
      >
        <button
          type="button"
          onClick={onClose}
          className={`h-9 px-4 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer ${
            colorMode
              ? "bg-white/5 text-slate-400 hover:bg-slate-800 hover:text-slate-100 hover:-translate-y-0.5"
              : "text-slate-600 hover:bg-slate-200 hover:text-slate-900 hover:-translate-y-0.5"
          }`}
        >
          Cancel
        </button>

        <button
          type="button"
          onClick={handleSave}
          disabled={saveLoading}
          className={`group flex items-center gap-2 h-9 px-4 rounded-lg border text-xs font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md cursor-pointer ${
            colorMode
              ? "border-slate-600 bg-slate-800 text-slate-200 hover:bg-slate-700 hover:border-slate-500"
              : "border-slate-300 bg-white text-slate-700 hover:bg-slate-50 hover:border-slate-400"
          }`}
        >
          {saveLoading ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <>
              <Save
                size={14}
                className="transition-transform duration-200 group-hover:scale-110"
              />
              Save
            </>
          )}
        </button>

        <button
          type="button"
          onClick={handleSaveAndPublice}
          className="group flex items-center gap-2 h-9 px-4 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-500/25 active:translate-y-0 cursor-pointer"
        >
          <Save
            size={14}
            className="transition-transform duration-200 group-hover:rotate-[-8deg] group-hover:scale-110"
          />
          Save & Publish
        </button>
      </div>
    </div>
  );
}

export default IndexModal;
