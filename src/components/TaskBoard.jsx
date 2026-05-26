import { useState, useEffect } from "react";
import { Plus, Trash2, Circle, CheckCircle2, Flag } from "lucide-react";
import { loadTasks, saveTasks, sortTasks, createTask } from "../utils/tasks";

const PRIORITY_STYLES = {
  high:   { dot: "bg-red-400",    text: "text-red-400",    badge: "bg-red-400/10 text-red-400" },
  medium: { dot: "bg-amber-400",  text: "text-amber-400",  badge: "bg-amber-400/10 text-amber-400" },
  low:    { dot: "bg-emerald-400",text: "text-emerald-400",badge: "bg-emerald-400/10 text-emerald-400" },
};

export default function TaskBoard({ compact = false }) {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("medium");
  const [dueDate, setDueDate] = useState("");
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    setTasks(sortTasks(loadTasks()));
  }, []);

  function persist(next) {
    const sorted = sortTasks(next);
    setTasks(sorted);
    saveTasks(sorted);
  }

  function addTask(e) {
    e.preventDefault();
    if (!title.trim()) return;
    persist([...tasks, createTask({ title: title.trim(), priority, dueDate })]);
    setTitle(""); setDueDate(""); setPriority("medium"); setShowForm(false);
  }

  function toggleTask(id) {
    persist(tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  }

  function deleteTask(id) {
    persist(tasks.filter((t) => t.id !== id));
  }

  const displayTasks = compact ? tasks.filter((t) => !t.done).slice(0, 3) : tasks;

  return (
    <div className="glass rounded-xl p-4 flex flex-col gap-3 fade-up fade-up-3">
      <div className="flex items-center justify-between">
        <p className="text-[10px] uppercase tracking-widest text-white/30">Tasks</p>
        {!compact && (
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-1 text-[11px] text-white/30 hover:text-white/70 transition-colors"
          >
            <Plus size={12} /> Add
          </button>
        )}
      </div>

      {!compact && showForm && (
        <form onSubmit={addTask} className="flex flex-col gap-2 p-3 bg-white/[0.03] rounded-lg border border-white/[0.06]">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Task title..."
            className="bg-transparent text-sm text-white/80 placeholder:text-white/20 outline-none border-b border-white/[0.08] pb-1"
            autoFocus
          />
          <div className="flex gap-2 items-center">
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="bg-[#141414] border border-white/[0.08] rounded-md px-2 py-1 text-xs text-white/60 outline-none flex-1"
            >
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="bg-[#141414] border border-white/[0.08] rounded-md px-2 py-1 text-xs text-white/40 outline-none flex-1"
            />
          </div>
          <button
            type="submit"
            className="text-xs bg-[#7c6aff]/20 hover:bg-[#7c6aff]/30 text-[#a78bfa] px-3 py-1.5 rounded-md transition-colors self-end"
          >
            Add Task
          </button>
        </form>
      )}

      <div className="flex flex-col gap-1.5">
        {displayTasks.length === 0 && (
          <p className="text-xs text-white/20 text-center py-4">No tasks yet</p>
        )}
        {displayTasks.map((task) => {
          const ps = PRIORITY_STYLES[task.priority];
          return (
            <div
              key={task.id}
              className={`flex items-start gap-2.5 p-2.5 rounded-lg transition-all ${
                task.done ? "opacity-40" : "hover:bg-white/[0.03]"
              }`}
            >
              <button
                onClick={() => !compact && toggleTask(task.id)}
                className="mt-0.5 shrink-0 text-white/30 hover:text-white/70 transition-colors"
              >
                {task.done ? (
                  <CheckCircle2 size={15} className="text-emerald-400" />
                ) : (
                  <Circle size={15} />
                )}
              </button>
              <div className="flex-1 min-w-0">
                <p className={`text-sm leading-snug ${task.done ? "line-through text-white/30" : "text-white/80"}`}>
                  {task.title}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${ps.badge}`}>
                    {task.priority}
                  </span>
                  {task.dueDate && (
                    <span className="text-[10px] text-white/25">
                      {new Date(task.dueDate).toLocaleDateString("en", { month: "short", day: "numeric" })}
                    </span>
                  )}
                </div>
              </div>
              {!compact && (
                <button
                  onClick={() => deleteTask(task.id)}
                  className="text-white/15 hover:text-red-400 transition-colors shrink-0"
                >
                  <Trash2 size={13} />
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
