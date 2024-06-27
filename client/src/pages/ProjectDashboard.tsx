import { useState } from "react";
import ProjectOverview from "../components/constants/ProjectOverview";
import TasksPage from "../components/constants/TasksPage";

const ProjectDashboard = () => {
  const [showForm, setShowForm] = useState<"overview" | "tasks">("overview");

  return (
    <div className="ml-7 mr-5 h-[83%] p-2">
      <div className="flex flex-row space-x-12 text-neutral-300 font-light mb-5 relative">
        <p
          onClick={() => setShowForm("overview")}
          className={`cursor-pointer transition-all duration-500 ${
            showForm === "overview" ? "text-neutral-50 glow-effect" : ""
          }`}
        >
          Overview
        </p>
        <p
          onClick={() => setShowForm("tasks")}
          className={`cursor-pointer transition-all duration-500 ${
            showForm === "tasks" ? "text-neutral-50 glow-effect" : ""
          }`}
        >
          Tasks
        </p>
        <div
          className={`absolute bottom-0 h-[2px] bg-neutral-100 transition-all duration-500 ${
            showForm === "overview"
              ? "left-[-48px] w-[70px]"
              : "left-[65px] w-[47px]"
          }`}
        ></div>
      </div>
      {showForm === "overview" ? <ProjectOverview /> : <TasksPage />}
    </div>
  );
};

export default ProjectDashboard;
