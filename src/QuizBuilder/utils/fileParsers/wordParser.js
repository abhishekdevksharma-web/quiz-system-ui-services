import mammoth from "mammoth";

export const parseWordFile = async (file) => {
  const arrayBuffer = await file.arrayBuffer();

  const result = await mammoth.extractRawText({ arrayBuffer });

  const lines = result.value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  return lines;
};