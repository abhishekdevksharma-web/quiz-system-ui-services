import React, { useContext, useEffect, useState } from "react";
import StudentContext from "../../context/studentContext/studentContext";
import {
  User,
  Mail,
  Hash,
  BookOpen,
  Layers,
  Calendar,
  GraduationCap,
  ArrowRight,
} from "lucide-react";

const StudentProfileForm = ({ setUserMeta, colorMode }) => {
  const { openStudentForm, setOpenStudentForm } = useContext(StudentContext);

  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    roll: "",
    branch: "",
    section: "",
    year: "",
    semester: "", // Added semester state
  });

  // Check localStorage on first render
  useEffect(() => {
    const savedData = localStorage.getItem("studentMeta");

    if (savedData) {
      const parsed = JSON.parse(savedData);
      setFormData(parsed);
      if (setUserMeta) {
        setUserMeta((prev) => ({ ...prev, student: parsed }));
      }
    } else {
      setOpenStudentForm(true);
    }
  }, [setUserMeta]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSave = () => {
    let tempErrors = {};

    if (!formData.name.trim()) tempErrors.name = "Full Name is required";

    if (!formData.email.trim()) {
      tempErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Please enter a valid email address";
    }

    if (Object.keys(tempErrors).length > 0) {
      setErrors(tempErrors);
      return;
    }

    // 1. Plain object ready kiya
    const studentJson = {
      name: formData.name,
      email: formData.email,
      roll: formData.roll,
      branch: formData.branch,
      section: formData.section,
      year: formData.year,
      semester: formData.semester,
    };
    setUserMeta((prev) => ({ ...prev, student: studentJson }));

    // 2. JSON format (String) me badal kar localStorage me store kiya
    localStorage.setItem("studentMeta", JSON.stringify(studentJson));

    // 3. Parent state update ki
    if (setUserMeta) {
      setUserMeta((prev) => ({ ...prev, student: studentJson }));
    }

    // 4. Form modal ko close kiya
    setOpenStudentForm(false);
  };

  // Semantic class assignments based on mode context
  const inputBgClass = colorMode
    ? "bg-slate-800 text-slate-100 border-slate-700 focus:bg-slate-900"
    : "bg-slate-50/50 text-slate-800 border-slate-200 focus:bg-white";
  const iconClass = colorMode
    ? "text-slate-500 group-focus-within:text-indigo-400"
    : "text-slate-400 group-focus-within:text-indigo-500";

  return (
    <div className={`transition-colors duration-300 `}>
      <div
        className={`w-full max-w-[460px] rounded-3xl shadow-2xl p-8 border transition-all duration-300 ${
          colorMode
            ? "bg-slate-900 border-slate-800 shadow-black/40"
            : "bg-white border-slate-100 shadow-slate-200"
        }`}
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div
            className={`w-16 h-16 mx-auto rounded-2xl bg-linear-to-br from-indigo-500 to-purple-600 text-white text-2xl font-bold flex items-center justify-center shadow-lg ${
              colorMode
                ? "shadow-indigo-950/50 ring-4 ring-indigo-950/40"
                : "shadow-indigo-200 ring-4 ring-indigo-50"
            }`}
          >
            {formData.name ? (
              formData.name.charAt(0).toUpperCase()
            ) : (
              <User size={28} />
            )}
          </div>
          <h2
            className={`text-2xl font-bold mt-4 tracking-tight ${
              colorMode ? "text-slate-100" : "text-slate-800"
            }`}
          >
            Student Information
          </h2>

          <p
            className={`text-sm mt-2 leading-relaxed ${
              colorMode ? "text-slate-400" : "text-slate-500"
            }`}
          >
            Enter your details carefully. This information will be used to
            identify you and save your quiz submission.
          </p>
        </div>

        {/* Form Fields */}
        <div className="space-y-4">
          {/* Full Name */}
          <div>
            <div className="relative group">
              <User
                size={18}
                className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${iconClass}`}
              />
              <input
                type="text"
                name="name"
                placeholder="Full Name *"
                value={formData.name}
                onChange={handleChange}
                className={`w-full pl-11 pr-4 py-3 rounded-xl border outline-none transition-all duration-200 ${inputBgClass} ${
                  errors.name
                    ? "border-red-500/50 focus:border-red-500 ring-2 ring-red-500/10"
                    : colorMode
                      ? "focus:border-indigo-500 focus:ring-4 focus:ring-indigo-950/50"
                      : "focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50"
                }`}
              />
            </div>
            {errors.name && (
              <p className="text-xs text-red-400 mt-1.5 ml-1">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <div className="relative group">
              <Mail
                size={18}
                className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${iconClass}`}
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address *"
                value={formData.email}
                onChange={handleChange}
                className={`w-full pl-11 pr-4 py-3 rounded-xl border outline-none transition-all duration-200 ${inputBgClass} ${
                  errors.email
                    ? "border-red-500/50 focus:border-red-500 ring-2 ring-red-500/10"
                    : colorMode
                      ? "focus:border-indigo-500 focus:ring-4 focus:ring-indigo-950/50"
                      : "focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50"
                }`}
              />
            </div>
            {errors.email && (
              <p className="text-xs text-red-400 mt-1.5 ml-1">{errors.email}</p>
            )}
          </div>

          {/* Roll Number */}
          <div className="relative group">
            <Hash
              size={18}
              className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${iconClass}`}
            />
            <input
              type="text"
              name="roll"
              placeholder="Roll Number"
              value={formData.roll}
              onChange={handleChange}
              className={`w-full pl-11 pr-4 py-3 rounded-xl border outline-none transition-all duration-200 ${inputBgClass} ${
                colorMode
                  ? "focus:border-indigo-500 focus:ring-4 focus:ring-indigo-950/50"
                  : "focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50"
              }`}
            />
          </div>

          {/* Branch */}
          <div className="relative group">
            <BookOpen
              size={18}
              className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${iconClass}`}
            />
            <input
              type="text"
              name="branch"
              placeholder="Branch"
              value={formData.branch}
              onChange={handleChange}
              className={`w-full pl-11 pr-4 py-3 rounded-xl border outline-none transition-all duration-200 ${inputBgClass} ${
                colorMode
                  ? "focus:border-indigo-500 focus:ring-4 focus:ring-indigo-950/50"
                  : "focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50"
              }`}
            />
          </div>

          {/* Section, Year & Semester Grid (3 Columns) */}
          <div className="grid grid-cols-3 gap-3">
            {/* Section */}
            <div className="relative group">
              <Layers
                size={18}
                className={`absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors ${iconClass}`}
              />
              <input
                type="text"
                name="section"
                placeholder="Sec"
                value={formData.section}
                onChange={handleChange}
                className={`uppercase w-full pl-10 pr-2 py-3 rounded-xl border outline-none transition-all duration-200 ${inputBgClass} ${
                  colorMode
                    ? "focus:border-indigo-500 focus:ring-4 focus:ring-indigo-950/50"
                    : "focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50"
                }`}
              />
            </div>

            {/* Year */}
            <div className="relative group">
              <Calendar
                size={18}
                className={`absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none transition-colors ${iconClass}`}
              />
              <select
                name="year"
                value={formData.year}
                onChange={handleChange}
                className={`w-full pl-10 pr-4 py-3 rounded-xl border outline-none appearance-none transition-all duration-200 text-sm ${inputBgClass} ${
                  colorMode
                    ? "focus:border-indigo-500 focus:ring-4 focus:ring-indigo-950/50"
                    : "focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50"
                }`}
              >
                <option
                  value=""
                  className={
                    colorMode ? "bg-slate-900 text-slate-500" : "text-slate-400"
                  }
                >
                  Year
                </option>
                <option
                  value="1st Year"
                  className={colorMode ? "bg-slate-900" : ""}
                >
                  1st Yr
                </option>
                <option
                  value="2nd Year"
                  className={colorMode ? "bg-slate-900" : ""}
                >
                  2nd Yr
                </option>
                <option
                  value="3rd Year"
                  className={colorMode ? "bg-slate-900" : ""}
                >
                  3rd Yr
                </option>
                <option
                  value="4th Year"
                  className={colorMode ? "bg-slate-900" : ""}
                >
                  4th Yr
                </option>
              </select>
              <div
                className={`absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none border-l-[3px] border-r-[3px] border-t-4 border-transparent ${
                  colorMode ? "border-t-slate-500" : "border-t-slate-400"
                }`}
              />
            </div>

            {/* Semester (New Dropdown) */}
            <div className="relative group">
              <GraduationCap
                size={18}
                className={`absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none transition-colors ${iconClass}`}
              />
              <select
                name="semester"
                value={formData.semester}
                onChange={handleChange}
                className={`w-full pl-10 pr-4 py-3 rounded-xl border outline-none appearance-none transition-all duration-200 text-sm ${inputBgClass} ${
                  colorMode
                    ? "focus:border-indigo-500 focus:ring-4 focus:ring-indigo-950/50"
                    : "focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50"
                }`}
              >
                <option
                  value=""
                  className={
                    colorMode ? "bg-slate-900 text-slate-500" : "text-slate-400"
                  }
                >
                  Sem
                </option>
                <option
                  value="2nd Year"
                  className={colorMode ? "bg-slate-900" : ""}
                >
                  1st Sem
                </option>
                <option
                  value="2nd Year"
                  className={colorMode ? "bg-slate-900" : ""}
                >
                  2nd Sem
                </option>
              </select>
              <div
                className={`absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none border-l-[3px] border-r-[3px] border-t-4 border-transparent ${
                  colorMode ? "border-t-slate-500" : "border-t-slate-400"
                }`}
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        {/* Actions Button Group */}
        <div className="grid grid-cols-2 gap-3 mt-8">
          {/* Secondary Button: Fill Later */}
          <button
            type="button"
            onClick={() => setopenStudentForm(false)} // Simply closes the modal overlay
            className={`py-3.5 rounded-xl font-semibold transition-all duration-200 active:scale-[0.99] border text-center text-xs sm:text-sm ${
              colorMode
                ? "bg-slate-800/40 border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-slate-100"
                : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-800"
            }`}
          >
            Fill After Quiz
          </button>

          {/* Primary Button: Save Details */}
          <button
            type="button"
            onClick={handleSave}
            className={`py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition-all duration-200 flex items-center justify-center gap-1.5 group active:scale-[0.99] text-xs sm:text-sm ${
              colorMode
                ? "shadow-lg shadow-indigo-950/40"
                : "shadow-lg shadow-indigo-600/20"
            }`}
          >
            <span>Save Details</span>
            <ArrowRight
              size={16}
              className="group-hover:translate-x-0.5 transition-transform"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentProfileForm;
