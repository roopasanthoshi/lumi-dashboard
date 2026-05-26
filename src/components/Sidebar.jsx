import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard, CloudSun, Newspaper, CheckSquare,
  Github, CalendarDays, Mic, Settings, Zap
} from "lucide-react";

const navItems = [
  { to: "/", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/weather", icon: CloudSun, label: "Weather" },
  { to: "/news", icon: Newspaper, label: "News" },
  { to: "/tasks", icon: CheckSquare, label: "Tasks" },
  { to: "/github", icon: Github, label: "GitHub" },
  { to: "/calendar", icon: CalendarDays, label: "Calendar" },
  
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className="w-56 h-full flex flex-col border-r border-white/[0.06] bg-[#080808] shrink-0">
      {/* Logo */}
      <div className="px-5 py-5 flex items-center gap-2.5 border-b border-white/[0.06]">
        <div className="w-7 h-7 rounded-lg bg-[#7c6aff]/20 flex items-center justify-center">
          <Zap size={14} className="text-[#a78bfa]" />
        </div>
        <span className="text-sm font-semibold tracking-tight text-white/90">Lumi AI</span>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        <p className="text-[10px] uppercase tracking-widest text-white/20 px-2 mb-3 font-medium">Workspace</p>
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/"}
            className={({ isActive }) =>
              `flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm transition-all duration-150 group ${
                isActive
                  ? "bg-white/[0.07] text-white"
                  : "text-white/40 hover:text-white/70 hover:bg-white/[0.04]"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon
                  size={15}
                  className={isActive ? "text-[#a78bfa]" : "text-white/30 group-hover:text-white/50 transition-colors"}
                />
                <span className="tracking-tight">{label}</span>
                {isActive && (
                  <span className="ml-auto w-1 h-1 rounded-full bg-[#7c6aff]" />
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Bottom */}
      <div className="px-3 pb-4 border-t border-white/[0.06] pt-3">
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm transition-all duration-150 group ${
              isActive
                ? "bg-white/[0.07] text-white"
                : "text-white/40 hover:text-white/70 hover:bg-white/[0.04]"
            }`
          }
        >
          {({ isActive }) => (
            <>
              <Settings size={15} className={isActive ? "text-[#a78bfa]" : "text-white/30 group-hover:text-white/50"} />
              <span className="tracking-tight">Settings</span>
            </>
          )}
        </NavLink>
      </div>
    </aside>
  );
}
