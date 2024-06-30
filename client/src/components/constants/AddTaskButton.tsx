import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import AddTaskModal from "./AddTaskModal";

const AddTaskButton = ({ project, onTaskAdded }) => {
  const [showTaskModal, setShowTaskModal] = useState(false);

  const closeTaskModal = () => {
    setShowTaskModal(false);
    if (onTaskAdded) {
      onTaskAdded();
    }
  };

  return (
    <div className="">
      <a
        onClick={() => setShowTaskModal(true)}
        className="mt-1 text-neutral-400 cursor-pointer hover:bg-neutral-900 p-2 w-[70%] rounded-[10px] hover:text-neutral-100 glow-effect"
      >
        <FontAwesomeIcon icon={faPlus} /> Add Task
      </a>
      {showTaskModal ? (
        <AddTaskModal
          onClick={() => closeTaskModal()}
          project={project}
          flag="add"
          existingTask=""
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default AddTaskButton;
