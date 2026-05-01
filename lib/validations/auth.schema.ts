// lib/validations/auth.schema.ts
import { z } from "zod";
import { PCLU_COURSES } from "@/lib/constants/courses";

const currentYear = new Date().getFullYear();

const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[A-Z]/, "Must contain at least one uppercase letter")
  .regex(/[0-9]/, "Must contain at least one number");

export const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export const alumniRegisterSchema = z
  .object({
    full_name: z.string().min(2, "Full name must be at least 2 characters").max(100),
    email: z.string().email("Invalid email address"),
    password: passwordSchema,
    confirm_password: z.string().min(1, "Please confirm your password"),
    student_id: z.string().optional(),
    course: z.enum([...PCLU_COURSES] as [string, ...string[]], {
      message: "Please select a valid course",
    }),
    batch_year: z
      .number({ message: "Please select a batch year" })
      .int()
      .min(2000, "Batch year must be 2000 or later")
      .max(currentYear, "Batch year cannot be in the future"),
    graduation_year: z
      .number({ message: "Please select a graduation year" })
      .int()
      .min(2004, "Graduation year must be 2004 or later")
      .max(currentYear + 5, "Graduation year is too far in the future"),
  })
  .refine((d) => d.password === d.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  })
  .refine((d) => d.graduation_year >= d.batch_year, {
    message: "Graduation year must be after batch year",
    path: ["graduation_year"],
  });

export const employerRegisterSchema = z
  .object({
    full_name: z.string().min(2, "Full name must be at least 2 characters").max(100),
    email: z.string().email("Invalid email address"),
    password: passwordSchema,
    confirm_password: z.string().min(1, "Please confirm your password"),
    company_name: z.string().min(2, "Company name must be at least 2 characters").max(200),
    industry: z.string().min(1, "Please select an industry"),
    company_size: z.enum(["1-10", "11-50", "51-200", "201-500", "500+"] as const, {
      message: "Please select company size",
    }),
    business_permit_number: z.string().optional(),
    company_address: z.string().min(10, "Please provide a complete address"),
    company_website: z
      .string()
      .optional()
      .refine((v) => !v || v === "" || /^https?:\/\/.+/.test(v), {
        message: "Must be a valid URL starting with http:// or https://",
      }),
  })
  .refine((d) => d.password === d.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });

export const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export const resetPasswordSchema = z
  .object({
    password: passwordSchema,
    confirm_password: z.string(),
  })
  .refine((d) => d.password === d.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });

export type LoginInput = z.infer<typeof loginSchema>;
export type AlumniRegisterInput = z.infer<typeof alumniRegisterSchema>;
export type EmployerRegisterInput = z.infer<typeof employerRegisterSchema>;
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
