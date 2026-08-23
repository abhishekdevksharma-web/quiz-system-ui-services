import React, { useContext, useState } from "react";
import {
  Calendar,
  Clock,
  HelpCircle,
  Layers,
  Activity,
  Tag,
  User,
  RefreshCw,
  Globe,
} from "lucide-react";
import AdminContext from "../../../context/adminContext/adminContext";

export default function QuizDetails({ quiz, colorMode }) {
  const { handleUpdateStatus } = useContext(AdminContext);

  const formatDate = (dateString) => {
    if (!dateString) return "Date not available";
    const d = new Date(dateString);
    if (Number.isNaN(d.getTime())) return "Invalid date";
    return d.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const data = {
    title: quiz?.title,
    subject: quiz?.subject,
    difficulty: quiz?.difficulty,
    totalQuestions: quiz?.totalQuestions,
    createdAt: quiz?.createdAt,
    status: quiz?.status,
    type: quiz?.timing.type,
    duration: quiz?.timing.durationMinutes,
    tag: quiz?.tag,
    createdBy: "",
    updatedAt: quiz?.updatedAt,
    startTime: formatDate(quiz.timing.startTime),
    endTime: formatDate(quiz.timing.endTime),
    timeZone: quiz?.timeZone,
    remainingTime: quiz?.remainingTime,
  };

  // console.log(formatDate(quiz.timing.startTime));
  // console.log(quiz);

  const [quizStatusLoding, setQuizStatusLoding] = useState(false);
  const [quizStatus, setQuizStatus] = useState(data.status);

  async function handleStatusChange(data) {
    if (quizStatus === data) return;
    setQuizStatusLoding(true);
    const responce = await handleUpdateStatus({
      quizId: quiz._id,
      status: data,
    });
    console.log(responce);
    

    if (responce.status === true) {
      setTimeout(() => {
        setQuizStatus(data);
        setQuizStatusLoding(false);
      }, 2000);
    }
  }
  return (
    <div className="space-y-6 p-6 max-w-5xl mx-auto">
      {/* 1. Main Banner Header */}
      <div
        className={`p-6 rounded-2xl border transition-all ${
          colorMode
            ? "bg-slate-900/40 border-slate-800"
            : "bg-white border-slate-200 shadow-sm"
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1
              className={`text-xl font-bold tracking-tight ${
                colorMode ? "text-white" : "text-slate-900"
              }`}
            >
              {data.title}
            </h1>
          </div>

          {/* Status Badge */}
          <div className="flex items-center gap-2 self-start sm:self-center">
            {quizStatusLoding && (
              <span
                className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${
                  quizStatusLoding
                    ? colorMode
                      ? "bg-blue-900/30 text-blue-400"
                      : "bg-blue-100 text-blue-700"
                    : colorMode
                      ? "bg-green-900/30 text-green-400"
                      : "bg-green-100 text-green-700"
                }`}
              >
                {quizStatusLoding && (
                  <>
                    <svg
                      className="h-3.5 w-3.5 animate-spin"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="3"
                        opacity="0.25"
                      />
                      <path
                        d="M22 12A10 10 0 0 1 12 22"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />
                    </svg>

                    <span>Updating...</span>
                  </>
                )}
              </span>
            )}
            {quizStatus === "Open" && (
              <span
                className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${
                  colorMode
                    ? "bg-green-900/30 text-green-400"
                    : "bg-green-100 text-green-700"
                }`}
              >
                <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
                LIVE
              </span>
            )}
            <div
              className={`inline-flex rounded-xl p-1 ${
                colorMode ? "bg-slate-800" : "bg-slate-100"
              }`}
            >
              {["Open", "Closed"].map((status) => (
                <button
                  key={status}
                  onClick={() => handleStatusChange(status)}
                  className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200 cursor-pointer ${
                    quizStatusLoding
                      ? quizStatus === status
                        ? "bg-gray-400/10 text-white cursor-not-allowed"
                        : ""
                      : quizStatus === status
                        ? status === "Open"
                          ? "bg-green-500 text-white shadow"
                          : "bg-red-500 text-white shadow"
                        : colorMode
                          ? "text-slate-300 hover:bg-slate-700"
                          : "text-slate-600 hover:bg-white"
                  }}`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 2. Key Metrics Grid (4 Quick Cards) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: "Status",
            value: data.status,
            icon: Activity,
            color: "text-emerald-500",
          },
          {
            label: "Type",
            value: data.type,
            icon: Layers,
            color: "text-blue-500",
          },
          {
            label: "Questions",
            value: data.totalQuestions,
            icon: HelpCircle,
            color: "text-purple-500",
          },
          {
            label: "Duration",
            value: data.duration,
            icon: Clock,
            color: "text-amber-500",
            subtitle: " M",
          },
        ].map((card, i) => (
          <div
            key={i}
            className={`p-4 rounded-xl border flex items-center gap-3.5 transition-all ${
              colorMode
                ? "bg-slate-900/30 border-slate-800/80"
                : "bg-white border-slate-100 shadow-sm"
            }`}
          >
            <div
              className={`p-2 rounded-lg ${colorMode ? "bg-slate-800/60" : "bg-slate-50"}`}
            >
              <card.icon size={18} className={card.color} />
            </div>
            <div>
              <p
                className={`text-xs font-medium ${colorMode ? "text-slate-500" : "text-slate-400"}`}
              >
                {card.label}
              </p>
              <p
                className={`text-sm font-semibold mt-0.5 ${colorMode ? "text-slate-200" : "text-slate-800"}`}
              >
                {card.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* 3. Detailed Information Grid (Two-Column Layout) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column: Quiz Information */}
        <div
          className={`rounded-2xl border overflow-hidden ${
            colorMode
              ? "border-slate-800 bg-slate-900/20"
              : "border-slate-200 bg-white"
          }`}
        >
          <div
            className={`px-5 py-4 border-b font-semibold text-sm tracking-wide ${
              colorMode
                ? "border-slate-800 text-slate-300"
                : "border-slate-100 text-slate-700 bg-slate-50/50"
            }`}
          >
            Quiz Information
          </div>
          <div className="p-5 space-y-4">
            <InfoRow
              label="Subject"
              value={data.subject}
              icon={Layers}
              colorMode={colorMode}
            />
            <InfoRow
              label="Difficulty"
              value={data.difficulty}
              icon={Activity}
              colorMode={colorMode}
            />
            <InfoRow
              label="Tag / Topic"
              value={data.tag}
              icon={Tag}
              colorMode={colorMode}
            />
            <InfoRow
              label="Total Questions"
              value={`${data.totalQuestions} Items`}
              icon={HelpCircle}
              colorMode={colorMode}
            />
            <InfoRow
              label="Created By"
              value={data.createdBy}
              icon={User}
              colorMode={colorMode}
            />
            <InfoRow
              label="Created At"
              value={data.createdAt}
              icon={Calendar}
              colorMode={colorMode}
            />
            <InfoRow
              label="Last Updated"
              value={data.updatedAt}
              icon={RefreshCw}
              colorMode={colorMode}
            />
          </div>
        </div>

        {/* Right Column: Schedule */}
        <div
          className={`rounded-2xl border overflow-hidden ${
            colorMode
              ? "border-slate-800 bg-slate-900/20"
              : "border-slate-200 bg-white"
          }`}
        >
          <div
            className={`px-5 py-4 border-b font-semibold text-sm tracking-wide ${
              colorMode
                ? "border-slate-800 text-slate-300"
                : "border-slate-100 text-slate-700 bg-slate-50/50"
            }`}
          >
            Schedule Details
          </div>
          <div className="p-5 space-y-4">
            <InfoRow
              label="Start Time"
              value={data.startTime}
              icon={Calendar}
              colorMode={colorMode}
            />
            <InfoRow
              label="End Time"
              value={data.endTime}
              icon={Calendar}
              colorMode={colorMode}
            />
            <InfoRow
              label="Duration"
              value={data.duration}
              icon={Clock}
              colorMode={colorMode}
              subtitle=" M"
            />
            <InfoRow
              label="Current Status"
              value={data.status}
              icon={Activity}
              colorMode={colorMode}
              isStatus
            />
            <InfoRow
              label="Remaining Time"
              value={data.remainingTime}
              icon={Clock}
              colorMode={colorMode}
            />
            <InfoRow
              label="Time Zone"
              value={data.timeZone}
              icon={Globe}
              colorMode={colorMode}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// Reusable Sub-component for clean alignment
function InfoRow({ label, value, icon: Icon, colorMode, isStatus, subtitle }) {
  return (
    <div className="flex items-center justify-between gap-4 py-0.5">
      <div className="flex items-center gap-2.5 min-w-0">
        <Icon
          size={15}
          className={colorMode ? "text-slate-500" : "text-slate-400"}
        />
        <span
          className={`text-sm ${colorMode ? "text-slate-400" : "text-slate-500"}`}
        >
          {label}
        </span>
      </div>
      <span
        className={`text-sm font-medium truncate max-w-[200px] ${
          isStatus
            ? "text-emerald-500 font-semibold"
            : colorMode
              ? "text-slate-200"
              : "text-slate-800"
        }`}
      >
        {value}
        {subtitle}
      </span>
    </div>
  );
}
