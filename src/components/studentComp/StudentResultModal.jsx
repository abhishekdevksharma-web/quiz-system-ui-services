import {
  Trophy,
  CheckCircle2,
  XCircle,
  MinusCircle,
  Clock3,
  Award,
} from "lucide-react";

export default function StudentResultModal({ data, colorMode }) {
  if (!data) return null;

  const { type } = data; 
  

  return (
    <div
      className={`overflow-y-auto rounded-2xl ${
        colorMode ? "bg-[#0F172A]" : "bg-gray-50"
      }`}
    >
      {/* ====================== ERROR ====================== */}

      {type === "error" ? (
        <div className="flex h-full flex-col items-center justify-center px-20 py-5 text-center">
          <div
            className={`mb-8 flex h-28 w-28 items-center justify-center rounded-full ${
              colorMode
                ? "bg-yellow-500/10 border border-yellow-500/20"
                : "bg-yellow-100 border border-yellow-200"
            }`}
          >
            <Clock3 size={55} className="text-yellow-500" />
          </div>

          <h2
            className={`text-3xl font-bold ${
              colorMode ? "text-white" : "text-gray-900"
            }`}
          >
            Not Submitted
          </h2>

          <p
            className={`mt-5 max-w-xl text-lg leading-8 ${
              colorMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            {data.message}
          </p>

          <p
            className={`mt-3 ${colorMode ? "text-gray-500" : "text-gray-500"}`}
          >
            Please check back later.
          </p>
        </div>
      ) : (
        <>
          {/* ====================== SCORE HEADER ====================== */}

          <div className="bg-linear-to-r from-indigo-600 via-blue-600 to-cyan-600 p-8 text-white">
            <div className="flex items-center gap-5">
              <Award size={55} />

              <div>
                <p className="text-lg opacity-90">Final Score</p>

                <h1 className="text-5xl font-bold mt-1">{data.studentQuizDetails.totalMarks}</h1>

                <p className="mt-2 opacity-90">
                  Congratulations on completing the quiz.
                </p>
              </div>
            </div>

            {/* Stats */}

            {/* <div className="grid grid-cols-2 md:grid-cols-5 gap-5 mt-10">
              <Stat
                icon={<CheckCircle2 />}
                title="Correct"
                value={value.correct}
              />

              <Stat icon={<XCircle />} title="Wrong" value={value.wrong} />

              <Stat
                icon={<MinusCircle />}
                title="Skipped"
                value={value.skipped}
              />

              <Stat
                icon={<Trophy />}
                title="Score"
                value={`${value.score}/${value.total}`}
              />

              <Stat
                icon={<Award />}
                title="Percentage"
                value={`${value.percentage}%`}
              />
            </div> */}
          </div>

          {/* ====================== ANSWERS ====================== */}

          {/* <div className="p-8">
            <h2
              className={`text-2xl font-bold ${
                colorMode ? "text-white" : "text-gray-900"
              }`}
            >
              Answer Review
            </h2>

            {value.answers.length === 0 ? (
              <div
                className={`mt-8 rounded-3xl border p-16 text-center ${
                  colorMode
                    ? "bg-[#1E293B] border-gray-700"
                    : "bg-white border-gray-200"
                }`}
              >
                <Trophy size={50} className="mx-auto text-indigo-500" />

                <h3
                  className={`mt-5 text-xl font-semibold ${
                    colorMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  Answers Not Available
                </h3>

                <p
                  className={`mt-3 ${
                    colorMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  The instructor has not enabled answer review for this quiz.
                </p>
              </div>
            ) : (
              <div className="mt-8 space-y-5">
                {value.answers.map((question, index) => {
                  const skipped = question.selectedAnswerIndex == null;

                  const correct =
                    question.selectedAnswerIndex ===
                    question.correctAnswerIndex;

                  return (
                    <div
                      key={index}
                      className={`rounded-2xl border p-6 ${
                        colorMode
                          ? "bg-[#1E293B] border-gray-700"
                          : "bg-white border-gray-200"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <h3
                          className={`font-semibold text-lg ${
                            colorMode ? "text-white" : "text-gray-900"
                          }`}
                        >
                          Q{index + 1}. {question.question}
                        </h3>

                        <span
                          className={`rounded-full px-4 py-1 text-sm font-medium ${
                            skipped
                              ? "bg-yellow-100 text-yellow-700"
                              : correct
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                          }`}
                        >
                          {skipped ? "Skipped" : correct ? "Correct" : "Wrong"}
                        </span>
                      </div>

                      <div className="mt-5 space-y-2">
                        <p
                          className={
                            colorMode ? "text-gray-300" : "text-gray-700"
                          }
                        >
                          <strong>Your Answer:</strong>{" "}
                          {skipped
                            ? "--"
                            : question.options[question.selectedAnswerIndex]}
                        </p>

                        <p className="text-green-500">
                          <strong>Correct Answer:</strong>{" "}
                          {question.options[question.correctAnswerIndex]}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div> */}
        </>
      )}
    </div>
  );
}

function Stat({ icon, title, value }) {
  return (
    <div className="rounded-2xl bg-white/10 backdrop-blur-sm p-5">
      <div className="mb-3">{icon}</div>

      <p className="text-sm opacity-80">{title}</p>

      <h3 className="mt-1 text-2xl font-bold">{value}</h3>
    </div>
  );
}
