import React, { useEffect } from "react";
import { Info, AlertTriangle, HelpCircle } from "lucide-react";

const AlertModal = ({
  open,
  type = "info",
  title,
  message,
  onClose,
  onConfirm,
  confirmText = "Continue",
  cancelText = "Cancel",
}) => {
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose?.();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  const config = {
    info: {
      Icon: Info,
      title: title || "Information",
      icon: "bg-blue-500/10 text-blue-500 dark:bg-blue-500/15 dark:text-blue-400",
      button: "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500/30",
    },
    warning: {
      Icon: AlertTriangle,
      title: title || "Warning",
      icon: "bg-amber-500/10 text-amber-500 dark:bg-amber-500/15 dark:text-amber-400",
      button: "bg-amber-500 hover:bg-amber-600 focus:ring-amber-500/30",
    },
    confirmation: {
      Icon: HelpCircle,
      title: title || "Are you sure?",
      icon: "bg-red-500/10 text-red-500 dark:bg-red-500/15 dark:text-red-400",
      button: "bg-red-600 hover:bg-red-700 focus:ring-red-500/30",
    },
  };

  const current = config[type] || config.info;
  const Icon = current.Icon;

  return (
    <div className="fixed inset-0 z-9998 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm dark:bg-black/75" onClick={onClose} />

      <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-2xl animate-[modalIn_.25s_ease-out] dark:border-gray-700 dark:bg-gray-900">
        <div className="flex w-full flex-col items-center px-6 pb-7 pt-8">
          <div className={`mb-5 flex h-14 w-14 items-center justify-center rounded-2xl ${current.icon}`}>
            <Icon size={27} strokeWidth={2} />
          </div>

          <h2 className="text-center text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
            {current.title}
          </h2>

          <p className="mt-2.5 max-w-sm text-center text-[15px] leading-6 text-gray-500 dark:text-gray-400">
            {message}
          </p>
        </div>

        <div className="flex flex-col-reverse gap-2.5 border-t border-gray-100 bg-gray-50/70 px-6 py-4 sm:flex-row sm:justify-end dark:border-gray-800 dark:bg-gray-900">
          {cancelText && (
            <button
              type="button"
              onClick={onClose}
              className="w-full rounded-xl border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-100 active:scale-[0.98] sm:w-auto dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
            >
              {cancelText}
            </button>
          )}

          <button
            type="button"
            onClick={onConfirm}
            className={`w-full rounded-xl px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition active:scale-[0.98] focus:outline-none focus:ring-4 sm:w-auto ${current.button}`}
          >
            {confirmText}
          </button>
        </div>
      </div>

      <style>
        {`
          @keyframes modalIn {
            from {
              opacity: 0;
              transform: translateY(12px) scale(0.96);
            }
            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }
        `}
      </style>
    </div>
  );
};

export default AlertModal;