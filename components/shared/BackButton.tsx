"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export function BackButton() {
  const router = useRouter();
  
  return (
    <Button 
      variant="ghost" 
      size="sm" 
      className="mb-4 gap-2 text-muted-foreground hover:text-foreground"
      onClick={() => router.back()}
    >
      <ArrowLeft size={16} />
      Back
    </Button>
  );
}
