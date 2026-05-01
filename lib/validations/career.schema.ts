// lib/validations/career.schema.ts
import { z } from "zod";

export const careerRecordSchema = z
  .object({
    employment_status: z.enum(
      ["employed", "self_employed", "unemployed", "ofw", "further_study", "retired"],
      { message: "Please select an employment status" }
    ),
    employer_name: z.string().optional(),
    job_title: z.string().optional(),
    industry: z.string().optional(),
    employment_type: z
      .enum(["full_time", "part_time", "contractual", "freelance", "internship"])
      .optional(),
    salary_range: z
      .enum(["below_15k", "15k_25k", "25k_35k", "35k_50k", "50k_75k", "above_75k"])
      .optional(),
    start_date: z.string().optional(),
    end_date: z.string().optional(),
    is_current: z.boolean().default(true),
    country: z.string().default("Philippines"),
    city: z.string().optional(),
    job_description: z.string().max(1000, "Description too long").optional(),
  })
  .refine(
    (d) => ["unemployed", "further_study", "retired"].includes(d.employment_status) || !!d.employer_name,
    { message: "Employer name is required", path: ["employer_name"] }
  )
  .refine(
    (d) => ["unemployed", "further_study", "retired"].includes(d.employment_status) || !!d.job_title,
    { message: "Job title is required", path: ["job_title"] }
  )
  .refine((d) => !(!d.is_current && !d.end_date), {
    message: "End date is required for past positions",
    path: ["end_date"],
  });

export type CareerRecordInput = z.infer<typeof careerRecordSchema>;
