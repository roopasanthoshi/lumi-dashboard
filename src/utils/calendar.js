const KEY = "lumi_events";

export function loadEvents() {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}

export function saveEvents(events) {
  localStorage.setItem(KEY, JSON.stringify(events));
}

export function createEvent({ title, date, time = "", note = "" }) {
  return {
    id: crypto.randomUUID(),
    title,
    date,
    time,
    note,
    createdAt: new Date().toISOString(),
  };
}

export function upcomingEvents(events, limit = 5) {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  return events
    .filter((e) => new Date(e.date) >= now)
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, limit);
}
