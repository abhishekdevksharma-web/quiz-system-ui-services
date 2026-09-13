import React, { useState, useEffect } from "react"; 
import { Moon, Sun } from "lucide-react";

export default function App() {
  const [darkMode, setDarkMode] = useState(true); // Defaulting to dark mode for a sleek look
  const [alertState, setAlertState] = useState({
    isOpen: false,
    type: "info",
    title: "",
    message: "",
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      document.body.style.backgroundColor = "#020617"; // slate-950
    } else {
      document.documentElement.classList.remove("dark");
      document.body.style.backgroundColor = "#f8fafc"; // slate-50
    }
  }, [darkMode]);

  const showAlert = (type, title, message) => {
    setAlertState({ isOpen: true, type, title, message });

    // Auto-close top strips after 4 seconds
    if (type === "error" || type === "success") {
      setTimeout(() => {
        setAlertState((prev) => ({ ...prev, isOpen: false }));
      }, 4000);
    }
  };

  return (
    <div className="min-h-screen p-8 text-slate-900 dark:text-slate-100 transition-colors">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-3xl font-bold tracking-tight">UI Alerts</h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm rounded-full hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
          >
            {darkMode ? (
              <Sun className="w-5 h-5 text-amber-500" />
            ) : (
              <Moon className="w-5 h-5 text-slate-600" />
            )}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            onClick={() =>
              showAlert(
                "error",
                "Authentication Failed",
                "Invalid email or password provided. Please try again.",
              )
            }
            className="p-5 text-left border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-2xl hover:border-red-300 dark:hover:border-red-900/50 transition-all"
          >
            <h3 className="font-semibold text-red-600 dark:text-red-400">
              Trigger Error
            </h3>
            <p className="text-sm text-slate-500 mt-1">
              Slides from top (Strip)
            </p>
          </button>

          <button
            onClick={() =>
              showAlert(
                "success",
                "Changes Saved",
                "Your profile settings have been updated successfully.",
              )
            }
            className="p-5 text-left border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-2xl hover:border-green-300 dark:hover:border-green-900/50 transition-all"
          >
            <h3 className="font-semibold text-green-600 dark:text-green-400">
              Trigger Success
            </h3>
            <p className="text-sm text-slate-500 mt-1">
              Slides from top (Strip)
            </p>
          </button>

          <button
            onClick={() =>
              showAlert(
                "info",
                "System Maintenance",
                "Our servers will go down for 2 hours on Sunday for routine upgrades.",
              )
            }
            className="p-5 text-left border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-2xl hover:border-blue-300 dark:hover:border-blue-900/50 transition-all"
          >
            <h3 className="font-semibold text-blue-600 dark:text-blue-400">
              Trigger Info
            </h3>
            <p className="text-sm text-slate-500 mt-1">
              Centered overlay (Modal)
            </p>
          </button>

          <button
            onClick={() =>
              showAlert(
                "confirm",
                "Revoke Access",
                "Are you sure you want to revoke API access for this application?",
              )
            }
            className="p-5 text-left border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-2xl hover:border-amber-300 dark:hover:border-amber-900/50 transition-all"
          >
            <h3 className="font-semibold text-amber-600 dark:text-amber-400">
              Trigger Confirm
            </h3>
            <p className="text-sm text-slate-500 mt-1">
              Centered overlay (Modal)
            </p>
          </button>
        </div>
      </div>

      
    </div>
  );
}
