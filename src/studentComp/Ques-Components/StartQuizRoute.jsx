import React, { useCallback, useRef } from "react";
import { useContext, useState, useEffect } from "react";
import StudentContext from "../../context/studentContext/studentContext"; 
import RightPannel from "./RightPannel";
import QuizNavbar from "./QuizNavbar";
import { Outlet, useParams } from "react-router-dom";
import QuestionSection from "./QuestionSection";
import {
  handleFetchQuizQuestionApi,
  handleValidateAnswerApi,
} from "../../services/quiz.service";
import SlideAlert from "../AlertModal/SlideAlert";
import AlertModal from "../AlertModal/AlertModal";
import ResultModal from "../ModalComp/ResultModal";
import StudentDetailsForm from "../ModalComp/StudentDetails";
import { onSubmit } from "./onSubmit ";

function StartQuizRoute({}) {
  const { quizId } = useParams();
  const { colorMode, userMeta, viewDevice, setViewDevice } =
    useContext(StudentContext);
  const [quizJson, setQuizJson] = useState({});
  const [questions, setQuestions] = useState([]);
  const [currentQuesIndex, setCurrentQuesIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState([]);
  const [totalDuration, setTotalDuration] = useState("");

  const [fetchQuizLoading, setfetchQuizLoading] = useState(false);

  const [submitLoading, setSubmitLoading] = useState(false);

  const [isTimerRunning, setIsTimerRunning] = useState(true);

  const [openStudentModal, setOpenStudentModal] = useState(true);
  const [studentResolver, setStudentResolver] = useState(null);

  const hasStudentDetails = Object.values(userMeta.student).every(
    (value) => value.trim() !== "",
  );

  const waitForStudentDetails = useCallback(() => {
    return new Promise((resolve) => {
      setStudentResolver(() => resolve);
      setOpenStudentModal(true);
    });
  }, []);

  const [alertModal, setAlertModal] = useState({
    open: false,
    title: "",
    type: "",
    message: "",
    confirmText: "",
    cancelText: "",
  });
  const [alertResolver, setAlertResolver] = useState(null);

  const [slideAlertModal, setSlideAlertModal] = useState({
    open: false,
    type: "",
    message: "",
  });

  const [showResult, setShowResult] = useState(false);

  const [resultData, setResultData] = useState({});

  const timeLeftRef = useRef();

  useEffect(() => {
    setfetchQuizLoading(true);
    async function handleFetchQuizQuestion(quizId) {
      const res = await handleFetchQuizQuestionApi(quizId);

      if (res.success) {
        setQuizJson(res.quiz);
        setQuestions(res.quiz.questions);
        setTotalDuration(res.quiz.userTimeLimit * 60);
        setfetchQuizLoading(false);
      }
    }
    handleFetchQuizQuestion(quizId);
  }, []);

  useEffect(() => {
    setUserAnswer(
      questions.map((question) => ({
        questionId: question._id,
        questionText: question.questionText,
        selectAnswerIndex: -1,
        status: "unanswered",
        flagged: false,
      })),
    );
  }, [questions]);

  const handleSubmit = useCallback(() => {
    onSubmit(
      {
        submitLoading,
        questions,
        userAnswer,
        userMeta,
        quizJson,
        totalDuration,
        timeLeftRef,
        hasStudentDetails,
        waitForStudentDetails,
        askUser,
        handleValidateAnswerApi,
      },
      {
        setSubmitLoading,
        setIsTimerRunning,
        setAlertModal,
        setSlideAlertModal,
        setShowResult,
        setResultData,
        setCurrentQuesIndex,
      },
    );
  }, [
    submitLoading,
    questions,
    userAnswer,
    userMeta,
    quizJson,
    totalDuration,
    hasStudentDetails,
    waitForStudentDetails,
    handleValidateAnswerApi,
  ]);

  const askUser = useCallback((options) => {
    return new Promise((resolve) => {
      setAlertResolver(() => resolve);

      setAlertModal({
        open: true,
        ...options,
      });
    });
  }, []);

  const handleAlertConfirm = () => {
    setAlertModal((prev) => ({
      ...prev,
      open: false,
    }));

    alertResolver?.(true);
    setAlertResolver(null);
  };

  const handleAlertClose = () => {
    setAlertModal((prev) => ({
      ...prev,
      open: false,
    }));

    alertResolver?.(false);
    setAlertResolver(null);
  };
  return (
    <div
      className={`h-dvh w-full flex flex-col overflow-hidden ${
        colorMode ? "bg-gray-900 text-white" : "bg-slate-50 text-slate-900"
      }`}
    >
      {/* Navbar */}

      <QuizNavbar
        loading={fetchQuizLoading}
        colorMode={colorMode}
        student={userMeta.student}
        quiz={quizJson}
        totalTime={totalDuration}
        timeLeftRef={timeLeftRef}
        isTimerRunning={isTimerRunning}
        setOpenStudentModal={setOpenStudentModal}
      />

      {/* Remaining Space */}

      <main className="flex min-h-0 flex-1 overflow-hidden">
        {/* Question Area */}
        <section className="min-w-0 flex-1 overflow-y-auto">
          <QuestionSection
            loading={fetchQuizLoading}
            colorMode={colorMode}
            questions={questions}
            setCurrentQuesIndex={setCurrentQuesIndex}
            currentQuesIndex={currentQuesIndex}
            userAnswer={userAnswer}
            setUserAnswer={setUserAnswer}
            quiz={quizJson}
            onSubmit={handleSubmit}
            submitLoading={submitLoading}
          />
        </section>
        {/* Right Panel */}
        {viewDevice === "desktop" && (
          <RightPannel
            loading={fetchQuizLoading}
            submitLoading={submitLoading}
            currentQuesIndex={currentQuesIndex}
            colorMode={colorMode}
            questions={questions}
            onSubmit={handleSubmit}
            userAnswer={userAnswer}
            setCurrentQuesIndex={setCurrentQuesIndex}
          />
        )}

        <AlertModal
          open={alertModal.open}
          type={alertModal.type}
          title={alertModal.title}
          message={alertModal.message}
          confirmText={alertModal.confirmText}
          cancelText={alertModal.cancelText}
          onConfirm={handleAlertConfirm}
          onClose={handleAlertClose}
        />

        <SlideAlert
          open={slideAlertModal.open}
          type={slideAlertModal.type}
          message={slideAlertModal.message}
          onClose={() =>
            setSlideAlertModal({ ...slideAlertModal, open: false })
          }
        />
        <StudentDetailsForm
          isOpen={openStudentModal}
          onClose={(result) => {
            setOpenStudentModal(false);

            studentResolver?.(result);
            setStudentResolver(null);
          }}
        />
        <ResultModal
          open={showResult}
          data={resultData}
          onClose={() => setShowResult(false)}
        />
      </main>
    </div>
  );
}

export default StartQuizRoute;
