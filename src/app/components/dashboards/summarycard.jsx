import Card from "../ui/card";

export default function SummaryCard({ title, value, tone = "default", chip = "+2.5%" }) {
    const toneClass = {
        positive: "from-blue-600 to-indigo-500",
        negative: "from-orange-500 to-amber-400",
        default: "from-violet-600 to-fuchsia-500",
    };

    return (
        <Card className={`h-full border-none bg-gradient-to-r text-white ${toneClass[tone]}`}>
            <div className="flex items-start justify-between gap-3">
                <div>
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-white/80">{title}</p>
                    <p className="mt-2 text-2xl font-bold">{value}</p>
                </div>
                <span className="rounded-full bg-white/20 px-2 py-1 text-[10px] font-semibold">{chip}</span>
            </div>

            <div className="mt-3 h-6 w-full rounded-md bg-white/10" />
        </Card>
    );
}
