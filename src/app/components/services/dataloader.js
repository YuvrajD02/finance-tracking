import { DEFAULT_TRANSACTIONS, STORAGE_KEYS } from "../constants/defoultdata";
import { parseCSVText } from "./csv";
import { fetchGoogleSheetData } from "./googlesheet";

export async function loadDashboardData() {
    if (typeof window === "undefined") {
        return {
            transactions: DEFAULT_TRANSACTIONS,
            source: "default",
            sheetUrl: process.env.NEXT_PUBLIC_SHEET_URL || "",
        };
    }

    const storedCSV = localStorage.getItem(STORAGE_KEYS.CSV_DATA);
    const storedSheetUrl = localStorage.getItem(STORAGE_KEYS.SHEET_URL);
    const envSheetUrl = process.env.NEXT_PUBLIC_SHEET_URL || "";
    const effectiveSheetUrl = storedSheetUrl || envSheetUrl;

    if (storedCSV) {
        try {
            const parsedLocal = JSON.parse(storedCSV);
            if (Array.isArray(parsedLocal) && parsedLocal.length > 0) {
                return { transactions: parsedLocal, source: "csv", sheetUrl: effectiveSheetUrl };
            }

            const parsedTextCSV = parseCSVText(storedCSV);
            if (parsedTextCSV.length > 0) {
                return { transactions: parsedTextCSV, source: "csv", sheetUrl: effectiveSheetUrl };
            }
        } catch {
            const parsedTextCSV = parseCSVText(storedCSV);
            if (parsedTextCSV.length > 0) {
                return { transactions: parsedTextCSV, source: "csv", sheetUrl: effectiveSheetUrl };
            }
        }
    }

    if (effectiveSheetUrl) {
        try {
            const sheetTransactions = await fetchGoogleSheetData(effectiveSheetUrl);
            if (sheetTransactions.length > 0) {
                return { transactions: sheetTransactions, source: "google-sheet", sheetUrl: effectiveSheetUrl };
            }
        } catch {
            // Fallback to default data below.
        }
    }

    return {
        transactions: DEFAULT_TRANSACTIONS,
        source: "default",
        sheetUrl: effectiveSheetUrl,
    };
}
