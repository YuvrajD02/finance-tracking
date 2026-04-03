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

    const csvText = await response.text();
    return parseCSVText(csvText);
}
