"use client";

export default function Navbar({ appName }) {
    const today = new Date().toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
        year: "numeric",
    });

    return (
        <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-[#f6f4fb]/95 backdrop-blur">
            <div className="mx-auto flex h-16 items-center justify-between gap-4 px-4 sm:px-6 lg:px-7">
                <div>
                    <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-400">Overview</p>
                    <h2 className="text-base font-semibold text-slate-900 md:hidden">{appName}</h2>
                    <h2 className="hidden text-xl font-semibold text-slate-900 md:block">Welcome Martin!</h2>
                </div>

                <div className="flex items-center gap-2 sm:gap-3">
                    <div className="hidden items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 shadow-sm sm:flex">
                        <span className="text-xs text-slate-400">⌕</span>
                        <input
                            readOnly
                            value="Search your items"
                            className="w-44 bg-transparent text-xs text-slate-500 outline-none"
                            aria-label="Search"
                        />
                    </div>
                    <div className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[11px] font-semibold text-slate-600">
                        {today}
                    </div>
                    <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-violet-600 to-indigo-500 text-sm font-bold text-white shadow-md">
                        M
                    </div>
                </div>
            </div>
        </header>
    );
}
