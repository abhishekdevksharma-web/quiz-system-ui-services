import React, { useContext, useState, useEffect } from "react";

import {
  ChevronLeft,
  ChevronRight,
  Flag,
  Clock,
  Layout,
  CheckCircle2,
  Circle,
  CircleDot,
  User,
  X,
  LoaderCircle,
} from "lucide-react";

import StudentContext from "../../context/studentContext/studentContext";
import QuestionCard from "./QuestionCard";
import StudentResultModal from "./StudentResultModal";

const QuizFrame = () => {
  const {
    questions,
    UserStartQuiz,
    validateUserAnswer,
    userMeta,
    colorMode,
    isTimerRunning,
    setisTimerRunning,
    timerRef,
  } = useContext(StudentContext);

  const [resultModal, setResultModal] = useState(false);
  const [resultLoding, setResultLoding] = useState(false);
  const [resultData, setResultData] = useState(null);

  const [pageCount, setpageCount] = useState({
    questions: [],
    totalQustion: "",
    showQuestion: "",
  });
  const [showUserQuiz, setShowUserQuiz] = useState(false);

  useEffect(() => {
    if (UserStartQuiz === true) {
      setpageCount({
        totalQustion: questions.length,
        showQuestion: 1,
        questions: questions.map((e, index) => {
          return {
            id: index + 1,
            status: "unvisited",
          };
        }),
      });
      setShowUserQuiz(true);
    }
  }, [UserStartQuiz]);

  function prevQuestion() {
    if (pageCount.showQuestion > 1) {
      setpageCount((prev) => {
        return { ...prev, showQuestion: prev.showQuestion - 1 };
      });
    }
  }

  function nextQuestion() {
    if (pageCount.showQuestion < pageCount.totalQustion) {
      setpageCount((prev) => {
        return { ...prev, showQuestion: prev.showQuestion + 1 };
      });
    }
  }

  async function handleSubmit() {
    setisTimerRunning(false);
    setResultLoding(true);
    const newData = {
      ...userMeta,
      submittedInSec: timerRef.current,
    };
    const res = await validateUserAnswer(newData); 
    if (res.status === true) {

      setResultLoding(false);

      setResultModal(res.status);
      setResultData(res.value);
    }

    // setResult(false);
  }
  function onClose() {
    setResultModal(false);
  }

  function selectOptions(opt, index) {
    setpageCount((prev) => {
      return {
        ...prev,
        questions: prev.questions.map((q) =>
          q.id === prev.showQuestion ? { ...q, status: "answered" } : q,
        ),
      };
    });
  }
  return (
    <div
      className={`flex flex-1 flex-col font-sans ${colorMode ? "bg-gray-900 text-white" : "bg-slate-50 text-slate-900"}`}
    >
      <main className="flex flex-1 overflow-hidden">
        {/* Question Section */}
        <div className="flex-1 p-8 flex flex-col items-center justify-center">
          <div className="max-w-3xl w-full">
            {/* Header */}
            {/* <div className="flex justify-between mb-6">
              <h2
                className={`text-sm font-semibold ${colorMode ? "text-gray-400" : "text-slate-500"}`}
              >
                Question {pageCount.showQuestion} / {pageCount.totalQustion}
              </h2>
              <button className="flex items-center gap-2 text-indigo-500">
                <Flag size={16} /> Mark
              </button>
            </div> */}

            {/* Question Card */}
            {showUserQuiz ? (
              <QuestionCard
                data={questions[pageCount.showQuestion - 1]}
                questionsCount={pageCount}
                quizId={pageCount.showQuestion}
                selectOptionsFunction={selectOptions}
              />
            ) : (
              <div className="flex-1 w-full flex justify-center items-center">
                <div className="flex flex-col items-center gap-3">
                  {/* Spinner */}
                  <div className="w-10 h-10 border-4 border-gray-600 border-t-white rounded-full animate-spin"></div>

                  {/* Text */}
                  <p className="text-gray-400 text-sm">Loading question...</p>
                </div>
              </div>
            )}

            {/* Buttons */}
            <div className="w-full flex justify-between items-center px-10 py-10">
              <button
                onClick={prevQuestion}
                className="group px-4 py-2 rounded-lg text-white bg-gray-700 border border-white/20 hover:bg-gray-600 gap-2 flex items-center transition-all duration-200 cursor-pointer"
              >
                <span className="transition-transform duration-200 group-hover:-translate-x-1">
                  ←
                </span>
                <span className="text-sm tracking-wide">Previous</span>
              </button>

              <button
                onClick={nextQuestion}
                className="group px-5 py-2 rounded-lg bg-white text-gray-900 hover:bg-gray-300 transition font-semibold flex items-center gap-2 cursor-pointer"
              >
                <span className="text-sm tracking-wide">Next</span>
                <span className="transition-transform duration-200 group-hover:translate-x-1">
                  →
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <aside
          className={`w-84 border-l transition-colors duration-300 flex flex-col h-full shadow-2xl ${colorMode ? "bg-gray-900 border-gray-800 text-gray-100" : "bg-white border-slate-200 text-slate-800"}`}
        >
          {/* Header Section with Progress */}
          <div className="p-6 border-b border-inherit">
            <div className="flex justify-between items-end mb-4">
              <h3 className="font-bold text-lg tracking-tight">
                Quiz Progress
              </h3>
              <span
                className={`text-xs font-bold px-2 py-1 rounded-md ${colorMode ? "bg-indigo-500/20 text-indigo-400" : "bg-indigo-50 text-indigo-600"}`}
              >
                {Math.round(
                  (questions.filter((q) => q.status === "answered").length /
                    questions.length) *
                    100,
                )}
                % Done
              </span>
            </div>
            {/* Visual Progress Bar */}
            <div
              className={`w-full h-2 rounded-full overflow-hidden ${colorMode ? "bg-gray-800" : "bg-slate-100"}`}
            >
              <div
                className="h-full bg-indigo-500 transition-all duration-500 ease-out shadow-[0_0_8px_rgba(99,102,241,0.6)]"
                style={{
                  width: `${(questions.filter((q) => q.status === "answered").length / questions.length) * 100}%`,
                }}
              />
            </div>
          </div>

          {/* Question Grid Section */}
          <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
            <p
              className={`text-xs font-semibold uppercase tracking-widest mb-4 ${colorMode ? "text-gray-500" : "text-slate-400"}`}
            >
              Question Navigator
            </p>
            <div className="grid grid-cols-5 gap-3">
              {pageCount.questions.map((q) => {
                const isCurrent = pageCount.showQuestion === q.id;
                const isAnswered = q.status === "answered";

                return (
                  <button
                    key={q.id}
                    onClick={() =>
                      setpageCount((prev) => ({ ...prev, showQuestion: q.id }))
                    }
                    className={`relative group h-11 w-11 rounded-xl text-sm font-bold flex items-center justify-center transition-all duration-200 transform hover:scale-110 active:scale-95 ${
                      isCurrent
                        ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/40"
                        : isAnswered
                          ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/20"
                          : colorMode
                            ? "bg-gray-800 text-gray-400 border border-gray-700 hover:border-indigo-500"
                            : "bg-slate-50 text-slate-400 border border-slate-100 hover:border-indigo-300"
                    }`}
                  >
                    {q.id}
                    {/* Status Dot */}
                    {isAnswered && !isCurrent && (
                      <span className="absolute -top-1 -right-1 w-3 h-3 bg-white border-2 border-emerald-500 rounded-full animate-pulse" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Stats & Footer */}
          <div
            className={`p-6 border-t border-inherit ${colorMode ? "bg-gray-900/50" : "bg-slate-50/50"}`}
          >
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div
                className={`p-3 rounded-2xl ${colorMode ? "bg-gray-800" : "bg-white border border-slate-100"}`}
              >
                <p className="text-[10px] uppercase font-bold text-emerald-500 mb-1">
                  Answered
                </p>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-emerald-500" />
                  <span className="text-lg font-black">
                    {
                      pageCount.questions.filter((q) => q.status === "answered")
                        .length
                    }
                  </span>
                </div>
              </div>
              <div
                className={`p-3 rounded-2xl ${colorMode ? "bg-gray-800" : "bg-white border border-slate-100"}`}
              >
                <p className="text-[10px] uppercase font-bold text-amber-500 mb-1">
                  Pending
                </p>
                <div className="flex items-center gap-2">
                  <Clock size={16} className="text-amber-500" />
                  <span className="text-lg font-black">
                    {pageCount.questions.length -
                      pageCount.questions.filter((q) => q.status === "answered")
                        .length}
                  </span>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all duration-300 group cursor-pointer ${
                colorMode
                  ? "bg-indigo-600 hover:bg-indigo-500 text-white shadow-xl shadow-indigo-900/40 hover:-translate-y-1"
                  : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-xl shadow-indigo-200 hover:-translate-y-1"
              }`}
            >
              <span>Submit</span>
              <ChevronRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>

            <p
              className={`text-[10px] text-center mt-4 leading-relaxed font-medium ${colorMode ? "text-gray-500" : "text-slate-400"}`}
            >
              Review all flagged questions before <br /> the time runs out.
            </p>
          </div>
        </aside>
      </main>
      {(resultModal || resultLoding) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4">
          {resultModal && (
            <div
              className={`flex flex-col h-full w-full max-w-5xl overflow-hidden  rounded-3xl shadow-2xl border-2 ${
                colorMode
                  ? "bg-[#0F172A] border-gray-700"
                  : "bg-white border-gray-200"
              }`}
            >
              {/* Header */}
              <div
                className={`sticky top-0 z-10 flex h-14 items-center justify-between border-b px-8 ${
                  colorMode
                    ? "bg-[#111827] border-gray-700"
                    : "bg-white border-gray-200"
                }`}
              >
                <div>
                  <h2
                    className={`text-2xl font-bold ${
                      colorMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    Student Result
                  </h2> 
                </div>

                <button
                  onClick={onClose}
                  className={`flex h-11 w-11 items-center justify-center rounded-xl transition-all duration-200 ${
                    colorMode ? "hover:bg-gray-800" : "hover:bg-gray-100"
                  }`}
                >
                  <X
                    size={22}
                    className={colorMode ? "text-gray-300" : "text-gray-700"}
                  />
                </button>
              </div>

              {/* Body */}
              <div
                className={`h-full flex flex-1 items-center justify-center overflow-y-auto ${
                  colorMode ? "bg-[#0B1120]" : "bg-gray-50"
                }`}
              >
                <StudentResultModal colorMode={colorMode} data={resultData} />
              </div>
            </div>
          )}
          {resultLoding && (
            <div
              className={`rounded-2xl px-20 py-5 flex flex-col items-center justify-center ${
                colorMode
                  ? "bg-[#0F172A]/90 backdrop-blur-sm"
                  : "bg-white/90 backdrop-blur-sm"
              }`}
            >
              {/* Loader */}
              <div className="relative">
                <div
                  className={`absolute inset-0 rounded-full animate-ping ${
                    colorMode ? "bg-indigo-400/20" : "bg-indigo-600/20"
                  }`}
                />

                <div
                  className={`relative flex h-20 w-20 items-center justify-center rounded-full shadow-lg ${
                    colorMode
                      ? "bg-indigo-500 text-white"
                      : "bg-indigo-600 text-white"
                  }`}
                >
                  <LoaderCircle size={40} className="animate-spin" />
                </div>
              </div>

              {/* Title */}
              <h2
                className={`mt-8 text-2xl font-bold ${
                  colorMode ? "text-white" : "text-gray-900"
                }`}
              >
                Loading Result...
              </h2>

              {/* Subtitle */}
              <p
                className={`mt-2 text-sm ${
                  colorMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Please wait while we fetch your result.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default QuizFrame;
