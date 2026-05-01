"use client";
// hooks/useProfile.ts
import { useEffect, useState, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";

interface Profile { id: string; role: string; full_name: string; email: string; phone: string | null; profile_photo_url: string | null; is_verified: boolean; is_active: boolean; created_at: string; updated_at: string; }
interface Alumni { id: string; student_id: string | null; course: string; major: string | null; batch_year: number; graduation_year: number; address: string | null; city: string | null; province: string | null; linkedin_url: string | null; is_profile_public: boolean; }
interface Employer { id: string; company_name: string; industry: string; company_size: string | null; approval_status: string; company_address: string | null; company_website: string | null; company_logo_url: string | null; }

export function useProfile(userId: string | null | undefined) {
  const supabase = createClient();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [alumni, setAlumni] = useState<Alumni | null>(null);
  const [employer, setEmployer] = useState<Employer | null>(null);
  const [loading, setLoading] = useState(true);

  const fetch = useCallback(async () => {
    if (!userId) { setLoading(false); return; }
    setLoading(true);
    const { data: p } = await supabase.from("profiles").select("*").eq("id", userId).returns<Profile[]>().then(r => ({ data: r.data?.[0] ?? null }));
    setProfile(p);
    if (p?.role === "alumni") {
      const { data: a } = await supabase.from("alumni").select("*").eq("id", userId).returns<Alumni[]>().then(r => ({ data: r.data?.[0] ?? null }));
      setAlumni(a);
    }
    if (p?.role === "employer") {
      const { data: e } = await supabase.from("employers").select("*").eq("id", userId).returns<Employer[]>().then(r => ({ data: r.data?.[0] ?? null }));
      setEmployer(e);
    }
    setLoading(false);
  }, [userId]);

  useEffect(() => { fetch(); }, [fetch]);
  return { profile, alumni, employer, loading, refresh: fetch };
}
