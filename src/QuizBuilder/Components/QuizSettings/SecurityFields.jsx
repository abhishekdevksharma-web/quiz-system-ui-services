import React, { useState } from "react";
import { ExternalLink, XCircle, AppWindow, Maximize } from "lucide-react"; 

function SecurityFields({ colorMode, data, onChange }) { 
  const fields = [
    {
      key: "autoSubmitOnNewTab",
      title: "Auto Submit on New Tab",
      description: "Submit quiz when the user switches to a new tab.",
      icon: ExternalLink,
      color: "indigo",
    },
    {
      key: "autoSubmitOnChromeClose",
      title: "Auto Submit on Close",
      description: "Submit quiz when the browser tab or page is closed.",
      icon: XCircle,
      color: "red",
    },
    {
      key: "autoSubmitOnOtherApp",
      title: "Auto Submit on Other App",
      description:
        "Submit when the quiz window loses focus to another application.",
      icon: AppWindow,
      color: "amber",
    },
    {
      key: "autoSubmitOnMinimize",
      title: "Auto Submit on Minimize",
      description: "Submit when the quiz window becomes hidden or minimized.",
      icon: AppWindow,
      color: "orange",
    },
    {
      key: "fullscreenRequired",
      title: "Fullscreen Required",
      description:
        "Allow the quiz to work only while fullscreen mode is active.",
      icon: Maximize,
      color: "violet",
    },
    {
      key: "ignoreResize",
      title: "Ignore Window Resize",
      description: "Window resizing will not be treated as a quiz violation.",
      icon: AppWindow,
      color: "gray",
    },
  ];

  const getColorClasses = (color) => {
    const colors = {
      indigo: colorMode
        ? "bg-indigo-500/10 text-indigo-400"
        : "bg-indigo-50 text-indigo-600",

      red: colorMode ? "bg-red-500/10 text-red-400" : "bg-red-50 text-red-600",

      amber: colorMode
        ? "bg-amber-500/10 text-amber-400"
        : "bg-amber-50 text-amber-600",

      orange: colorMode
        ? "bg-orange-500/10 text-orange-400"
        : "bg-orange-50 text-orange-600",

      violet: colorMode
        ? "bg-violet-500/10 text-violet-400"
        : "bg-violet-50 text-violet-600",
      gray: colorMode
        ? "bg-slate-500/10 text-slate-400"
        : "bg-slate-100 text-slate-600",
    };

    return colors[color];
  };

  return (
    <div className="space-y-3">
      {fields.map((field) => {
        const Icon = field.icon;
        const value = data[field.key];

        return (
          <div
            key={field.key}
            className={`
              flex items-center justify-between
              p-3.5 rounded-xl border
              ${
                colorMode
                  ? "bg-slate-950/50 border-slate-800"
                  : "bg-slate-50 border-slate-200"
              }
            `}
          >
            <div className="flex items-center gap-3 min-w-0">
              <div
                className={`
                  flex items-center justify-center
                  w-8 h-8 rounded-lg shrink-0
                  ${getColorClasses(field.color)}
                `}
              >
                <Icon size={15} />
              </div>

              <div className="min-w-0">
                <p
                  className={`
                    text-sm font-medium
                    ${colorMode ? "text-slate-200" : "text-slate-800"}
                  `}
                >
                  {field.title}
                </p>

                <p className="mt-0.5 text-[11px] leading-4 text-slate-500">
                  {field.description}
                </p>
              </div>
            </div>

            <button
              type="button"
              role="switch"
              aria-checked={value}
              onClick={() => onChange(field.key, !value)}
              className={`
                relative shrink-0 w-10 h-6 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20
                ${
                  value
                    ? "bg-indigo-600"
                    : colorMode
                      ? "bg-slate-700"
                      : "bg-slate-300"
                }
              `}
            >
              <span
                className={` absolute top-1 left-1 w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-200 ${value ? "translate-x-4" : "translate-x-0"}
                `}
              />
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default SecurityFields;
