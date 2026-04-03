import Card from "../ui/card";
import { getCategoryBreakdown, getTrendData } from "../utils/claculation";
import CategoryPieChart from "./charts/piecharts";
import TrendsLineChart from "./charts/linechart";

export default function Insights({ transactions }) {
    const trendData = getTrendData(transactions);
    const categoryData = getCategoryBreakdown(transactions);

    if (!transactions.length) {
        return (
            <Card id="insights" title="Wallet Analytics" subtitle="Charts appear when transactions are available.">
                <p className="text-sm text-slate-500">No transaction data yet.</p>
            </Card>
        );
    }

    return (
        <section id="insights" className="grid gap-4 xl:grid-cols-[2fr_1fr]">
            <TrendsLineChart data={trendData} />
            <CategoryPieChart data={categoryData} />
        </section>
    );
}
