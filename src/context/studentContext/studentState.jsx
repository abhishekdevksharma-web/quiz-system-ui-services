import React, { useEffect, useRef, useState } from "react";

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
    submittedIn: 0,
    quizDuration: 0,
  });
  const [viewDevice, setViewDevice] = useState("desktop");


  const [studentIsAuth, setStudentIsAuth] = useState(false);

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

  return (
    <StudentContext.Provider
      value={{
        fetchQuestion,
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
        userMeta,
        setUserMeta,
        openStudentForm,
        setOpenStudentForm,
        isTimerRunning,
        setisTimerRunning,
        timerRef,
        studentIsAuth,
        setStudentIsAuth,
        viewDevice,
        setViewDevice,
      }}
    >
      {props.children}
    </StudentContext.Provider>
  );
}

export default StudentState;
