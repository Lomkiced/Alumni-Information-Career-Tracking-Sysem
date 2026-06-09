"use client";
// app/(dashboard)/layout.tsx
import { Sidebar } from "@/components/shared/Sidebar";
import { Navbar } from "@/components/shared/Navbar";
import { FloatingChat } from "@/components/shared/FloatingChat";
import { Suspense } from "react";
import { VerificationToast } from "@/components/shared/VerificationToast";
import { UnreadMessagesProvider } from "@/providers/UnreadMessagesProvider";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex lg:w-72 xl:w-80 shrink-0 flex-col border-r border-sidebar-border">
        <Sidebar />
      </aside>

      <UnreadMessagesProvider>
        {/* Main content area */}
        <div className="flex flex-col flex-1 overflow-hidden">
          <Navbar />
          <main className="flex-1 overflow-y-auto">
            <div className="page-container py-10">
              {children}
            </div>
          </main>
        </div>

        {/* Global Elements */}
        <Suspense fallback={null}>
          <FloatingChat />
          <VerificationToast />
        </Suspense>
      </UnreadMessagesProvider>
    </div>
  );
}
