import React, { useContext, useEffect, useState } from "react";
import StatusField from "./Components/StatusField";
import TitleField from "./Components/TitleField";
import DifficultyField from "./Components/DifficultyField";
import SubjectField from "./Components/SubjectField";

import AdminContext from "../context/adminContext/adminContext";

import QuesCard from "./Components/QuestionCard";
import { 
  Settings, 
  Upload,
  UserRoundCheck,
  UserRoundX,
  X,
} from "lucide-react";
import QuizModal from "../components/adminComp/QuizModal";
import QuizTiming from "./Components/DurationTypeComp/QuizTimingSelector";
import { handleCreateQuizApi } from "../services/quiz.service";
import IndexModal from "./Components/QuizSettings/IndexModal";
import AlertModal from "./Components/AlertModal";
import FileToText from "./utils/ui/FileToText";

export default function QuizBuilderNavbarPage() {
  const {
    questions,
    setQuestions,
    colorMode,
    quizMeta,
    setQuizMeta,
    isAuthenticated,
    fileParsedData,
    setFileParsedData,
  } = useContext(AdminContext);

  const [quesCardCount, setquesCardCount] = useState([1]);
  const [open, setOpen] = useState(false);
  const [ModalOpen, setModalOpen] = useState(false);
  const [createQuizResData, setCreateQuizResData] = useState("");

  const [fileParserModal, setFileParserModal] = useState(false);

  //quiz create state
  const [createQuizLoading, setCreateQuizLoading] = useState(false);
  const [showAlertModal, setshowAlertModal] = useState({
    isOpen: false,
    title: "",
    message: "",
  });
  const [settingModalOpen, setSettingModalOpen] = useState(false);

  function addQuesCard() {
    setQuestions((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        questionText: "",
        options: ["", ""],
        correctOptionIndex: null,
        marks: 1,
      },
    ]);
  }

  useEffect(() => {
    setQuizMeta((prev) => ({ ...prev, totalQuestions: questions.length }));
  }, [questions.length]);

  function checkAllInputFill() {
    const emptyFields = [];

    if (!quizMeta.title?.trim()) {
      emptyFields.push("Title");
    }

    if (!quizMeta.subject?.trim()) {
      emptyFields.push("Subject");
    }

    if (emptyFields.length > 0) {
      setshowAlertModal({
        title: `Fields ${emptyFields.join(" & ")} Incomplete`,
        isOpen: true,
        message: "Please fill in all required fields before continuing.",
      });

      return false;
    }

    return true;
  }

  async function handleSubmit() {
    console.log(questions, quizMeta);

    setSettingModalOpen(false);
    if (!checkAllInputFill()) return;

    setModalOpen(true);
    setCreateQuizLoading(true);
    try {
      const res = await handleCreateQuizApi(questions, quizMeta);
      setCreateQuizResData(res);
    } catch (err) {
      console.error("Create question error:", err);
    } finally {
      setTimeout(() => {
        setCreateQuizLoading(false);
      }, 1000);
    }
  }

  function handleDeleteQuestion(data) {
    const newArr = quesCardCount.filter((_, index) => index !== data - 1);
    const newQuestions = questions
      .filter((item) => item.id !== data)
      .map((e, i) => ({ ...e, id: i + 1 }));
    setQuestions(newQuestions);
    setquesCardCount(newArr);
  }

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const onResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <div
      className={`fixed h-screen w-screen transition-colors duration-300 ${
        colorMode
          ? "bg-slate-950 text-slate-100"
          : "bg-slate-100 text-slate-900"
      }`}
    >
      <div
        className={`w-full flex h-16 border-b items-center px-6 gap-4 sticky top-0 ${
          colorMode
            ? "bg-slate-900 border-slate-800"
            : "bg-white border-slate-200"
        }`}
      >
        {/* Title */}
        <TitleField />

        {/* Difficulty */}
        {screenWidth >= 1030 && <DifficultyField />}

        {/* Duration */}
        <QuizTiming />

        {/* Subject Field */}
        <SubjectField />

        {/* Status */}
        {screenWidth >= 1450 && <StatusField />}

        <div
          title={isAuthenticated ? "Verified" : "Not Verified"}
          className={`relative w-8 h-8 rounded-lg flex items-center justify-center border transition-all duration-300 ${
            isAuthenticated
              ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-500 shadow-sm"
              : "bg-rose-500/10 border-rose-500/30 text-rose-500 shadow-sm"
          }`}
        >
          {isAuthenticated ? (
            <UserRoundCheck size={16} strokeWidth={2.5} />
          ) : (
            <UserRoundX size={16} strokeWidth={2.5} />
          )}

          <span
            className={`absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full border-[1.5px] border-slate-950 ${
              isAuthenticated ? "bg-emerald-500" : "bg-rose-500"
            }`}
          />
        </div>

        {/* Spacer */}
        <div className="flex-1" />
        {/* 🌗 THEME TOGGLE */}
        <span
          className={`text-sm px-2 py-0.5 rounded-full font-medium ${
            colorMode
              ? "text-white-300 bg-violet-800/50"
              : "bg-violet-100 text-violet-600"
          }`}
        >
          {questions.length}
        </span>
      </div>

      <div className="flex h-full">
        {/* LEFT STICKY ACTION DIV */}
        <div className="sticky self-start ">
          <div
            className={`p-3 ${colorMode ? "bg-slate-900 border-slate-800 border-b border-r" : "bg-white"}`}
          >
            <div className="flex flex-col items-center gap-2">
              <button
                onClick={addQuesCard}
                className="rounded bg-indigo-600 px-5 py-2 text-sm text-white cursor-pointer hover:bg-indigo-500"
              >
                Add
              </button>

              <button
                onClick={() => console.log(questions, quizMeta)}
                className={`rounded border px-5 py-2 text-sm cursor-pointer ${colorMode ? "border-slate-700 hover:bg-slate-800" : "border-slate-300 hover:bg-slate-100"}`}
              >
                Preview
              </button>
            </div>
          </div>

          <div className="p-3">
            <button
              type="button"
              onClick={() => setFileParserModal(true)}
              className={`group flex h-11 w-full items-center justify-center gap-2 rounded-lg border px-2 transition-colors duration-200 ${colorMode ? "border-slate-700 bg-slate-900 text-slate-300 hover:border-indigo-500 hover:bg-slate-800" : "border-slate-200 bg-white text-slate-500 hover:border-indigo-400 hover:bg-indigo-50/50"}`}
            >
              <div
                className={`flex h-7 w-7 items-center justify-center rounded-md ${colorMode ? "bg-indigo-500/10 text-indigo-400" : "bg-indigo-50 text-indigo-600"}`}
              >
                <Upload size={15} />
              </div>

              <div className="flex flex-col items-start leading-none">
                <span
                  className={`text-xs font-semibold ${colorMode ? "text-slate-200" : "text-slate-700"}`}
                >
                  Import Files
                </span>

                <div className="mt-1 flex items-center gap-1 text-[8px] font-medium">
                  <span className="text-red-500">PDF</span>
                  <span className="text-slate-300">•</span>
                  <span className="text-blue-500">DOC</span>
                  <span className="text-slate-300">•</span>
                  <span className="text-green-500">XLS</span>
                  <span className="text-slate-300">•</span>
                  <span className="text-purple-500">IMG</span>
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="w-full h-full flex justify-center items-start overflow-y-auto pb-20">
          <div className="flex flex-col gap-3 mt-20">
            {questions.map((question) => (
              <QuesCard
                key={question.id}
                question={question}
                setQuestions={setQuestions}
                deleteQuestion={handleDeleteQuestion}
                colorMode={colorMode}
              />
            ))}
          </div>
        </div>

        <div
          className={`sticky top-16 self-start max-w-max rounded-b-2xl border border-t-0 backdrop-blur-xl shadow-xl ${
            colorMode
              ? "bg-slate-900/70 border-slate-700/60 shadow-black/30"
              : "bg-white/70 border-slate-200/70 shadow-slate-300/40"
          }`}
        >
          <div className="flex flex-col gap-2 p-2">
            <button
              onClick={() => setSettingModalOpen(!settingModalOpen)}
              className="px-4 py-2 text-sm font-medium rounded-xl bg-indigo-600 text-white hover:bg-indigo-500 cursor-pointer transition"
            >
              Publish
            </button>

            <button
              onClick={() => setSettingModalOpen(!settingModalOpen)}
              className={`flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-xl border cursor-pointer transition ${
                colorMode
                  ? "border-slate-700/80 text-slate-200 hover:bg-slate-800/70"
                  : "border-slate-200/80 text-slate-700 hover:bg-slate-100/70"
              }`}
            >
              <Settings size={16} />
              Settings
            </button>

            {screenWidth <= 1449 && (
              <div
                className={`mt-1 flex flex-col gap-3 border-t pt-3 ${
                  colorMode ? "border-slate-700/70" : "border-slate-200/80"
                }`}
              >
                <StatusField />

                {screenWidth <= 1029 && <DifficultyField />}
              </div>
            )}
          </div>
        </div>

        {/* Preview section */}

        {settingModalOpen ? (
          <div
            className={
              "h-full w-full fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50 box-border "
            }
          >
            <IndexModal
              onClose={() => setSettingModalOpen(!settingModalOpen)}
              handleSubmit={handleSubmit}
            />
          </div>
        ) : (
          ""
        )}
        {/* Pushlish lodder modal */}

        {ModalOpen ? (
          <div
            className={
              "h-full w-full fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50 box-border "
            }
          >
            <>
              {createQuizLoading ? (
                <div
                  className={`flex justify-center items-center gap-1 w-[90%] sm:w-[80%] md:w-[500px] rounded-2xl shadow-xl p-6 text-center ${
                    colorMode
                      ? "bg-slate-800 text-white"
                      : "bg-white text-black"
                  }`}
                >
                  <span className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></span>
                  <span className="w-2 h-2 bg-purple-500 rounded-full animate-bounce [animation-delay:150ms]"></span>
                  <span className="w-2 h-2 bg-purple-500 rounded-full animate-bounce [animation-delay:300ms]"></span>
                </div>
              ) : (
                <QuizModal
                  isOpen={ModalOpen}
                  setModalOpen={setModalOpen}
                  retry={handleSubmit}
                  data={createQuizResData}
                />
              )}
            </>
          </div>
        ) : (
          ""
        )}

        {/*fields Alert modal */}
        {showAlertModal.isOpen ? (
          <div
            className={
              "h-full w-full fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50 box-border "
            }
          >
            <AlertModal
              isOpen={showAlertModal.isOpen}
              title={showAlertModal.title}
              message={showAlertModal.message}
              buttonText="Okay"
              onClose={() =>
                setshowAlertModal((prev) => ({ ...prev, isOpen: false }))
              }
            />
          </div>
        ) : (
          ""
        )}
        {/* import file modal */}
        <FileToText
          colorMode={colorMode}
          open={fileParserModal}
          setOpen={setFileParserModal}
        />
      </div>
    </div>
  );
}
