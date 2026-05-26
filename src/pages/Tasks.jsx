import TaskBoard from "../components/TaskBoard";

export default function Tasks() {
  return (
    <div className="max-w-2xl mx-auto">
      <TaskBoard compact={false} />
    </div>
  );
}
