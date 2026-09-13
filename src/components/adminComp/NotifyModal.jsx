import React, { useEffect } from "react";
import { Info, CheckCircle2, CircleAlert, CircleHelp, X } from "lucide-react";

const NotifyModal = ({
  type = "info",
  title,
  message,
  onClose,
  onConfirm,
  confirmText = "Confirm",
  cancelText = "Cancel",
  colorMode,
}) => {
  useEffect(() => {
    const overflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = overflow;
    };
  }, []);

  const config = {
    info: {
      Icon: Info,
      icon: "bg-blue-50 text-blue-600",
      button: "bg-blue-600 hover:bg-blue-700",
    },
    success: {
      Icon: CheckCircle2,
      icon: "bg-emerald-50 text-emerald-600",
      button: "bg-emerald-600 hover:bg-emerald-700",
    },
    error: {
      Icon: CircleAlert,
      icon: "bg-red-50 text-red-600",
      button: "bg-red-600 hover:bg-red-700",
    },
    confirm: {
      Icon: CircleHelp,
      icon: "bg-amber-50 text-amber-600",
      button: "bg-blue-600 hover:bg-blue-700",
    },
  };

  const current = config[type] || config.info;
  const Icon = current.Icon;

  return (
    <div
      className={`fixed inset-0 z-9999 flex items-center justify-center px-4 backdrop-blur-[2px] ${
        colorMode ? "bg-black/60" : "bg-black/30"
      }`}
    >
      <div
        className={`relative w-full max-w-[360px] rounded-2xl border p-6 shadow-2xl animate-[popup_220ms_ease-out] ${
          colorMode ? "border-gray-800 bg-gray-900" : "border-gray-100 bg-white"
        }`}
      >
        <button
          onClick={onClose}
          className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100"
        >
          <X size={16} />
        </button>

        <div
          className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl ${current.icon}`}
        >
          <Icon size={23} />
        </div>

        <h2
          className={`text-[17px] font-semibold ${
            colorMode ? "text-white" : "text-gray-900"
          }`}
        >
          {title}
        </h2>

        <p
          className={`mt-1.5 text-[13px] leading-5 ${
            colorMode ? "text-gray-400" : "text-gray-500"
          }`}
        >
          {message}
        </p>

        <div className="mt-5 flex justify-end gap-2">
          {type === "confirm" && (
            <button
              onClick={onClose}
              className="rounded-lg px-4 py-2 text-[13px] font-medium text-gray-500 hover:bg-gray-100"
            >
              {cancelText}
            </button>
          )}

          <button
            onClick={type === "confirm" ? onConfirm : onClose}
            className={`rounded-lg px-4 py-2 text-[13px] font-medium text-white ${current.button}`}
          >
            {type === "confirm" ? confirmText : "OK"}
          </button>
        </div>
      </div>

      <style>
        {`
          @keyframes popup {
            from {
              opacity: 0;
              transform: translateY(12px) scale(0.94);
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

export default NotifyModal;
