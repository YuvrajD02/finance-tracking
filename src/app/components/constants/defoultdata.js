export const DEFAULT_TRANSACTIONS = [
    { id: "d1", date: "2026-03-01", amount: 4200, category: "Salary", type: "income" },
    { id: "d2", date: "2026-03-03", amount: 220, category: "Groceries", type: "expense" },
    { id: "d3", date: "2026-03-04", amount: 95, category: "Transport", type: "expense" },
    { id: "d4", date: "2026-03-09", amount: 1400, category: "Freelance", type: "income" },
    { id: "d5", date: "2026-03-11", amount: 650, category: "Rent", type: "expense" },
    { id: "d6", date: "2026-03-13", amount: 110, category: "Utilities", type: "expense" },
    { id: "d7", date: "2026-03-15", amount: 320, category: "Investments", type: "income" },
    { id: "d8", date: "2026-03-16", amount: 175, category: "Dining", type: "expense" },
];

export const STORAGE_KEYS = {
    CSV_DATA: "csvData",
    SHEET_URL: "sheetURL",
    ROLE: "dashboardRole",
    DARK_MODE: "dashboardDarkMode",
};

export const DEFAULT_ROLE = (process.env.NEXT_PUBLIC_DEFAULT_ROLE || "viewer").toLowerCase() === "admin"
    ? "admin"
    : "viewer";
