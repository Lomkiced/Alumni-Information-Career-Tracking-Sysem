# AICTS — Claude Code Context File

## Project
Alumni Information Career Tracking System (AICTS)
Polytechnic College of La Union

## Stack
- Next.js 14 App Router + React 18 + Tailwind CSS + shadcn/ui
- Supabase (PostgreSQL + Auth + Storage + RLS)
- Prisma ORM (type-safe database queries via DATABASE_URL)
- Resend (email) | Recharts (charts) | React Hook Form + Zod (forms)
- Tiptap (rich text editor for announcements)
- Vercel (deployment) | Vercel Cron Jobs (scheduled tasks)
- html2canvas + jsPDF (chart/report PDF export)

## User Roles
- alumni — graduates, manage own profile and career data
- admin — full system access, moderation, reports
- employer — post jobs, manage applicants (requires admin approval)

## Key Rules
1. ALWAYS use Server Components by default. Add "use client" only when needed.
2. ALWAYS validate with Zod on both frontend (React Hook Form) and API routes.
3. ALWAYS use RLS — never bypass with service_role key on client-facing routes.
4. ALWAYS use the server Supabase client in API routes and Server Components.
5. ALWAYS use the browser Supabase client in Client Components.
6. NEVER expose SUPABASE_SERVICE_ROLE_KEY to the browser.
7. Use shadcn/ui components — do not create custom UI from scratch.
8. All forms use React Hook Form with Zod resolver.
9. All API routes return { data, error } shape consistently.
10. Use Prisma for all database reads/writes (not raw Supabase client queries).
11. Use Supabase client ONLY for Auth, Storage, and Realtime subscriptions.
12. Commit to GitHub after each completed feature.

## Architecture: Prisma + Supabase Hybrid
- Prisma → PostgreSQL database queries (type-safe, introspected schema)
- Supabase Auth → session management, JWT tokens
- Supabase Storage → profile photos, resumes
- RLS still applies for direct Supabase client queries
- DATABASE_URL and DIRECT_URL both point to the Supabase PostgreSQL instance

## Environment Variables Required
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
DATABASE_URL=              # Supabase pooled connection (for Prisma)
DIRECT_URL=                # Supabase direct connection (for Prisma migrations)
RESEND_API_KEY=
NEXT_PUBLIC_APP_URL=
CRON_SECRET=

## PCLU Courses
- Bachelor of Science in Information Technology
- Bachelor of Elementary Education
- Bachelor of Secondary Education
- Bachelor of Science in Business Administration
- Bachelor of Science in Criminology
- Bachelor of Science in Hospitality Management
- Bachelor of Science in Tourism Management

## Folder Conventions
- app/(auth)/         — public auth pages (no auth required)
- app/(dashboard)/    — protected pages (auth required, role-checked)
- app/api/            — API routes (always validate session and role)
- components/ui/      — shadcn/ui only
- components/[feat]/  — feature-specific components
- lib/supabase/client.ts  — browser client (use in "use client" components)
- lib/supabase/server.ts  — server client (use in Server Components and API routes)
- lib/prisma.ts           — Prisma client singleton
- prisma/schema.prisma    — Prisma schema (mirrors Supabase PostgreSQL)
