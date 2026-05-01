// app/page.tsx
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function RootPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single<{ role: string }>();

  const redirects: Record<string, string> = {
    alumni: "/alumni/profile",
    admin: "/admin/dashboard",
    employer: "/employer/jobs",
  };
  redirect(redirects[profile?.role ?? ""] ?? "/login");
}
