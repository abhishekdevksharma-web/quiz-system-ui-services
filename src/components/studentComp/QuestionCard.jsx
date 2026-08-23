import { useContext, useEffect, useState } from "react";
import StudentContext from "../../context/studentContext/studentContext";

function QuestionCard(props) {
  const { userMeta, setUserMeta } = useContext(StudentContext);
  const [selectOption, setselectOption] = useState(-1);

  function onSelect(opt, index) {
    props.selectOptionsFunction(opt, index);
    setselectOption(index);

    if (
      userMeta.answer.find(
        (item) => item.id === props.questionsCount.showQuestion,
      )
    ) {
      setUserMeta((prev) => {
        return {
          ...prev,

          answer: prev.answer.map((item) =>
            item.id === props.questionsCount.showQuestion
              ? { ...item, selectAnswerIndex: index }
              : item,
          ),
        };
      });
    } else {
      setUserMeta((prev) => {
        return {
          ...prev,
          answer: [
            ...prev.answer,
            {
              questionText: props.data.questionText,
              selectAnswerIndex: index,
              id: props.questionsCount.showQuestion,
            },
          ],
        };
      });
    }
  }

  useEffect(() => {
    localStorage.setItem("UserQuiz", JSON.stringify(userMeta));
  }, [selectOption]);

  const currentAnswer = userMeta.answer.find(
    (item) => item.id === props.questionsCount.showQuestion,
  );

  return (
    <div className="flex-1 w-full flex justify-center items-center">
      <div className="w-full max-w-2xl bg-gray-900 text-white rounded-2xl shadow-2xl p-6 border-2 border-gray-700">
        <div className="flex items-center justify-between border-b border-gray-800 pb-4 mb-5">
          <span className="text-xs font-bold text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-full border border-indigo-500/20 tracking-wider uppercase">
            Question {props.questionsCount.showQuestion} of {}
          </span>
          <span> </span>
        </div>
        {/* Question */}
        <h2 className="text-lg md:text-xl font-semibold mb-6 leading-relaxed ">
          {props.data.questionText}
        </h2>

        {/* Options */}
        <div className="flex flex-col gap-3">
          {props.data.options.map((opt, index) => (
            <button
              onClick={() => onSelect(opt, index)}
              key={index}
              className={
                "w-full text-left px-4 py-3 rounded-xl border-2 border-gray-800 hover:border-purple-500 hover:bg-purple-500/10 transition-all duration-200 group " +
                (currentAnswer?.selectAnswerIndex === index
                  ? "border-purple-500 bg-purple-500/10"
                  : "")
              }
            >
              <span className="font-semibold mr-2 text-purple-400 group-hover:text-purple-300">
                {String.fromCharCode(65 + index)}.
              </span>
              <span>{opt}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default QuestionCard;
