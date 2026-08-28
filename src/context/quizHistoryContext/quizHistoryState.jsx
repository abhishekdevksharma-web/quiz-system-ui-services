import { useState } from "react";
import QuizHistoryContext from "./quizHistoryContext";

function QuizHistoryState(props) {
  const [quizzes, setQuizzes] = useState([]);
  return (
    <QuizHistoryContext.Provider value={{ quizzes, setQuizzes }}>
      {props.children}
    </QuizHistoryContext.Provider>
  );
}

export default QuizHistoryState;
