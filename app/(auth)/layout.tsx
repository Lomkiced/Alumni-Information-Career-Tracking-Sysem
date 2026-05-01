import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { default: "Sign In | AICTS PCLU", template: "%s | AICTS PCLU" },
  description: "Sign in to the Alumni Information Career Tracking System of Polytechnic College of La Union.",
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pclu-navy-950 via-pclu-navy-900 to-pclu-sky-950 relative overflow-hidden">
      {/* Background bokeh circles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-pclu-sky-500/10 blur-3xl animate-pulse" />
        <div className="absolute top-1/2 -right-40 w-80 h-80 rounded-full bg-pclu-navy-400/15 blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute -bottom-20 left-1/3 w-72 h-72 rounded-full bg-pclu-sky-600/10 blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />
      </div>
      <div className="relative z-10 min-h-screen flex">
        {children}
      </div>
    </div>
  );
}
