import * as pdfjsLib from "pdfjs-dist";

export const parsePdfFile = async (file) => {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

    const lines = [];

    for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();

        const text = content.items
            .map((item) => item.str)
            .join(" ");

        lines.push(
            ...text
                .split("\n")
                .map((line) => line.trim())
                .filter(Boolean)
        );
    }

    return lines;
};