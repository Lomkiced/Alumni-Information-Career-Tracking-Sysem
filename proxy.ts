// proxy.ts — Next.js route protection (Next.js 16+)
// Runs on every request to protected routes

import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database.types";

// ── Service role client — bypasses RLS for middleware profile lookups ─────────
// This is safe: it only reads the `role` column and runs entirely server-side.
function createServiceClient() {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );
}

async function getUserRole(userId: string): Promise<string | null> {
  const supabase = createServiceClient();
  const { data } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", userId)
    .single<{ role: string }>();
  return data?.role ?? null;
}

function getRoleRedirect(role: string): string {
  switch (role) {
    case "alumni":   return "/alumni/profile";
    case "admin":    return "/admin/dashboard";
    case "employer": return "/employer/jobs";
    default:         return "/login";
  }
}

export async function proxy(request: NextRequest) {
  const { supabaseResponse, user } = await updateSession(request);
  const { pathname } = request.nextUrl;

  // ── Public routes — no auth required ─────────────────────────────────────
  const publicPrefixes = [
    "/login",
    "/register",
    "/forgot-password",
    "/api/auth/callback",
    "/api/auth/register",
    "/api/cron/",
    "/api/search",
    "/api/messages",
    "/_next",
    "/favicon",
  ];

  const isPublicPath =
    pathname === "/" ||
    publicPrefixes.some((prefix) => pathname.startsWith(prefix));

  // ── Unauthenticated access to protected route ─────────────────────────────
  if (!user && !isPublicPath) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // ── Already authenticated → redirect away from auth pages ─────────────────
  if (user && (pathname === "/" || pathname === "/login" || pathname.startsWith("/register"))) {
    const role = await getUserRole(user.id);
    if (role) {
      return NextResponse.redirect(new URL(getRoleRedirect(role), request.url));
    }
    // Profile not found — sign out and send to login with error
    return NextResponse.redirect(new URL("/login?error=profile_missing", request.url));
  }

  // ── Role-based route guards ───────────────────────────────────────────────
  if (user && !isPublicPath) {
    const isDashboardRoute =
      pathname.startsWith("/alumni") ||
      pathname.startsWith("/employer") ||
      pathname.startsWith("/admin");

    if (isDashboardRoute) {
      const role = await getUserRole(user.id);

      if (!role) {
        return NextResponse.redirect(new URL("/login", request.url));
      }

      // Guard: alumni routes
      if (pathname.startsWith("/alumni") && role !== "alumni") {
        return NextResponse.redirect(new URL(getRoleRedirect(role), request.url));
      }
      // Guard: employer routes
      if (pathname.startsWith("/employer") && role !== "employer") {
        return NextResponse.redirect(new URL(getRoleRedirect(role), request.url));
      }
      // Guard: admin routes
      if (pathname.startsWith("/admin") && role !== "admin") {
        return NextResponse.redirect(new URL(getRoleRedirect(role), request.url));
      }
    }
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
