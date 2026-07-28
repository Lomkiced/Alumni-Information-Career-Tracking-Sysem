import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { default: "Sign In | AICTS PCLU", template: "%s | AICTS PCLU" },
  description: "Alumni Information Career Tracking System, for Polytechnic College of La Union",
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen w-full relative overflow-hidden bg-pclu-navy-900">
      {/* ── Immersive Background ─────────────────────── */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-pclu-navy-900 via-pclu-sky-900 to-pclu-sky-700 opacity-90" />
        {/* Animated Glow Blobs */}
        <div className="absolute top-[-15%] left-[-10%] w-[500px] h-[500px] bg-pclu-sky-400 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 animate-pulse duration-1000" />
        <div className="absolute bottom-[-10%] right-[10%] w-[600px] h-[600px] bg-pclu-sky-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 animate-pulse duration-1000 delay-500" />
        <div className="absolute top-[20%] right-[-10%] w-[400px] h-[400px] bg-pclu-navy-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-50 animate-pulse duration-1000 delay-700" />
      </div>

      {/* ── Main Content Container ─────────────────────── */}
      <div className="relative z-10 flex flex-col lg:flex-row w-full max-w-7xl mx-auto items-center justify-center lg:justify-between p-6 sm:p-12 gap-12 lg:gap-8 min-h-screen">
        
        {/* ── Left Typography Panel ─────────────────────── */}
        <div className="w-full lg:w-3/5 flex flex-col text-center lg:text-left mt-12 lg:mt-0 lg:pr-8">
           {/* Logo */}
           <div className="flex justify-center lg:justify-start mb-8 lg:mb-12">
              <img src="/logo.png" alt="Polytechnic College of La Union" className="w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 object-contain drop-shadow-2xl" />
           </div>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl xl:text-[5rem] font-bold text-white leading-[1.1] tracking-tight drop-shadow-2xl">
            Alumni Information<br className="hidden lg:block" /> Career Tracking System
          </h1>
          <h2 className="mt-8 text-lg sm:text-xl lg:text-3xl font-medium text-pclu-sky-100 tracking-wide drop-shadow-md border-t-2 border-pclu-sky-400/40 pt-6 inline-block lg:block mx-auto lg:mx-0 max-w-fit">
            for Polytechnic College of La Union
          </h2>
        </div>

        {/* ── Right Content Panel (Forms) ─────────────────────────────────────────── */}
        <div className="w-full lg:w-2/5 flex items-center justify-center">
          <div className="w-full max-w-md relative">
            {/* Ambient glow behind card */}
            <div className="absolute -inset-1 rounded-[2rem] bg-gradient-to-br from-pclu-sky-400/40 to-pclu-sky-700/40 blur-2xl opacity-60" />
            
            {/* Glassmorphism Card */}
            <div className="relative glass rounded-3xl p-8 sm:p-10 shadow-[0_8px_32px_rgba(0,0,0,0.5)] border border-white/10 bg-white/5 backdrop-blur-xl">
              {children}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
