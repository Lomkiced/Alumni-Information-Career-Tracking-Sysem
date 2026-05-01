"use client";
// hooks/useAuth.ts
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";

interface Profile {
  id: string;
  role: string;
  full_name: string;
  email: string;
  phone: string | null;
  profile_photo_url: string | null;
  is_verified: boolean;
  is_active: boolean;
}

export function useAuth() {
  const supabase = createClient();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadProfile = async (session: any) => {
      if (!session?.user) {
        if (isMounted) { setProfile(null); setLoading(false); }
        return;
      }
      const { data, error } = await supabase
        .from("profiles")
        .select("id,role,full_name,email,phone,profile_photo_url,is_verified,is_active")
        .eq("id", session.user.id)
        .returns<Profile[]>();
      
      if (error) console.error("useAuth profile fetch error:", error);
      
      if (isMounted) {
        setProfile(data?.[0] ?? null);
        setLoading(false);
      }
    };

    // 1. Initial Load
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (isMounted) {
        setUser(session?.user ?? null);
        loadProfile(session);
      }
    });

    // 2. Listen for changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      if (isMounted) {
        setUser(session?.user ?? null);
        loadProfile(session);
      }
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, [supabase]);

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }, [router]);

  return { user, profile, loading, signOut, role: profile?.role ?? null };
}
