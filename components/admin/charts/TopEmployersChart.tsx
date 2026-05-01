"use client";
// components/admin/charts/TopEmployersChart.tsx
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
} from "recharts";

interface TopEmployersChartProps {
  data: Array<{ employer: string; count: number }>;
}

const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-card border border-border rounded-xl p-3 shadow-xl text-xs">
      <p className="font-semibold text-foreground">{payload[0]?.payload?.employer}</p>
      <p className="text-primary mt-1">{payload[0]?.value} alumni hired</p>
    </div>
  );
};

export function TopEmployersChart({ data }: TopEmployersChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-muted-foreground text-sm">
        No hiring data available yet.
      </div>
    );
  }

  const truncate = (s: string, n = 20) => s.length > n ? s.slice(0, n) + "…" : s;

  const formatted = data.map(d => ({ ...d, employer: truncate(d.employer) }));

  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart
        data={formatted}
        layout="vertical"
        margin={{ top: 8, right: 24, left: 120, bottom: 8 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={false} />
        <XAxis type="number" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} allowDecimals={false} />
        <YAxis
          type="category"
          dataKey="employer"
          tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
          width={120}
        />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="count" radius={[0, 4, 4, 0]}>
          {formatted.map((_, i) => (
            <Cell
              key={i}
              fill={`hsl(${210 + i * 8}, ${70 - i * 3}%, ${45 + i * 2}%)`}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
