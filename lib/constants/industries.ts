// lib/constants/industries.ts
export const INDUSTRIES = [
  "Information Technology",
  "Business Process Outsourcing",
  "Manufacturing",
  "Construction",
  "Education",
  "Government",
  "Finance & Banking",
  "Retail & Commerce",
  "Food & Beverage",
  "Transportation & Logistics",
  "Media & Communications",
  "Engineering & Architecture",
  "Agriculture",
  "Hospitality & Tourism",
  "Legal Services",
  "Non-Profit / NGO",
  "Healthcare",
  "Real Estate",
  "Mining & Natural Resources",
  "Others",
] as const;

export type Industry = (typeof INDUSTRIES)[number];

export const EMPLOYMENT_STATUSES = [
  { value: "employed", label: "Employed" },
  { value: "self_employed", label: "Self-Employed" },
  { value: "unemployed", label: "Unemployed" },
  { value: "ofw", label: "OFW (Overseas Filipino Worker)" },
  { value: "further_study", label: "Further Study / Graduate School" },
  { value: "retired", label: "Retired" },
] as const;

export const EMPLOYMENT_TYPES = [
  { value: "full_time", label: "Full-Time" },
  { value: "part_time", label: "Part-Time" },
  { value: "contractual", label: "Contractual" },
  { value: "freelance", label: "Freelance" },
  { value: "internship", label: "Internship" },
] as const;

export const SALARY_RANGES = [
  { value: "below_15k", label: "Below ₱15,000" },
  { value: "15k_25k", label: "₱15,000 – ₱25,000" },
  { value: "25k_35k", label: "₱25,000 – ₱35,000" },
  { value: "35k_50k", label: "₱35,000 – ₱50,000" },
  { value: "50k_75k", label: "₱50,000 – ₱75,000" },
  { value: "above_75k", label: "Above ₱75,000" },
] as const;

export const JOB_TYPES = [
  { value: "full_time", label: "Full-Time" },
  { value: "part_time", label: "Part-Time" },
  { value: "contractual", label: "Contractual" },
  { value: "internship", label: "Internship" },
  { value: "freelance", label: "Freelance" },
] as const;

export const COMPANY_SIZES = [
  { value: "1-10", label: "1–10 employees" },
  { value: "11-50", label: "11–50 employees" },
  { value: "51-200", label: "51–200 employees" },
  { value: "201-500", label: "201–500 employees" },
  { value: "500+", label: "500+ employees" },
] as const;

export const ANNOUNCEMENT_CATEGORIES = [
  { value: "general", label: "General" },
  { value: "event", label: "Event" },
  { value: "job_fair", label: "Job Fair" },
  { value: "seminar", label: "Seminar / Workshop" },
  { value: "alumni_news", label: "Alumni News" },
] as const;

export const APPLICATION_STATUSES = [
  { value: "pending", label: "Pending" },
  { value: "viewed", label: "Viewed" },
  { value: "shortlisted", label: "Shortlisted" },
  { value: "for_interview", label: "For Interview" },
  { value: "hired", label: "Hired" },
  { value: "rejected", label: "Rejected" },
] as const;
