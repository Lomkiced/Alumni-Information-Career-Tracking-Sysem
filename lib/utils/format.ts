// lib/utils/format.ts
import { format, formatDistanceToNow, parseISO, isValid } from "date-fns";

// ── Date formatters ──────────────────────────────────────────────────────────

export function formatDate(
  date: string | Date | null | undefined,
  pattern = "MMM d, yyyy"
): string {
  if (!date) return "—";
  const d = typeof date === "string" ? parseISO(date) : date;
  return isValid(d) ? format(d, pattern) : "—";
}

export function formatDateTime(date: string | Date | null | undefined): string {
  return formatDate(date, "MMM d, yyyy h:mm a");
}

export function formatRelativeTime(date: string | Date | null | undefined): string {
  if (!date) return "—";
  const d = typeof date === "string" ? parseISO(date) : date;
  return isValid(d) ? formatDistanceToNow(d, { addSuffix: true }) : "—";
}

export function formatMonthYear(date: string | Date | null | undefined): string {
  return formatDate(date, "MMMM yyyy");
}

// ── Currency / number formatters ─────────────────────────────────────────────

export function formatPeso(amount: number | null | undefined): string {
  if (amount === null || amount === undefined) return "—";
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatNumber(value: number | null | undefined): string {
  if (value === null || value === undefined) return "—";
  return new Intl.NumberFormat("en-PH").format(value);
}

export function formatPercentage(value: number | null | undefined, decimals = 1): string {
  if (value === null || value === undefined) return "—";
  return `${value.toFixed(decimals)}%`;
}

// ── String formatters ────────────────────────────────────────────────────────

export function formatName(name: string | null | undefined): string {
  if (!name) return "Unknown";
  return name
    .trim()
    .split(" ")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(" ");
}

export function formatInitials(name: string | null | undefined): string {
  if (!name) return "?";
  return name
    .trim()
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n.charAt(0).toUpperCase())
    .join("");
}

export function truncate(text: string | null | undefined, maxLength = 100): string {
  if (!text) return "";
  return text.length > maxLength ? `${text.slice(0, maxLength)}…` : text;
}

// ── Employment status label ──────────────────────────────────────────────────

const STATUS_LABELS: Record<string, string> = {
  employed: "Employed",
  self_employed: "Self-Employed",
  unemployed: "Unemployed",
  ofw: "OFW",
  further_study: "Further Study",
  retired: "Retired",
};

export function formatEmploymentStatus(status: string | null | undefined): string {
  if (!status) return "—";
  return STATUS_LABELS[status] ?? status;
}

const JOB_TYPE_LABELS: Record<string, string> = {
  full_time: "Full-Time",
  part_time: "Part-Time",
  contractual: "Contractual",
  freelance: "Freelance",
  internship: "Internship",
};

export function formatJobType(type: string | null | undefined): string {
  if (!type) return "—";
  return JOB_TYPE_LABELS[type] ?? type;
}
