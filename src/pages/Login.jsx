import React, { useState, useContext, useEffect } from "react";
import AdminContext from "../context/adminContext/adminContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { colorMode, handleLogin, setIsAuthenticate, IsAuthenticate } =
    useContext(AdminContext);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [alert, setAlert] = useState({
    type: "", // success | error
    message: "",
  });

  const [status, setStatus] = useState("idle");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    const responce = await handleLogin(formData);

    if (responce.status == true) {
      setIsAuthenticate(responce.status);
      setStatus("success");
      setAlert({
        type: "success",
        message: "Welcome",
      });
      setTimeout(() => {
        setStatus("idle");
        navigate("/admin");
      }, 1000);
    } else {
      setStatus("idle");
      setAlert({
        type: "error",
        message: "Please Login with Correct Credentials",
      });
    }
  };


  return (
    <div
      className={
        "min-h-screen flex items-center justify-center px-4 transition-colors duration-300 " +
        (colorMode ? "bg-slate-900" : "bg-slate-100")
      }
    >
      {/* Login Card */}
      <div
        className={
          "w-full max-w-md rounded-3xl shadow-xl p-6 sm:p-8 transition-colors duration-300 " +
          (colorMode
            ? "bg-slate-800 text-slate-100"
            : "bg-white text-slate-900")
        }
      >
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-semibold">Admin Login</h1>
          <p
            className={
              "text-sm mt-1 " +
              (colorMode ? "text-slate-400" : "text-slate-500")
            }
          >
            Login to access your dashboard
          </p>
        </div>
        {alert.message && (
          <div
            className={
              "mb-4 rounded-xl border px-4 py-3 text-sm transition " +
              (alert.type === "success"
                ? colorMode
                  ? "bg-emerald-900/30 border-emerald-700 text-emerald-300"
                  : "bg-emerald-50 border-emerald-200 text-emerald-700"
                : colorMode
                  ? "bg-red-900/30 border-red-700 text-red-300"
                  : "bg-red-50 border-red-200 text-red-700")
            }
          >
            {alert.message}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label
              className={
                "block text-xs font-medium mb-1 " +
                (colorMode ? "text-slate-300" : "text-slate-600")
              }
            >
              Email Address
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="admin@example.com"
              className={
                "w-full rounded-xl px-4 py-2.5 text-sm outline-none border transition " +
                (colorMode
                  ? "bg-slate-900 border-slate-700 text-slate-100 placeholder:text-slate-500 focus:border-indigo-500"
                  : "bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-indigo-500")
              }
            />
          </div>

          {/* Password */}
          <div>
            <label
              className={
                "block text-xs font-medium mb-1 " +
                (colorMode ? "text-slate-300" : "text-slate-600")
              }
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className={
                "w-full rounded-xl px-4 py-2.5 text-sm outline-none border transition " +
                (colorMode
                  ? "bg-slate-900 border-slate-700 text-slate-100 placeholder:text-slate-500 focus:border-indigo-500"
                  : "bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-indigo-500")
              }
            />
          </div>

          {/* Forgot password */}
          <div className="flex justify-end">
            <button
              type="button"
              className={
                "text-xs hover:underline " +
                (colorMode ? "text-indigo-400" : "text-indigo-600")
              }
            >
              Forgot password?
            </button>
          </div>

          {/* Login button */}
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={status === "loading"}
            className={
              "w-full rounded-xl py-2.5 text-sm font-medium transition-all duration-300 cursor-pointer " +
              "flex items-center justify-center " +
              (status === "success"
                ? "bg-green-600 text-white"
                : colorMode
                  ? "bg-indigo-600 text-white hover:bg-indigo-500"
                  : "bg-slate-900 text-slate-50 hover:bg-slate-800") +
              (status === "loading" ? " opacity-70 cursor-not-allowed" : "")
            }
          >
            {/* IDLE */}
            {status === "idle" && "Login"}

            {/* LOADING */}
            {status === "loading" && (
              <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            )}

            {/* SUCCESS ✔ */}
            {status === "success" && (
              <span className="flex items-center gap-2 animate-scale-in">
                <span className="h-6 w-6 rounded-full bg-white flex items-center justify-center">
                  <svg
                    className="h-4 w-4 text-green-600 animate-draw"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </span>
                Success
              </span>
            )}
          </button>
        </form>
        <span className="block text-center text-sm text-gray-500 mt-5">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/admin/signup", { replace: true })}
            className="ml-1 font-semibold text-blue-600 cursor-pointer hover:text-blue-700 hover:underline transition-colors"
          >
            Sign Up
          </span>
        </span>
        {/* Footer */}
        <div
          className={
            "text-center mt-6 text-xs " +
            (colorMode ? "text-slate-400" : "text-slate-500")
          }
        >
          © {new Date().getFullYear()} Quiz Admin Panel
        </div>
      </div>
    </div>
  );
};

export default Login;
