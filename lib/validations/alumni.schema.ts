// lib/validations/alumni.schema.ts
import { z } from "zod";

export const alumniProfileSchema = z.object({
  full_name: z.string().min(2, "Name must be at least 2 characters").max(100),
  phone: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  province: z.string().optional(),
  linkedin_url: z
    .string()
    .optional()
    .refine((v) => !v || /^https?:\/\/(www\.)?linkedin\.com\//.test(v), {
      message: "Must be a valid LinkedIn URL",
    }),
  major: z.string().optional(),
  is_profile_public: z.boolean().default(true),
  course: z.string().optional(),
});

export type AlumniProfileInput = z.infer<typeof alumniProfileSchema>;
