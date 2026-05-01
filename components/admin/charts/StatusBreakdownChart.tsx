"use client";
// components/admin/charts/StatusBreakdownChart.tsx
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell, ResponsiveContainer,
} from "recharts";

interface StatusBreakdownChartProps {
  data: Array<{ status: string; label: string; count: number }>;
}

const STATUS_COLORS: Record<string, string> = {
  employed: "#10b981",
  self_employed: "#06b6d4",
  unemployed: "#f43f5e",
  ofw: "#3b82f6",
  further_study: "#8b5cf6",
  retired: "#94a3b8",
};

const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-card border border-border rounded-xl p-3 shadow-xl text-xs">
      <p className="font-semibold text-foreground">{payload[0]?.payload?.label}</p>
      <p className="text-muted-foreground mt-1">{payload[0]?.value} alumni</p>
    </div>
  );
};

export function StatusBreakdownChart({ data }: StatusBreakdownChartProps) {
  const filtered = data.filter(d => d.count > 0);

  if (!filtered.length) {
    return (
      <div className="flex items-center justify-center h-64 text-muted-foreground text-sm">
        No data available yet.
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart
        data={filtered}
        layout="vertical"
        margin={{ top: 8, right: 24, left: 80, bottom: 8 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={false} />
        <XAxis type="number" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} allowDecimals={false} />
        <YAxis
          type="category"
          dataKey="label"
          tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
          width={80}
        />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="count" radius={[0, 4, 4, 0]}>
          {filtered.map((entry) => (
            <Cell key={entry.status} fill={STATUS_COLORS[entry.status] ?? "#94a3b8"} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
