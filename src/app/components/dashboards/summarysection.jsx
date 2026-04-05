import { getSummaryWithChange } from "../utils/claculation";
import { formatCurrency, formatPercent } from "../utils/format";
import SummaryCard from "./summarycard";

export default function SummarySection({ transactions }) {
    const { totalBalance, totalIncome, totalExpense, change } = getSummaryWithChange(transactions);

    return (
        <section id="overview" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <SummaryCard title="Total Balance" value={formatCurrency(totalBalance)} chip={formatPercent(change.balance)} />
            <SummaryCard title="Total Income" value={formatCurrency(totalIncome)} tone="positive" chip={formatPercent(change.income)} />
            <SummaryCard title="Total Expenses" value={formatCurrency(totalExpense)} tone="negative" chip={formatPercent(change.expense)} />
        </section>
    );
}
