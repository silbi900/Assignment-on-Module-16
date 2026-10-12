import { CityOption, GeocodingResult, OpenMeteoWeatherResponse } from "@/types/weather";

export const DEFAULT_CITIES: CityOption[] = [
  { name: "Dhaka", country: "Bangladesh", latitude: 23.8103, longitude: 90.4125, admin1: "Dhaka Division" },
  { name: "Chattogram", country: "Bangladesh", latitude: 22.3569, longitude: 91.7832, admin1: "Chittagong" },
  { name: "Sylhet", country: "Bangladesh", latitude: 24.8949, longitude: 91.8687, admin1: "Sylhet Division" },
  { name: "Rajshahi", country: "Bangladesh", latitude: 24.3636, longitude: 88.6241, admin1: "Rajshahi Division" },
  { name: "London", country: "United Kingdom", latitude: 51.5074, longitude: -0.1278, admin1: "England" },
  { name: "New York", country: "United States", latitude: 40.7128, longitude: -74.006, admin1: "New York" },
  { name: "Tokyo", country: "Japan", latitude: 35.6762, longitude: 139.6503, admin1: "Tokyo" },
  { name: "Dubai", country: "United Arab Emirates", latitude: 25.2048, longitude: 55.2708, admin1: "Dubai" },
];

export async function fetchWeather(lat: number, lon: number): Promise<OpenMeteoWeatherResponse> {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,weather_code,wind_speed_10m,wind_direction_10m&hourly=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_probability_max&timezone=auto&forecast_days=7`;

  const response = await fetch(url, { next: { revalidate: 60 } });

  if (!response.ok) {
    throw new Error(`Failed to fetch weather data: ${response.status} ${response.statusText}`);
  }

  const data: OpenMeteoWeatherResponse = await response.json();
  return data;
}

export async function searchCities(query: string): Promise<CityOption[]> {
  const trimmed = query.trim();
  if (trimmed.length < 2) return [];

  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(trimmed)}&count=6&language=en&format=json`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to search locations");
  }

  const data: { results?: GeocodingResult[] } = await response.json();
  if (!data.results || data.results.length === 0) {
    return [];
  }

  return data.results.map((item) => ({
    name: item.name,
    country: item.country || item.country_code || "",
    latitude: item.latitude,
    longitude: item.longitude,
    admin1: item.admin1 || "",
  }));
}
