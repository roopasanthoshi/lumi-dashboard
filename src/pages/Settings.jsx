import { useState, useEffect } from "react";
import { Save, Eye, EyeOff, Trash2, CheckCircle } from "lucide-react";

function SettingSection({ title, children }) {
  return (
    <div className="glass rounded-xl p-5 fade-up fade-up-1">
      <p className="text-[10px] uppercase tracking-widest text-white/30 mb-4">{title}</p>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function ApiKeyInput({ label, storageKey, placeholder }) {
  const [value, setValue] = useState(() => localStorage.getItem(storageKey) || "");
  const [show, setShow] = useState(false);
  const [saved, setSaved] = useState(false);

  function save() {
    localStorage.setItem(storageKey, value);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div>
      <p className="text-xs text-white/50 mb-1.5">{label}</p>
      <div className="flex gap-2">
        <div className="flex-1 flex items-center gap-2 bg-white/[0.03] border border-white/[0.07] rounded-lg px-3 py-2">
          <input
            type={show ? "text" : "password"}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={placeholder}
            className="flex-1 bg-transparent text-xs text-white/60 placeholder:text-white/20 outline-none font-mono"
          />
          <button onClick={() => setShow(!show)} className="text-white/20 hover:text-white/50 transition-colors">
            {show ? <EyeOff size={12} /> : <Eye size={12} />}
          </button>
        </div>
        <button
          onClick={save}
          className={`px-3 py-2 rounded-lg text-xs transition-all ${
            saved ? "bg-emerald-500/20 text-emerald-400" : "bg-[#7c6aff]/20 hover:bg-[#7c6aff]/30 text-[#a78bfa]"
          }`}
        >
          {saved ? <CheckCircle size={12} /> : <Save size={12} />}
        </button>
      </div>
    </div>
  );
}

export default function Settings() {
  const [city, setCity] = useState(() => localStorage.getItem("lumi_city") || "London");
  const [citySaved, setCitySaved] = useState(false);

  function saveCity() {
    localStorage.setItem("lumi_city", city);
    setCitySaved(true);
    setTimeout(() => setCitySaved(false), 2000);
  }

  function clearAllData() {
    if (!confirm("Clear all local data? This removes tasks, events, and settings.")) return;
    ["lumi_tasks", "lumi_events", "lumi_github", "lumi_city"].forEach((k) =>
      localStorage.removeItem(k)
    );
    sessionStorage.clear();
    window.location.reload();
  }

  return (
    <div className="max-w-xl mx-auto space-y-4">
      <SettingSection title="API Keys">
        <p className="text-xs text-white/30 -mt-1">
          Keys are saved in localStorage. For production, use environment variables in .env
        </p>
        <ApiKeyInput
          label="OpenWeatherMap API Key"
          storageKey="lumi_weather_key"
          placeholder="Enter your OpenWeather API key..."
        />
        <ApiKeyInput
          label="NewsData.io API Key"
          storageKey="lumi_news_key"
          placeholder="Enter your NewsData.io API key..."
        />
        <ApiKeyInput
          label="Google Gemini API Key"
          storageKey="lumi_gemini_key"
          placeholder="Enter your Gemini API key..."
        />
      </SettingSection>

      <SettingSection title="Preferences">
        <div>
          <p className="text-xs text-white/50 mb-1.5">Default City (Weather)</p>
          <div className="flex gap-2">
            <input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="e.g. New York"
              className="flex-1 bg-white/[0.03] border border-white/[0.07] rounded-lg px-3 py-2 text-xs text-white/60 placeholder:text-white/20 outline-none"
            />
            <button
              onClick={saveCity}
              className={`px-3 py-2 rounded-lg text-xs transition-all ${
                citySaved ? "bg-emerald-500/20 text-emerald-400" : "bg-[#7c6aff]/20 hover:bg-[#7c6aff]/30 text-[#a78bfa]"
              }`}
            >
              {citySaved ? <CheckCircle size={12} /> : <Save size={12} />}
            </button>
          </div>
        </div>
      </SettingSection>

      <SettingSection title="Data">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-white/60">Clear all local data</p>
            <p className="text-[10px] text-white/25 mt-0.5">Removes tasks, events, and preferences</p>
          </div>
          <button
            onClick={clearAllData}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-red-400/70 hover:text-red-400 border border-red-400/20 hover:border-red-400/40 transition-all"
          >
            <Trash2 size={11} /> Clear Data
          </button>
        </div>
      </SettingSection>

      <div className="glass rounded-xl p-4 fade-up fade-up-2">
        <p className="text-[10px] uppercase tracking-widest text-white/25 mb-2">About Lumi AI</p>
        <p className="text-xs text-white/30 leading-relaxed">
          A professional AI-powered productivity dashboard. Built with React, Vite, Tailwind CSS, and Gemini AI.
          Designed for developers who want a clean, focused workspace.
        </p>
        <p className="text-[10px] text-white/15 mt-3">v1.0.0 · Scalable for n8n + backend automation</p>
      </div>
    </div>
  );
}
