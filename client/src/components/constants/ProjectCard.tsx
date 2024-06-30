import { useState } from "react";
import { dateFormat } from "../../utils/dataOperations";
import { useNavigate } from "react-router-dom";
import { CrudButtons } from "./Buttons";

const ProjectCard = ({ project, loadData, userId }) => {
  const navigate = useNavigate();

  const trashProject = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/trash/${project._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error trashing Project");
      }

      console.log("Project trashed successfully:", data);
      return data;
    } catch (error) {
      console.error("Error trashing project:", error);
    }
  };

  const priority = () => {
    if (project.stage !== "completed") {
      switch (project.priority) {
        case "normal":
          return "bg-blue-700";
        case "medium":
          return "bg-yellow-700";
        case "high":
          return "bg-red-700";
      }
    } else {
      return "bg-green-700";
    }
  };

  const handleExpand = () => {
    navigate(`/project-dashboard`, { state: { project, userId } });
  };

  const handleTrashProject = async () => {
    const userConfirmed = window.confirm(
      "Are you sure you want to trash this project?"
    );
    if (userConfirmed) {
      try {
        await trashProject();
        loadData();
      } catch (error) {
        alert("Failed to trash the project: " + error.message);
      }
    }
  };

  return (
    <div
      key={project._id}
      className="grid grid-cols-6 gap-10 border-b border-neutral-700 text-neutral-400 h-11 p-2 ml-2 mt-2"
    >
      <p className="font-light text-[15px] flex items-center overflow-hidden whitespace-nowrap overflow-ellipsis">
        {project.title}
      </p>
      <p className="text-[14px] overflow-hidden whitespace-nowrap overflow-ellipsis">
        {dateFormat(project.eod).formattedDate}
      </p>
      <p className="font-light text-[15px] overflow-hidden whitespace-nowrap overflow-ellipsis">
        {project.desc}
      </p>
      <p className="font-light text-[15px] overflow-hidden whitespace-nowrap overflow-ellipsis">
        {project.createdBy.username}
      </p>
      <div className="font-light text-[15px] overflow-hidden whitespace-nowrap overflow-ellipsis ">
        <p
          className={`${priority()} rounded-full w-[75%] text-center text-white`}
        >
          {project.stage}
        </p>
      </div>
      <CrudButtons
        type="project"
        onExpand={handleExpand}
        onTrash={handleTrashProject}
        project={project}
        loadData={loadData}
        item_id={project._id}
        isCreator={userId === project.createdBy._id}
      />
    </div>
  );
};

export default ProjectCard;
