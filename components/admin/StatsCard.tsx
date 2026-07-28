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
    glow: "bg-blue-500/20",
    border: "group-hover:border-blue-500/50",
    iconBg: "bg-blue-500/10 text-blue-400 group-hover:bg-blue-500/20",
    text: "text-blue-100",
    badgeBg: "bg-blue-500/10",
    badgeText: "text-blue-400",
  },
  green: {
    glow: "bg-emerald-500/20",
    border: "group-hover:border-emerald-500/50",
    iconBg: "bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500/20",
    text: "text-emerald-100",
    badgeBg: "bg-emerald-500/10",
    badgeText: "text-emerald-400",
  },
  amber: {
    glow: "bg-amber-500/20",
    border: "group-hover:border-amber-500/50",
    iconBg: "bg-amber-500/10 text-amber-400 group-hover:bg-amber-500/20",
    text: "text-amber-100",
    badgeBg: "bg-amber-500/10",
    badgeText: "text-amber-400",
  },
  purple: {
    glow: "bg-violet-500/20",
    border: "group-hover:border-violet-500/50",
    iconBg: "bg-violet-500/10 text-violet-400 group-hover:bg-violet-500/20",
    text: "text-violet-100",
    badgeBg: "bg-violet-500/10",
    badgeText: "text-violet-400",
  },
  red: {
    glow: "bg-rose-500/20",
    border: "group-hover:border-rose-500/50",
    iconBg: "bg-rose-500/10 text-rose-400 group-hover:bg-rose-500/20",
    text: "text-rose-100",
    badgeBg: "bg-rose-500/10",
    badgeText: "text-rose-400",
  },
  cyan: {
    glow: "bg-cyan-500/20",
    border: "group-hover:border-cyan-500/50",
    iconBg: "bg-cyan-500/10 text-cyan-400 group-hover:bg-cyan-500/20",
    text: "text-cyan-100",
    badgeBg: "bg-cyan-500/10",
    badgeText: "text-cyan-400",
  },
};

export function StatsCard({ title, value, icon: Icon, color, description, trend, loading }: StatsCardProps) {
  const colors = COLOR_MAP[color];

  if (loading) {
    return (
      <div className="rounded-2xl bg-white/5 border border-white/10 animate-pulse h-[140px]" />
    );
  }

  return (
    <div className={cn(
      "group relative rounded-2xl glass border border-white/10 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl",
      colors.border
    )}>
      {/* Dynamic Animated Glow */}
      <div className={cn("absolute -top-12 -right-12 w-32 h-32 rounded-full blur-3xl opacity-50 group-hover:opacity-100 transition-opacity duration-500", colors.glow)} />
      
      <div className="relative p-5 z-10 flex flex-col h-full justify-between">
        <div className="flex items-start justify-between mb-4">
          <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center transition-colors duration-300 backdrop-blur-md", colors.iconBg)}>
            <Icon size={24} />
          </div>
          {trend !== undefined && (
            <div className={cn("flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full", colors.badgeBg, colors.badgeText)}>
              {trend.value > 0 ? <TrendingUp size={12} /> : trend.value < 0 ? <TrendingDown size={12} /> : <Minus size={12} />}
              {Math.abs(trend.value)}% {trend.label}
            </div>
          )}
        </div>
        
        <div>
          <p className="text-3xl font-heading font-bold tracking-tight text-foreground">{value}</p>
          <div className="flex items-center gap-2 mt-1">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            {description && (
              <span className="hidden sm:inline-block w-1 h-1 rounded-full bg-border" />
            )}
            {description && (
              <p className="hidden sm:block text-xs text-muted-foreground/70 truncate">{description}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
