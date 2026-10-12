import React from "react";

interface WeatherMetricCardProps {
  title: string;
  value: string | number;
  unit?: string;
  subtitle?: string;
  icon: React.ReactNode;
  gradient?: string;
  badge?: string;
  progressPercent?: number;
}

export default function WeatherMetricCard({
  title,
  value,
  unit,
  subtitle,
  icon,
  gradient = "from-cyan-500/10 to-blue-500/5",
  badge,
  progressPercent,
}: WeatherMetricCardProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${gradient} border border-slate-800/80 p-5 shadow-lg backdrop-blur-md transition-all duration-300 hover:border-slate-700 hover:translate-y-[-2px]`}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          {title}
        </span>
        <div className="p-2 rounded-xl bg-slate-900/80 border border-slate-800 text-cyan-400 shadow-inner">
          {icon}
        </div>
      </div>

      <div className="flex items-baseline gap-1.5 mb-1">
        <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          {value}
        </span>
        {unit && <span className="text-sm font-semibold text-slate-400">{unit}</span>}
      </div>

      {subtitle && <p className="text-xs text-slate-400 leading-relaxed">{subtitle}</p>}

      {badge && (
        <div className="mt-3">
          <span className="inline-block px-2.5 py-1 text-[11px] font-semibold rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
            {badge}
          </span>
        </div>
      )}

      {typeof progressPercent === "number" && (
        <div className="mt-3">
          <div className="w-full bg-slate-800/80 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-gradient-to-r from-cyan-400 to-blue-500 h-1.5 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, Math.max(0, progressPercent))}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
