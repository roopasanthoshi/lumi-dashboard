const KEY = "lumi_tasks";

const PRIORITY_ORDER = { high: 0, medium: 1, low: 2 };

export function loadTasks() {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}

export function saveTasks(tasks) {
  localStorage.setItem(KEY, JSON.stringify(tasks));
}

export function sortTasks(tasks) {
  return [...tasks].sort((a, b) => {
    const pd = PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority];
    if (pd !== 0) return pd;
    if (!a.dueDate) return 1;
    if (!b.dueDate) return -1;
    return new Date(a.dueDate) - new Date(b.dueDate);
  });
}

export function createTask({ title, priority = "medium", dueDate = "" }) {
  return {
    id: crypto.randomUUID(),
    title,
    priority,
    dueDate,
    done: false,
    createdAt: new Date().toISOString(),
  };
}
