"use client";
// components/admin/charts/IndustryPieChart.tsx
import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
} from "recharts";

interface IndustryPieChartProps {
  data: Array<{ industry: string; count: number; percentage: number }>;
}

const COLORS = [
  "#0d2b5a", "#1e4080", "#3b82f6", "#06b6d4", "#10b981",
  "#f59e0b", "#f43f5e", "#8b5cf6", "#ec4899", "#64748b",
];

const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="bg-card border border-border rounded-xl p-3 shadow-xl text-xs">
      <p className="font-semibold text-foreground">{d.industry}</p>
      <p className="text-muted-foreground mt-1">{d.count} alumni · {d.percentage}%</p>
    </div>
  );
};

const renderLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percentage }: any) => {
  if (percentage < 5) return null;
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={11} fontWeight="bold">
      {percentage}%
    </text>
  );
};

export function IndustryPieChart({ data }: IndustryPieChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-muted-foreground text-sm">
        No data available yet.
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={280}>
      <PieChart>
        <Pie
          data={data}
          dataKey="count"
          nameKey="industry"
          cx="50%"
          cy="50%"
          outerRadius={100}
          labelLine={false}
          label={renderLabel}
        >
          {data.map((_, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend
          formatter={(v) => <span className="text-xs text-muted-foreground">{v}</span>}
          iconType="circle"
          iconSize={8}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
