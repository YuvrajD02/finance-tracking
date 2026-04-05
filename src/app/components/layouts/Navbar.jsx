"use client";

import useFinanceStore from "../store/usestore";

export default function Navbar({ appName }) {
    const role = useFinanceStore((state) => state.role);
    const setRole = useFinanceStore((state) => state.setRole);
    const darkMode = useFinanceStore((state) => state.darkMode);
    const toggleDarkMode = useFinanceStore((state) => state.toggleDarkMode);
    const toggleSidebar = useFinanceStore((state) => state.toggleSidebar);

    const today = new Date().toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
        year: "numeric",
    });

    return (
        <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-[#f6f4fb]/95 backdrop-blur">
            <div className="mx-auto flex h-20 items-center justify-between gap-5 px-4 sm:px-6 lg:px-7">
                <div>
                    <button
                        onClick={toggleSidebar}
                        className="mb-1 inline-flex rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-semibold text-slate-600 md:hidden"
                    >
                        ☰ Menu
                    </button>
                    <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-400">Overview</p>
                    <h2 className="text-lg font-semibold text-slate-900 md:hidden">{appName}</h2>
                    <h2 className="hidden text-2xl font-semibold text-slate-900 md:block">Welcome Back!</h2>
                </div>

                <div className="flex items-center gap-2.5 sm:gap-3.5">
                    <div className="hidden items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 shadow-sm sm:flex">
                        <span className="text-sm text-slate-400">⌕</span>
                        <input
                            readOnly
                            value="Search your items"
                            className="w-52 bg-transparent text-sm text-slate-500 outline-none"
                            aria-label="Search"
                        />
                    </div>
                    <div className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600">
                        {today}
                    </div>
                    <select
                        value={role}
                        onChange={(event) => setRole(event.target.value)}
                        className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 outline-none"
                        aria-label="Select role"
                    >
                        <option value="viewer">Viewer</option>
                        <option value="admin">Admin</option>
                    </select>
                    <button
                        onClick={toggleDarkMode}
                        className="grid h-11 w-11 place-items-center rounded-full border border-slate-200 bg-white text-lg font-semibold text-slate-700"
                    >
                        {darkMode ? "☀" : "☾"}
                    </button>
                    <div className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-violet-600 to-indigo-500 text-base font-bold text-white shadow-md">
                        M
                    </div>
                </div>
            </div>
        </header>
    );
}
