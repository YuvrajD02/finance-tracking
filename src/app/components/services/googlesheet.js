import { parseCSVText } from "./csv";

function isValidHttpUrl(value) {
    try {
        const url = new URL(value);
        return url.protocol === "http:" || url.protocol === "https:";
    } catch {
        return false;
    }
}

export async function fetchGoogleSheetData(sheetUrl) {
    if (!sheetUrl || !isValidHttpUrl(sheetUrl)) return [];

    const response = await fetch(sheetUrl, { cache: "no-store" });
    if (!response.ok) {
        throw new Error(`Failed to fetch sheet data (${response.status})`);
    }

    const contentType = (response.headers.get("content-type") || "").toLowerCase();
    if (contentType.includes("application/pdf")) {
        throw new Error("This link points to a PDF file. Please provide a CSV link.");
    }

    const csvText = await response.text();
    const parsed = parseCSVText(csvText);

    if (parsed.length === 0) {
        throw new Error("No valid CSV rows found. Expected columns: date,amount,category,type.");
    }

    return parsed;
}
