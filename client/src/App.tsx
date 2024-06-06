import React from "react";
import { Routes, Route } from "react-router-dom";
import { Landing, Signup, Login, Dashboard } from "./pages/index.tsx";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
};

export default App;
