"use client";
// components/admin/StatsCard.tsx
import { LucideIcon, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color: "blue" | "green" | "amber" | "purple" | "red" | "cyan";
  description?: string;
  trend?: { value: number; label: string };
  href?: string;
  loading?: boolean;
}

const COLOR_MAP = {
  blue: {
    bg: "from-[#0d2b5a] to-[#1e4080]",
    icon: "bg-white/15",
    text: "text-blue-100",
    badge: "bg-white/20",
  },
  green: {
    bg: "from-emerald-600 to-emerald-800",
    icon: "bg-white/15",
    text: "text-emerald-100",
    badge: "bg-white/20",
  },
  amber: {
    bg: "from-amber-500 to-amber-700",
    icon: "bg-white/15",
    text: "text-amber-100",
    badge: "bg-white/20",
  },
  purple: {
    bg: "from-violet-600 to-purple-800",
    icon: "bg-white/15",
    text: "text-purple-100",
    badge: "bg-white/20",
  },
  red: {
    bg: "from-rose-600 to-red-800",
    icon: "bg-white/15",
    text: "text-red-100",
    badge: "bg-white/20",
  },
  cyan: {
    bg: "from-cyan-600 to-cyan-800",
    icon: "bg-white/15",
    text: "text-cyan-100",
    badge: "bg-white/20",
  },
};

export function StatsCard({ title, value, icon: Icon, color, description, trend, loading }: StatsCardProps) {
  const colors = COLOR_MAP[color];

  if (loading) {
    return (
      <div className="rounded-2xl bg-muted/50 animate-pulse h-[120px]" />
    );
  }

  return (
    <div className={cn(
      "relative rounded-2xl bg-gradient-to-br text-white shadow-lg overflow-hidden",
      colors.bg
    )}>
      {/* Background decoration */}
      <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/5 rounded-full" />
      <div className="absolute -right-2 -bottom-4 w-16 h-16 bg-white/5 rounded-full" />

      <div className="relative p-5">
        <div className="flex items-start justify-between mb-3">
          <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", colors.icon)}>
            <Icon size={20} />
          </div>
          {trend !== undefined && (
            <div className={cn("flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full", colors.badge)}>
              {trend.value > 0 ? <TrendingUp size={11} /> : trend.value < 0 ? <TrendingDown size={11} /> : <Minus size={11} />}
              {Math.abs(trend.value)}% {trend.label}
            </div>
          )}
        </div>
        <p className="text-3xl font-bold tracking-tight">{value}</p>
        <p className={cn("text-sm font-medium mt-1", colors.text)}>{title}</p>
        {description && (
          <p className="text-xs text-white/50 mt-0.5">{description}</p>
        )}
      </div>
    </div>
  );
}
