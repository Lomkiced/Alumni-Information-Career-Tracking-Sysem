"use client";
// components/admin/charts/EmploymentRateChart.tsx
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  Legend, ResponsiveContainer, Cell,
} from "recharts";
import { ClientOnly } from "@/components/shared/ClientOnly";

interface EmploymentRateChartProps {
  data: Array<{
    batch_year: string;
    employed_pct: number;
    unemployed_pct: number;
    total: number;
    employed: number;
  }>;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-card border border-border rounded-xl p-3 shadow-xl text-xs">
      <p className="font-semibold text-foreground mb-2">Batch {label}</p>
      <p className="text-emerald-500">Employed: {payload[0]?.value}%</p>
      <p className="text-red-400">Unemployed: {payload[1]?.value}%</p>
      <p className="text-muted-foreground mt-1">Total alumni: {payload[0]?.payload?.total}</p>
    </div>
  );
};

export function EmploymentRateChart({ data }: EmploymentRateChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-muted-foreground text-sm">
        No data available yet.
      </div>
    );
  }

  return (
    <ClientOnly fallback={<div className="h-[280px] w-full bg-muted/20 animate-pulse rounded-xl" />}>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data} margin={{ top: 8, right: 16, left: 0, bottom: 8 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis dataKey="batch_year" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
          <YAxis tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} unit="%" domain={[0, 100]} />
          <Tooltip content={<CustomTooltip />} />
          <Legend formatter={(v) => <span className="text-xs">{v === "employed_pct" ? "Employed %" : "Unemployed %"}</span>} />
          <Bar dataKey="employed_pct" name="employed_pct" fill="#10b981" radius={[4, 4, 0, 0]} />
          <Bar dataKey="unemployed_pct" name="unemployed_pct" fill="#f43f5e" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ClientOnly>
  );
}
