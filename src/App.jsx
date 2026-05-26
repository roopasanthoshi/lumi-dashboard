import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import Dashboard from "./pages/Dashboard";
import Weather from "./pages/Weather";
import News from "./pages/News";
import Tasks from "./pages/Tasks";
import Github from "./pages/Github";
import Calendar from "./pages/Calendar";
import Settings from "./pages/Settings";

export default function App() {
  return (
    <Router>
      <div className="flex h-screen bg-[#080808] text-white overflow-hidden font-sans">
        <Sidebar />
        <div className="flex flex-col flex-1 overflow-hidden">
          <Topbar />
          <main className="flex-1 overflow-y-auto px-6 py-6 scrollbar-thin">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/weather" element={<Weather />} />
              <Route path="/news" element={<News />} />
              <Route path="/tasks" element={<Tasks />} />
              <Route path="/github" element={<Github />} />
              <Route path="/calendar" element={<Calendar />} />
              
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}
