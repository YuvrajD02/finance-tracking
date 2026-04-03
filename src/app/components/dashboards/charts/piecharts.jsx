"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

import Card from "../../ui/card";
import { formatCurrency } from "../../utils/format";

const COLORS = ["#f59e0b", "#4f46e5", "#ef4444", "#06b6d4", "#8b5cf6", "#3b82f6"];

export default function CategoryPieChart({ data }) {
    return (
        <Card title="Traffic" subtitle="Expense category split" className="h-[340px]">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={data}
                        dataKey="value"
                        nameKey="name"
                        innerRadius={66}
                        outerRadius={105}
                        paddingAngle={2}
                        stroke="none"
                    >
                        {data.map((entry, index) => (
                            <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip
                        formatter={(value) => formatCurrency(Number(value))}
                        contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0" }}
                    />
                </PieChart>
            </ResponsiveContainer>
        </Card>
    );
}
