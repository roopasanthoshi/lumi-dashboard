import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Wind, Droplets, ArrowUpRight } from "lucide-react";
import { fetchWeather, weatherIconUrl } from "../utils/weather";

export default function WeatherCard({ city = "London", compact = false }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchWeather(city)
      .then(setData)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [city]);

  if (loading) {
    return (
      <div className="glass rounded-xl p-4 fade-up fade-up-1">
        <div className="shimmer h-4 w-24 rounded mb-2" />
        <div className="shimmer h-8 w-16 rounded" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="glass rounded-xl p-4 fade-up fade-up-1">
        <p className="text-xs text-red-400">{error}</p>
      </div>
    );
  }

  if (!data) return null;

  if (compact) {
    return (
      <Link to="/weather" className="glass glass-hover rounded-xl p-4 flex items-center justify-between cursor-pointer fade-up fade-up-1 group">
        <div>
          <p className="text-[10px] uppercase tracking-widest text-white/30 mb-1">Weather</p>
          <p className="text-2xl font-light text-white">{Math.round(data.main.temp)}°C</p>
          <p className="text-xs text-white/40 mt-0.5">{data.name} · {data.weather[0].description}</p>
        </div>
        <div className="flex items-center gap-2">
          <img
            src={weatherIconUrl(data.weather[0].icon)}
            alt={data.weather[0].description}
            className="w-12 h-12 opacity-90"
          />
          <ArrowUpRight size={12} className="text-white/20 group-hover:text-white/40 transition-colors" />
        </div>
      </Link>
    );
  }

  return (
    <div className="glass rounded-xl p-5 fade-up fade-up-1">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-[10px] uppercase tracking-widest text-white/30 mb-2">Current Weather</p>
          <p className="text-4xl font-light text-white">{Math.round(data.main.temp)}°C</p>
          <p className="text-sm text-white/50 mt-1 capitalize">{data.weather[0].description}</p>
          <p className="text-xs text-white/30 mt-0.5">{data.name}, {data.sys.country}</p>
        </div>
        <img src={weatherIconUrl(data.weather[0].icon)} alt="" className="w-16 h-16" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white/[0.03] rounded-lg p-3 flex items-center gap-2">
          <Droplets size={13} className="text-blue-400" />
          <div>
            <p className="text-[10px] text-white/30">Humidity</p>
            <p className="text-sm font-medium text-white/80">{data.main.humidity}%</p>
          </div>
        </div>
        <div className="bg-white/[0.03] rounded-lg p-3 flex items-center gap-2">
          <Wind size={13} className="text-cyan-400" />
          <div>
            <p className="text-[10px] text-white/30">Wind</p>
            <p className="text-sm font-medium text-white/80">{data.wind.speed} m/s</p>
          </div>
        </div>
      </div>
    </div>
  );
}
