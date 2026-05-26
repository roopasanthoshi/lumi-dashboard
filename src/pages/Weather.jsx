import { useState, useEffect } from "react";
import { Search, Wind, Droplets, Eye, Thermometer, Sunrise, Sunset, ArrowLeft } from "lucide-react";
import { fetchWeather, fetchForecast, weatherIconUrl, formatUnixTime } from "../utils/weather";

export default function Weather() {
  const [city, setCity] = useState(localStorage.getItem("lumi_city") || "London");
  const [input, setInput] = useState("");
  const [data, setData] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function load(c) {
    setLoading(true); setError(null);
    try {
      const [w, f] = await Promise.all([fetchWeather(c), fetchForecast(c)]);
      setData(w);
      setForecast(f.list || []);
      localStorage.setItem("lumi_city", c);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(city); }, []);

  function handleSearch(e) {
    e.preventDefault();
    if (!input.trim()) return;
    setCity(input.trim()); load(input.trim()); setInput("");
  }

  const stat = (icon, label, value) => (
    <div className="flex flex-col gap-1 p-3 bg-white/[0.03] rounded-xl border border-white/[0.05]">
      <div className="flex items-center gap-1.5 text-white/30">
        {icon}
        <span className="text-[10px] uppercase tracking-wider">{label}</span>
      </div>
      <p className="text-sm font-medium text-white/80">{value}</p>
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto">
      {/* Search */}
      <form onSubmit={handleSearch} className="flex gap-2 mb-6 fade-up fade-up-1">
        <div className="flex-1 flex items-center gap-2 glass rounded-xl px-4 py-2.5">
          <Search size={14} className="text-white/25 shrink-0" />
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Search city..."
            className="flex-1 bg-transparent text-sm text-white/70 placeholder:text-white/20 outline-none"
          />
        </div>
        <button className="px-4 py-2.5 bg-[#7c6aff]/20 hover:bg-[#7c6aff]/30 text-[#a78bfa] text-sm rounded-xl transition-colors">
          Search
        </button>
      </form>

      {loading && (
        <div className="glass rounded-2xl p-8">
          <div className="shimmer h-6 w-32 rounded mb-4" />
          <div className="shimmer h-16 w-24 rounded mb-4" />
          <div className="shimmer h-4 w-48 rounded" />
        </div>
      )}
      {error && <p className="text-sm text-red-400/70 glass rounded-xl p-4">{error}</p>}

      {data && !loading && (
        <>
          {/* Hero card */}
          <div className="glass rounded-2xl p-6 mb-4 fade-up fade-up-2 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 pointer-events-none" />
            <div className="relative flex items-start justify-between">
              <div>
                <p className="text-white/40 text-sm mb-1">{data.name}, {data.sys.country}</p>
                <p className="text-6xl font-light text-white mb-2">{Math.round(data.main.temp)}°</p>
                <p className="text-sm text-white/50 capitalize">{data.weather[0].description}</p>
                <p className="text-xs text-white/25 mt-1">
                  Feels like {Math.round(data.main.feels_like)}° · H:{Math.round(data.main.temp_max)}° L:{Math.round(data.main.temp_min)}°
                </p>
              </div>
              <img src={weatherIconUrl(data.weather[0].icon)} alt="" className="w-24 h-24 opacity-90" />
            </div>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4 fade-up fade-up-3">
            {stat(<Droplets size={12} />, "Humidity", `${data.main.humidity}%`)}
            {stat(<Wind size={12} />, "Wind", `${data.wind.speed} m/s`)}
            {stat(<Eye size={12} />, "Visibility", `${(data.visibility / 1000).toFixed(1)} km`)}
            {stat(<Thermometer size={12} />, "Pressure", `${data.main.pressure} hPa`)}
            {stat(<Sunrise size={12} />, "Sunrise", formatUnixTime(data.sys.sunrise, data.timezone))}
            {stat(<Sunset size={12} />, "Sunset", formatUnixTime(data.sys.sunset, data.timezone))}
          </div>

          {/* Forecast */}
          {forecast.length > 0 && (
            <div className="glass rounded-2xl p-5 fade-up fade-up-4">
              <p className="text-[10px] uppercase tracking-widest text-white/30 mb-4">3-Hour Forecast</p>
              <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-thin">
                {forecast.map((f, i) => (
                  <div key={i} className="flex flex-col items-center gap-2 shrink-0 p-3 bg-white/[0.03] rounded-xl min-w-[64px]">
                    <p className="text-[10px] text-white/30">
                      {new Date(f.dt * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </p>
                    <img src={weatherIconUrl(f.weather[0].icon)} alt="" className="w-8 h-8" />
                    <p className="text-xs text-white/70 font-medium">{Math.round(f.main.temp)}°</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
