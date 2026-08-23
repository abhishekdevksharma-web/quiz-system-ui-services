import { useContext, useEffect, useState } from "react";
import AdminContext from "../../context/adminContext/adminContext";

import { Copy, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function QuizModal({
  isOpen,
  step,
  setOpen,
  retry,
  setModalOpen,
  data,
}) {
  const { colorMode } = useContext(AdminContext);

  if (!isOpen) return null;

  const navigate = useNavigate();

  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const code = `${import.meta.env.VITE_APP_URL}/student/${data}`;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
      {/* Modal Box */}
      <div
        className={`rounded-2xl shadow-xl
           p-6 text-center animate-fadeIn
        ${colorMode ? "bg-slate-800 text-white" : "bg-slate-100 text-black"}`}
      >
        {/* Loader */}
        {step !== 2 && (
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {/* Text */}
        <h2 className="text-lg font-semibold mb-4">
          {step === 0 && "Creating Quiz..."}
          {step === 1 && "Almost Done..."}
          {step === 2 && "Quiz Successfully Created 🎉"}
        </h2>

        {/* Buttons */}
        {step === 2 && (
          <div className="h-full w-full space-y-5">
            <div className="bg-[#0f172a] text-blue-400 p-2 rounded-xl overflow-x-auto text-sm border border-gray-700 shadow-lg backdrop-blur-md flex justify-between">
              <code className="flex-1">{code}</code>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1 text-xs text-gray-300 hover:text-white transition cursor-pointer hover:bg-slate-800 px-2 rounded py-0.5"
              >
                {copied ? (
                  <>
                    <Check size={16} className="text-green-400" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy size={16} />
                    Copy
                  </>
                )}
              </button>
            </div>

            <div className="space-x-2">
              <button
                onClick={() => {
                  setModalOpen(false);
                  window.location.reload();
                }}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
              >
                Continue
              </button>

              <button
                onClick={() => {
                  navigate("/admin");
                }}
                className={`px-4 py-2 rounded-lg transition
              ${
                colorMode
                  ? "border border-gray-600 hover:bg-slate-700"
                  : "border border-gray-300 hover:bg-gray-100"
              }`}
              >
                Dashboard
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
