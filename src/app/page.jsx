"use client";

import { useEffect } from "react";

import AdminPanel from "./components/admin/adminpannel";
import Insights from "./components/dashboards/insights";
import SummarySection from "./components/dashboards/summarysection";
import { loadDashboardData } from "./components/services/dataloader";
import useFinanceStore from "./components/store/usestore";
import AddTransaction from "./components/transcations/addtransction";
import TransactionTable from "./components/transcations/transcationtable";
import Card from "./components/ui/card";

export default function HomePage() {
  const transactions = useFinanceStore((state) => state.transactions);
  const loading = useFinanceStore((state) => state.loading);
  const dataSource = useFinanceStore((state) => state.dataSource);
  const role = useFinanceStore((state) => state.role);
  const setInitialData = useFinanceStore((state) => state.setInitialData);
  const hydratePreferences = useFinanceStore((state) => state.hydratePreferences);

  useEffect(() => {
    let cancelled = false;

    async function bootstrapData() {
      const result = await loadDashboardData();
      if (!cancelled) setInitialData(result);
    }

    bootstrapData();
    hydratePreferences();

    return () => {
      cancelled = true;
    };
  }, [hydratePreferences, setInitialData]);

  if (loading) {
    return (
      <Card title="Loading dashboard" subtitle="Fetching your latest finance data...">
        <div className="h-2 w-full animate-pulse rounded bg-slate-200" />
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">Dashboard</h1>
          <p className="text-sm text-slate-500">Your finance control center at a glance.</p>
        </div>
        <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600 shadow-sm">
          Active source: {dataSource}
        </span>
      </div>

      <SummarySection transactions={transactions} />
      <Insights transactions={transactions} />

      <section id="transactions" className="space-y-4">
        <AddTransaction />
        <TransactionTable transactions={transactions} />
      </section>

      {role === "admin" ? (
        <AdminPanel />
      ) : (
        <Card title="Admin Panel" subtitle="Switch role to Admin from the top-right role selector to manage sources.">
          <p className="text-sm text-slate-500">Viewer role has read-only access.</p>
        </Card>
      )}
    </div>
  );
}