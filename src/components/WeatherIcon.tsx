import React from "react";
import {
  Sun,
  CloudSun,
  Cloud,
  CloudFog,
  CloudDrizzle,
  CloudRain,
  CloudSnow,
  CloudLightning,
} from "lucide-react";

interface WeatherIconProps {
  iconName: "Sun" | "CloudSun" | "Cloud" | "CloudFog" | "CloudDrizzle" | "CloudRain" | "CloudSnow" | "CloudLightning";
  className?: string;
}

export default function WeatherIcon({ iconName, className = "w-8 h-8" }: WeatherIconProps) {
  switch (iconName) {
    case "Sun":
      return <Sun className={`${className} text-amber-400`} />;
    case "CloudSun":
      return <CloudSun className={`${className} text-amber-300`} />;
    case "Cloud":
      return <Cloud className={`${className} text-slate-300`} />;
    case "CloudFog":
      return <CloudFog className={`${className} text-teal-300`} />;
    case "CloudDrizzle":
      return <CloudDrizzle className={`${className} text-cyan-300`} />;
    case "CloudRain":
      return <CloudRain className={`${className} text-blue-400`} />;
    case "CloudSnow":
      return <CloudSnow className={`${className} text-sky-200`} />;
    case "CloudLightning":
      return <CloudLightning className={`${className} text-purple-400`} />;
    default:
      return <Sun className={`${className} text-amber-400`} />;
  }
}
