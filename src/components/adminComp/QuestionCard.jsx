import { useContext, useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import AdminContext from "../../context/adminContext/adminContext";

function QuesCard(props) {
  const context = useContext(AdminContext);
  const { question, setQuestion, colorMode, createQuestion } = context;

  const [options, setOptions] = useState(["", ""]);
  const [questionValue, setquestionValue] = useState([""]);
  const [questionMarks, setQuestionMarks] = useState(0);

  useEffect(() => {
    setQuestion((prev) => {
      const exists = prev.questions?.some((q) => q.id === props.QuesId);

      if (exists) return prev;

      return {
        ...prev,
        questions: [
          ...(prev.questions || []),
          {
            id: props.QuesId,
            questionText: null,
            options: [],
            correctOptionIndex: null,
            marks: 0,
          },
        ],
      };
    });
  }, []);

  function clear() {
    setQuestion({ questions: [] });
  }

  const addOption = () => {
    setOptions([...options, ""]);
  };

  const updateOption = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;

    setOptions(newOptions);
    Oponchange(newOptions);
  };

  const removeOption = (index) => {
    const filtered = options.filter((_, i) => i !== index);
    setOptions(filtered);
  };

  function Quessonchange(data) {
    setQuestion((prev) => {
      const index = prev.questions.findIndex((q) => q.id == props.QuesId);

      if (index !== -1) {
        const updatedQuestions = [...prev.questions];
        updatedQuestions[index] = {
          ...updatedQuestions[index],
          questionText: data,
          options: options,
        };
        return { ...prev, questions: updatedQuestions };
      }

      return {
        ...prev,
        questions: [
          ...prev.questions,
          {
            id: props.QuesId,
            questionText: data,
            options: options,
            correctOptionIndex: 1,
            marks: 0,
          },
        ],
      };
    });
  }

  function Oponchange(Option) {
    setQuestion((prev) => {
      const index = prev.questions.findIndex((q) => q.id == props.QuesId);

      if (index !== -1) {
        const updatedQuestions = [...prev.questions];
        updatedQuestions[index] = {
          ...updatedQuestions[index],
          options: Option,
        };
        return { ...prev, questions: updatedQuestions };
      }

      return {
        ...prev,
        questions: [
          ...prev.questions,
          {
            id: props.QuesId,
            questionText: null,
            options: Option,
            correctOptionIndex: 1,
            marks: 0,
          },
        ],
      };
    });
  }

  function markChange(value) {
    setQuestionMarks(value);

    setQuestion((prev) => ({
      ...prev,
      questions: prev.questions.map((q) => {
        return q.id === props.QuesId ? { ...q, marks: value } : q;
      }),
    }));
  }
  function correctIndexChange(value) {
    setQuestion((prev) => ({
      ...prev,
      questions: prev.questions.map((q) => {
        return q.id === props.QuesId ? { ...q, correctOptionIndex: value } : q;
      }),
    }));
  }
  return (
    <div
      className={
        "max-w-4xl w-lg rounded-2xl p-6 space-y-5 border transition " +
        (colorMode
          ? "bg-slate-900 border-slate-700 text-slate-100"
          : "bg-white border-gray-200 text-gray-900")
      }
    >
      {/* Question Input */}
      <div>
        <div className="flex items-center justify-between pb-3">
          <div className="flex items-center gap-3">
            <span
              className={`inline-flex h-8 min-w-8 items-center justify-center rounded-lg text-sm font-bold ${
                colorMode
                  ? "bg-indigo-500/15 text-indigo-400 border border-indigo-500/20"
                  : "bg-indigo-50 text-indigo-700 border border-indigo-200"
              }`}
            >
              {props.QuesId}
            </span>

            <label
              className={`text-sm font-semibold ${
                colorMode ? "text-slate-200" : "text-slate-700"
              }`}
            >
              Question
            </label>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={questionMarks}
              onChange={(e) => markChange(Number(e.target.value))}
              className={`rounded-xl border px-3 py-2 text-sm font-medium outline-none ${
                colorMode
                  ? "bg-slate-800 border-slate-700 text-white"
                  : "bg-white border-slate-300 text-slate-900"
              }`}
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((mark) => (
                <option key={mark} value={mark}>
                  {mark} Mark{mark > 1 ? "s" : ""}
                </option>
              ))}
            </select>
          </div>
        </div>
        <input
          required
          type="text"
          value={questionValue}
          onChange={(e) => {
            setquestionValue(e.target.value);
            Quessonchange(e.target.value);
          }}
          placeholder="Type your question here..."
          className={
            "mt-2 w-full px-4 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-violet-500 " +
            (colorMode
              ? "bg-slate-800 border-slate-700 text-slate-100"
              : "bg-white border-gray-300")
          }
        />
      </div>

      {/* Options */}
      <div className="space-y-3">
        <label
          className={
            colorMode
              ? "text-sm font-medium text-slate-300"
              : "text-sm font-medium text-gray-600"
          }
        >
          Options
        </label>

        {options.map((option, index) => (
          <div key={index} className="flex items-center gap-2">
            <input
              required
              type="text"
              value={option}
              onChange={(e) => {
                updateOption(index, e.target.value);
              }}
              placeholder={`Option ${index + 1}`}
              className={
                "flex-1 px-4 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-violet-500 " +
                (colorMode
                  ? "bg-slate-800 border-slate-700 text-slate-100"
                  : "bg-white border-gray-300")
              }
            />
            {/* for correct index */}

            <label className="flex items-center gap-3 cursor-pointer select-none">
              <input
                type="radio"
                name={`correctOption-${props.QuesId}`}
                className="hidden"
                checked={
                  question.questions?.[props.QuesId - 1]?.correctOptionIndex ===
                  index
                }
                onChange={() => correctIndexChange(index)}
              />

              <div
                className={`flex h-5 w-5 items-center justify-center rounded-full border-2 transition-all duration-200 ${
                  question.questions?.[props.QuesId - 1]?.correctOptionIndex ===
                  index
                    ? "border-emerald-500"
                    : colorMode
                      ? "border-slate-600"
                      : "border-slate-300"
                }`}
              >
                {question.questions?.[props.QuesId - 1]?.correctOptionIndex ===
                  index && (
                  <div className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                )}
              </div>
            </label>
            {options.length > 2 && (
              <button
                onClick={() => removeOption(index)}
                className={`inline-flex items-center gap-1.5 rounded-lg px-2 py-1 text-sm font-medium cursor-pointer transition-colors ${
                  colorMode
                    ? "text-red-400 hover:bg-white/10"
                    : "text-red-500 hover:bg-red-50"
                }`}
              >
                <Trash2 size={18} />
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Add Option Button */}
      <button
        onClick={addOption}
        className={
          "w-full py-2 rounded-xl text-white font-medium transition cursor-pointer " +
          (colorMode
            ? "bg-violet-700 hover:bg-violet-800"
            : "bg-violet-600 hover:bg-violet-700")
        }
      >
        + Add Option
      </button>
    </div>
  );
}

export default QuesCard;
