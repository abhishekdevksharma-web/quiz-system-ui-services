import React, { useContext, useEffect, useState } from "react";
import StatusField from "./Components/StatusField";
import TitleField from "./Components/TitleField";
import DifficultyField from "./Components/DifficultyField";
import SubjectField from "./Components/SubjectField";

import AdminContext from "../context/adminContext/adminContext";

import QuesCard from "../components/adminComp/QuestionCard";
import { X } from "lucide-react";
import QuizModal from "../components/adminComp/QuizModal";
import QuizTiming from "./Components/DurationTypeComp/QuizTimingSelector";
import { handleCreateQuizApi } from "../services/quiz.service";
import IndexModal from "./Components/QuizSettings/IndexModal";
import AlertModal from "./Components/AlertModal";

export default function QuizBuilderNavbarPage() {
  const { colorMode, question, quizMeta, setQuizMeta, setQuestion } =
    useContext(AdminContext);

  const [quesCardCount, setquesCardCount] = useState([1]);
  const [open, setOpen] = useState(false);
  const [ModalOpen, setModalOpen] = useState(false);
  const [createQuizResData, setCreateQuizResData] = useState("");

  //quiz create state
  const [createQuizLoading, setCreateQuizLoading] = useState(false);
  const [showAlertModal, setshowAlertModal] = useState({
    isOpen: false,
    title: "",
    message: "",
  });
  const [settingModalOpen, setSettingModalOpen] = useState(false);

  function addQuesCard() {
    setquesCardCount((prev) => [...prev, prev.length + 1]);
  }

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
    setSettingModalOpen(false);
    if (!checkAllInputFill()) return;

    setModalOpen(true);
    setCreateQuizLoading(true);
    try {
      const res = await handleCreateQuizApi(question, quizMeta);
      setCreateQuizResData(res);
    } catch (err) {
      console.error("Create question error:", err);
    } finally {
      setTimeout(() => {
        setCreateQuizLoading(false);
      }, 1000);
    }
  }

  useEffect(() => {
    setQuizMeta((prev) => ({ ...prev, totalQuestions: quesCardCount.length }));
  }, [quesCardCount]);

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
          {quesCardCount.length}
        </span>
      </div>

      <div className="flex h-full">
        {/* LEFT STICKY ACTION DIV */}
        <div
          className={`sticky top-16 h-fit self-start p-3  ${
            colorMode
              ? "bg-slate-900 border-slate-800 border-b border-r"
              : "bg-white"
          }`}
        >
          <div className="flex flex-col gap-2">
            <button
              onClick={addQuesCard}
              className="text-sm py-2 rounded bg-indigo-600 text-white hover:bg-indigo-500 cursor-pointer"
            >
              Add
            </button>

            <button
              onClick={() => setOpen(true)}
              className={`px-4 py-2 text-sm rounded border cursor-pointer ${
                colorMode
                  ? "border-slate-700 hover:bg-slate-800"
                  : "border-slate-300 hover:bg-slate-100"
              }`}
            >
              Preview
            </button>
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="w-full h-full flex justify-center items-start overflow-y-auto pb-20">
          <div className="flex flex-col gap-3 mt-20">
            {quesCardCount.map((e) => {
              return <QuesCard key={e} QuesId={e} />;
            })}
          </div>
        </div>

        <div
          className={`sticky max-w-max top-16 h-fit self-start p-3 ${
            colorMode ? "bg-slate-900" : "bg-white"
          }`}
        >
          <div className="flex flex-col gap-2 ">
            <button
              onClick={() => setSettingModalOpen(!settingModalOpen)}
              className="px-4 py-2 text-sm rounded bg-indigo-600 text-white hover:bg-indigo-500 cursor-pointer"
            >
              Publish
            </button>
            <div className="space-y-5">
              {screenWidth <= 1449 && <StatusField />}
              {screenWidth <= 1029 && <DifficultyField />}
            </div>
          </div>
        </div>

        {/* Preview section */}
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 ${open ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        >
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>

          <div
            className={`relative ${
              colorMode ? "bg-slate-800 " : "bg-slate-100 "
            } rounded-xl shadow-xl w-[500px] p-6 transition-all duration-300 ${open ? "scale-100 translate-y-0" : "scale-95 translate-y-4"}`}
          >
            <div>
              <button
                className="hover:bg-slate-500 cursor-pointer rounded-2xl"
                onClick={() => setOpen(false)}
              >
                <X />
              </button>
            </div>
          </div>
        </div>

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
        {/* Alert modal */}
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
      </div>
    </div>
  );
}
