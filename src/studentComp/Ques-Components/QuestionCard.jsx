import { Check, Circle } from "lucide-react";
import { useEffect } from "react";

function QuestionCard({
  question,
  userAnswer,
  onSelect,
  loading,
  currentQuesIndex,
}) {
  // Loading UI
  if (loading) {
    return (
      <div className="flex w-full flex-1 items-center justify-center p-4">
        <div className="w-full max-w-2xl overflow-hidden rounded-2xl border border-gray-700 bg-gray-900 p-5 shadow-2xl md:p-6">
          {/* Question skeleton */}
          <div className="mb-7 space-y-3">
            <div className="h-5 w-4/5 animate-pulse rounded-lg bg-gray-700" />
            <div className="h-5 w-3/5 animate-pulse rounded-lg bg-gray-700" />
          </div>

          {/* Options skeleton */}
          <div className="flex flex-col gap-3">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="flex min-h-14 items-center gap-3 rounded-xl border border-gray-800 bg-gray-800/50 px-4"
              >
                <div className="h-8 w-8 shrink-0 animate-pulse rounded-lg bg-gray-700" />

                <div
                  className={`h-4 animate-pulse rounded-md bg-gray-700 ${
                    item % 2 === 0 ? "w-3/5" : "w-4/5"
                  }`}
                />
              </div>
            ))}
          </div>

          {/* Loading indicator */}
          <div className="mt-7 flex items-center justify-center gap-2">
            {[0, 150, 300].map((delay) => (
              <div
                key={delay}
                className="h-1.5 w-1.5 animate-bounce rounded-full bg-purple-400"
                style={{ animationDelay: `${delay}ms` }}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // No question available
  if (!question) {
    return (
      <div className="flex w-full flex-1 items-center justify-center p-6">
        <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-gray-700 bg-gray-900 px-8 py-10 text-center shadow-2xl">
          <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-purple-500/10 blur-3xl" />
          <div className="absolute -bottom-16 -left-16 h-40 w-40 rounded-full bg-indigo-500/10 blur-3xl" />

          <div className="relative mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-purple-500/20 bg-purple-500/10">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="h-8 w-8 text-purple-400"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.75 9.75a2.25 2.25 0 114.5 0c0 1.5-2.25 1.875-2.25 3.375M12 16.5h.008M6.75 3.75h10.5A2.25 2.25 0 0119.5 6v12a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 18V6a2.25 2.25 0 012.25-2.25z"
              />
            </svg>
          </div>

          <h2 className="relative text-xl font-bold text-white">
            No Question Available
          </h2>

          <p className="relative mt-2 text-sm leading-relaxed text-gray-400">
            There is no question available to display right now. Please wait or
            try again.
          </p>
        </div>
      </div>
    );
  }

  const currentAnswer = userAnswer?.find(
    (item) => item.questionId === question._id,
  );

  const currentAnswerIndex = userAnswer?.findIndex(
    (item) => item.questionId === question._id,
  );

  const selectedIndex = currentAnswer?.selectAnswerIndex;

  // Keyboard shortcuts: A-D / 1-4
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement ||
        event.target instanceof HTMLSelectElement
      ) {
        return;
      }

      // Only allow plain A-D and 1-4
      const allowedKeys = ["a", "b", "c", "d", "1", "2", "3", "4"];

      if (
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        event.metaKey ||
        event.getModifierState("CapsLock")
      ) {
        return;
      }

      const key = event.key.toLowerCase();

      if (!allowedKeys.includes(key)) {
        return;
      }

      const index =
        key >= "1" && key <= "4" ? Number(key) - 1 : key.charCodeAt(0) - 97;

      if (index < question.options.length) {
        onSelect(question.options[index], index, question._id);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [question, onSelect]);

  return (
    <div className="flex w-full flex-1 items-center justify-center p-3 sm:p-4">
      <div className="w-full max-w-2xl overflow-hidden rounded-2xl border border-gray-700 bg-gray-900 text-white shadow-2xl">
        {/* Question */}
        <div className="px-4 pb-5 pt-5 sm:px-6 sm:pb-6">
          <h2 className="flex  gap-2.5 items-center text-base font-semibold leading-7 text-gray-100 sm:text-lg md:text-xl">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-500/10 text-sm font-bold text-purple-400">
              {currentAnswerIndex + 1}
            </span>
            {question.questionText}
          </h2>

          {/* Hint */}
          <div className="mt-3 text-xs text-gray-500">Select one option</div>
        </div>

        {/* Options */}
        <div className="px-4 pb-5 sm:px-6 sm:pb-6">
          <div
            className="flex flex-col gap-2.5"
            role="radiogroup"
            aria-label="Answer options"
          >
            {question.options.map((opt, index) => {
              const isSelected = selectedIndex === index;

              const letter = String.fromCharCode(65 + index);

              return (
                <button
                  key={index}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  onClick={() => onSelect(opt, index, question._id)}
                  className={`
                    group relative flex min-h-14 w-full items-center gap-3
                    rounded-xl border px-3.5 py-3 text-left
                    transition-all duration-200
                    active:scale-[0.99]
                    focus:outline-none focus:ring-2
                    focus:ring-purple-500/50
                    sm:px-4

                    ${
                      isSelected
                        ? "border-purple-500 bg-purple-500/10 shadow-[0_0_0_1px_rgba(168,85,247,0.15)]"
                        : "border-gray-800 bg-gray-900 hover:border-gray-600 hover:bg-gray-800/70"
                    }
                  `}
                >
                  {/* Option letter */}
                  <span
                    className={`
                      flex h-9 w-9 shrink-0 items-center justify-center
                      rounded-lg border text-sm font-bold
                      transition-all duration-200

                      ${
                        isSelected
                          ? "border-purple-500 bg-purple-500 text-white"
                          : "border-gray-700 bg-gray-800 text-gray-400 group-hover:border-purple-500/50 group-hover:text-purple-300"
                      }
                    `}
                  >
                    {letter}
                  </span>

                  {/* Option text */}
                  <span
                    className={`
                      min-w-0 flex-1 text-sm leading-6 sm:text-[15px]
                      ${
                        isSelected
                          ? "font-medium text-white"
                          : "text-gray-300 group-hover:text-white"
                      }
                    `}
                  >
                    {opt}
                  </span>

                  {/* Selection indicator */}
                  <span className="shrink-0">
                    {isSelected ? (
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-purple-500">
                        <Check
                          className="h-4 w-4 text-white"
                          strokeWidth={2.5}
                        />
                      </span>
                    ) : (
                      <Circle className="h-5 w-5 text-gray-700 transition-colors group-hover:text-gray-500" />
                    )}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Keyboard hint */}
        <div className="hidden border-t border-gray-800 px-4 py-3 sm:block sm:px-6">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>
              Use{" "}
              <kbd className="rounded border border-gray-700 bg-gray-800 px-1.5 py-0.5 text-gray-300">
                A-D
              </kbd>{" "}
              or{" "}
              <kbd className="rounded border border-gray-700 bg-gray-800 px-1.5 py-0.5 text-gray-300">
                1-4
              </kbd>{" "}
              to select
            </span>

            {selectedIndex !== undefined && (
              <span className="text-green-400">
                Option {String.fromCharCode(65 + selectedIndex)} selected
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuestionCard;
