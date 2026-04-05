"use client";

import useFinanceStore from "../store/usestore";

const navItems = [
    { label: "Dashboard", href: "#overview" },
    { label: "Transactions", href: "#transactions" },
    { label: "Insights", href: "#insights" },
    { label: "Admin", href: "#admin" },
];

export default function Sidebar({ appName }) {
    const role = useFinanceStore((state) => state.role);
    const sidebarOpen = useFinanceStore((state) => state.sidebarOpen);
    const setSidebarOpen = useFinanceStore((state) => state.setSidebarOpen);

    const items = navItems.filter((item) => (item.label === "Admin" ? role === "admin" : true));

    return (
        <>
            {sidebarOpen && (
                <button
                    className="fixed inset-0 z-30 bg-slate-900/40 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                    aria-label="Close sidebar overlay"
                />
            )}

            <aside className={`fixed inset-y-0 left-0 z-40 w-[248px] p-2 transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}>
                <div className="flex h-full flex-col rounded-[22px] bg-gradient-to-b from-violet-700 via-indigo-600 to-indigo-500 px-4 py-5 text-white shadow-xl">
                    <div className="px-2">
                        <h1 className="text-xl font-bold tracking-tight">{appName}</h1>
                        <p className="mt-1 text-xs text-violet-100/90">Smart spending starts here.</p>
                    </div>

                    <div className="mt-7 px-2 text-[11px] font-medium uppercase tracking-[0.18em] text-violet-200/80">Menu</div>

                    <nav className="mt-2 flex-1 space-y-2 p-2">
                        {items.map((item, index) => (
                            <a
                                key={item.href}
                                href={item.href}
                                onClick={() => setSidebarOpen(false)}
                                className="group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-violet-100/95 transition hover:bg-white/20 hover:text-white"
                            >
                                <span className="inline-flex h-6 w-6 items-center justify-center rounded-lg bg-white/15 text-xs font-semibold text-white/90 group-hover:bg-white/25">
                                    {index + 1}
                                </span>
                                {item.label}
                            </a>
                        ))}
                    </nav>
                </div>
            </aside>
        </>
    );
}
