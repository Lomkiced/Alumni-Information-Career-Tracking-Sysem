"use client";
// components/admin/charts/BatchAreaChart.tsx
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";

interface BatchAreaChartProps {
  data: Array<{ batch_year: string; count: number }>;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-card border border-border rounded-xl p-3 shadow-xl text-xs">
      <p className="font-semibold text-foreground">Batch Year {label}</p>
      <p className="text-primary mt-1">{payload[0]?.value} alumni registered</p>
    </div>
  );
};

export function BatchAreaChart({ data }: BatchAreaChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-muted-foreground text-sm">
        No data available yet.
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={280}>
      <AreaChart data={data} margin={{ top: 8, right: 16, left: 0, bottom: 8 }}>
        <defs>
          <linearGradient id="alumniGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#0d2b5a" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#0d2b5a" stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
        <XAxis dataKey="batch_year" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
        <YAxis tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} allowDecimals={false} />
        <Tooltip content={<CustomTooltip />} />
        <Area
          type="monotone"
          dataKey="count"
          stroke="#1e4080"
          strokeWidth={2.5}
          fill="url(#alumniGradient)"
          dot={{ r: 4, fill: "#0d2b5a", strokeWidth: 0 }}
          activeDot={{ r: 6, fill: "#0d2b5a" }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
