import React from "react";
import Cookies from "js-cookie";
import { Routes, Route, useLocation, Navigate, Outlet } from "react-router-dom";
import { Landing, Signup, Login, Dashboard } from "./pages/index.tsx";
import { Sidebar, Topbar } from "./components/index.tsx";
import Projects from "./pages/Projects.tsx";

const App: React.FC = () => {
  function Layout() {
    const token = Cookies.get("token");

    const location = useLocation();

    return token ? (
      <div className="flex bg-zinc-950">
        <Sidebar />
        <Topbar />
        <Outlet />
      </div>
    ) : (
      <Navigate to="/login" state={{ from: location }} replace />
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route element={<Layout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/projects" element={<Projects />} />
      </Route>
    </Routes>
  );
};

export default App;
