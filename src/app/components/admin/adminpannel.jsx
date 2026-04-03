"use client";

import { useState } from "react";

import { STORAGE_KEYS } from "../constants/defoultdata";
import { loadDashboardData } from "../services/dataloader";
import useFinanceStore from "../store/usestore";
import CSVUpload from "../transcations/csvupload";
import Button from "../ui/button";
import Card from "../ui/card";
import Input from "../ui/input";

export default function AdminPanel() {
    const sheetUrl = useFinanceStore((state) => state.sheetUrl);
    const setSheetUrl = useFinanceStore((state) => state.setSheetUrl);
    const setInitialData = useFinanceStore((state) => state.setInitialData);
    const [status, setStatus] = useState("");

    const handleSaveLink = async () => {
        if (!sheetUrl) {
            setStatus("Please enter a valid Google Sheet CSV URL.");
            return;
        }

        localStorage.setItem(STORAGE_KEYS.SHEET_URL, sheetUrl);
        localStorage.removeItem(STORAGE_KEYS.CSV_DATA);

        const nextData = await loadDashboardData();
        setInitialData(nextData);
        setStatus("Google Sheet URL saved and data loaded.");
    };

    const handleReset = async () => {
        localStorage.removeItem(STORAGE_KEYS.CSV_DATA);
        localStorage.removeItem(STORAGE_KEYS.SHEET_URL);
        setSheetUrl(process.env.NEXT_PUBLIC_SHEET_URL || "");

        const nextData = await loadDashboardData();
        setInitialData(nextData);
        setStatus("Dashboard reset. Active source re-evaluated.");
    };

    return (
        <section id="admin" className="space-y-4">
            <Card title="Admin Panel" subtitle="Control data source priority and reload behavior.">
                <div className="space-y-3">
                    <Input
                        label="Google Sheet CSV URL"
                        placeholder="https://docs.google.com/spreadsheets/.../export?format=csv"
                        value={sheetUrl}
                        onChange={(event) => setSheetUrl(event.target.value)}
                    />

                    <div className="flex flex-wrap gap-2">
                        <Button onClick={handleSaveLink}>Save Sheet URL</Button>
                        <Button variant="danger" onClick={handleReset}>
                            Reset Data
                        </Button>
                    </div>

                    {status && <p className="rounded-xl bg-slate-50 px-3 py-2 text-sm text-slate-600">{status}</p>}
                </div>
            </Card>

            <CSVUpload />
        </section>
    );
}