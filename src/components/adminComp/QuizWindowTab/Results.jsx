import React, { useContext, useEffect, useState } from "react";
import {
  X,
  Search,
  Download,
  FileText,
  FileImage,
  FileSpreadsheet,
  BarChart3,
  Clock3,
} from "lucide-react";
import AdminContext from "../../../context/adminContext/adminContext";

const ResultsTab = ({ colorMode, quiz }) => {
  const { FetchQuizStudentResults } = useContext(AdminContext);

  const [students, setstudents] = useState([]);

  useEffect(() => {
    async function initial() {
      const res = await FetchQuizStudentResults({ quizId: quiz._id });

      const studentList = res.students.map((item) => ({
        name: item.student.name,
        email: item.student.email,
        rollNo: item.student.roll,
        section: item.student.section,
        semester: item.student.semester,
        score: item.obtainMarks,
        totalMarks: item.totalMarks,
        percentage: (item.obtainMarks / item.totalMarks) * 100,
        submittedInSec: item.quizDuration - item.submittedInSec / 60,
      }));

      studentList.sort((a, b) => b.percentage - a.percentage);

      setstudents(studentList);
    }
    initial();
  }, []);

  return (
    <div>
      {/* Toolbar */}
      <div
        className={`flex flex-col md:flex-row md:items-center md:justify-between gap-4 py-4 px-5 border-b ${
          colorMode ? "border-slate-700" : "border-slate-200"
        }`}
      >
        {/* Search */}
        <div className="relative w-full md:max-w-sm">
          <Search
            size={16}
            className={`absolute left-3 top-1/2 -translate-y-1/2 ${
              colorMode ? "text-slate-500" : "text-slate-400"
            }`}
          />

          <input
            type="text"
            placeholder="Search student..."
            className={`w-full rounded-xl border pl-10 pr-4 py-2.5 text-sm outline-none transition ${
              colorMode
                ? "bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 focus:border-indigo-500"
                : "bg-white border-slate-300 text-slate-900 focus:border-indigo-500"
            }`}
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <span
            className={`text-sm ${
              colorMode ? "text-slate-400" : "text-slate-500"
            }`}
          >
            0 Results
          </span>

          <div className="relative">
            <select
              className={`cursor-pointer rounded-xl border px-4 py-2 text-sm outline-none ${
                colorMode
                  ? "bg-slate-800 border-slate-700 text-white"
                  : "bg-white border-slate-300 text-slate-900"
              }`}
            >
              <option value="">Export As</option>
              <option value="pdf">PDF</option>
              <option value="word">Word</option>
              <option value="image">Image</option>
            </select>
          </div>

          <button className="cursor-pointer inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-500 active:scale-95">
            <Download size={16} />
            Export
          </button>
        </div>
      </div>

      {/* Content */}

      <div
        className={`flex-1 px-5 py-3 max-h-[420px] overflow-y-auto ${
          colorMode ? "bg-slate-900" : "bg-slate-50/50"
        }`}
      >
        {false ? (
          <div
            className={`h-full rounded-2xl border border-dashed flex flex-col items-center justify-center text-center ${
              colorMode ? "border-slate-700" : "border-slate-300"
            }`}
          >
            <FileSpreadsheet
              size={48}
              className={colorMode ? "text-slate-600" : "text-slate-400"}
            />

            <h3
              className={`mt-4 text-lg font-semibold ${
                colorMode ? "text-white" : "text-slate-900"
              }`}
            >
              Scores Content Area
            </h3>

            <p
              className={`mt-2 max-w-md text-sm ${
                colorMode ? "text-slate-400" : "text-slate-500"
              }`}
            >
              Student score table, filters, analytics, ranking cards and export
              data will appear here.
            </p>

            <div className="flex gap-3 mt-5">
              <div className="rounded-xl border px-3 py-2 text-xs flex items-center gap-2">
                <FileText size={14} />
                PDF
              </div>

              <div className="rounded-xl border px-3 py-2 text-xs flex items-center gap-2">
                <FileText size={14} />
                Word
              </div>

              <div className="rounded-xl border px-3 py-2 text-xs flex items-center gap-2">
                <FileImage size={14} />
                Image
              </div>
            </div>
          </div>
        ) : (
          <div
            className={`overflow-hidden rounded-2xl border ${
              colorMode
                ? "border-slate-700 bg-slate-800"
                : "border-slate-200 bg-white"
            }`}
          >
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px]">
                <thead>
                  <tr className={colorMode ? "bg-slate-700/50" : "bg-slate-50"}>
                    <th
                      className={`px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider ${
                        colorMode ? "text-slate-300" : "text-slate-600"
                      }`}
                    >
                      Rank
                    </th>

                    <th
                      className={`px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider ${
                        colorMode ? "text-slate-300" : "text-slate-600"
                      }`}
                    >
                      Student
                    </th>

                    <th
                      className={`px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider ${
                        colorMode ? "text-slate-300" : "text-slate-600"
                      }`}
                    >
                      Roll No
                    </th>

                    <th
                      className={`px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider ${
                        colorMode ? "text-slate-300" : "text-slate-600"
                      }`}
                    >
                      Score
                    </th>

                    <th
                      className={`px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider ${
                        colorMode ? "text-slate-300" : "text-slate-600"
                      }`}
                    >
                      Percentage
                    </th>

                    <th
                      className={`px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider ${
                        colorMode ? "text-slate-300" : "text-slate-600"
                      }`}
                    >
                      Status
                    </th>

                    <th
                      className={`px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider ${
                        colorMode ? "text-slate-300" : "text-slate-600"
                      }`}
                    >
                      Submitted
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {students?.length > 0 ? (
                    students.map((student, index) => (
                      <tr
                        key={student._id || index}
                        className={`border-t transition-colors ${
                          colorMode
                            ? "border-slate-700 hover:bg-slate-700/30"
                            : "border-slate-200 hover:bg-slate-50"
                        }`}
                      >
                        {/* Rank */}
                        <td
                          className={`px-4 py-3 ${
                            colorMode ? "text-slate-200" : "text-slate-700"
                          }`}
                        >
                          <span
                            className={`inline-flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold ${
                              index === 0
                                ? "bg-yellow-100 text-yellow-700"
                                : index === 1
                                  ? "bg-slate-200 text-slate-700"
                                  : index === 2
                                    ? "bg-orange-100 text-orange-700"
                                    : colorMode
                                      ? "bg-slate-700 text-slate-300"
                                      : "bg-slate-100 text-slate-600"
                            }`}
                          >
                            {index + 1}
                          </span>
                        </td>

                        {/* Student Name */}
                        <td className="px-4 py-3">
                          <div>
                            <p
                              className={`font-medium ${
                                colorMode ? "text-slate-100" : "text-slate-900"
                              }`}
                            >
                              {student.name}
                            </p>

                            <p
                              className={`text-xs ${
                                colorMode ? "text-slate-400" : "text-slate-500"
                              }`}
                            >
                              {student.email}
                            </p>
                          </div>
                        </td>

                        {/* Roll */}
                        <td
                          className={`px-4 py-3 ${
                            colorMode ? "text-slate-300" : "text-slate-700"
                          }`}
                        >
                          {student.rollNo}
                        </td>

                        {/* Score */}
                        <td
                          className={`px-4 py-3 font-medium ${
                            colorMode ? "text-white" : "text-slate-900"
                          }`}
                        >
                          {student.score}/{student.totalMarks}
                        </td>

                        {/* Percentage */}
                        <td className="px-4 py-3">
                          <span
                            className={`rounded-full px-2 py-1 text-xs font-medium ${
                              student.percentage >= 80
                                ? "bg-emerald-100 text-emerald-700"
                                : student.percentage >= 50
                                  ? "bg-amber-100 text-amber-700"
                                  : "bg-red-100 text-red-700"
                            }`}
                          >
                            {Math.floor(student.percentage)}%
                          </span>
                        </td>

                        {/* Status */}
                        <td className="px-4 py-3">
                          <span
                            className={`rounded-full px-2 py-1 text-xs font-medium ${
                              student.status === "Passed"
                                ? "bg-emerald-100 text-emerald-700"
                                : student.status === "Absent"
                                  ? "bg-slate-100 text-slate-700"
                                  : "bg-red-100 text-red-700"
                            }`}
                          >
                            {student.status}
                          </span>
                        </td>

                        {/* Submitted */}
                        <td
                          className={`px-4 py-3 text-sm ${
                            colorMode ? "text-slate-400" : "text-slate-500"
                          }`}
                        >
                          <div className="flex gap-1.5">
                            <span>
                              {student.submittedInSec * 60 < 60
                                ? `${Math.floor(student.submittedInSec * 60)} sec`
                                : `${Math.floor(student.submittedInSec)} min${
                                    (student.submittedInSec * 60) % 60
                                      ? ` ${Math.floor((student.submittedInSec * 60) % 60)} sec`
                                      : ""
                                  }`}
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={7}
                        className={`py-12 text-center ${
                          colorMode ? "text-slate-400" : "text-slate-500"
                        }`}
                      >
                        No score records found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultsTab;
