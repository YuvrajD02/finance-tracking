import Card from "../ui/card";
import TransactionRow from "./transcationrow";

export default function TransactionTable({ transactions }) {
    return (
        <Card title="Order Status" subtitle="Overview of latest records" className="overflow-hidden">
            {transactions.length === 0 ? (
                <p className="text-sm text-slate-500">No transactions found.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full border-collapse">
                        <thead>
                            <tr className="border-b border-slate-200 bg-slate-50/80">
                                <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-slate-500">Date</th>
                                <th className="px-4 py-3 text-right text-[11px] font-semibold uppercase tracking-wide text-slate-500">Amount</th>
                                <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-slate-500">Category</th>
                                <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-slate-500">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map((tx) => (
                                <TransactionRow key={tx.id} transaction={tx} />
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </Card>
    );
}
