"use client";

import { useState } from "react";

import { STORAGE_KEYS } from "../constants/defoultdata";
import { parseCSVText } from "../services/csv";
import useFinanceStore from "../store/usestore";
import Button from "../ui/button";
import Card from "../ui/card";

export default function CSVUpload() {
    const setCSVTransactions = useFinanceStore((state) => state.setCSVTransactions);
    const [message, setMessage] = useState("");

    const handleCSVUpload = (event) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();

        reader.onload = (readEvent) => {
            const csvText = String(readEvent.target?.result || "");
            const parsed = parseCSVText(csvText);

            if (parsed.length === 0) {
                setMessage("No valid rows found. Expected: date,amount,category,type");
                return;
            }

            localStorage.setItem(STORAGE_KEYS.CSV_DATA, JSON.stringify(parsed));
            setCSVTransactions(parsed);
            setMessage(`Loaded ${parsed.length} rows from CSV.`);
        };

        reader.readAsText(file);
    };

    const clearCSVData = () => {
        localStorage.removeItem(STORAGE_KEYS.CSV_DATA);
        setMessage("Cleared local CSV data.");
    };

    return (
        <Card title="CSV Upload" subtitle="Highest data priority source">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <input
                    type="file"
                    accept=".csv,text/csv"
                    onChange={handleCSVUpload}
                    className="w-full text-sm text-slate-600 file:mr-3 file:rounded-xl file:border-0 file:bg-violet-50 file:px-3 file:py-2 file:text-sm file:font-semibold file:text-violet-700 hover:file:bg-violet-100"
                />
                <Button variant="secondary" onClick={clearCSVData}>
                    Clear CSV Data
                </Button>
            </div>
            {message && <p className="mt-2 text-sm text-slate-600">{message}</p>}
        </Card>
    );
}
