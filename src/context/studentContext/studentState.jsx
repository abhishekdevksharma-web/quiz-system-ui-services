import React, { useRef, useState } from "react";

import StudentContext from "./studentContext";

function StudentState(props) {
  const [userMeta, setUserMeta] = useState({
    quizId: "",
    student: {
      name: "",
      email: "",
      roll: "",
      section: "",
      year: "",
      branch: "",
    },
    answer: [],
    quizDuration: 0,
  });
  const [colorMode, setcolorMode] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [UserStartQuiz, setUserStartQuiz] = useState(false);
  const [loading, setLoading] = useState(true);
  const [startQuizLoding, setstartQuizLoding] = useState(false);

  const [openStudentForm, setOpenStudentForm] = useState(false);

  const [isKnownStudent, setisKnownStudent] = useState(false);

  const [isTimerRunning, setisTimerRunning] = useState(true);

  const timerRef = useRef(0);

  function fetchQuestion() {
    return true;
  }
  async function fetchQuizDetail(id) {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/student/${id}`);
    const data1 = await res.json();
    return data1;
  }

  async function validateUserAnswer(data) { 
    
    try {
      const responce = await fetch(
        `${import.meta.env.VITE_API_URL}/student/validateanswer`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        },
      );
      const result = await responce.json(); 
      return result;
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <StudentContext.Provider
      value={{
        fetchQuestion,
        fetchQuizDetail,
        colorMode,
        setcolorMode,
        questions,
        setQuestions,
        UserStartQuiz,
        setUserStartQuiz,
        loading,
        setLoading,
        startQuizLoding,
        setstartQuizLoding,
        validateUserAnswer,
        userMeta,
        setUserMeta,
        openStudentForm,
        setOpenStudentForm,
        isTimerRunning,
        setisTimerRunning,
        timerRef,
      }}
    >
      {props.children}
    </StudentContext.Provider>
  );
}

export default StudentState;
