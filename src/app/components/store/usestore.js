import { create } from "zustand";

import { DEFAULT_ROLE, STORAGE_KEYS } from "../constants/defoultdata";

function applyDarkClass(enabled) {
    if (typeof document === "undefined") return;
    document.documentElement.classList.toggle("dark", Boolean(enabled));
}

function saveTransactionsToLocalStorage(transactions) {
    if (typeof window === "undefined") return;
    localStorage.setItem(STORAGE_KEYS.CSV_DATA, JSON.stringify(transactions));
}

const useFinanceStore = create((set, get) => ({
    transactions: [],
    dataSource: "default",
    sheetUrl: "",
    loading: true,
    role: DEFAULT_ROLE,
    darkMode: false,
    searchQuery: "",
    typeFilter: "all",
    sortBy: "date-desc",
    sidebarOpen: false,
    showAddForm: false,
    editingTransactionId: null,

    setInitialData: ({ transactions, source, sheetUrl }) => {
        set({
            transactions: Array.isArray(transactions) ? transactions : [],
            dataSource: source || "default",
            sheetUrl: sheetUrl || "",
            loading: false,
        });
    },

    hydratePreferences: () => {
        if (typeof window === "undefined") return;

        const storedRole = localStorage.getItem(STORAGE_KEYS.ROLE);
        const storedDarkMode = localStorage.getItem(STORAGE_KEYS.DARK_MODE) === "true";

        set({
            role: storedRole === "admin" ? "admin" : DEFAULT_ROLE,
            darkMode: storedDarkMode,
        });

        applyDarkClass(storedDarkMode);
    },

    setRole: (role) => {
        const safeRole = role === "admin" ? "admin" : "viewer";
        if (typeof window !== "undefined") {
            localStorage.setItem(STORAGE_KEYS.ROLE, safeRole);
        }
        set({ role: safeRole });
    },

    toggleDarkMode: () => {
        const next = !get().darkMode;
        if (typeof window !== "undefined") {
            localStorage.setItem(STORAGE_KEYS.DARK_MODE, String(next));
        }
        applyDarkClass(next);
        set({ darkMode: next });
    },

    setSearchQuery: (query) => set({ searchQuery: query }),
    setTypeFilter: (value) => set({ typeFilter: value }),
    setSortBy: (value) => set({ sortBy: value }),
    setSidebarOpen: (value) => set({ sidebarOpen: value }),
    toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
    setShowAddForm: (value) => set({ showAddForm: value }),
    startEditingTransaction: (id) => set({ editingTransactionId: id, showAddForm: true }),
    stopEditingTransaction: () => set({ editingTransactionId: null }),

    setSheetUrl: (url) => set({ sheetUrl: url || "" }),

    setCSVTransactions: (transactions) => {
        saveTransactionsToLocalStorage(transactions);
        set({ transactions, dataSource: "csv" });
    },

    addTransaction: (transaction) => {
        const current = get().transactions;
        const next = [transaction, ...current];
        saveTransactionsToLocalStorage(next);
        set({
            transactions: next,
            dataSource: "csv",
            showAddForm: false,
            editingTransactionId: null,
        });
    },

    updateTransaction: (transaction) => {
        const current = get().transactions;
        const next = current.map((tx) => (tx.id === transaction.id ? transaction : tx));
        saveTransactionsToLocalStorage(next);
        set({
            transactions: next,
            dataSource: "csv",
            editingTransactionId: null,
            showAddForm: false,
        });
    },

    deleteTransaction: (id) => {
        const current = get().transactions;
        const next = current.filter((tx) => tx.id !== id);
        saveTransactionsToLocalStorage(next);
        set({ transactions: next, dataSource: "csv" });
    },

    resetToDefaultState: () => {
        set({
            transactions: [],
            dataSource: "default",
            sheetUrl: process.env.NEXT_PUBLIC_SHEET_URL || "",
            loading: true,
            searchQuery: "",
            typeFilter: "all",
            sortBy: "date-desc",
            showAddForm: false,
            editingTransactionId: null,
        });
    },
}));

export default useFinanceStore;
