export interface WeatherConditionInfo {
  label: string;
  description: string;
  iconName: "Sun" | "CloudSun" | "Cloud" | "CloudFog" | "CloudDrizzle" | "CloudRain" | "CloudSnow" | "CloudLightning";
  colorClass: string;
  badgeClass: string;
}

export function getWeatherCondition(code: number, isDay = 1): WeatherConditionInfo {
  switch (code) {
    case 0:
      return {
        label: isDay ? "Clear Sky" : "Clear Night",
        description: isDay ? "Sunny and clear weather" : "Clear starlit skies",
        iconName: isDay ? "Sun" : "CloudSun",
        colorClass: "from-amber-400 to-orange-500",
        badgeClass: "bg-amber-500/20 text-amber-300 border-amber-500/30",
      };
    case 1:
      return {
        label: "Mainly Clear",
        description: "Mostly sunny with slight clouds",
        iconName: "Sun",
        colorClass: "from-amber-400 to-sky-400",
        badgeClass: "bg-sky-500/20 text-sky-300 border-sky-500/30",
      };
    case 2:
      return {
        label: "Partly Cloudy",
        description: "Scattered clouds with periodic sun",
        iconName: "CloudSun",
        colorClass: "from-sky-400 to-blue-500",
        badgeClass: "bg-blue-500/20 text-blue-300 border-blue-500/30",
      };
    case 3:
      return {
        label: "Overcast",
        description: "Thick cloud cover blanket",
        iconName: "Cloud",
        colorClass: "from-slate-400 to-slate-600",
        badgeClass: "bg-slate-500/20 text-slate-300 border-slate-500/30",
      };
    case 45:
    case 48:
      return {
        label: "Foggy",
        description: "Reduced visibility with dense fog",
        iconName: "CloudFog",
        colorClass: "from-slate-300 to-teal-600",
        badgeClass: "bg-teal-500/20 text-teal-300 border-teal-500/30",
      };
    case 51:
    case 53:
    case 55:
      return {
        label: "Drizzle",
        description: "Light mist and gentle precipitation",
        iconName: "CloudDrizzle",
        colorClass: "from-teal-400 to-cyan-600",
        badgeClass: "bg-teal-500/20 text-teal-300 border-teal-500/30",
      };
    case 56:
    case 57:
      return {
        label: "Freezing Drizzle",
        description: "Icy drizzle with freezing temperatures",
        iconName: "CloudSnow",
        colorClass: "from-cyan-400 to-blue-600",
        badgeClass: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
      };
    case 61:
    case 63:
    case 65:
      return {
        label: "Rain",
        description: "Continuous rainfall with wet conditions",
        iconName: "CloudRain",
        colorClass: "from-blue-500 to-indigo-600",
        badgeClass: "bg-blue-500/20 text-blue-300 border-blue-500/30",
      };
    case 66:
    case 67:
      return {
        label: "Freezing Rain",
        description: "Cold rain forming ice glaze",
        iconName: "CloudSnow",
        colorClass: "from-indigo-400 to-blue-700",
        badgeClass: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
      };
    case 71:
    case 73:
    case 75:
    case 77:
      return {
        label: "Snowfall",
        description: "Snowflakes and frosty conditions",
        iconName: "CloudSnow",
        colorClass: "from-blue-200 to-indigo-400",
        badgeClass: "bg-indigo-400/20 text-indigo-200 border-indigo-400/30",
      };
    case 80:
    case 81:
    case 82:
      return {
        label: "Rain Showers",
        description: "Sudden bursts of heavy rainfall",
        iconName: "CloudRain",
        colorClass: "from-sky-500 to-blue-700",
        badgeClass: "bg-sky-500/20 text-sky-300 border-sky-500/30",
      };
    case 85:
    case 86:
      return {
        label: "Snow Showers",
        description: "Intermittent bursts of snowfall",
        iconName: "CloudSnow",
        colorClass: "from-sky-300 to-blue-500",
        badgeClass: "bg-sky-400/20 text-sky-200 border-sky-400/30",
      };
    case 95:
      return {
        label: "Thunderstorm",
        description: "Lightning strikes and rumbling thunder",
        iconName: "CloudLightning",
        colorClass: "from-purple-500 to-indigo-800",
        badgeClass: "bg-purple-500/20 text-purple-300 border-purple-500/30",
      };
    case 96:
    case 99:
      return {
        label: "Thunderstorm with Hail",
        description: "Severe electrical storm with hail pellets",
        iconName: "CloudLightning",
        colorClass: "from-rose-500 to-purple-900",
        badgeClass: "bg-rose-500/20 text-rose-300 border-rose-500/30",
      };
    default:
      return {
        label: "Clear",
        description: "Pleasant weather conditions",
        iconName: "Sun",
        colorClass: "from-blue-400 to-indigo-500",
        badgeClass: "bg-blue-500/20 text-blue-300 border-blue-500/30",
      };
  }
}

export function formatInterval(seconds: number): string {
  if (!seconds || seconds <= 0) return "Real-time";
  if (seconds >= 3600) {
    const hours = (seconds / 3600).toFixed(1);
    return `${hours.endsWith(".0") ? hours.slice(0, -2) : hours} hour${seconds >= 7200 ? "s" : ""}`;
  }
  const mins = Math.round(seconds / 60);
  return `${mins} minute${mins !== 1 ? "s" : ""} (${seconds}s)`;
}

export function formatTimeString(isoString: string): string {
  if (!isoString) return "--:--";
  try {
    const date = new Date(isoString);
    if (isNaN(date.getTime())) return isoString;
    return date.toLocaleString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return isoString;
  }
}

export function formatShortHour(isoString: string): string {
  if (!isoString) return "";
  try {
    const date = new Date(isoString);
    if (isNaN(date.getTime())) return isoString.slice(11, 16);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      hour12: true,
    });
  } catch {
    return isoString.slice(11, 16);
  }
}

export function formatDayName(isoString: string): string {
  if (!isoString) return "";
  try {
    const date = new Date(isoString);
    if (isNaN(date.getTime())) return isoString;
    const today = new Date();
    if (date.toDateString() === today.toDateString()) {
      return "Today";
    }
    return date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
  } catch {
    return isoString;
  }
}

export function celsiusToFahrenheit(celsius: number): number {
  return (celsius * 9) / 5 + 32;
}

export function getWindDescription(speedKmh: number): string {
  if (speedKmh < 2) return "Calm";
  if (speedKmh < 12) return "Light Breeze";
  if (speedKmh < 29) return "Moderate Breeze";
  if (speedKmh < 50) return "Strong Wind";
  if (speedKmh < 75) return "High Wind / Gale";
  return "Storm / Severe";
}

export function getHumidityDescription(humidity: number): string {
  if (humidity < 30) return "Dry & Crisp";
  if (humidity < 60) return "Optimal Comfort";
  if (humidity < 80) return "Humid";
  return "Very Muggy";
}
