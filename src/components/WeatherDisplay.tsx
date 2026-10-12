"use client";

import { useEffect, useState, useCallback, useTransition } from "react";
import {
  Search,
  MapPin,
  RefreshCw,
  Thermometer,
  Clock,
  Timer,
  Droplets,
  Wind,
  Navigation,
  Compass,
  Sunrise,
  Sunset,
  AlertCircle,
  Loader2,
  Calendar,
} from "lucide-react";
import { CityOption, OpenMeteoWeatherResponse } from "@/types/weather";
import { DEFAULT_CITIES, fetchWeather, searchCities } from "@/services/weatherApi";
import {
  celsiusToFahrenheit,
  formatInterval,
  formatTimeString,
  formatShortHour,
  formatDayName,
  getHumidityDescription,
  getWeatherCondition,
  getWindDescription,
} from "@/lib/weatherUtils";
import WeatherIcon from "./WeatherIcon";
import WeatherMetricCard from "./WeatherMetricCard";

export default function WeatherDisplay() {
  const [selectedCity, setSelectedCity] = useState<CityOption>(DEFAULT_CITIES[0]);
  const [weatherData, setWeatherData] = useState<OpenMeteoWeatherResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [unit, setUnit] = useState<"C" | "F">("C");
  const [isPending, startTransition] = useTransition();

  // Search state
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<CityOption[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [geoLocating, setGeoLocating] = useState(false);

  const loadWeather = useCallback(async (city: CityOption) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchWeather(city.latitude, city.longitude);
      setWeatherData(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to load weather data");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadWeather(selectedCity);
  }, [selectedCity, loadWeather]);

  // Handle Search input change with debounce
  useEffect(() => {
    if (searchQuery.trim().length < 2) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    const timer = setTimeout(async () => {
      setIsSearching(true);
      try {
        const results = await searchCities(searchQuery);
        setSearchResults(results);
        setIsSearchOpen(true);
      } catch {
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    }, 350);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleSelectCity = (city: CityOption) => {
    startTransition(() => {
      setSelectedCity(city);
      setSearchQuery("");
      setIsSearchOpen(false);
      setSearchResults([]);
    });
  };

  const handleGeolocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }
    setGeoLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userCity: CityOption = {
          name: "My Location",
          country: "GPS Coordinates",
          latitude: Number(position.coords.latitude.toFixed(4)),
          longitude: Number(position.coords.longitude.toFixed(4)),
          admin1: "Current Position",
        };
        setSelectedCity(userCity);
        setGeoLocating(false);
      },
      (geoError) => {
        alert(`Location permission denied or unavailable: ${geoError.message}`);
        setGeoLocating(false);
      }
    );
  };

  const formatTemp = (celsius: number) => {
    if (unit === "F") {
      return `${Math.round(celsiusToFahrenheit(celsius))}°F`;
    }
    return `${Math.round(celsius)}°C`;
  };

  const current = weatherData?.current;
  const currentUnits = weatherData?.current_units;
  const condition = current ? getWeatherCondition(current.weather_code, current.is_day) : null;
  const daily = weatherData?.daily;
  const hourly = weatherData?.hourly;

  return (
    <section className="w-full">
      {/* Top Search & Filter Bar */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          {/* Search Input with dropdown */}
          <div className="relative flex-1 max-w-2xl">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                id="city-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => {
                  if (searchResults.length > 0) setIsSearchOpen(true);
                }}
                placeholder="Search city anywhere in the world (e.g. Dhaka, Sylhet, London, Tokyo)..."
                className="w-full pl-12 pr-12 py-3.5 rounded-2xl bg-slate-900/90 border border-slate-700/80 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all text-sm shadow-inner"
              />
              {isSearching ? (
                <Loader2 className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-cyan-400 animate-spin" />
              ) : (
                searchQuery && (
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setIsSearchOpen(false);
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
                  >
                    Clear
                  </button>
                )
              )}
            </div>

            {/* Dropdown Results */}
            {isSearchOpen && searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl z-40 overflow-hidden divide-y divide-slate-800">
                {searchResults.map((city, idx) => (
                  <button
                    key={`${city.name}-${city.latitude}-${idx}`}
                    onClick={() => handleSelectCity(city)}
                    className="w-full text-left px-4 py-3 hover:bg-slate-800/80 transition-colors flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <MapPin className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                      <div>
                        <span className="font-semibold text-white text-sm">{city.name}</span>
                        {city.admin1 && (
                          <span className="text-xs text-slate-400 ml-1.5 font-normal">
                            ({city.admin1})
                          </span>
                        )}
                        <p className="text-xs text-slate-400">{city.country}</p>
                      </div>
                    </div>
                    <span className="text-[11px] font-mono text-slate-400">
                      {city.latitude.toFixed(2)}°, {city.longitude.toFixed(2)}°
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Action buttons: GPS, Unit Toggle, Refresh */}
          <div className="flex items-center gap-2.5 self-end lg:self-auto">
            {/* Geolocation Button */}
            <button
              onClick={handleGeolocation}
              disabled={geoLocating}
              className="flex items-center gap-2 px-3.5 py-3 rounded-2xl bg-slate-900 border border-slate-700/80 text-slate-200 hover:text-white hover:border-cyan-500/50 hover:bg-slate-800 transition-all text-xs font-semibold shadow-md disabled:opacity-50"
              title="Use current GPS location"
            >
              <Navigation
                className={`w-4 h-4 text-cyan-400 ${geoLocating ? "animate-spin" : ""}`}
              />
              <span className="hidden sm:inline">My Location</span>
            </button>

            {/* Unit Switcher */}
            <div className="flex items-center bg-slate-900 border border-slate-700/80 rounded-2xl p-1 shadow-inner">
              <button
                onClick={() => setUnit("C")}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  unit === "C"
                    ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                °C
              </button>
              <button
                onClick={() => setUnit("F")}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  unit === "F"
                    ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                °F
              </button>
            </div>

            {/* Refresh Button */}
            <button
              onClick={() => loadWeather(selectedCity)}
              disabled={loading}
              className="p-3 rounded-2xl bg-slate-900 border border-slate-700/80 text-slate-300 hover:text-white hover:border-cyan-500/50 hover:bg-slate-800 transition-all text-xs font-semibold shadow-md disabled:opacity-50"
              title="Refresh weather data"
            >
              <RefreshCw className={`w-4 h-4 text-cyan-400 ${loading ? "animate-spin" : ""}`} />
            </button>
          </div>
        </div>

        {/* Popular City Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none text-xs">
          <span className="text-slate-400 font-medium whitespace-nowrap flex items-center gap-1">
            <Compass className="w-3.5 h-3.5 text-cyan-400" /> Popular:
          </span>
          {DEFAULT_CITIES.map((city) => {
            const isSelected = selectedCity.name === city.name;
            return (
              <button
                key={city.name}
                onClick={() => handleSelectCity(city)}
                className={`px-3.5 py-1.5 rounded-full whitespace-nowrap font-medium transition-all duration-200 border ${
                  isSelected
                    ? "bg-cyan-500/20 text-cyan-300 border-cyan-400 shadow-sm shadow-cyan-500/20"
                    : "bg-slate-900/60 text-slate-400 border-slate-800 hover:text-white hover:border-slate-700"
                }`}
              >
                {city.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Error Banner */}
      {error && (
        <div className="mb-8 p-4 rounded-2xl bg-rose-950/60 border border-rose-800 text-rose-200 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-rose-400 flex-shrink-0" />
            <p className="text-sm">{error}</p>
          </div>
          <button
            onClick={() => loadWeather(selectedCity)}
            className="px-4 py-1.5 rounded-xl bg-rose-800 hover:bg-rose-700 text-white text-xs font-semibold"
          >
            Retry
          </button>
        </div>
      )}

      {/* Main Weather Content */}
      {loading && !weatherData ? (
        <div className="space-y-6 animate-pulse">
          <div className="h-64 rounded-3xl bg-slate-800/40 border border-slate-800" />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-36 rounded-2xl bg-slate-800/40 border border-slate-800" />
            ))}
          </div>
        </div>
      ) : weatherData && current && condition ? (
        <div className="space-y-8">
          {/* Main Weather Hero Card */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900/90 via-slate-900/70 to-blue-950/40 border border-slate-800 p-6 sm:p-8 lg:p-10 shadow-2xl backdrop-blur-xl">
            {/* Ambient Background Glow */}
            <div className="absolute top-0 right-0 -mt-16 -mr-16 w-80 h-80 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-80 h-80 rounded-full bg-blue-600/10 blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
              {/* Left Details */}
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-xs font-semibold">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>
                      {selectedCity.name}
                      {selectedCity.country ? `, ${selectedCity.country}` : ""}
                    </span>
                  </span>
                  <span className="px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-slate-300 text-xs font-mono">
                    {weatherData.latitude.toFixed(2)}°N, {weatherData.longitude.toFixed(2)}°E
                  </span>
                  <span className={`px-3 py-1 rounded-full border text-xs font-semibold ${condition.badgeClass}`}>
                    {condition.label}
                  </span>
                </div>

                <div className="flex items-baseline gap-4 pt-1">
                  <h1 className="text-5xl sm:text-7xl font-black text-white tracking-tighter">
                    {formatTemp(current.temperature_2m)}
                  </h1>
                  {typeof current.apparent_temperature === "number" && (
                    <div className="text-slate-400 text-sm sm:text-base font-medium">
                      Feels like{" "}
                      <span className="text-slate-200 font-bold">
                        {formatTemp(current.apparent_temperature)}
                      </span>
                    </div>
                  )}
                </div>

                <p className="text-slate-300 text-sm sm:text-base max-w-lg leading-relaxed">
                  {condition.description} in {selectedCity.name}. Updated from Open-Meteo with an observation interval of{" "}
                  <span className="font-semibold text-cyan-300">
                    {formatInterval(current.interval)}
                  </span>
                  .
                </p>

                {/* Sun Timings & Elevation */}
                {daily?.sunrise && daily?.sunset && (
                  <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-400">
                    <div className="flex items-center gap-1.5">
                      <Sunrise className="w-4 h-4 text-amber-400" />
                      <span>Sunrise: {daily.sunrise[0]?.slice(11, 16) || "--:--"}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Sunset className="w-4 h-4 text-orange-400" />
                      <span>Sunset: {daily.sunset[0]?.slice(11, 16) || "--:--"}</span>
                    </div>
                    {daily.temperature_2m_max?.[0] && daily.temperature_2m_min?.[0] && (
                      <div className="flex items-center gap-1.5">
                        <Thermometer className="w-4 h-4 text-cyan-400" />
                        <span>
                          High: {formatTemp(daily.temperature_2m_max[0])} / Low:{" "}
                          {formatTemp(daily.temperature_2m_min[0])}
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Right Big Weather Icon Card */}
              <div className="flex flex-col items-center justify-center p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800 shadow-inner lg:min-w-[220px]">
                <div className="p-4 rounded-3xl bg-gradient-to-br from-slate-800/80 to-slate-900 border border-slate-700/60 shadow-xl mb-3">
                  <WeatherIcon iconName={condition.iconName} className="w-16 h-16 sm:w-20 sm:h-20" />
                </div>
                <span className="text-base font-bold text-white text-center">
                  {condition.label}
                </span>
                <span className="text-xs text-slate-400 mt-1">
                  WMO Code: {current.weather_code}
                </span>
              </div>
            </div>
          </div>

          {/* Core Required Metrics Cards (Temperature, Time, Interval, Humidity, Wind Speed) */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                Current Weather Telemetry
              </h2>
              <span className="text-xs text-slate-400 font-mono">Open-Meteo Verified</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {/* 1. Temperature */}
              <WeatherMetricCard
                title="Temperature"
                value={unit === "F" ? Math.round(celsiusToFahrenheit(current.temperature_2m)) : Math.round(current.temperature_2m)}
                unit={unit === "F" ? "°F" : "°C"}
                subtitle={`Raw: ${current.temperature_2m}${currentUnits?.temperature_2m || "°C"}`}
                icon={<Thermometer className="w-5 h-5 text-amber-400" />}
                gradient="from-amber-500/10 via-orange-500/5 to-slate-900/50"
                badge={`Day/Night: ${current.is_day ? "Day" : "Night"}`}
              />

              {/* 2. Time */}
              <WeatherMetricCard
                title="Observation Time"
                value={formatTimeString(current.time)}
                subtitle={`ISO: ${current.time}`}
                icon={<Clock className="w-5 h-5 text-cyan-400" />}
                gradient="from-cyan-500/10 via-blue-500/5 to-slate-900/50"
                badge={weatherData.timezone || "Local"}
              />

              {/* 3. Interval */}
              <WeatherMetricCard
                title="Refresh Interval"
                value={current.interval}
                unit={currentUnits?.interval || "seconds"}
                subtitle={`Cadence: ${formatInterval(current.interval)}`}
                icon={<Timer className="w-5 h-5 text-indigo-400" />}
                gradient="from-indigo-500/10 via-purple-500/5 to-slate-900/50"
                badge="Auto Synced"
              />

              {/* 4. Humidity */}
              <WeatherMetricCard
                title="Relative Humidity"
                value={current.relative_humidity_2m}
                unit={currentUnits?.relative_humidity_2m || "%"}
                subtitle={getHumidityDescription(current.relative_humidity_2m)}
                icon={<Droplets className="w-5 h-5 text-blue-400" />}
                gradient="from-blue-500/10 via-cyan-500/5 to-slate-900/50"
                badge={current.relative_humidity_2m > 70 ? "High Moisture" : "Comfortable"}
                progressPercent={current.relative_humidity_2m}
              />

              {/* 5. Wind Speed */}
              <WeatherMetricCard
                title="Wind Speed"
                value={current.wind_speed_10m}
                unit={currentUnits?.wind_speed_10m || "km/h"}
                subtitle={getWindDescription(current.wind_speed_10m)}
                icon={<Wind className="w-5 h-5 text-emerald-400" />}
                gradient="from-emerald-500/10 via-teal-500/5 to-slate-900/50"
                badge={
                  typeof current.wind_direction_10m === "number"
                    ? `${current.wind_direction_10m}° Dir`
                    : "10m Height"
                }
              />
            </div>
          </div>

          {/* 24-Hour Hourly Forecast Strip */}
          {hourly?.time && hourly.temperature_2m && (
            <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl backdrop-blur-md">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Clock className="w-4 h-4 text-cyan-400" />
                  Hourly Forecast (Next 24 Hours)
                </h3>
                <span className="text-xs text-slate-400">Scroll horizontally →</span>
              </div>

              <div className="flex items-center gap-3 overflow-x-auto pb-3 pt-1 scrollbar-thin scrollbar-thumb-slate-700">
                {hourly.time.slice(0, 24).map((timeStr, idx) => {
                  const temp = hourly.temperature_2m[idx];
                  const code = hourly.weather_code[idx] ?? 0;
                  const cond = getWeatherCondition(code, 1);
                  return (
                    <div
                      key={timeStr}
                      className="flex-shrink-0 flex flex-col items-center justify-between p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800 hover:border-slate-700 min-w-[85px] transition-all"
                    >
                      <span className="text-xs font-semibold text-slate-400">
                        {formatShortHour(timeStr)}
                      </span>
                      <div className="my-2.5">
                        <WeatherIcon iconName={cond.iconName} className="w-6 h-6" />
                      </div>
                      <span className="text-sm font-bold text-white">
                        {formatTemp(temp)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* 7-Day Forecast Grid */}
          {daily?.time && daily.temperature_2m_max && daily.temperature_2m_min && (
            <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl backdrop-blur-md">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-cyan-400" />
                  7-Day Meteorological Outlook
                </h3>
                <span className="text-xs text-slate-400">Daily Max / Min Forecast</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-3">
                {daily.time.slice(0, 7).map((dayStr, idx) => {
                  const maxTemp = daily.temperature_2m_max[idx];
                  const minTemp = daily.temperature_2m_min[idx];
                  const code = daily.weather_code[idx] ?? 0;
                  const cond = getWeatherCondition(code, 1);
                  const rainChance = daily.precipitation_probability_max?.[idx];

                  return (
                    <div
                      key={dayStr}
                      className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col items-center text-center justify-between space-y-3"
                    >
                      <span className="text-xs font-bold text-slate-300">
                        {formatDayName(dayStr)}
                      </span>

                      <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                        <WeatherIcon iconName={cond.iconName} className="w-7 h-7" />
                      </div>

                      <span className="text-xs font-medium text-slate-400 line-clamp-1">
                        {cond.label}
                      </span>

                      <div className="w-full pt-1 border-t border-slate-800 flex items-center justify-between text-xs font-bold">
                        <span className="text-white">{formatTemp(maxTemp)}</span>
                        <span className="text-slate-400 font-normal">{formatTemp(minTemp)}</span>
                      </div>

                      {typeof rainChance === "number" && (
                        <div className="text-[10px] text-cyan-400 flex items-center gap-1 font-semibold">
                          <Droplets className="w-3 h-3" />
                          <span>{rainChance}% rain</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      ) : null}
    </section>
  );
}
