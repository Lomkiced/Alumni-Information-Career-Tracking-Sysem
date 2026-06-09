// app/api/auth/callback/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      // Determine where to redirect based on role
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        // 1. Update the custom profiles table to mark email as verified!
        await (supabase.from("profiles") as any)
          .update({ is_verified: true })
          .eq("id", user.id);

        const { data: profile } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", user.id)
          .single<{ role: string }>();

        if (profile) {
          const roleRedirects: Record<string, string> = {
            alumni: "/alumni/profile",
            admin: "/admin/dashboard",
            employer: "/employer/jobs",
          };
          
          // 2. Append ?verified=true so the UI can show a toast
          const targetUrl = new URL(`${origin}${roleRedirects[profile.role] ?? next}`);
          targetUrl.searchParams.set("verified", "true");
          
          return NextResponse.redirect(targetUrl.href);
        }
      }
      return NextResponse.redirect(`${origin}${next}`);
    }
  }
  return NextResponse.redirect(`${origin}/login?error=auth_callback_failed`);
}
