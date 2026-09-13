import { useState } from "react";
import { ChevronDown, Trash2 } from "lucide-react";
import ImageToText from "../../QuizBuilder/utils/ui/ImageToText";

function QuesCard({colorMode, question, setQuestions, deleteQuestion }) {
  const [open, setOpen] = useState(false);

  const updateQuestion = (value) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === question.id ? { ...q, questionText: value } : q,
      ),
    );
  };

  const updateOption = (index, value) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === question.id
          ? {
              ...q,
              options: q.options.map((option, i) =>
                i === index ? value : option,
              ),
            }
          : q,
      ),
    );
  };

  const addOption = () => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === question.id
          ? {
              ...q,
              options: [...q.options, ""],
            }
          : q,
      ),
    );
  };

  const removeOption = (index) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === question.id
          ? {
              ...q,
              options: q.options.filter((_, i) => i !== index),
              correctOptionIndex:
                q.correctOptionIndex === index
                  ? null
                  : q.correctOptionIndex > index
                    ? q.correctOptionIndex - 1
                    : q.correctOptionIndex,
            }
          : q,
      ),
    );
  };

  const updateCorrectOption = (index) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === question.id ? { ...q, correctOptionIndex: index } : q,
      ),
    );
  }; 
  

  const updateMarks = (value) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === question.id ? { ...q, marks: value } : q)),
    );

    setOpen(false);
  };

  const handleClear = () => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === question.id
          ? {
              ...q,
              questionText: "",
              options: ["", ""],
              correctOptionIndex: null,
              marks: 1,
            }
          : q,
      ),
    );
  };

  return (
    <div
      className={
        "max-w-4xl w-lg rounded-2xl p-6 space-y-5 border transition " +
        (colorMode
          ? "bg-slate-900 border-2 border-white/5 text-slate-100"
          : "bg-white border-gray-200 text-gray-900")
      }
    >
      {/* Question Header */}
      <div>
        <div
          className={`flex items-center justify-between pb-3 ${
            colorMode ? "border-slate-800" : "border-slate-100"
          }`}
        >
          <div className="flex items-center gap-3">
            {/* Question Number */}
            <span
              className={`inline-flex h-8 min-w-8 items-center justify-center rounded-lg text-sm font-bold border ${
                colorMode
                  ? "bg-indigo-500/15 text-indigo-400 border-indigo-500/20"
                  : "bg-indigo-50 text-indigo-700 border-indigo-200"
              }`}
            >
              {question.id}
            </span>

            {/* Question Label */}
            <label
              className={`text-sm font-semibold ${
                colorMode ? "text-slate-200" : "text-slate-700"
              }`}
            >
              Question
            </label>
          </div>

          {/* Marks + Image + Delete */}
          <div className="flex items-center gap-2">
            {/* Marks */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setOpen(!open)}
                className={`flex w-full items-center justify-between rounded-xl border px-4 py-2.5 text-sm font-semibold outline-none transition-colors duration-200 ${
                  colorMode
                    ? "bg-slate-800 border-slate-700 text-slate-100 hover:border-violet-500/60"
                    : "bg-white border-slate-200 text-slate-800 hover:border-violet-400"
                }`}
              >
                <span>
                  {question.marks} Mark{question.marks > 1 ? "s" : ""}
                </span>

                <ChevronDown
                  size={17}
                  className={`transition-transform duration-300 ${
                    open ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                className={`absolute left-0 top-full z-50 mt-2 w-full origin-top rounded-xl border p-1.5 shadow-xl transition-all duration-200 ease-out ${
                  open
                    ? "visible translate-y-0 opacity-100"
                    : "invisible -translate-y-2 opacity-0"
                } ${
                  colorMode
                    ? "bg-slate-800 border-slate-700"
                    : "bg-white border-slate-200"
                }`}
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((mark) => (
                  <button
                    key={mark}
                    type="button"
                    onClick={() => updateMarks(mark)}
                    className={`block w-full rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors duration-150 ${
                      question.marks === mark
                        ? "bg-violet-500/10 text-violet-500"
                        : colorMode
                          ? "text-slate-200 hover:bg-slate-700"
                          : "text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    {mark} Mark{mark > 1 ? "s" : ""}
                  </button>
                ))}
              </div>
            </div>

            {/* Image To Text */}
            <div>
              <ImageToText
                key={question.id}
                setquestionValue={(value) => {
                  updateQuestion(value);
                }}
                setOptions={(newOptions) => {
                  setQuestions((prev) =>
                    prev.map((q) =>
                      q.id === question.id ? { ...q, options: newOptions } : q,
                    ),
                  );
                }}
              />
            </div>

            {/* Delete */}
            <button
              type="button"
              onClick={() => deleteQuestion(question.id)}
              title="Delete Question"
              className={`w-10 h-10 flex items-center justify-center rounded-lg border transition-colors duration-200 cursor-pointer ${
                colorMode
                  ? "text-red-400 border-red-900/50 hover:bg-red-500/10 hover:border-red-800"
                  : "text-red-500 border-red-200 hover:bg-red-50 hover:border-red-300"
              }`}
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>

        {/* Question Input */}
        <textarea
          required
          value={question.questionText || ""}
          onChange={(e) => updateQuestion(e.target.value)}
          placeholder="Type your question here..."
          rows={2}
          className={
            "mt-2 w-full resize-none rounded-xl border px-4 py-2.5 text-sm outline-none transition-all duration-200 " +
            (colorMode
              ? "bg-transparent border-slate-800 text-slate-100 placeholder:text-slate-500 hover:bg-slate-800/60 hover:border-slate-700 focus:bg-slate-800 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10"
              : "bg-transparent border-slate-200 text-slate-800 placeholder:text-slate-400 hover:bg-slate-50 hover:border-slate-300 focus:bg-white focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10")
          }
        />
      </div>

      {/* Options */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label
            className={`flex items-center gap-2 text-sm font-semibold ${
              colorMode ? "text-slate-200" : "text-slate-700"
            }`}
          >
            Answer Options
          </label>

          <span
            className={`text-xs ${
              colorMode ? "text-slate-500" : "text-slate-400"
            }`}
          >
            {question.options?.length || 0} options
          </span>
        </div>

        {question.options?.map((option, index) => {
          const isCorrect = question.correctOptionIndex === index;

          return (
            <div
              key={index}
              className={`group flex items-center gap-3 rounded-xl border p-2 transition-colors duration-200 ${
                colorMode
                  ? "border-slate-800 bg-slate-800/40 hover:border-slate-700"
                  : "border-slate-200 bg-slate-50/70 hover:border-slate-300"
              }`}
            >
              {/* Option Number */}
              <div
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-xs font-bold ${
                  colorMode
                    ? "bg-slate-700 text-slate-300"
                    : "bg-white border border-slate-200 text-slate-500"
                }`}
              >
                {String.fromCharCode(65 + index)}
              </div>

              {/* Option Input */}
              <input
                required
                type="text"
                value={option || ""}
                onChange={(e) => updateOption(index, e.target.value)}
                placeholder={`Option ${index + 1}`}
                className={
                  "min-w-0 flex-1 rounded-lg border px-3 py-2.5 text-sm outline-none transition-colors duration-200 focus:ring-2 focus:ring-violet-500/20 " +
                  (colorMode
                    ? "bg-slate-900 border-slate-700 text-slate-100 placeholder:text-slate-500 hover:border-slate-600 focus:border-violet-500"
                    : "bg-white border-slate-200 text-slate-800 placeholder:text-slate-400 hover:border-slate-300 focus:border-violet-500")
                }
              />

              {/* Correct Answer */}
              <label
                className={`flex shrink-0 cursor-pointer items-center gap-2 rounded-lg px-2.5 py-2 transition-colors duration-200 ${
                  isCorrect
                    ? colorMode
                      ? "bg-emerald-500/10 text-emerald-400"
                      : "bg-emerald-50 text-emerald-600"
                    : colorMode
                      ? "text-slate-500 hover:bg-slate-700/50 hover:text-slate-300"
                      : "text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                }`}
                title="Mark as correct answer"
              >
                <input
                  type="radio"
                  name={`correctOption-${question.id}`}
                  className="hidden"
                  checked={isCorrect}
                  onChange={() => updateCorrectOption(index)}
                />

                <div
                  className={`flex h-5 w-5 items-center justify-center rounded-full border-2 transition-colors duration-200 ${
                    isCorrect
                      ? "border-emerald-500"
                      : colorMode
                        ? "border-slate-600"
                        : "border-slate-300"
                  }`}
                >
                  {isCorrect && (
                    <div className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                  )}
                </div>

                <span className="text-xs font-medium whitespace-nowrap">
                  Correct
                </span>
              </label>

              {/* Remove */}
              {question.options.length > 2 && (
                <button
                  type="button"
                  onClick={() => removeOption(index)}
                  title="Remove option"
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border transition-colors duration-200 ${
                    colorMode
                      ? "border-slate-700 text-slate-500 hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-400"
                      : "border-slate-200 bg-white text-slate-400 hover:border-red-200 hover:bg-red-50 hover:text-red-500"
                  }`}
                >
                  <Trash2 size={17} />
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Buttons */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={addOption}
          className={
            "flex-1 py-2.5 rounded-xl text-white font-medium transition cursor-pointer " +
            (colorMode
              ? "bg-violet-700 hover:bg-violet-800"
              : "bg-violet-600 hover:bg-violet-700")
          }
        >
          + Add Option
        </button>

        <button
          type="button"
          onClick={handleClear}
          className={
            "px-4 py-2.5 rounded-xl font-medium transition cursor-pointer border " +
            (colorMode
              ? "text-gray-300 border-gray-700 hover:bg-gray-800"
              : "text-gray-600 border-gray-200 hover:bg-gray-100")
          }
        >
          Clear
        </button>
      </div>
    </div>
  );
}

export default QuesCard;
