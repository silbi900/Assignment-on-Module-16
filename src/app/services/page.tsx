import { Metadata } from "next";
import Link from "next/link";
import {
  Thermometer,
  Wind,
  Droplets,
  Calendar,
  Compass,
  Bell,
  Sprout,
  Plane,
  Database,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Clock,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Weather Services & Capabilities | SkyCast Weather App",
  description:
    "Explore SkyCast's comprehensive weather forecasting services, telemetry metrics, and meteorological features.",
};

const SERVICES = [
  {
    id: "telemetry",
    title: "Real-Time Telemetry & Instant Refresh",
    description:
      "Get up-to-the-minute atmospheric conditions including live 2m surface temperature, relative humidity, wind speed, and observation interval (900 seconds cadence).",
    icon: <Thermometer className="w-6 h-6 text-amber-400" />,
    badge: "Core Service",
    gradient: "from-amber-500/10 via-orange-500/5 to-slate-900/60",
    features: [
      "Sub-second response times from Open-Meteo edge servers",
      "Dynamic Celsius and Fahrenheit unit conversion",
      "Observation timestamp tracking in local and UTC time",
      "900-second interval refresh synchronization",
    ],
  },
  {
    id: "forecast",
    title: "24-Hour & 7-Day Precision Forecasting",
    description:
      "Plan your daily schedules and upcoming week with confidence using meteorological multi-model ensemble forecasts and daily high/low envelopes.",
    icon: <Calendar className="w-6 h-6 text-cyan-400" />,
    badge: "Predictions",
    gradient: "from-cyan-500/10 via-blue-500/5 to-slate-900/60",
    features: [
      "Hourly temperature curves for the next 24 hours",
      "7-day daily maximum and minimum temperature projections",
      "Precipitation probability percentages and rain likelihood",
      "Sunrise and sunset solar cycle calculations",
    ],
  },
  {
    id: "wind-marine",
    title: "Wind Velocity & Aerodynamic Monitoring",
    description:
      "Evaluate wind velocity measured at 10 meters above ground level, complete with direction degrees, Beaufort wind scale classifications, and gust risk assessments.",
    icon: <Wind className="w-6 h-6 text-emerald-400" />,
    badge: "Aviation & Marine",
    gradient: "from-emerald-500/10 via-teal-500/5 to-slate-900/60",
    features: [
      "Wind speed in km/h with Beaufort scale description",
      "Compass direction degrees (0° - 360°)",
      "Essential for outdoor aviation, drone flights, and marine sports",
      "Gale and severe wind threshold indicators",
    ],
  },
  {
    id: "humidity-comfort",
    title: "Atmospheric Humidity & Comfort Index",
    description:
      "Monitor relative moisture in the air to understand perceived temperature, dew point effects, and human comfort zones from dry to humid.",
    icon: <Droplets className="w-6 h-6 text-blue-400" />,
    badge: "Health & Comfort",
    gradient: "from-blue-500/10 via-indigo-500/5 to-slate-900/60",
    features: [
      "Relative humidity percentage (0 - 100%)",
      "Heat index / 'Feels Like' apparent temperature analysis",
      "Indoor air quality & dehumidifier advisory",
      "Respiratory and outdoor workout recommendations",
    ],
  },
  {
    id: "geocoding",
    title: "Global Geocoding & City Search",
    description:
      "Search any inhabited location or city across the world with instantaneous latitude and longitude coordinate resolution and timezone detection.",
    icon: <Compass className="w-6 h-6 text-purple-400" />,
    badge: "Global Navigation",
    gradient: "from-purple-500/10 via-pink-500/5 to-slate-900/60",
    features: [
      "Fast geocoding covering millions of cities worldwide",
      "Browser GPS geolocation for one-click 'My Location' weather",
      "Pre-configured quick chips for major metropolitan hubs",
      "Timezone-adjusted local clock visualization",
    ],
  },
  {
    id: "agriculture",
    title: "Agro-Meteorological & Outdoor Insights",
    description:
      "Empowering agricultural planning, irrigation management, and field crop operations with precipitation forecasts and moisture tracking.",
    icon: <Sprout className="w-6 h-6 text-lime-400" />,
    badge: "Agriculture",
    gradient: "from-lime-500/10 via-emerald-500/5 to-slate-900/60",
    features: [
      "Precipitation probability and rain shower alerts",
      "Optimal harvest and pesticide application windows",
      "Frost and freezing drizzle risk warnings",
      "Soil moisture and surface evaporation compatibility",
    ],
  },
];

export default function ServicesPage() {
  return (
    <div className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-16">
      {/* Header */}
      <div className="relative text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Weather Features & Services</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight leading-tight">
          Comprehensive Weather Solutions & Telemetry
        </h1>
        <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
          Discover all the meteorological tools and weather-related features packaged into SkyCast. From instant live readings to 7-day outlooks, everything you need is ready at your fingertips.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {SERVICES.map((service) => (
          <div
            key={service.id}
            className={`p-7 rounded-3xl bg-gradient-to-br ${service.gradient} border border-slate-800/80 shadow-xl backdrop-blur-md flex flex-col justify-between hover:border-slate-700 transition-all duration-300 hover:translate-y-[-4px]`}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-inner">
                  {service.icon}
                </div>
                <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-800/80 border border-slate-700 text-slate-300">
                  {service.badge}
                </span>
              </div>

              <h2 className="text-xl font-bold text-white tracking-tight leading-snug">
                {service.title}
              </h2>

              <p className="text-slate-400 text-xs leading-relaxed">
                {service.description}
              </p>

              <div className="pt-2 border-t border-slate-800/70 space-y-2">
                {service.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-800/50">
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 group"
              >
                <span>Test in Live Weather Dashboard</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Service Metrics Summary Banner */}
      <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-cyan-950/60 via-slate-900 to-blue-950/60 border border-slate-800 relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
              High Availability Weather Engine
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Ready to Check Your City&apos;s Forecast?
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              SkyCast provides instantaneous meteorological reporting for thousands of global locations. Search your hometown or let your browser GPS find your current coordinates with one click.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm transition-all shadow-lg shadow-cyan-500/25"
              >
                <span>Launch Weather App</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white font-semibold text-sm transition-all"
              >
                <span>Request Custom Weather Features</span>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-1">
              <div className="text-xs text-slate-400 font-medium">Update Interval</div>
              <div className="text-2xl font-black text-cyan-400">900 sec</div>
              <p className="text-[11px] text-slate-400">15-minute refresh cycles</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-1">
              <div className="text-xs text-slate-400 font-medium">Forecast Horizon</div>
              <div className="text-2xl font-black text-white">7 Days</div>
              <p className="text-[11px] text-slate-400">Daily high & low envelope</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-1">
              <div className="text-xs text-slate-400 font-medium">Hourly Granularity</div>
              <div className="text-2xl font-black text-emerald-400">24 Hours</div>
              <p className="text-[11px] text-slate-400">Continuous temperature curve</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-1">
              <div className="text-xs text-slate-400 font-medium">Cost to Access</div>
              <div className="text-2xl font-black text-amber-400">Free</div>
              <p className="text-[11px] text-slate-400">Zero keys or credit card</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
