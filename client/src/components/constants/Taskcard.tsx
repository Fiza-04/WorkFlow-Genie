import { useState } from "react";
import { dateFormat } from "../../utils/dataOperations";
import ViewTaskModal from "./ViewTaskModal";
import { CrudButtons } from "./Buttons";

const TaskCard = ({ task, loadData, project }) => {
  const [showView, setShowView] = useState(false);

  const trashTask = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/task/trash/${task._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error trashing task");
      }

      console.log("Task trashed successfully:", data);
      return data;
    } catch (error) {
      console.error("Error trashing task:", error);
    }
  };

  const priority = () => {
    if (task.taskStage !== "completed") {
      switch (task.taskPriority) {
        case "normal":
          return "bg-blue-700";
        case "medium":
          return "bg-yellow-700";
        case "high":
          return "bg-red-700";
        default:
          return "";
      }
    } else {
      return "bg-green-700";
    }
  };

  const handleTrashTask = async () => {
    const userConfirmed = window.confirm(
      "Are you sure you want to trash this task?"
    );
    if (userConfirmed) {
      try {
        await trashTask();
        loadData();
      } catch (error) {
        alert("Failed to trash the task: " + error.message);
      }
    }
  };

  const closeModal = () => {
    setShowView(false);
  };

  return (
    <>
      <div
        key={task._id}
        className="grid grid-cols-7 gap-10 border-b border-neutral-700 text-neutral-400 h-11 p-2 ml-2 mt-2"
      >
        <p className="font-light text-[15px] flex items-center overflow-hidden whitespace-nowrap overflow-ellipsis">
          {task.taskTitle}
        </p>
        <p className="text-[14px] overflow-hidden whitespace-nowrap overflow-ellipsis">
          {dateFormat(task.taskEod).formattedDate}
        </p>
        <p className="font-light text-[15px] overflow-hidden whitespace-nowrap overflow-ellipsis">
          {task.taskDesc}
        </p>
        <p className="font-light text-[15px] overflow-hidden whitespace-nowrap overflow-ellipsis">
          {task.assignedBy.username}
        </p>
        <p className="font-light text-[15px] overflow-hidden whitespace-nowrap overflow-ellipsis">
          {task.assignedTo.username}
        </p>
        <div className="font-light text-[15px] overflow-hidden whitespace-nowrap overflow-ellipsis ">
          <p
            className={`${priority()} rounded-full w-[75%] text-center text-white`}
          >
            {task.taskStage}
          </p>
        </div>
        <CrudButtons
          type="task"
          onExpand={() => setShowView(true)}
          onTrash={() => handleTrashTask()}
          project={project}
          loadData={loadData}
          item_id={task._id}
        />
      </div>
      {showView && <ViewTaskModal task={task} onClick={closeModal} />}
    </>
  );
};

export default TaskCard;
