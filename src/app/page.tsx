import WeatherDisplay from "@/components/WeatherDisplay";
import HomeAboutSection from "@/components/HomeAboutSection";

export default function HomePage() {
  return (
    <div className="relative min-h-screen py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      {/* Subtle background ambient lighting */}
      <div className="absolute top-12 left-1/3 -translate-x-1/2 w-[550px] h-[350px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-64 right-10 w-[450px] h-[300px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Main Weather Display */}
      <WeatherDisplay />

      {/* Required About Section on Home Page */}
      <HomeAboutSection />
    </div>
  );
}
