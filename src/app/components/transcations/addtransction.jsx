"use client";

import { useState } from "react";

import useFinanceStore from "../store/usestore";
import Button from "../ui/button";
import Card from "../ui/card";
import Input from "../ui/input";

const INITIAL_FORM = {
    date: "",
    amount: "",
    category: "",
    type: "expense",
};

export default function AddTransaction() {
    const addTransaction = useFinanceStore((state) => state.addTransaction);
    const [form, setForm] = useState(INITIAL_FORM);

    const onFieldChange = (key, value) => {
        setForm((prev) => ({ ...prev, [key]: value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const amount = Number(form.amount);
        if (!form.date || !form.category || !amount) return;

        addTransaction({
            id: `manual-${Date.now()}`,
            date: form.date,
            amount,
            category: form.category.trim(),
            type: form.type,
        });

        setForm(INITIAL_FORM);
    };

    return (
        <Card title="Recent Activities" subtitle="Add and manage your latest transaction.">
            <form className="grid gap-3 sm:grid-cols-2" onSubmit={handleSubmit}>
                <Input
                    label="Amount"
                    type="number"
                    min="0"
                    step="0.01"
                    value={form.amount}
                    onChange={(event) => onFieldChange("amount", event.target.value)}
                    placeholder="120.50"
                    required
                />

                <Input
                    label="Category"
                    value={form.category}
                    onChange={(event) => onFieldChange("category", event.target.value)}
                    placeholder="Groceries"
                    required
                />

                <div className="space-y-1.5">
                    <label htmlFor="type" className="text-xs font-medium text-slate-700 sm:text-sm">
                        Type
                    </label>
                    <select
                        id="type"
                        value={form.type}
                        onChange={(event) => onFieldChange("type", event.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-violet-300 focus:bg-white focus:ring-2 focus:ring-violet-100"
                    >
                        <option value="expense">Expense</option>
                        <option value="income">Income</option>
                    </select>
                </div>

                <Input
                    label="Date"
                    type="date"
                    value={form.date}
                    onChange={(event) => onFieldChange("date", event.target.value)}
                    required
                />

                <div className="sm:col-span-2">
                    <Button type="submit" className="w-full sm:w-auto">
                        Add Transaction
                    </Button>
                </div>
            </form>
        </Card>
    );
}
