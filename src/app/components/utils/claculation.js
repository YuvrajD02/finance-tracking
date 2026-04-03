function normalizeType(type = "") {
    return String(type).trim().toLowerCase();
}

export function getSummary(transactions = []) {
    return transactions.reduce(
        (acc, tx) => {
            const amount = Number(tx.amount) || 0;
            const type = normalizeType(tx.type);

            if (type === "income") {
                acc.totalIncome += amount;
                acc.totalBalance += amount;
            } else {
                acc.totalExpense += amount;
                acc.totalBalance -= amount;
            }

            return acc;
        },
        { totalBalance: 0, totalIncome: 0, totalExpense: 0 },
    );
}

export function getTrendData(transactions = []) {
    const sorted = [...transactions].sort((a, b) => new Date(a.date) - new Date(b.date));

    let runningBalance = 0;
    return sorted.map((tx) => {
        const amount = Number(tx.amount) || 0;
        const type = normalizeType(tx.type);
        runningBalance += type === "income" ? amount : -amount;

        return {
            date: tx.date,
            balance: Number(runningBalance.toFixed(2)),
        };
    });
}

export function getCategoryBreakdown(transactions = []) {
    const totalsByCategory = transactions.reduce((acc, tx) => {
        if (normalizeType(tx.type) !== "expense") return acc;

        const category = tx.category || "Other";
        const amount = Number(tx.amount) || 0;

        acc[category] = (acc[category] || 0) + amount;
        return acc;
    }, {});

    return Object.entries(totalsByCategory).map(([name, value]) => ({ name, value }));
}
