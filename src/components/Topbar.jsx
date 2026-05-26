import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Search, Bell } from "lucide-react";

const PAGE_TITLES = {
  "/": "Dashboard",
  "/weather": "Weather",
  "/news": "News",
  "/tasks": "Tasks",
  "/github": "GitHub",
  "/calendar": "Calendar",
  "/voice": "Voice Assistant",
  "/settings": "Settings",
};

function LiveClock() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  return (
    <span className="font-mono text-xs text-white/30 tracking-widest">
      {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
    </span>
  );
}

export default function Topbar() {
  const location = useLocation();
  const title = PAGE_TITLES[location.pathname] ?? "Lumi AI";

  return (
    <header className="h-12 flex items-center justify-between px-6 border-b border-white/[0.06] shrink-0 bg-[#080808]">
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium text-white/70 tracking-tight">{title}</span>
      </div>
      <div className="flex items-center gap-4">
        <LiveClock />
        <button className="w-7 h-7 rounded-lg flex items-center justify-center text-white/30 hover:text-white/60 hover:bg-white/[0.05] transition-all">
          <Bell size={14} />
        </button>
        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#7c6aff] to-[#a78bfa] flex items-center justify-center text-[10px] font-semibold text-white">
          U
        </div>
      </div>
    </header>
  );
}
