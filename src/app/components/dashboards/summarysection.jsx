import { formatCurrency } from "../utils/format";
import { getSummary } from "../utils/claculation";
import SummaryCard from "./summarycard";

export default function SummarySection({ transactions }) {
    const { totalBalance, totalIncome, totalExpense } = getSummary(transactions);

    return (
        <section id="overview" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <SummaryCard title="Total Accounts" value={formatCurrency(totalBalance)} chip="+12%" />
            <SummaryCard title="Credit Equity" value={formatCurrency(totalIncome)} tone="positive" chip="+15%" />
            <SummaryCard title="Debt Equity" value={formatCurrency(totalExpense)} tone="negative" chip="-4%" />
        </section>
    );
}
