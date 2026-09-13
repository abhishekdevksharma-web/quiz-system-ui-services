import React, { useEffect, useState } from "react";
import { createWorker } from "tesseract.js";
import { Image, Trash2, Check, RotateCw } from "lucide-react";

function ImageToText({ QuesId, setOptions, setquestionValue }) {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [completed, setCompleted] = useState(false);
  const [completedText, setCompletedText] = useState(false);

  const extractText = async (file) => {
    if (!file) return;

    setLoading(true);
    setProgress(0);
    setCompleted(false);
    setCompletedText(false);

    let worker;

    try {
      worker = await createWorker("eng", 1, {
        logger: (message) => {
          if (message.status === "recognizing text") {
            setProgress(Math.round(message.progress * 100));
          }
        },
      });

      const result = await worker.recognize(file);

      const lines = result.data.text
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean);

      for (let i = 0; i < lines.length; i += 5) {
        const question = lines[i];
        const options = lines.slice(i + 1, i + 5);

        if (question) {
          setquestionValue(question);
        }
        if (options) {
          setOptions(options);
        }
      }

      console.log(lines);
      await worker.terminate();
      worker = null;

      setProgress(100);
      setLoading(false);

      setTimeout(() => {
        setCompleted(true);
        setCompletedText(true);
      }, 200);
    } catch (error) {
      console.error("OCR Error:", error);
      if (worker) {
        await worker.terminate();
      }
      setLoading(false);
      setCompleted(false);
      setCompletedText(false);
    }
  };

  const handleRetry = () => {
    if (!file || loading) return;

    setCompleted(false);
    setCompletedText(false);
    setProgress(0);

    extractText(file);
  };

  const handleImageChange = (e) => {
    const selectedFile = e.target.files?.[0];

    if (!selectedFile) return;

    setFile(selectedFile);
    setImagePreview(URL.createObjectURL(selectedFile));

    extractText(selectedFile);
    e.target.value = "";
  };

  const handleDelete = () => {
    setFile(null);
    setImagePreview("");
    // setQuestion("");
    setProgress(0);
    setCompleted(false);
    setCompletedText(false);
  };

  useEffect(() => {
    if (!completed) return;
    setTimeout(() => {
      setCompletedText(false);
    }, 2000);
  }, [completed]);

  return (
    <div className="w-full">
      {!file ? (
        <label className="group flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border border-white/50 border-dashed text-gray-500 transition-all duration-200 hover:w-32 hover:bg-gray-50 focus-within:w-32">
          <Image size={18} className="shrink-0" />

          <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm opacity-0 transition-all duration-200 group-hover:ml-2 group-hover:max-w-20 group-hover:opacity-100 group-focus-within:ml-2 group-focus-within:max-w-20 group-focus-within:opacity-100">
            Upload Image
          </span>

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </label>
      ) : (
        <div className="flex w-full items-center justify-between rounded-lg border border-gray-200 px-3 py-2">
          <div className="flex items-center gap-3">
            {/* Image + Progress Border */}
            <div
              className="relative h-11 w-11 rounded-lg p-[2px]"
              style={{
                background: completed
                  ? "linear-gradient(135deg, #22c55e, #16a34a)"
                  : `conic-gradient(#3b82f6 ${progress}%, #e5e7eb ${progress}% 100%)`,
              }}
            >
              <div className="relative h-full w-full overflow-hidden rounded-[7px] bg-white">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="h-full w-full object-cover"
                />
                {/* !loading && !completed  */}
                {true && (
                  <button
                    type="button"
                    onClick={handleRetry}
                    className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity duration-200 hover:opacity-100 z-100 cursor-pointer"
                  >
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-gray-700 shadow-sm">
                      <RotateCw size={15} />
                    </div>
                  </button>
                )}

                {/* Completed Tick */}
                {completed && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                    <div
                      className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500 text-white"
                      style={{
                        animation: "check-pop 0.35s ease-out forwards",
                      }}
                    >
                      <Check
                        size={15}
                        strokeWidth={3}
                        style={{
                          animation: "check-draw 0.25s ease-out 0.1s forwards",
                          opacity: 0,
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Progress Text Only */}
            {loading && (
              <span className="text-xs font-medium text-gray-500">
                {progress}%
              </span>
            )}

            {completedText && (
              <span className="text-xs font-medium text-green-600">Done</span>
            )}
          </div>

          {/* Delete */}
          <button
            type="button"
            onClick={handleDelete}
            disabled={loading}
            className="shrink-0 rounded-md p-1.5 text-gray-400 transition hover:bg-red-50 hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Trash2 size={17} />
          </button>
        </div>
      )}
    </div>
  );
}

export default ImageToText;
