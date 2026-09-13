import React, { useContext, useRef, useState } from "react";
import {
  Upload,
  X,
  FileText,
  Loader2,
  AlertCircle,
  CheckCircle2,
  File,
} from "lucide-react";
import { parsePdfFile } from "../fileParsers/pdfParser";
import { parseWordFile } from "../fileParsers/wordParser";
import { parseExcelFile } from "../fileParsers/excelParser";
import { parseImageFile } from "../fileParsers/imageParser";
import AdminContext from "../../../context/adminContext/adminContext";

function FileToText({ colorMode, open, setOpen }) {
  const { questions, setQuestions, fileParsedData, setFileParsedData } =
    useContext(AdminContext);
  const inputRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [showExample, setShowExample] = useState(false);

  function parsedQuesiton(result) {
    let currentQuestion = null;
    const question = [];

    result.forEach((line) => {
      const text = line.trim();

      // New question: 1. 2. 3. ...
      if (/^\d+\.\s+/.test(text)) {
        if (currentQuestion) {
          question.push(currentQuestion);
        }

        currentQuestion = {
          id: question.length + 1,
          questionText: text.replace(/^\d+\.\s+/, ""),
          options: [],
          correctOptionIndex: null,
          marks: 1,
        };

        return;
      }

      // Option: A) B) C) ... Z)
      if (/^[A-Z]\)\s+/.test(text) && currentQuestion) {
        currentQuestion.options.push(text.replace(/^[A-Z]\)\s+/, ""));
      }
    });

    // Last question
    if (currentQuestion) {
      question.push(currentQuestion);
    }

    return question;
  }

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setFileName(file.name);
    setLoading(true);
    setProgress(0);
    setError("");
    setSuccess(false);

    try {
      let result;

      if (file.type.startsWith("image/")) {
        result = await parseImageFile(file, setProgress);
      } else if (file.type === "application/pdf") {
        result = await parsePdfFile(file);
        setProgress(100);
      } else if (file.name.toLowerCase().endsWith(".docx")) {
        result = await parseWordFile(file);
        setProgress(100);
      } else if (
        file.name.toLowerCase().endsWith(".xls") ||
        file.name.toLowerCase().endsWith(".xlsx")
      ) {
        result = await parseExcelFile(file);
        setProgress(100);
      } else {
        throw new Error("Unsupported file type");
      }
      const question = parsedQuesiton(result);
      setSuccess(true);
      setQuestions(question);
      console.log("Parsed:", question);
    } catch (error) {
      console.error("File parsing error:", error);
      setError(error.message || "Unable to read this file.");
    } finally {
      setLoading(false);
      e.target.value = "";
    }
  };

  const closeModal = () => {
    if (loading) return;

    setOpen(false);
    setError("");
    setSuccess(false);
    setProgress(0);
    setFileName("");
  };

  if (!open) return null;

  return (
    <div
      onClick={closeModal}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-[2px]"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative w-full max-w-lg overflow-hidden rounded-2xl border shadow-2xl ${
          colorMode
            ? "border-slate-700 bg-slate-900 text-slate-200"
            : "border-slate-200 bg-white text-slate-800"
        }`}
      >
        {/* Header */}
        <div
          className={`flex items-center justify-between border-b px-5 py-4 ${
            colorMode ? "border-slate-800" : "border-slate-100"
          }`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                colorMode
                  ? "bg-indigo-500/10 text-indigo-400"
                  : "bg-indigo-50 text-indigo-600"
              }`}
            >
              <Upload size={18} />
            </div>

            <div>
              <h2 className="text-sm font-semibold">Import Questions</h2>
              <p className="mt-0.5 text-[11px] opacity-50">
                Import questions from a file
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={closeModal}
            disabled={loading}
            className={`rounded-lg p-1.5 transition-colors ${
              colorMode
                ? "text-slate-400 hover:bg-slate-800 hover:text-red-400"
                : "text-slate-400 hover:bg-slate-100 hover:text-red-500"
            } disabled:cursor-not-allowed disabled:opacity-40`}
          >
            <X size={17} />
          </button>
        </div>

        <div className="p-5">
          {/* Format Info */}
          <div
            className={`rounded-xl border p-3.5 ${colorMode ? "border-amber-500/20 bg-amber-500/[0.04]" : "border-amber-200 bg-amber-50/70"}`}
          >
            <div className="flex gap-3">
              <div
                className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md ${colorMode ? "bg-amber-500/10" : "bg-amber-100"}`}
              >
                <AlertCircle size={15} className="text-amber-500" />
              </div>

              <div>
                <p className="text-xs font-semibold text-amber-600">
                  Required format
                </p>
                <p className="mt-1 text-[11px] leading-5 opacity-70">
                  Questions must have numeric numbering like <b>1., 2., 3.</b>{" "}
                  and options must use alphabetic labels like{" "}
                  <b>A), B), C), D)</b>.
                </p>
              </div>
            </div>
          </div>

          {/* Upload Area */}
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={loading}
            className={`mt-4 flex w-full flex-col items-center justify-center rounded-xl border-2 border-dashed px-5 py-8 transition-colors ${
              colorMode
                ? "border-slate-700 bg-slate-800/20 hover:border-indigo-500/70 hover:bg-indigo-500/[0.03]"
                : "border-slate-200 bg-slate-50/50 hover:border-indigo-400 hover:bg-indigo-50/40"
            } disabled:cursor-not-allowed`}
          >
            {loading ? (
              <>
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                    colorMode ? "bg-indigo-500/10" : "bg-indigo-50"
                  }`}
                >
                  <Loader2 size={22} className="animate-spin text-indigo-500" />
                </div>

                <span className="mt-3 text-xs font-semibold">
                  Reading file...
                </span>

                <span className="mt-1 text-[10px] opacity-50">
                  Processing {progress}%
                </span>
              </>
            ) : success ? (
              <>
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                    colorMode ? "bg-green-500/10" : "bg-green-50"
                  }`}
                >
                  <CheckCircle2 size={23} className="text-green-500" />
                </div>

                <span className="mt-3 text-xs font-semibold text-green-600">
                  File processed successfully
                </span>

                <span className="mt-1 max-w-[280px] truncate text-[10px] opacity-50">
                  {fileName}
                </span>
              </>
            ) : (
              <>
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                    colorMode
                      ? "bg-indigo-500/10 text-indigo-400"
                      : "bg-indigo-50 text-indigo-600"
                  }`}
                >
                  <Upload size={21} />
                </div>

                <span className="mt-3 text-xs font-semibold">
                  Choose a file
                </span>

                <span className="mt-1 text-[10px] opacity-45">
                  Click to browse from your computer
                </span>
              </>
            )}
          </button>

          {/* Progress */}
          {loading && (
            <div className="mt-3">
              <div
                className={`h-1.5 overflow-hidden rounded-full ${
                  colorMode ? "bg-slate-800" : "bg-slate-100"
                }`}
              >
                <div
                  className="h-full rounded-full bg-indigo-500 transition-all duration-200"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          {/* Selected File */}
          {fileName && !loading && !success && (
            <div
              className={`mt-3 flex items-center gap-3 rounded-lg border px-3 py-2.5 ${
                colorMode
                  ? "border-slate-700 bg-slate-800/50"
                  : "border-slate-200 bg-slate-50"
              }`}
            >
              <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-md ${
                  colorMode
                    ? "bg-indigo-500/10 text-indigo-400"
                    : "bg-indigo-50 text-indigo-600"
                }`}
              >
                <File size={15} />
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-[11px] font-medium">{fileName}</p>
                <p className="mt-0.5 text-[9px] opacity-45">Ready to process</p>
              </div>
            </div>
          )}

          {/* Error */}
          {error && (
            <div
              className={`mt-3 rounded-lg border p-3 ${
                colorMode
                  ? "border-red-500/20 bg-red-500/[0.04]"
                  : "border-red-200 bg-red-50"
              }`}
            >
              <div className="flex gap-2.5">
                <AlertCircle
                  size={15}
                  className="mt-0.5 shrink-0 text-red-500"
                />

                <div className="min-w-0">
                  <p className="text-[10px] font-semibold text-red-600">
                    Unable to process file
                  </p>

                  <p className="mt-0.5 text-[10px] leading-4 text-red-500/80">
                    {error}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* example ui  */}
          <div
            className={`mt-4 overflow-hidden rounded-xl border ${colorMode ? "border-slate-700 bg-slate-800/30" : "border-slate-200 bg-slate-50"}`}
          >
            <button
              type="button"
              onClick={() => setShowExample((prev) => !prev)}
              className={`flex w-full items-center justify-between px-3.5 py-2.5 text-left transition-colors ${colorMode ? "hover:bg-slate-800/60" : "hover:bg-slate-100/70"}`}
            >
              <div className="flex items-center gap-2">
                <FileText size={13} className="text-indigo-500" />
                <span className="text-[10px] font-semibold uppercase tracking-wide opacity-60">
                  Example format
                </span>
              </div>

              <svg
                className={`h-3.5 w-3.5 opacity-50 transition-transform duration-200 ${showExample ? "rotate-180" : ""}`}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            <div
              className={`grid transition-all duration-200 ${
                showExample ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <div
                  className={`border-t p-3 ${colorMode ? "border-slate-700 bg-slate-900/40" : "border-slate-200 bg-white"}`}
                >
                  <div
                    className={`rounded-lg border px-3 py-2.5 ${colorMode ? "border-slate-700 bg-slate-800/60" : "border-slate-200 bg-slate-50/70"}`}
                  >
                    <p className="text-[10px] font-semibold leading-5">
                      <span className="mr-1.5 text-indigo-500">1.</span>
                      What is the capital of India?
                    </p>

                    <div className="mt-1.5 space-y-0.5 pl-4">
                      <p className="text-[10px]">
                        <span className="mr-1.5 font-semibold text-red-500">
                          A)
                        </span>
                        <span className="opacity-70">Mumbai</span>
                      </p>

                      <p className="text-[10px]">
                        <span className="mr-1.5 font-semibold text-blue-500">
                          B)
                        </span>
                        <span className="opacity-70">New Delhi</span>
                      </p>

                      <p className="text-[10px]">
                        <span className="mr-1.5 font-semibold text-green-500">
                          C)
                        </span>
                        <span className="opacity-70">Kolkata</span>
                      </p>

                      <p className="text-[10px]">
                        <span className="mr-1.5 font-semibold text-purple-500">
                          D)
                        </span>
                        <span className="opacity-70">Chennai</span>
                      </p>
                    </div>
                  </div>

                  <p className="mt-2 text-[9px] opacity-40">
                    Use this structure for every question in your file.
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* Footer */}
          <div
            className={`mt-4 flex items-center justify-between border-t pt-3 ${
              colorMode ? "border-slate-800" : "border-slate-100"
            }`}
          >
            <div className="flex items-center gap-1.5 text-[9px] opacity-45">
              <FileText size={12} />
              <span>Supported formats</span>
            </div>

            <div className="flex items-center gap-1.5 text-[9px] font-semibold">
              <span className="text-red-500">PDF</span>
              <span className="opacity-30">•</span>
              <span className="text-blue-500">DOCX</span>
              <span className="opacity-30">•</span>
              <span className="text-green-500">XLSX</span>
              <span className="opacity-30">•</span>
              <span className="text-purple-500">IMG</span>
            </div>
          </div>
        </div>
        <input
          ref={inputRef}
          type="file"
          accept="image/*,.pdf,.docx,.xls,.xlsx"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
    </div>
  );
}

export default FileToText;
