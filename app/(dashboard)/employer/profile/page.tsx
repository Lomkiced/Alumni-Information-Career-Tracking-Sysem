import type { Metadata } from "next";
import { ProfileForm } from "@/components/employer/ProfileForm";

export const metadata: Metadata = {
  title: "Company Profile",
  description: "Manage your company profile, branding, and contact information.",
};

export default function EmployerProfilePage() {
  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div>
        <h1 className="text-3xl font-heading font-bold tracking-tight">Company Profile</h1>
        <p className="text-muted-foreground mt-2 text-lg max-w-2xl">
          Build trust with alumni. Complete your company profile so candidates know who you are and what you stand for.
        </p>
      </div>

      <ProfileForm />
    </div>
  );
}
