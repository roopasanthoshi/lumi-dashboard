import WeatherCard from "../components/WeatherCard.jsx";
import TaskBoard from "../components/TaskBoard.jsx";
import GithubCard from "../components/GithubCard.jsx";
import CalendarBoard from "../components/CalendarBoard.jsx";
import AIBrief from "../components/AIBrief.jsx";

function Greeting() {
  const hour = new Date().getHours();

  const greeting =
    hour < 12
      ? "Good morning"
      : hour < 17
      ? "Good afternoon"
      : "Good evening";

  const today = new Date().toLocaleDateString(
    "en",
    {
      weekday: "long",
      month: "long",
      day: "numeric",
    }
  );

  return (
    <div className="mb-6 fade-up fade-up-1">
      <h1 className="text-xl font-light text-white/85 tracking-tight">
        {greeting}
      </h1>

      <p className="text-sm text-white/30 mt-0.5">
        {today}
      </p>
    </div>
  );
}

function QuickStats() {
  const tasks = (() => {
    try {
      return JSON.parse(
        localStorage.getItem(
          "lumi_tasks"
        ) || "[]"
      );
    } catch {
      return [];
    }
  })();

  const done =
    tasks.filter((t) => t.done).length;

  const pending =
    tasks.filter((t) => !t.done).length;

  const high =
    tasks.filter(
      (t) =>
        !t.done &&
        t.priority === "high"
    ).length;

  const stats = [
    {
      label: "Pending",
      value: pending,
      color: "text-amber-400",
    },
    {
      label: "Done",
      value: done,
      color: "text-emerald-400",
    },
    {
      label: "Urgent",
      value: high,
      color: "text-red-400",
    },
  ];

  return (
    <div className="glass rounded-xl p-4 fade-up fade-up-2">
      <p className="text-[10px] uppercase tracking-widest text-white/30 mb-3">
        Task Overview
      </p>

      <div className="grid grid-cols-3 gap-2">
        {stats.map((s) => (
          <div
            key={s.label}
            className="text-center p-2 bg-white/[0.03] rounded-lg"
          >
            <p
              className={`text-2xl font-light ${s.color}`}
            >
              {s.value}
            </p>

            <p className="text-[9px] text-white/25 mt-0.5">
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Dashboard() {
  const city =
    localStorage.getItem(
      "lumi_city"
    ) || "London";

  return (
    <div className="max-w-5xl mx-auto">
      <Greeting />

      <div className="mb-4">
        <AIBrief />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* LEFT */}
        <div className="flex flex-col gap-4">
          <WeatherCard
            city={city}
            compact
          />

          <TaskBoard compact />
        </div>

        {/* CENTER */}
        <div className="flex flex-col gap-4">
          <GithubCard compact />

          <CalendarBoard compact />
        </div>

        {/* RIGHT */}
        <div className="flex flex-col gap-4">
          <QuickStats />
        </div>
      </div>
    </div>
  );
}