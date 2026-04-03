import { create } from "zustand";

const useFinanceStore = create((set, get) => ({
    transactions: [],
    dataSource: "default",
    sheetUrl: "",
    loading: true,

    setInitialData: ({ transactions, source, sheetUrl }) => {
        set({
            transactions: Array.isArray(transactions) ? transactions : [],
            dataSource: source || "default",
            sheetUrl: sheetUrl || "",
            loading: false,
        });
    },

    setSheetUrl: (url) => set({ sheetUrl: url || "" }),

    setCSVTransactions: (transactions) => {
        set({ transactions, dataSource: "csv" });
    },

    addTransaction: (transaction) => {
        const current = get().transactions;
        set({ transactions: [transaction, ...current] });
    },

    resetToDefaultState: () => {
        set({
            transactions: [],
            dataSource: "default",
            sheetUrl: process.env.NEXT_PUBLIC_SHEET_URL || "",
            loading: true,
        });
    },
}));

export default useFinanceStore;
