// lib/validations/job.schema.ts
import { z } from "zod";
import { PCLU_COURSES } from "@/lib/constants/courses";

export const jobPostingSchema = z
  .object({
    title: z.string().min(3, "Job title must be at least 3 characters").max(200),
    description: z.string().min(50, "Description must be at least 50 characters"),
    requirements: z.string().optional(),
    job_type: z.enum(["full_time", "part_time", "contractual", "internship", "freelance"], {
      message: "Please select a job type",
    }),
    industry: z.string().min(1, "Please select an industry"),
    location: z.string().optional(),
    is_remote: z.boolean().default(false),
    salary_min: z.number().positive().optional(),
    salary_max: z.number().positive().optional(),
    preferred_courses: z.array(z.string()).default([]),
    slots: z.number().int().min(1, "At least 1 slot required").default(1),
    expires_at: z.string().min(1, "Expiry date is required"),
  })
  .refine(
    (d) => !d.salary_min || !d.salary_max || d.salary_max >= d.salary_min,
    { message: "Maximum salary must be greater than minimum", path: ["salary_max"] }
  );

export const jobApplicationSchema = z.object({
  cover_letter: z.string().max(2000, "Cover letter must be under 2000 characters").optional(),
  resume_url: z.string().optional(),
});

export type JobPostingInput = z.infer<typeof jobPostingSchema>;
export type JobApplicationInput = z.infer<typeof jobApplicationSchema>;
