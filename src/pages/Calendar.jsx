import CalendarBoard from "../components/CalendarBoard";

export default function Calendar() {
  return (
    <div className="max-w-2xl mx-auto">
      <CalendarBoard compact={false} />
    </div>
  );
}
