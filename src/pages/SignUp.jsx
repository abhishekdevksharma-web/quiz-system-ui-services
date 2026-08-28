import React, { useState, useContext } from "react";
import { Eye, EyeOff } from "lucide-react";
import AdminContext from "../context/adminContext/adminContext";
import { Link, replace, useNavigate } from "react-router-dom";

const SignUp = () => {
  const { colorMode, createUser } = useContext(AdminContext);
  const navigate = useNavigate();

  const [alert, setAlert] = useState({
    type: "", // success | error
    message: "",
  });

  const [confirmPassword, setConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    const updatedForm = {
      ...formData,
      [name]: value,
    };

    setFormData(updatedForm);

    // 👇 Password match validation (onChange)
    if (
      (name === "password" || name === "confirmPassword") &&
      updatedForm.confirmPassword
    ) {
      if (updatedForm.password !== updatedForm.confirmPassword) {
        setAlert({
          type: "error",
          message: "Password and Confirm Password do not match",
        });
      } else {
        setAlert({
          type: "",
          message: "",
        });
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlert({ type: "", message: "" });
    try {
      setLoading(true);

      const res = await createUser(formData);

      setAlert({
        type: "success",
        message: "Account created successfully! You can login now.",
      });

      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (err) {
      // Backend errors
      setAlert({
        type: "error",
        message:
          err?.message || "User already registered or something went wrong",
      });
    } finally {
      setLoading(false);
      setTimeout(() => {
        navigate("/admin/login");
      }, 1000);
    }
  };

  return (
    <div
      className={
        "min-h-screen flex items-center justify-center px-4 transition-colors duration-300 " +
        (colorMode ? "bg-slate-900" : "bg-slate-100")
      }
    >
      {/* Register Card */}
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
          <h1 className="text-2xl font-semibold">Create Account</h1>
          <p
            className={
              "text-sm mt-1 " +
              (colorMode ? "text-slate-400" : "text-slate-500")
            }
          >
            Register to access the quiz dashboard
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
          {/* Name */}
          <div>
            <label
              className={
                "block text-xs font-medium mb-1 " +
                (colorMode ? "text-slate-300" : "text-slate-600")
              }
            >
              Full Name
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
              className={
                "w-full rounded-xl px-4 py-2.5 text-sm outline-none border transition " +
                (colorMode
                  ? "bg-slate-900 border-slate-700 text-slate-100 placeholder:text-slate-500 focus:border-indigo-500"
                  : "bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-indigo-500")
              }
            />
          </div>

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

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className={
                  "w-full rounded-xl px-4 py-2.5 pr-10 text-sm outline-none border transition " +
                  (colorMode
                    ? "bg-slate-900 border-slate-700 text-slate-100 placeholder:text-slate-500 focus:border-indigo-500"
                    : "bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-indigo-500")
                }
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={
                  "absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 " +
                  (colorMode && "hover:text-slate-300")
                }
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label
              className={
                "block text-xs font-medium mb-1 " +
                (colorMode ? "text-slate-300" : "text-slate-600")
              }
            >
              Confirm Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                required
                value={formData.confirmPassword || ""}
                onChange={handleChange}
                placeholder="••••••••"
                className={
                  "w-full rounded-xl px-4 py-2.5 pr-10 text-sm outline-none border transition " +
                  (colorMode
                    ? "bg-slate-900 border-slate-700 text-slate-100 placeholder:text-slate-500 focus:border-indigo-500"
                    : "bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-indigo-500")
                }
              />

              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className={
                  "absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 " +
                  (colorMode && "hover:text-slate-300")
                }
              ></button>
            </div>
          </div>

          {/* Register button */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              } dark:focus:ring-offset-gray-800`}
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </div>
        </form>

        {/* Footer */}
        <div
          className={
            "text-center mt-6 text-xs " +
            (colorMode ? "text-slate-400" : "text-slate-500")
          }
        >
          Already have an account?{" "}
          <span
            onClick={() => navigate("/admin/login", { replace: true })}
            className={
              "font-medium cursor-pointer hover:underline " +
              (colorMode ? "text-indigo-400" : "text-indigo-600")
            }
          >
            Login
          </span>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
