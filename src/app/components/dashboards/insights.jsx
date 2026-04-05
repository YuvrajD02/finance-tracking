import Card from "../ui/card";
import { getCategoryBreakdown, getInsightsData, getTrendData } from "../utils/claculation";
import { formatPercent } from "../utils/format";
import CategoryPieChart from "./charts/piecharts";
import TrendsLineChart from "./charts/linechart";

export default function Insights({ transactions }) {
    const trendData = getTrendData(transactions);
    const categoryData = getCategoryBreakdown(transactions);
    const insightsData = getInsightsData(transactions);

    if (!transactions.length) {
        return (
            <Card id="insights" title="Wallet Analytics" subtitle="Charts appear when transactions are available.">
                <p className="text-sm text-slate-500">No transaction data yet.</p>
            </Card>
        );
    }

    return (
        <section id="insights" className="space-y-4">
            <div className="grid gap-4 xl:grid-cols-[2fr_1fr]">
                <TrendsLineChart data={trendData} />
                <CategoryPieChart data={categoryData} />
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <Card title="Highest Spending Category">
                    <p className="text-lg font-semibold text-slate-900">{insightsData.highestSpendingCategory}</p>
                </Card>

                <Card title="Monthly Expense Comparison">
                    <p className="text-lg font-semibold text-slate-900">{formatPercent(insightsData.monthlyExpenseChange)}</p>
                </Card>

                <Card title="Savings Percentage">
                    <p className="text-lg font-semibold text-slate-900">{formatPercent(insightsData.savingsPercentage)}</p>
                </Card>
            </div>

            <Card title="Smart Insights">
                <ul className="space-y-2 text-sm text-slate-700">
                    {insightsData.smartInsights.slice(0, 2).map((tip) => (
                        <li key={tip} className="rounded-xl bg-slate-50 px-3 py-2">
                            {tip}
                        </li>
                    ))}
                </ul>
            </Card>
        </section>
    );
}
