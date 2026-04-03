export default function Card({ title, subtitle, children, className = "", ...props }) {
    return (
        <section
            className={`rounded-2xl border border-slate-200/80 bg-white p-4 shadow-[0_14px_34px_-24px_rgba(15,23,42,0.4)] transition hover:shadow-[0_22px_40px_-26px_rgba(79,70,229,0.55)] sm:p-5 ${className}`}
            {...props}
        >
            {(title || subtitle) && (
                <header className="mb-3.5">
                    {title && <h3 className="text-sm font-semibold text-slate-900 sm:text-base">{title}</h3>}
                    {subtitle && <p className="mt-1 text-xs text-slate-500/95">{subtitle}</p>}
                </header>
            )}
            {children}
        </section>
    );
}
