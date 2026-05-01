"use client";
// app/(dashboard)/layout.tsx
import { Sidebar } from "@/components/shared/Sidebar";
import { Navbar } from "@/components/shared/Navbar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex lg:w-60 xl:w-64 shrink-0 flex-col border-r border-sidebar-border">
        <Sidebar />
      </aside>

      {/* Main content area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto">
          <div className="page-container py-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
