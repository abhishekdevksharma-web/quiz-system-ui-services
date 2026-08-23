import React, { useState } from "react";
import {
  X,
  Search,
  Download,
  FileText,
  FileImage,
  FileSpreadsheet,
  BarChart3,
} from "lucide-react";

import OverviewTab from "./QuizWindowTab/Overview";
import QuizDetailsTab from "./QuizWindowTab/QuizDetails";
import ResultsTab from "./QuizWindowTab/Results";
import SettingsTab from "./QuizWindowTab/Settings";

const QuizScoresModal = ({ open, onClose, colorMode, quiz }) => {
  if (!open) return null;
  const [activeTab, setActiveTab] = useState("Overview");

  const tabComponents = {
    Overview: <OverviewTab quiz={quiz} colorMode={colorMode} />,

    "Quiz Details": <QuizDetailsTab quiz={quiz} colorMode={colorMode} />,

    Results: <ResultsTab quiz={quiz} colorMode={colorMode} />,

    Settings: <SettingsTab quiz={quiz} colorMode={colorMode} />,
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
      />

      {/* Modal */}
      <div
        className={`relative w-full max-w-6xl rounded-2xl shadow-2xl overflow-hidden border-2 ${
          colorMode
            ? "bg-slate-900 border-slate-700"
            : "bg-white border-slate-200"
        }`}
      >
        {/* Header */}
        <div
          className={`border-b ${
            colorMode
              ? "border-slate-700 bg-slate-900"
              : "border-slate-200 bg-white"
          }`}
        >
          {/* Top */}
          <div className="flex items-start justify-between pl-8 pr-2 pt-3 uppercase">
            <div>
              <h2
                className={`text-2xl font-bold px-5 rounded-2xl ${
                  colorMode ? "text-white bg-gray-200/5" : "text-slate-900"
                }`}
              >
                {quiz.title}
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={onClose}
                className={`rounded-lg p-2 transition cursor-pointer ${
                  colorMode
                    ? "hover:bg-slate-800 text-slate-400 bg-red-500/50 "
                    : "hover:bg-slate-100 text-slate-600"
                }`}
              >
                <X size={18} color="white" />
              </button>
            </div>
          </div>

          {/* Navigation */}
          <div className="mt-6 px-8">
            <div className="flex gap-8">
              {["Overview", "Quiz Details", "Results", "Settings"].map(
                (tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`relative pb-4 text-sm font-semibold transition ${
                      activeTab === tab
                        ? "text-indigo-500"
                        : colorMode
                          ? "text-slate-400 hover:text-white"
                          : "text-slate-500 hover:text-slate-900"
                    }`}
                  >
                    {tab}

                    {activeTab === tab && (
                      <span className="absolute bottom-0 left-0 right-0 h-[3px] rounded-full bg-indigo-500" />
                    )}
                  </button>
                ),
              )}
            </div>
          </div>
        </div>
        {/* Content */}
        <div
          className={`h-[500px]  overflow-y-auto ${
            colorMode ? "bg-slate-900" : "bg-slate-50"
          }`}
        >
          {tabComponents[activeTab]}
        </div>
      </div>
    </div>
  );
};

export default QuizScoresModal;
