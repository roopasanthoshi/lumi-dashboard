import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Plus, CalendarDays, Clock } from "lucide-react";
import { loadEvents, saveEvents, createEvent, upcomingEvents } from "../utils/calendar";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

export default function CalendarBoard({ compact = false }) {
  const today = new Date();
  const [current, setCurrent] = useState({ year: today.getFullYear(), month: today.getMonth() });
  const [events, setEvents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: "", date: "", time: "", note: "" });

  useEffect(() => { setEvents(loadEvents()); }, []);

  function persist(next) { setEvents(next); saveEvents(next); }

  function addEvent(e) {
    e.preventDefault();
    if (!form.title || !form.date) return;
    persist([...events, createEvent(form)]);
    setForm({ title: "", date: "", time: "", note: "" });
    setShowForm(false);
  }

  function deleteEvent(id) { persist(events.filter((e) => e.id !== id)); }

  const upcoming = upcomingEvents(events, compact ? 3 : 8);

  // Build calendar grid
  const firstDay = new Date(current.year, current.month, 1).getDay();
  const daysInMonth = new Date(current.year, current.month + 1, 0).getDate();
  const cells = Array(firstDay).fill(null).concat(
    Array.from({ length: daysInMonth }, (_, i) => i + 1)
  );

  function hasEvent(day) {
    if (!day) return false;
    const d = `${current.year}-${String(current.month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return events.some((e) => e.date === d);
  }

  function isToday(day) {
    return day === today.getDate() && current.month === today.getMonth() && current.year === today.getFullYear();
  }

  if (compact) {
    return (
      <div className="glass rounded-xl p-4 fade-up fade-up-5">
        <p className="text-[10px] uppercase tracking-widest text-white/30 mb-3">Upcoming</p>
        {upcoming.length === 0 && <p className="text-xs text-white/20">No upcoming events</p>}
        {upcoming.map((ev) => (
          <div key={ev.id} className="flex items-start gap-2 py-2 border-b border-white/[0.04] last:border-0">
            <div className="w-1 h-1 rounded-full bg-[#7c6aff] mt-1.5 shrink-0" />
            <div>
              <p className="text-xs text-white/70">{ev.title}</p>
              <p className="text-[10px] text-white/30">
                {new Date(ev.date).toLocaleDateString("en", { month: "short", day: "numeric" })}
                {ev.time && ` · ${ev.time}`}
              </p>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Mini Calendar */}
      <div className="glass rounded-xl p-5 fade-up fade-up-1">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-white/80">
            {MONTHS[current.month]} {current.year}
          </span>
          <div className="flex gap-1">
            <button
              onClick={() => setCurrent((c) => {
                const d = new Date(c.year, c.month - 1);
                return { year: d.getFullYear(), month: d.getMonth() };
              })}
              className="w-6 h-6 flex items-center justify-center rounded text-white/30 hover:text-white/70 hover:bg-white/[0.05] transition-all"
            >
              <ChevronLeft size={13} />
            </button>
            <button
              onClick={() => setCurrent((c) => {
                const d = new Date(c.year, c.month + 1);
                return { year: d.getFullYear(), month: d.getMonth() };
              })}
              className="w-6 h-6 flex items-center justify-center rounded text-white/30 hover:text-white/70 hover:bg-white/[0.05] transition-all"
            >
              <ChevronRight size={13} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-0.5 mb-1">
          {DAYS.map((d) => (
            <div key={d} className="text-center text-[9px] uppercase tracking-wider text-white/20 py-1">{d}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-0.5">
          {cells.map((day, i) => (
            <div
              key={i}
              className={`relative h-8 flex items-center justify-center rounded text-xs transition-all ${
                !day ? "" :
                isToday(day) ? "bg-[#7c6aff] text-white font-medium" :
                "text-white/50 hover:bg-white/[0.05] cursor-default"
              }`}
            >
              {day}
              {day && hasEvent(day) && !isToday(day) && (
                <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#a78bfa]" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Events */}
      <div className="glass rounded-xl p-5 fade-up fade-up-2">
        <div className="flex items-center justify-between mb-4">
          <p className="text-[10px] uppercase tracking-widest text-white/30">Events</p>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-1 text-[11px] text-white/30 hover:text-white/70 transition-colors"
          >
            <Plus size={12} /> Add event
          </button>
        </div>

        {showForm && (
          <form onSubmit={addEvent} className="flex flex-col gap-2 p-3 bg-white/[0.03] rounded-lg border border-white/[0.06] mb-4">
            <input
              value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="Event title..." required autoFocus
              className="bg-transparent text-sm text-white/80 placeholder:text-white/20 outline-none border-b border-white/[0.08] pb-1"
            />
            <div className="flex gap-2">
              <input
                type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} required
                className="flex-1 bg-[#141414] border border-white/[0.08] rounded-md px-2 py-1 text-xs text-white/50 outline-none"
              />
              <input
                type="time" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })}
                className="flex-1 bg-[#141414] border border-white/[0.08] rounded-md px-2 py-1 text-xs text-white/50 outline-none"
              />
            </div>
            <input
              value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })}
              placeholder="Note (optional)..."
              className="bg-transparent text-xs text-white/50 placeholder:text-white/20 outline-none"
            />
            <button type="submit" className="text-xs bg-[#7c6aff]/20 hover:bg-[#7c6aff]/30 text-[#a78bfa] px-3 py-1.5 rounded-md transition-colors self-end">
              Save Event
            </button>
          </form>
        )}

        <div className="space-y-1">
          {upcoming.length === 0 && <p className="text-xs text-white/20 py-2">No upcoming events</p>}
          {upcoming.map((ev) => (
            <div key={ev.id} className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-white/[0.03] group transition-colors">
              <div className="shrink-0 mt-0.5 w-6 h-6 rounded-md bg-[#7c6aff]/15 flex items-center justify-center">
                <CalendarDays size={11} className="text-[#a78bfa]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-white/75">{ev.title}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[10px] text-white/30">
                    {new Date(ev.date).toLocaleDateString("en", { weekday: "short", month: "short", day: "numeric" })}
                  </span>
                  {ev.time && (
                    <span className="flex items-center gap-0.5 text-[10px] text-white/25">
                      <Clock size={9} />{ev.time}
                    </span>
                  )}
                </div>
              </div>
              <button
                onClick={() => deleteEvent(ev.id)}
                className="text-white/10 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100 text-xs"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
