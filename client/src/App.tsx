import React from "react";
import Cookies from "js-cookie";
import { Routes, Route, useLocation, Navigate, Outlet } from "react-router-dom";
import {
  Landing,
  Dashboard,
  Projects,
  ProjectDashboard,
  Profile,
  Trash,
  Settings,
} from "./pages/index.tsx";
import { Sidebar, Topbar } from "./components/index.tsx";

const App: React.FC = () => {
  function Layout() {
    const token = Cookies.get("token");

    const location = useLocation();

    return token ? (
      <div className="flex bg-neutral-900">
        <Sidebar />
        <div className="w-full nunito-style">
          <Topbar />
          <Outlet />
        </div>
      </div>
    ) : (
      <Navigate to="/" state={{ from: location }} replace />
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route element={<Layout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/project-dashboard" element={<ProjectDashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/dump" element={<Trash />} />
      </Route>
    </Routes>
  );
};

export default App;
