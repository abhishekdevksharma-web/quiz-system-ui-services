import {
  X,
  UserRound,
  Mail,
  Hash,
  CalendarDays,
  BookOpen,
  Layers3,
  ArrowRight,
} from "lucide-react";
import { useContext, useState } from "react";

import StudentContext from "../../context/studentContext/studentContext"; 

const StudentDetailsForm = ({ isOpen, onClose }) => {
  const { setUserMeta, colorMode } = useContext(StudentContext);

  const [student, setStudent] = useState({
    name: "",
    email: "",
    roll: "",
    year: "",
    sem: "",
    section: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setStudent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setUserMeta((prev) => ({
      ...prev,
      student,
    }));

    onClose({
      confirmed: true,
      student,
    });
  };

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm ${
        colorMode ? "bg-slate-950/70" : "bg-slate-950/40"
      }`}
    >
      <div
        className={`w-full max-w-xl overflow-hidden rounded-2xl border shadow-2xl ${
          colorMode
            ? "border-slate-700 bg-slate-900 shadow-black/40"
            : "border-slate-200 bg-white shadow-slate-900/20"
        }`}
      >
        {/* Header */}
        <div
          className={`relative overflow-hidden border-b px-5 py-4 ${
            colorMode ? "border-slate-800" : "border-slate-100"
          }`}
        >
          <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-indigo-500/10 blur-2xl" />

          <div className="absolute -bottom-12 left-24 h-20 w-20 rounded-full bg-violet-500/10 blur-2xl" />

          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-xl ring-1 ${
                  colorMode
                    ? "bg-indigo-500/10 text-indigo-400 ring-indigo-500/10"
                    : "bg-indigo-50 text-indigo-600 ring-indigo-100"
                }`}
              >
                <UserRound size={19} />
              </div>

              <div>
                <h2
                  className={`text-sm font-bold ${
                    colorMode ? "text-white" : "text-slate-900"
                  }`}
                >
                  Student Details
                </h2>

                <p
                  className={`mt-0.5 text-[11px] ${
                    colorMode ? "text-slate-400" : "text-slate-500"
                  }`}
                >
                  Enter your information to continue
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() =>
                onClose({
                  confirmed: false,
                  student: null,
                })
              }
              className={`flex h-8 w-8 items-center justify-center rounded-lg transition-all ${
                colorMode
                  ? "text-slate-500 hover:bg-slate-800 hover:text-white"
                  : "text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              }`}
            >
              <X size={17} />
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="px-5 py-5">
            {/* Section title */}
            <div className="mb-4 flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-indigo-500" />

              <p
                className={`text-[10px] font-bold uppercase tracking-wider ${
                  colorMode ? "text-slate-500" : "text-slate-400"
                }`}
              >
                Personal Information
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3.5">
              {/* Name */}
              <div>
                <label
                  className={`mb-1.5 block text-[11px] font-semibold ${
                    colorMode ? "text-slate-300" : "text-slate-600"
                  }`}
                >
                  Full Name
                </label>

                <div className="relative">
                  <div
                    className={`pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 ${
                      colorMode ? "text-slate-500" : "text-slate-400"
                    }`}
                  >
                    <UserRound size={15} />
                  </div>

                  <input
                    type="text"
                    name="name"
                    value={student.name}
                    onChange={handleChange}
                    placeholder="Enter full name"
                    required
                    className={`w-full rounded-xl border py-2.5 pl-10 pr-3 text-sm outline-none transition-all ${
                      colorMode
                        ? "border-slate-700 bg-slate-800 text-white placeholder:text-slate-500 hover:border-slate-600 focus:border-indigo-500 focus:bg-slate-800 focus:ring-4 focus:ring-indigo-500/10"
                        : "border-slate-200 bg-slate-50 text-slate-800 placeholder:text-slate-400 hover:border-slate-300 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
                    }`}
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label
                  className={`mb-1.5 block text-[11px] font-semibold ${
                    colorMode ? "text-slate-300" : "text-slate-600"
                  }`}
                >
                  Email Address
                </label>

                <div className="relative">
                  <div
                    className={`pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 ${
                      colorMode ? "text-slate-500" : "text-slate-400"
                    }`}
                  >
                    <Mail size={15} />
                  </div>

                  <input
                    type="email"
                    name="email"
                    value={student.email}
                    onChange={handleChange}
                    placeholder="Enter email"
                    required
                    className={`w-full rounded-xl border py-2.5 pl-10 pr-3 text-sm outline-none transition-all ${
                      colorMode
                        ? "border-slate-700 bg-slate-800 text-white placeholder:text-slate-500 hover:border-slate-600 focus:border-indigo-500 focus:bg-slate-800 focus:ring-4 focus:ring-indigo-500/10"
                        : "border-slate-200 bg-slate-50 text-slate-800 placeholder:text-slate-400 hover:border-slate-300 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
                    }`}
                  />
                </div>
              </div>

              {/* Roll */}
              <div>
                <label
                  className={`mb-1.5 block text-[11px] font-semibold ${
                    colorMode ? "text-slate-300" : "text-slate-600"
                  }`}
                >
                  Roll Number
                </label>

                <div className="relative">
                  <div
                    className={`pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 ${
                      colorMode ? "text-slate-500" : "text-slate-400"
                    }`}
                  >
                    <Hash size={15} />
                  </div>

                  <input
                    type="text"
                    name="roll"
                    value={student.roll}
                    onChange={handleChange}
                    placeholder="Enter roll number"
                    required
                    className={`w-full rounded-xl border py-2.5 pl-10 pr-3 text-sm outline-none transition-all ${
                      colorMode
                        ? "border-slate-700 bg-slate-800 text-white placeholder:text-slate-500 hover:border-slate-600 focus:border-indigo-500 focus:bg-slate-800 focus:ring-4 focus:ring-indigo-500/10"
                        : "border-slate-200 bg-slate-50 text-slate-800 placeholder:text-slate-400 hover:border-slate-300 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
                    }`}
                  />
                </div>
              </div>

              {/* Year */}
              <div>
                <label
                  className={`mb-1.5 block text-[11px] font-semibold ${
                    colorMode ? "text-slate-300" : "text-slate-600"
                  }`}
                >
                  Year
                </label>

                <div className="relative">
                  <div
                    className={`pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 ${
                      colorMode ? "text-slate-500" : "text-slate-400"
                    }`}
                  >
                    <CalendarDays size={15} />
                  </div>

                  <select
                    name="year"
                    value={student.year}
                    onChange={handleChange}
                    required
                    className={`w-full appearance-none rounded-xl border py-2.5 pl-10 pr-3 text-sm outline-none transition-all ${
                      colorMode
                        ? "border-slate-700 bg-slate-800 text-white hover:border-slate-600 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                        : "border-slate-200 bg-slate-50 text-slate-800 hover:border-slate-300 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
                    }`}
                  >
                    <option value="">Select year</option>
                    <option value="1st">1st Year</option>
                    <option value="2nd">2nd Year</option>
                    <option value="3rd">3rd Year</option>
                    <option value="4th">4th Year</option>
                  </select>
                </div>
              </div>

              {/* Semester */}
              <div>
                <label
                  className={`mb-1.5 block text-[11px] font-semibold ${
                    colorMode ? "text-slate-300" : "text-slate-600"
                  }`}
                >
                  Semester
                </label>

                <div className="relative">
                  <div
                    className={`pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 ${
                      colorMode ? "text-slate-500" : "text-slate-400"
                    }`}
                  >
                    <BookOpen size={15} />
                  </div>

                  <select
                    name="sem"
                    value={student.sem}
                    onChange={handleChange}
                    required
                    className={`w-full appearance-none rounded-xl border py-2.5 pl-10 pr-3 text-sm outline-none transition-all ${
                      colorMode
                        ? "border-slate-700 bg-slate-800 text-white hover:border-slate-600 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                        : "border-slate-200 bg-slate-50 text-slate-800 hover:border-slate-300 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
                    }`}
                  >
                    <option value="">Select semester</option>

                    {Array.from({ length: 8 }, (_, i) => (
                      <option key={i} value={`${i + 1}`}>
                        {i + 1} Semester
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Section */}
              <div>
                <label
                  className={`mb-1.5 block text-[11px] font-semibold ${
                    colorMode ? "text-slate-300" : "text-slate-600"
                  }`}
                >
                  Section
                </label>

                <div className="relative">
                  <div
                    className={`pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 ${
                      colorMode ? "text-slate-500" : "text-slate-400"
                    }`}
                  >
                    <Layers3 size={15} />
                  </div>

                  <select
                    name="section"
                    value={student.section}
                    onChange={handleChange}
                    required
                    className={`w-full appearance-none rounded-xl border py-2.5 pl-10 pr-3 text-sm outline-none transition-all ${
                      colorMode
                        ? "border-slate-700 bg-slate-800 text-white hover:border-slate-600 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                        : "border-slate-200 bg-slate-50 text-slate-800 hover:border-slate-300 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
                    }`}
                  >
                    <option value="">Select section</option>
                    <option value="A">Section A</option>
                    <option value="B">Section B</option>
                    <option value="C">Section C</option>
                    <option value="D">Section D</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div
            className={`flex items-center justify-between border-t px-5 py-3.5 ${
              colorMode
                ? "border-slate-800 bg-slate-900/70"
                : "border-slate-100 bg-slate-50/70"
            }`}
          >
            <p
              className={`text-[10px] ${
                colorMode ? "text-slate-500" : "text-slate-400"
              }`}
            >
              Your details will be used for quiz submission.
            </p>

            <div className="flex items-center gap-2">
              {/* Cancel */}
              <button
                type="button"
                onClick={() =>
                  onClose({
                    confirmed: false,
                    student: null,
                  })
                }
                className={`rounded-xl px-4 py-2.5 text-xs font-semibold transition-all ${
                  colorMode
                    ? "text-slate-300 bg-white/10 hover:bg-slate-800"
                    : "text-slate-600 hover:bg-slate-200/70"
                }`}
              >
                Later
              </button>

              {/* Continue */}
              <button
                type="submit"
                className="group flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-semibold text-white shadow-sm shadow-indigo-600/20 transition-all hover:bg-indigo-700 hover:shadow-md hover:shadow-indigo-600/20 active:scale-[0.98]"
              >
                Continue
                <ArrowRight
                  size={14}
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
                />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentDetailsForm;
