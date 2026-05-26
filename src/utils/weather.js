import { WEATHER_API_KEY, WEATHER_BASE } from "../config/api";

export async function fetchWeather(city = "London") {
  const res = await fetch(
    `${WEATHER_BASE}/weather?q=${encodeURIComponent(city)}&appid=${WEATHER_API_KEY}&units=metric`
  );
  if (!res.ok) throw new Error("City not found");
  return res.json();
}

export async function fetchForecast(city = "London") {
  const res = await fetch(
    `${WEATHER_BASE}/forecast?q=${encodeURIComponent(city)}&appid=${WEATHER_API_KEY}&units=metric&cnt=8`
  );
  if (!res.ok) throw new Error("Forecast unavailable");
  return res.json();
}

export function weatherIconUrl(code) {
  return `https://openweathermap.org/img/wn/${code}@2x.png`;
}

export function formatUnixTime(unix, tz = 0) {
  const d = new Date((unix + tz) * 1000);
  return d.toUTCString().slice(17, 22); // HH:MM
}
