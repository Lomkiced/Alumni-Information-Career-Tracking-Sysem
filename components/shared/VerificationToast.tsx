"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { toast } from "sonner";

export function VerificationToast() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (searchParams.get("verified") === "true") {
      toast.success("Email successfully verified!", {
        description: "Your account is now fully verified and active.",
        duration: 5000,
      });

      // Remove the query parameter silently so it doesn't stay in the URL
      const newSearchParams = new URLSearchParams(searchParams.toString());
      newSearchParams.delete("verified");
      const searchStr = newSearchParams.toString();
      const newUrl = pathname + (searchStr ? `?${searchStr}` : "");
      
      router.replace(newUrl, { scroll: false });
    }
  }, [searchParams, router, pathname]);

  return null;
}
