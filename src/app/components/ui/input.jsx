export default function Input({ label, className = "", id, ...props }) {
    const inputId = id || props.name;

    return (
        <div className="space-y-1.5">
            {label && (
                <label htmlFor={inputId} className="text-xs font-medium text-slate-700 sm:text-sm">
                    {label}
                </label>
            )}
            <input
                id={inputId}
                className={`w-full rounded-xl border border-slate-200 bg-slate-50/70 px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-300 focus:bg-white focus:ring-2 focus:ring-violet-100 ${className}`}
                {...props}
            />
        </div>
    );
}
