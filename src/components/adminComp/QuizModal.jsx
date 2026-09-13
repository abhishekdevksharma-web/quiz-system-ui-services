import { useContext, useState } from "react";
import AdminContext from "../../context/adminContext/adminContext";
import { Copy, Check, CircleAlert } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function QuizModal({ isOpen, setModalOpen, data }) {
  const { colorMode } = useContext(AdminContext);
  const { _id, success } = data;
  const navigate = useNavigate();

  const [copied, setCopied] = useState(false);
  // Hooks ke BAAD conditional return
  if (!isOpen) return null;

  const code = `${import.meta.env.VITE_QUIZ_REDIRECT_URL}/${_id}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  // ❌ Error / success false
  if (!success) {
    return (
      <div
        className={`w-[90%] sm:w-[80%] md:w-[500px] max-w-[500px] rounded-2xl shadow-xl p-6 text-center ${
          colorMode ? "bg-slate-800 text-white" : "bg-white text-black"
        }`}
      >
        {data.message === "User not found" ||
        data.message === "Authentication required" ? (
          <>
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-yellow-500/10">
              <CircleAlert
                size={34}
                strokeWidth={1.8}
                className="text-yellow-500"
              />
            </div>

            <h2 className="mb-2 text-center text-xl font-semibold tracking-tight">
              Login Required
            </h2>

            <p className="mx-auto mb-7 max-w-sm text-center text-sm leading-6 opacity-65">
              Please login or create an account to continue your quiz.
              <br />
              <span className="opacity-90">
                Your quiz progress has been safely saved.
              </span>
            </p>

            <div className="flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="h-10 rounded-xl bg-indigo-600 px-6 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-500/25 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
              >
                Login
              </button>

              <button
                type="button"
                onClick={() => navigate("/signup")}
                className="h-10 rounded-xl bg-purple-600 px-6 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-purple-700 hover:shadow-lg hover:shadow-purple-500/25 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-purple-500/40"
              >
                Create Account
              </button>
            </div>
          </>
        ) : (
          <>
            <CircleAlert size={48} className="mx-auto mb-4 text-red-500" />

            <h2 className="text-xl font-semibold mb-2">Something went wrong</h2>

            <p className="text-sm opacity-70 mb-6">
              Unable to create the quiz. Please try again.
            </p>

            <button
              onClick={() => setModalOpen(false)}
              className="px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
              OK
            </button>
          </>
        )}
      </div>
    );
  }

  // ✅ Success
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
      <div
        className={` rounded-2xl shadow-xl p-6 text-center ${
          colorMode ? "bg-slate-800 text-white" : "bg-slate-100 text-black"
        }`}
      >
        <h2 className="text-lg font-semibold mb-4">
          Quiz Successfully Created
        </h2>

        {/* Link */}
        <div className="bg-[#0f172a] text-blue-400 p-2 rounded-xl overflow-x-auto text-sm border border-gray-700 shadow-lg flex justify-between items-center">
          <code className="flex-1 text-left mr-2">{code}</code>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1 text-xs text-gray-300 hover:text-white transition cursor-pointer hover:bg-slate-800 px-2 rounded py-1"
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

        {/* Buttons */}
        <div className="space-x-2 mt-6">
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
              setModalOpen(false);
              navigate("/admin");
            }}
            className={`px-4 py-2 rounded-lg transition ${
              colorMode
                ? "border border-gray-600 hover:bg-slate-700"
                : "border border-gray-300 hover:bg-gray-100"
            }`}
          >
            Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
