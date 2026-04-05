"use client";

import { useEffect } from "react";
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
    const role = useFinanceStore((state) => state.role);
    const showAddForm = useFinanceStore((state) => state.showAddForm);
    const setShowAddForm = useFinanceStore((state) => state.setShowAddForm);
    const editingTransactionId = useFinanceStore((state) => state.editingTransactionId);
    const stopEditingTransaction = useFinanceStore((state) => state.stopEditingTransaction);
    const transactions = useFinanceStore((state) => state.transactions);
    const addTransaction = useFinanceStore((state) => state.addTransaction);
    const updateTransaction = useFinanceStore((state) => state.updateTransaction);
    const [form, setForm] = useState(INITIAL_FORM);

    useEffect(() => {
        if (!editingTransactionId) return;
        const target = transactions.find((tx) => tx.id === editingTransactionId);
        if (!target) return;

        setForm({
            date: target.date,
            amount: String(target.amount),
            category: target.category,
            type: target.type,
        });
    }, [editingTransactionId, transactions]);

    const onFieldChange = (key, value) => {
        setForm((prev) => ({ ...prev, [key]: value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const amount = Number(form.amount);
        if (!form.date || !form.category || !amount) return;

        if (editingTransactionId) {
            updateTransaction({
                id: editingTransactionId,
                date: form.date,
                amount,
                category: form.category.trim(),
                type: form.type,
            });
        } else {
            addTransaction({
                id: `manual-${Date.now()}`,
                date: form.date,
                amount,
                category: form.category.trim(),
                type: form.type,
            });
        }

        setForm(INITIAL_FORM);
    };

    const handleCancel = () => {
        setForm(INITIAL_FORM);
        stopEditingTransaction();
        setShowAddForm(false);
    };

    if (role !== "admin") return null;

    return (
        <Card title="Transaction Controls" subtitle="Admin can add or edit transactions">
            {!showAddForm ? (
                <Button onClick={() => setShowAddForm(true)}>+ Add Transaction</Button>
            ) : (
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
                        <div className="flex flex-wrap gap-2">
                            <Button type="submit" className="w-full sm:w-auto">
                                {editingTransactionId ? "Update Transaction" : "Add Transaction"}
                            </Button>
                            <Button type="button" variant="secondary" onClick={handleCancel}>
                                Cancel
                            </Button>
                        </div>
                    </div>
                </form>
            )}
        </Card>
    );
}
