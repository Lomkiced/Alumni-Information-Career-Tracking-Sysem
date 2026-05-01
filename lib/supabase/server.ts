// lib/supabase/server.ts
// Server Supabase client — use in Server Components, API routes, and middleware

import { createServerClient } from "@supabase/ssr";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import type { Database } from "@/types/database.types";

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          } catch {
            // Ignore errors in Server Components (cookies are read-only there)
          }
        },
      },
    }
  );
}

// ── Admin client — service role, only for server-side admin operations ────────
// NEVER expose this to the browser. Only use in trusted API routes.
export function createAdminClient() {
  return createSupabaseClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
}

// ── Type-safe insert/update helper ───────────────────────────────────────────
// Workaround for supabase-js v2.105+ insert type regression where some tables
// resolve to `never` due to RLS policy reflection at the type level.
// Use this wrapper for .insert() and .update() calls that hit the never issue.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function dbFrom<T extends ReturnType<typeof createAdminClient>>(client: T, table: string) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (client as any).from(table) as ReturnType<T["from"]>;
}
