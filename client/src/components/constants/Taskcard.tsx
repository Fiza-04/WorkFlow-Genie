import { useState } from "react";
import { dateFormat } from "../../utils/dataOperations";
import ViewTaskModal from "./ViewTaskModal";
import { CrudButtons } from "./Buttons";

const TaskCard = ({ task }) => {
  const [showView, setShowView] = useState(false);

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
        <CrudButtons onExpand={() => setShowView(true)} />
      </div>
      {showView && <ViewTaskModal task={task} onClick={closeModal} />}
    </>
  );
};

export default TaskCard;
