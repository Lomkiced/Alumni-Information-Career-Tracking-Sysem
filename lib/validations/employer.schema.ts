// lib/validations/employer.schema.ts
import { z } from "zod";

export const employerProfileSchema = z.object({
  full_name: z.string().min(2, "Name must be at least 2 characters").max(100),
  phone: z.string().optional(),
  company_name: z.string().min(2, "Company name is required").max(200),
  industry: z.string().min(1, "Industry is required"),
  company_size: z
    .enum(["1-10", "11-50", "51-200", "201-500", "500+"])
    .optional(),
  business_permit_number: z.string().optional(),
  company_address: z.string().optional(),
  company_website: z
    .string()
    .optional()
    .refine((v) => !v || v === "" || /^https?:\/\/.+/.test(v), {
      message: "Must be a valid URL",
    }),
});

export type EmployerProfileInput = z.infer<typeof employerProfileSchema>;
