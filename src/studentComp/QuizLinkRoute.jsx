import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; 
import QuizCardModal from "./ModalComp/QuizCardModal";
import { fetchQuizDetailApi } from "../services/student.auth.service";

function QuizLinkRoute() {
  const { quizId } = useParams();

  const [quizData, setquizData] = useState({});
  const [quizCardLoading, setquizCardLoading] = useState(true);

  useEffect(() => {
    async function initialFetches() {
      try {
        const res = await fetchQuizDetailApi(quizId); 

        setquizData(res);
        setquizCardLoading(false);
        if (!res) {
          setQuizJson({});
          setquizData(false);
        } else {
          localStorage.setItem("quizId", res._id);
          setquizData(res);
        }
      } catch (err) {
        setquizData({});
        setquizCardLoading(false);
      }
    }

    initialFetches();
  }, [quizId]);

  return (
    <div
      className={`min-h-screen w-full flex flex-col justify-center items-center transition-colors duration-500 ${
        true ? "bg-[#0B1120] text-slate-100" : "bg-slate-50 text-slate-900"
      }`}
    >
      {/* <Navbar /> */}
      <QuizCardModal quizData={quizData} loading={quizCardLoading} />
    </div>
  );
}

export default QuizLinkRoute;
