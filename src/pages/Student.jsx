import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/studentComp/Navbar";
import StudentContext from "../context/studentContext/studentContext";
import QuizCard from "../components/studentComp/QuizCard";
import QuestionCard from "../components/studentComp/QuestionCard";
import { useParams } from "react-router-dom";
import QuizFrame from "../components/studentComp/QuizFrame";
import StudentDetails from "../components/studentComp/StudentDetails";

function Student() {
  const {
    colorMode,
    fetchQuizDetail,
    questions,
    setQuestions,
    fetchQuizLoder,
    setfetchQuizLoder,
    UserStartQuiz,
    setUserStartQuiz,
    startQuizLoding,
    setstartQuizLoding,
    openStudentForm,
    setUserMeta,
  } = useContext(StudentContext);

  useEffect(() => {
    if (startQuizLoding === true) {
      setUserStartQuiz(true);
      setfetchQuizLoder(true);
    }
  }, [startQuizLoding]);

  return (
    <div
      className={
        "h-screen w-screen flex flex-col " +
        (colorMode ? "bg-slate-900" : "bg-white")
      }
    >
      {/* Navbar */}
      <Navbar />

      {/* studnet details form  */}
      {openStudentForm ? (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
          <div className="w-full max-w-md">
            <StudentDetails setUserMeta={setUserMeta} colorMode={colorMode} />
          </div>
        </div>
      ) : (
        ""
      )}

      {!UserStartQuiz ? (
        <div className="flex-1 flex justify-center items-center">
          <QuizCard />
        </div>
      ) : (
        <QuizFrame />
      )}
    </div>
  );
}

export default Student;
