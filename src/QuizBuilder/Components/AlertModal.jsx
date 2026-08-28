import React from "react";
import { AlertCircle, X } from "lucide-react";

function AlertModal({
  isOpen = false,
  title = "Something went wrong",
  message = "Please try again.",
  buttonText = "Okay",
  onClose,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl dark:bg-zinc-900">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-lg p-1.5 text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
        >
          <X size={18} />
        </button>

        <div className="flex flex-col items-center text-center">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-yellow-500/10">
            <AlertCircle className="h-6 w-6 text-yellow-500" />
          </div>

          <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
            {title}
          </h2>

          <p className="mt-2 text-sm leading-5 text-zinc-500 dark:text-zinc-400">
            {message}
          </p>

          <button
            type="button"
            onClick={onClose}
            className="mt-6 w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 active:scale-[0.98]"
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AlertModal;
