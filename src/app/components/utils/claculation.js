function normalizeType(type = "") {
    return String(type).trim().toLowerCase();
}

function toMonthKey(dateLike) {
    const date = new Date(dateLike);
    if (Number.isNaN(date.getTime())) return "";
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}

function getLatestValidDate(transactions = []) {
    const timestamps = transactions
        .map((tx) => new Date(tx.date).getTime())
        .filter((time) => Number.isFinite(time));

    if (!timestamps.length) return new Date();
    return new Date(Math.max(...timestamps));
}

function getCurrentAndPreviousMonthKeys(transactions = []) {
    const latest = getLatestValidDate(transactions);
    const currentMonth = toMonthKey(latest);

    const prev = new Date(latest.getFullYear(), latest.getMonth() - 1, 1);
    const previousMonth = toMonthKey(prev);

    return { currentMonth, previousMonth };
}

function calculatePercentChange(current, previous) {
    if (!previous) return current === 0 ? 0 : 100;
    return ((current - previous) / Math.abs(previous)) * 100;
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

export function getSummaryWithChange(transactions = []) {
    const totals = getSummary(transactions);
    const { currentMonth, previousMonth } = getCurrentAndPreviousMonthKeys(transactions);

    const currentMonthTransactions = transactions.filter((tx) => toMonthKey(tx.date) === currentMonth);
    const previousMonthTransactions = transactions.filter((tx) => toMonthKey(tx.date) === previousMonth);

    const currentTotals = getSummary(currentMonthTransactions);
    const previousTotals = getSummary(previousMonthTransactions);

    return {
        ...totals,
        change: {
            balance: calculatePercentChange(currentTotals.totalBalance, previousTotals.totalBalance),
            income: calculatePercentChange(currentTotals.totalIncome, previousTotals.totalIncome),
            expense: calculatePercentChange(currentTotals.totalExpense, previousTotals.totalExpense),
        },
        monthly: {
            current: currentTotals,
            previous: previousTotals,
        },
    };
}

export function getFilteredSortedTransactions(transactions = [], options = {}) {
    const {
        query = "",
        typeFilter = "all",
        sortBy = "date-desc",
    } = options;

    const q = query.trim().toLowerCase();

    const filtered = transactions.filter((tx) => {
        const type = normalizeType(tx.type);

        if (typeFilter !== "all" && type !== typeFilter) return false;

        if (!q) return true;

        const searchable = `${tx.date} ${tx.category} ${tx.type} ${tx.amount}`.toLowerCase();
        return searchable.includes(q);
    });

    return filtered.sort((a, b) => {
        if (sortBy === "amount-asc") return Number(a.amount || 0) - Number(b.amount || 0);
        if (sortBy === "amount-desc") return Number(b.amount || 0) - Number(a.amount || 0);
        if (sortBy === "date-asc") return new Date(a.date) - new Date(b.date);
        return new Date(b.date) - new Date(a.date);
    });
}

export function getInsightsData(transactions = []) {
    const { currentMonth, previousMonth } = getCurrentAndPreviousMonthKeys(transactions);

    const currentMonthTransactions = transactions.filter((tx) => toMonthKey(tx.date) === currentMonth);
    const previousMonthTransactions = transactions.filter((tx) => toMonthKey(tx.date) === previousMonth);

    const currentSummary = getSummary(currentMonthTransactions);
    const previousSummary = getSummary(previousMonthTransactions);

    const currentExpenses = currentMonthTransactions.filter((tx) => normalizeType(tx.type) === "expense");
    const previousExpenses = previousMonthTransactions.filter((tx) => normalizeType(tx.type) === "expense");

    const groupedCurrent = currentExpenses.reduce((acc, tx) => {
        acc[tx.category] = (acc[tx.category] || 0) + Number(tx.amount || 0);
        return acc;
    }, {});

    const highestCategoryEntry = Object.entries(groupedCurrent).sort((a, b) => b[1] - a[1])[0];
    const highestSpendingCategory = highestCategoryEntry ? highestCategoryEntry[0] : "N/A";

    const monthlyExpenseChange = calculatePercentChange(
        currentSummary.totalExpense,
        previousSummary.totalExpense,
    );

    const savingsPercentage = currentSummary.totalIncome
        ? ((currentSummary.totalIncome - currentSummary.totalExpense) / currentSummary.totalIncome) * 100
        : 0;

    const smartInsights = [];
    if (highestCategoryEntry) {
        const previousCategorySpend = previousExpenses
            .filter((tx) => tx.category === highestCategoryEntry[0])
            .reduce((sum, tx) => sum + Number(tx.amount || 0), 0);
        const categoryChange = calculatePercentChange(highestCategoryEntry[1], previousCategorySpend);
        smartInsights.push(`You spent ${Math.abs(categoryChange).toFixed(1)}% ${categoryChange >= 0 ? "more" : "less"} on ${highestCategoryEntry[0]} this month.`);
    }

    if (monthlyExpenseChange > 0) {
        smartInsights.push("Expenses are trending upward this month. Consider setting a tighter category budget.");
    } else {
        smartInsights.push("Great job — monthly expenses are down compared to the previous month.");
    }

    return {
        highestSpendingCategory,
        monthlyExpenseChange,
        savingsPercentage,
        smartInsights,
    };
}
