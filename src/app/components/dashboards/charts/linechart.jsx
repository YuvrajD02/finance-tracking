"use client";

import {
    Area,
    AreaChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

import Card from "../../ui/card";
import { formatCurrency } from "../../utils/format";

export default function TrendsLineChart({ data }) {
    if (!data?.length) {
        return (
            <Card title="Balance Trend" subtitle="No trend data available yet" className="h-[340px]">
                <div className="grid h-full place-items-center text-sm text-slate-500">No chart data</div>
            </Card>
        );
    }

    return (
        <Card title="Balance Trend" subtitle="Running balance by date" className="h-[340px]">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 8, right: 8, left: -12, bottom: 0 }}>
                    <defs>
                        <linearGradient id="balanceFill" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#ef4444" stopOpacity={0.35} />
                            <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#eceaf6" />
                    <XAxis dataKey="date" tick={{ fontSize: 11, fill: "#6b7280" }} tickLine={false} axisLine={false} />
                    <YAxis
                        tickFormatter={(value) => formatCurrency(Number(value))}
                        tick={{ fontSize: 11, fill: "#6b7280" }}
                        tickLine={false}
                        axisLine={false}
                        width={68}
                    />
                    <Tooltip
                        formatter={(value) => formatCurrency(Number(value))}
                        contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0" }}
                    />
                    <Area
                        type="monotone"
                        dataKey="balance"
                        stroke="#ef4444"
                        strokeWidth={2.5}
                        fill="url(#balanceFill)"
                        dot={false}
                        activeDot={{ r: 5 }}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </Card>
    );
}
