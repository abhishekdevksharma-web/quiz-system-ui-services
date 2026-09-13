import { createWorker } from "tesseract.js";

export const parseImageFile = async (file, onProgress) => {
  const worker = await createWorker("eng", 1, {
    logger: (message) => {
      if (message.status === "recognizing text") {
        onProgress?.(Math.round(message.progress * 100));
      }
    },
  });

  try {
    const result = await worker.recognize(file);

    return result.data.text
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);
  } finally {
    await worker.terminate();
  }
};