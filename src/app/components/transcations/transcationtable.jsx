import Card from "../ui/card";
import { getFilteredSortedTransactions } from "../utils/claculation";
import useFinanceStore from "../store/usestore";
import Input from "../ui/input";
import TransactionRow from "./transcationrow";

export default function TransactionTable({ transactions }) {
    const role = useFinanceStore((state) => state.role);
    const searchQuery = useFinanceStore((state) => state.searchQuery);
    const typeFilter = useFinanceStore((state) => state.typeFilter);
    const sortBy = useFinanceStore((state) => state.sortBy);
    const setSearchQuery = useFinanceStore((state) => state.setSearchQuery);
    const setTypeFilter = useFinanceStore((state) => state.setTypeFilter);
    const setSortBy = useFinanceStore((state) => state.setSortBy);
    const deleteTransaction = useFinanceStore((state) => state.deleteTransaction);
    const startEditingTransaction = useFinanceStore((state) => state.startEditingTransaction);

    const filteredTransactions = getFilteredSortedTransactions(transactions, {
        query: searchQuery,
        typeFilter,
        sortBy,
    });

    const isAdmin = role === "admin";

    return (
        <Card title="Transactions" subtitle="Search, filter, and sort your records" className="overflow-hidden">
            <div className="mb-4 grid gap-3 md:grid-cols-3">
                <Input
                    label="Search"
                    placeholder="Search by category, type, date..."
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                />

                <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-700 sm:text-sm">Type Filter</label>
                    <select
                        value={typeFilter}
                        onChange={(event) => setTypeFilter(event.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-violet-300 focus:bg-white focus:ring-2 focus:ring-violet-100"
                    >
                        <option value="all">All</option>
                        <option value="income">Income</option>
                        <option value="expense">Expense</option>
                    </select>
                </div>

                <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-700 sm:text-sm">Sort By</label>
                    <select
                        value={sortBy}
                        onChange={(event) => setSortBy(event.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-violet-300 focus:bg-white focus:ring-2 focus:ring-violet-100"
                    >
                        <option value="date-desc">Date (Newest)</option>
                        <option value="date-asc">Date (Oldest)</option>
                        <option value="amount-desc">Amount (High to Low)</option>
                        <option value="amount-asc">Amount (Low to High)</option>
                    </select>
                </div>
            </div>

            {!transactions.length ? (
                <p className="text-sm text-slate-500">No transactions found.</p>
            ) : !filteredTransactions.length ? (
                <p className="text-sm text-slate-500">No matching transactions for current search/filter.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-[760px] w-full border-collapse">
                        <thead>
                            <tr className="border-b border-slate-200 bg-slate-50/80">
                                <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-slate-500">Date</th>
                                <th className="px-4 py-3 text-right text-[11px] font-semibold uppercase tracking-wide text-slate-500">Amount</th>
                                <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-slate-500">Category</th>
                                <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-slate-500">Type</th>
                                <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-slate-500">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredTransactions.map((tx) => (
                                <TransactionRow
                                    key={tx.id}
                                    transaction={tx}
                                    isAdmin={isAdmin}
                                    onEdit={startEditingTransaction}
                                    onDelete={deleteTransaction}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </Card>
    );
}
