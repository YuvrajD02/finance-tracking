import { formatCurrency, formatDate } from "../utils/format";
import Button from "../ui/button";

export default function TransactionRow({ transaction, isAdmin, onEdit, onDelete }) {
    const isIncome = transaction.type === "income";

    return (
        <tr className="border-b border-slate-100 last:border-0 hover:bg-indigo-50/30">
            <td className="px-4 py-3 text-sm text-slate-700">{formatDate(transaction.date)}</td>
            <td className={`px-4 py-3 text-right text-sm font-bold ${isIncome ? "text-emerald-600" : "text-rose-600"}`}>
                {isIncome ? "+" : "-"}
                {formatCurrency(transaction.amount)}
            </td>
            <td className="px-4 py-3 text-sm text-slate-700">{transaction.category}</td>
            <td className="px-4 py-3 text-sm text-slate-700">
                <span
                    className={`rounded-full px-2.5 py-1 text-xs font-medium ${isIncome ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"
                        }`}
                >
                    {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                </span>
            </td>

            <td className="px-4 py-3 text-sm text-slate-700">
                {isAdmin ? (
                    <div className="flex items-center gap-2">
                        <Button variant="secondary" className="px-2 py-1 text-xs" onClick={() => onEdit(transaction.id)}>
                            Edit
                        </Button>
                        <Button variant="danger" className="px-2 py-1 text-xs" onClick={() => onDelete(transaction.id)}>
                            Delete
                        </Button>
                    </div>
                ) : (
                    <span className="text-xs text-slate-400">Viewer mode</span>
                )}
            </td>
        </tr>
    );
}
