import { Metadata } from "next";
import Link from "next/link";
import {
  CloudSun,
  ShieldCheck,
  Zap,
  Globe2,
  Code2,
  Cpu,
  Layers,
  Thermometer,
  Clock,
  Droplets,
  Wind,
  ExternalLink,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | SkyCast Weather App",
  description:
    "Learn about SkyCast Weather App, our technical architecture, Open-Meteo API integration, and features.",
};

export default function AboutPage() {
  return (
    <div className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-16">
      {/* Hero Header */}
      <div className="relative text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>About SkyCast Weather App</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight leading-tight">
          Modern Weather Telemetry for Everyone
        </h1>
        <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
          SkyCast is a high-performance weather application built with <span className="text-cyan-300 font-semibold">Next.js</span>, styled using <span className="text-cyan-300 font-semibold">Tailwind CSS</span>, and powered by the global <span className="text-cyan-300 font-semibold">Open-Meteo Free Weather API</span>.
        </p>
      </div>

      {/* Mission & Overview Card */}
      <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900/80 to-blue-950/30 border border-slate-800 p-8 sm:p-12 shadow-2xl relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold">
              <Cpu className="w-3.5 h-3.5" />
              <span>Project Mission</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Transparent, Accessible Weather Insights Without Friction
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Traditional weather applications frequently suffer from intrusive advertisements, restrictive paywalls, and heavy tracking. SkyCast was created to demonstrate how modern web technologies can deliver instantaneous weather telemetry through clean, open APIs.
            </p>
            <p className="text-slate-400 text-sm leading-relaxed">
              Every temperature reading, relative humidity level, observation timestamp, and wind measurement is fetched directly from real-time meteorological models with zero synthetic artificial delays.
            </p>
            <div className="pt-2">
              <Link
                href="/services"
                className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-400 hover:text-cyan-300 group"
              >
                <span>Explore all weather services & features</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <Thermometer className="w-6 h-6 text-amber-400" />
              <div className="text-2xl font-black text-white">100% Free</div>
              <p className="text-xs text-slate-400">No subscription or API key required</p>
            </div>
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <Clock className="w-6 h-6 text-cyan-400" />
              <div className="text-2xl font-black text-white">15 Min</div>
              <p className="text-xs text-slate-400">900s interval live forecast refresh</p>
            </div>
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <Globe2 className="w-6 h-6 text-blue-400" />
              <div className="text-2xl font-black text-white">Global</div>
              <p className="text-xs text-slate-400">Worldwide city geocoding support</p>
            </div>
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <Zap className="w-6 h-6 text-emerald-400" />
              <div className="text-2xl font-black text-white">&lt; 100ms</div>
              <p className="text-xs text-slate-400">Fast Turbopack & edge rendering</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tech Stack Breakdown */}
      <div className="space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Technology Stack</h2>
          <p className="text-sm text-slate-400">
            Constructed with industry-standard, modern web development libraries and tools.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3 hover:border-slate-700 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center text-white">
              <Code2 className="w-6 h-6 text-cyan-400" />
            </div>
            <h3 className="font-bold text-white text-lg">Next.js 16</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Utilizing React 19, modern App Router, Server and Client Components, fast Turbopack bundling, and optimized routing.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3 hover:border-slate-700 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center text-white">
              <Layers className="w-6 h-6 text-sky-400" />
            </div>
            <h3 className="font-bold text-white text-lg">Tailwind CSS</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Tailwind CSS engine delivering responsive grid systems, flex layouts, dark atmospheric palette, and smooth micro-animations.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3 hover:border-slate-700 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center text-white">
              <Globe2 className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="font-bold text-white text-lg">Open-Meteo API</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Open-source weather and geocoding API combining national weather service models (DWD, NOAA, ECMWF) into unified JSON endpoints.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3 hover:border-slate-700 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center text-white">
              <ShieldCheck className="w-6 h-6 text-emerald-400" />
            </div>
            <h3 className="font-bold text-white text-lg">TypeScript</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Strict end-to-end typing for weather payloads, coordinates, geocoding results, and component props to guarantee reliability.
            </p>
          </div>
        </div>
      </div>

      {/* Required Weather Metrics Information */}
      <div className="p-8 sm:p-10 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-8">
        <div>
          <h2 className="text-2xl font-extrabold text-white">Required Metrics Handled</h2>
          <p className="text-sm text-slate-400 mt-1">
            How each mandatory assignment metric is processed and displayed:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="flex gap-4 items-start p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
            <Thermometer className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-bold text-white">Temperature (temperature_2m)</h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Measured at 2 meters above ground level. Includes toggle between Celsius (°C) and Fahrenheit (°F) with feels-like calculation.
              </p>
            </div>
          </div>

          <div className="flex gap-4 items-start p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
            <Clock className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-bold text-white">Time (time)</h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Observation timestamp presented in ISO 8601 as well as localized human-readable time format based on the selected city timezone.
              </p>
            </div>
          </div>

          <div className="flex gap-4 items-start p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
            <Zap className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-bold text-white">Interval (interval)</h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Data update interval provided directly by Open-Meteo in seconds (e.g. 900 seconds = 15 minutes update cadence).
              </p>
            </div>
          </div>

          <div className="flex gap-4 items-start p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
            <Droplets className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-bold text-white">Humidity (relative_humidity_2m)</h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Relative moisture content of the atmosphere expressed in percentage with dynamic comfort index evaluations.
              </p>
            </div>
          </div>

          <div className="flex gap-4 items-start p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
            <Wind className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-bold text-white">Wind Speed (wind_speed_10m)</h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Wind speed in km/h recorded at 10 meters height, mapped with Beaufort wind scale classifications and wind direction angles.
              </p>
            </div>
          </div>

          <div className="flex gap-4 items-start p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
            <CloudSun className="w-5 h-5 text-teal-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-bold text-white">WMO Weather Codes</h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Standard World Meteorological Organization numerical codes mapped directly to intuitive conditions and dynamic Lucide icons.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* External Attribution & Action Card */}
      <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
        <div>
          <h3 className="text-lg font-bold text-white">Learn More About Open-Meteo</h3>
          <p className="text-xs text-slate-400 mt-1 max-w-lg">
            Open-Meteo provides open-source weather data for non-commercial and research applications.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="https://open-meteo.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs transition-colors"
          >
            <span>Open-Meteo Docs</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs transition-colors"
          >
            <span>Check Weather Now</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
