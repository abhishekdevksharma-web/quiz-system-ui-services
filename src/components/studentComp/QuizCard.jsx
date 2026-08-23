import React, { useContext, useEffect, useState } from "react";
import StudentContext from "../../context/studentContext/studentContext";
import {
  Clock,
  Layers,
  Hash,
  ArrowRight,
  Target,
  AlertCircle,
} from "lucide-react";
import { useParams } from "react-router-dom";

const QuizCard = () => {
  const { id } = useParams();

  const [data, setData] = useState({
    title: "",
    subject: "",
    difficulty: "",
    timing: {
      type: "Duration",
      durationMinutes: 0,
      startTime: "",
      endTime: "",
    },
    totalQuestions: 0,
    tag: "",
    status: "",
  });

  const {
    fetchQuizDetail,
    UserStartQuiz,
    setUserStartQuiz,
    loading,
    setLoading,
    setQuestions,
    startQuizLoding,
    setstartQuizLoding,
    userMeta,
    setUserMeta,
    openStudentForm,
    setOpenStudentForm,
  } = useContext(StudentContext);

  // ================= FETCH =================
  useEffect(() => {
    async function initialFetches() {
      try {
        const res = await fetchQuizDetail(id); 

        setQuestions(res.questions);
        if (!res) {
          setdata(null);
        } else {
          localStorage.setItem("quizId", res._id);
          setData({
            title: res.title,
            subject: res.subject,
            difficulty: res.difficulty,
            timing: {
              type: res.timing?.type,
              durationMinutes: res.timing?.durationMinutes,
              startTime: res.timing?.startTime,
              endTime: res.timing?.endTime,
            },
            totalQuestions: res.totalQuestions,
            tag: res.tag,
            status: res.status,
          });
        }
      } catch (err) {
        setdata(null);
      } finally {
        setLoading(false);
      }
    }

    initialFetches();
  }, [id]);

  // ================= TIME FORMAT =================
  const formatDate = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const formatTime = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleTimeString("en-IN", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  // ================= DIFFICULTY =================
  const difficultyStyle = {
    Easy: "bg-emerald-500/20 text-emerald-400",
    Medium: "bg-yellow-500/20 text-yellow-400",
    Hard: "bg-red-500/20 text-red-400",
  };

  function checkFilledStudentDetail() {
    return (
      !userMeta.name ||
      !userMeta.email ||
      !userMeta.roll ||
      !userMeta.section ||
      !userMeta.year ||
      !userMeta.branch
    );
  }

  async function startQuiz() {
    const check = checkFilledStudentDetail();
    setOpenStudentForm(check);
    setUserMeta((prev) => {
      return {
        ...prev,
        quizId: localStorage.getItem("quizId"),
        quizDuration: data.timing.durationMinutes,
      };
    });

    setLoading(true);
    setUserStartQuiz(true);
  }

  return (
    <div className="group relative w-full max-w-md">
      {/* Glow */}
      <div className="absolute -inset-2 rounded-3xl blur-2xl opacity-20 bg-linear-to-r from-indigo-600 to-purple-600"></div>

      {/* Card */}
      <div
        className={`relative rounded-3xl border border-slate-800 bg-linear-to-b from-slate-900 to-slate-950 
        shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)]
        transition-all duration-500 ease-in-out
        
        ${loading ? "p-6 scale-90" : "p-9 scale-100"}`}
      >
        {/* ================= LOADING ================= */}
        {loading && (
          <div className="flex flex-col items-center justify-center h-[250px] gap-4">
            <div className="w-12 h-12 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin"></div>
            <p className="text-sm text-slate-400 font-semibold">
              Loading Quiz...
            </p>
          </div>
        )}

        {/* ================= NOT FOUND ================= */}
        {!loading && !data && (
          <div className="flex flex-col items-center justify-center h-[260px] gap-4 text-center">
            <div className="h-14 w-14 rounded-full bg-red-500/10 flex items-center justify-center">
              <AlertCircle className="text-red-400" size={28} />
            </div>

            <h3 className="text-xl font-extrabold text-white">
              Quiz Not Found
            </h3>

            <p className="text-sm text-slate-400 max-w-xs">
              The quiz you are looking for doesn’t exist or may have been
              removed.
            </p>

            <button
              onClick={() => window.location.reload()}
              className="mt-2 px-4 py-2 rounded-lg bg-red-500/20 text-red-300 text-sm font-bold hover:bg-red-500/30 transition"
            >
              Retry
            </button>
          </div>
        )}

        {/* ================= DATA ================= */}
        {!loading && data && (
          <>
            {/* Header → START TIME */}
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold border border-indigo-500/40 text-indigo-300 bg-indigo-500/10">
                <span className="h-2 w-2 rounded-full bg-indigo-400"></span>

                {data.timing.type === "Duration"
                  ? `${data.timing.durationMinutes} Min Quiz`
                  : `${formatDate(data.timing.startTime)} • ${formatTime(
                      data.timing.startTime,
                    )}`}
              </div>

              <span
                className={`px-3 py-1 rounded-lg text-xs font-bold ${
                  data.status === "Open"
                    ? "bg-emerald-500/20 text-emerald-400"
                    : data.status === "Scheduled"
                      ? "bg-indigo-500/20 text-indigo-300"
                      : "bg-slate-700 text-slate-300"
                }`}
              >
                {data.status}
              </span>
            </div>

            {/* Title */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-3">
                <Target size={18} className="text-indigo-400" />
                <span className="text-xs font-extrabold text-indigo-400 uppercase tracking-widest">
                  {data.subject}
                </span>
              </div>

              <h3 className="text-3xl font-extrabold text-white mb-3">
                {data.title}
              </h3>

              <span
                className={`inline-block px-3 py-1 text-xs font-bold rounded-full ${difficultyStyle[data.difficulty]}`}
              >
                {data.difficulty}
              </span>
            </div>

            {/* Progress */}
            <div className="mb-7">
              <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden">
                <div
                  className={`h-full ${
                    data.difficulty === "Easy"
                      ? "bg-emerald-500 w-1/3"
                      : data.difficulty === "Medium"
                        ? "bg-yellow-500 w-2/3"
                        : "bg-red-500 w-full"
                  }`}
                ></div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-5 mb-8">
              <div className="rounded-2xl border border-slate-700 bg-slate-800/60 p-5">
                <Clock className="text-indigo-400 mb-2" size={20} />

                <p className="text-xs text-slate-400 font-semibold">
                  {data.timing.type === "Duration" ? "Duration" : "Starts"}
                </p>

                <p className="text-2xl font-bold text-white">
                  {data.timing.type === "Duration"
                    ? `${data.timing.durationMinutes} min`
                    : formatTime(data.timing.startTime)}
                </p>
              </div>

              <div className="rounded-2xl border border-slate-700 bg-slate-800/60 p-5">
                <Layers className="text-purple-400 mb-2" size={20} />

                <p className="text-xs text-slate-400 font-semibold">
                  Questions
                </p>

                <p className="text-2xl font-bold text-white">
                  {data.totalQuestions}
                </p>
              </div>
            </div>

            {data.timing.type === "Scheduled" && (
              <div className="mb-8 rounded-2xl border border-slate-700 bg-slate-800/60 p-5">
                <p className="text-sm font-semibold text-slate-400 mb-4">
                  Quiz Schedule
                </p>

                <div className="flex justify-between">
                  <div>
                    <p className="text-xs text-slate-500">Start</p>

                    <p className="text-white font-bold">
                      {formatDate(data.timing.startTime)}
                    </p>

                    <p className="text-indigo-300">
                      {formatTime(data.timing.startTime)}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-500">End</p>

                    <p className="text-white font-bold">
                      {formatDate(data.timing.endTime)}
                    </p>

                    <p className="text-indigo-300">
                      {formatTime(data.timing.endTime)}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Footer */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-11 w-11 rounded-xl bg-linear-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white">
                  <Hash size={18} />
                </div>
                <span className="text-lg font-extrabold text-white">
                  {data.tag}
                </span>
              </div>

              <button
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-linear-to-r from-indigo-600 to-purple-600 text-white font-extrabold cursor-pointer"
                onClick={() => startQuiz()}
              >
                Start Quiz
                <ArrowRight size={16} />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default QuizCard;
