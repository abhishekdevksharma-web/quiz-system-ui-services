// components/AuthAlertModal.jsx

import { CircleAlert } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AuthAlertModal({ colorMode, isOpen, onClose }) {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleLogin = () => {
    onClose?.();
    navigate("/admin/login", { replace: true });
  };

  const handleCreateUser = () => {
    onClose?.();
    navigate("/admin/signup", { replace: true });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div
        className={`w-full max-w-[420px] rounded-2xl shadow-xl p-6 text-center ${
          colorMode ? "bg-slate-800 text-white" : "bg-white text-black"
        }`}
      >
        <CircleAlert size={48} className="mx-auto mb-4 text-red-500" />

        <h2 className="text-xl font-semibold mb-2">Authentication Required</h2>

        <p className="text-sm opacity-70 mb-6">
          Please login or create an account to continue.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-3">
          <button
            onClick={handleLogin}
            className="px-5 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
          >
            Login
          </button>

          <button
            onClick={handleCreateUser}
            className={`px-5 py-2 rounded-lg transition ${
              colorMode
                ? "border border-gray-600 hover:bg-slate-700"
                : "border border-gray-300 hover:bg-gray-100"
            }`}
          >
            Create User
          </button>
        </div>
      </div>
    </div>
  );
}
