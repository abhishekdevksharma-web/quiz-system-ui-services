import React, { memo, useContext, useEffect } from "react";
import QuestionCard from "./QuestionCard";
import { ChevronRight, Flag, Loader2 } from "lucide-react";
import StudentContext from "../../context/studentContext/studentContext";
import MobileQuestionNavigator from "./MobileQuestionNavigator";

function QuestionSection({
  questions,
  setCurrentQuesIndex,
  currentQuesIndex,
  userAnswer,
  setUserAnswer,
  onSubmit,
  submitLoading,
  quiz,
}) {
  const { viewDevice, colorMode } = useContext(StudentContext);
  function onSelect(opt, index, currentQuesId) {
    setUserAnswer((prev) =>
      prev.map((item) =>
        item.questionId === currentQuesId
          ? {
              ...item,
              selectAnswerIndex: item.selectAnswerIndex === index ? -1 : index,
              status:
                item.selectAnswerIndex === index ? "unanswered" : "answered",
            }
          : item,
      ),
    );
  }

  const currentQuestion = questions[currentQuesIndex];

  const currentAnswer = userAnswer.find(
    (item) => item.questionId === currentQuestion?._id,
  );

  const isFlagged = currentAnswer?.flagged === true;
  return (
    <div className="h-full w-full flex flex-col items-center px-4 pt-6 sm:px-6 sm:pt-8">
      {viewDevice === "mobile" && (
        <MobileQuestionNavigator
          quiz={quiz}
          questions={questions}
          userAnswer={userAnswer}
          currentQuesIndex={currentQuesIndex}
          setCurrentQuesIndex={setCurrentQuesIndex}
          colorMode={colorMode}
        />
      )}

      {/* Question */}
      <div className="h-full w-full flex flex-col items-center justify-center">
        <div className="w-full max-w-3xl">
          <QuestionCard
            question={questions[currentQuesIndex]}
            onSelect={onSelect}
            currentQuesIndex={currentQuesIndex}
            userAnswer={userAnswer} 
          />
        </div>

        {/* Navigation Buttons */}

        <div className="mt-8 flex w-full max-w-3xl items-center justify-between px-2">
          {/* Previous */}
          <button
            type="button"
            disabled={currentQuesIndex === 0}
            onClick={() => {
              setCurrentQuesIndex((prev) => Math.max(0, prev - 1));
            }}
            className={`group flex items-center gap-2 rounded-xl border px-5 py-2.5 text-sm font-semibold transition-all duration-200 ${
              currentQuesIndex === 0
                ? "cursor-not-allowed border-slate-700 bg-slate-800 text-slate-500"
                : "cursor-pointer border-slate-600 bg-slate-700 text-white hover:border-slate-500 hover:bg-slate-600"
            }`}
          >
            <span
              className={`transition-transform duration-200 ${
                currentQuesIndex > 0 ? "group-hover:-translate-x-1" : ""
              }`}
            >
              ←
            </span>

            <span>Previous</span>
          </button>

          {/* Flag */}
          <button
            type="button"
            onClick={() => {
              setUserAnswer((prev) =>
                prev.map((item, i) =>
                  item.questionId === questions[currentQuesIndex]._id
                    ? { ...item, flagged: !item.flagged }
                    : item,
                ),
              );
            }}
            className={`group flex items-center gap-2 cursor-pointer rounded-xl border px-5 py-2.5 text-sm font-semibold transition-all duration-200 ${
              isFlagged
                ? "border-amber-500/40 bg-amber-500 text-white hover:bg-amber-600"
                : "border-slate-600 bg-slate-700 text-slate-200 hover:border-amber-500/50 hover:bg-slate-600 hover:text-amber-400"
            }`}
          >
            <Flag
              size={16}
              className={`transition-transform duration-200  ${
                isFlagged ? "fill-current" : "group-hover:rotate-12"
              }`}
            />

            <span>{isFlagged ? "Flagged" : "Flag"}</span>
          </button>

          {/* Next */}
          <button
            type="button"
            disabled={
              questions.length === 0 || currentQuesIndex >= questions.length - 1
            }
            onClick={() => {
              setCurrentQuesIndex((prev) =>
                Math.min(questions.length - 1, prev + 1),
              );
            }}
            className={`group flex items-center gap-2 rounded-xl px-6 py-2.5 text-sm font-bold text-white shadow-sm transition-all duration-200 ${
              questions.length === 0 || currentQuesIndex >= questions.length - 1
                ? "cursor-not-allowed bg-indigo-900 text-indigo-400"
                : "cursor-pointer bg-indigo-600 hover:bg-indigo-500 hover:shadow-md"
            }`}
          >
            <span>Next</span>

            <span
              className={`transition-transform duration-200 ${
                currentQuesIndex < questions.length - 1
                  ? "group-hover:translate-x-1"
                  : ""
              }`}
            >
              →
            </span>
          </button>
        </div>
      </div>
      {viewDevice === "mobile" && (
        <div
          className={`w-full justify-end p-6 ${
            colorMode ? "bg-gray-900/50" : "bg-slate-50/50"
          }`}
        >
          <button
            onClick={onSubmit}
            type="button"
            className={`w-full py-4 px-4 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all duration-300 group cursor-pointer ${
              colorMode
                ? "bg-indigo-600 hover:bg-indigo-500 text-white shadow-xl shadow-indigo-900/40 "
                : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-xl shadow-indigo-200  "
            }`}
          >
            {submitLoading ? (
              <>
                <Loader2 size={17} className="animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit Quiz"
            )}

            <ChevronRight
              size={18}
              className="group-hover:translate-x-1 transition-transform"
            />
          </button>
        </div>
      )}
    </div>
  );
}

export default memo(QuestionSection);
