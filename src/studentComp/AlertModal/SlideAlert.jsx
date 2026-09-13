import React, { useEffect } from "react";
import { CheckCircle2, AlertCircle, AlertTriangle, X } from "lucide-react";

const SlideAlert = ({
  open,
  type = "success",
  message,
  onClose,
  duration = 3000, 
}) => {
  useEffect(() => {
    if (!open || !duration) return;

    const timer = setTimeout(() => {
      onClose?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [open, duration, onClose]);

  if (!open) return null;

  const config = {
    success: {
      Icon: CheckCircle2,
      icon: "text-emerald-500 bg-emerald-500/10",
      border: "border-emerald-500/20",
    },
    error: {
      Icon: AlertCircle,
      icon: "text-red-500 bg-red-500/10",
      border: "border-red-500/20",
    },
    warning: {
      Icon: AlertTriangle,
      icon: "text-amber-500 bg-amber-500/10",
      border: "border-amber-500/20",
    },
  };

  const current = config[type] || config.success;
  const Icon = current.Icon;

  return (
    <div
      className={`fixed top-25 z-9999 w-[calc(100%-32px)] max-w-sm animate-[toastIn_.3s_ease-out]`}
    >
      <div
        className={`flex items-center gap-3 rounded-2xl border bg-white/95 p-3.5 shadow-xl backdrop-blur-xl dark:bg-gray-900/95 ${current.border}`}
      >
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${current.icon}`}
        >
          <Icon size={21} strokeWidth={2.2} />
        </div>

        <p className="flex-1 text-sm font-medium leading-5 text-gray-700 dark:text-gray-200">
          {message}
        </p>

        <button
          type="button"
          onClick={onClose}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-gray-400 transition hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-800 dark:hover:text-gray-200"
        >
          <X size={17} />
        </button>
      </div>

      <style>
        {`
          @keyframes toastIn {
            from {
              opacity: 0;
              transform: translateX(-20px) scale(.56);
            }

            to {
              opacity: 1;
              transform: translateX(0) scale(1);
            }
          }
        `}
      </style>
    </div>
  );
};

export default SlideAlert;
