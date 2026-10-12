import Link from "next/link";
import { ArrowRight, ShieldCheck, Zap, CloudLightning, Activity, Globe2, Radio } from "lucide-react";

export default function HomeAboutSection() {
  return (
    <section className="mt-16 sm:mt-24 pt-12 border-t border-slate-800/80">
      <div className="rounded-3xl bg-gradient-to-br from-slate-900/90 via-slate-900/60 to-slate-950 border border-slate-800 p-8 sm:p-12 shadow-2xl relative overflow-hidden">
        {/* Ambient Gradient glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span>About SkyCast Weather Application</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Accurate, Real-Time Weather Intelligence Powered by Open-Meteo
          </h2>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-3xl mx-auto">
            SkyCast is an advanced weather forecasting platform designed and engineered with Next.js and Tailwind CSS. We stream hyper-local meteorological telemetry straight from the global Open-Meteo API without requiring commercial paywalls or rate limits.
          </p>

          {/* Highlights 3-Card Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 text-left">
            <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-base">Real-time Telemetry</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Direct feed of current temperature, humidity levels, wind velocities, and calibrated 900-second update intervals.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400">
                <Globe2 className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-base">Global Geocoding</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Search any village, town, or metropolis across the globe with instantaneous latitude and longitude coordinate resolution.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-base">Open & Free Data</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Built on Open-Meteo open-source weather models ensuring complete data transparency with zero API keys needed.
              </p>
            </div>
          </div>

          {/* Call to action button to learn more */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/about"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-sm shadow-lg shadow-cyan-500/20 transition-all hover:scale-105"
            >
              <span>Explore Complete About Page</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white font-semibold text-sm transition-all"
            >
              <span>View Weather Services</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
