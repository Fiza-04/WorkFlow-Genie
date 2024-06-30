import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExpand, faTrash, faPen } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import AddTaskModal from "./AddTaskModal";
import AddEditForms from "./AddEditForms";

const CrudButtons = ({
  type = "project",
  onExpand,
  onTrash,
  project,
  loadData,
  item_id,
  isCreator,
}) => {
  const [showTaskEdit, setShowTaskEdit] = useState(false);
  const [showProjectEdit, setShowProjectEdit] = useState(false);

  const closeModal = () => {
    if (type === "project") {
      setShowProjectEdit(false);
    } else if (type === "task") {
      setShowTaskEdit(false);
    }

    if (loadData) {
      loadData();
    }
  };

  return (
    <p className="font-light text-[15px] flex items-center space-x-4">
      <FontAwesomeIcon
        icon={faExpand}
        className="cursor-pointer p-2 hover:bg-neutral-800"
        onClick={onExpand}
      />
      {isCreator && (
        <>
          <FontAwesomeIcon
            icon={faPen}
            className="cursor-pointer p-2 hover:bg-neutral-800"
            onClick={() => {
              if (type === "project") {
                setShowProjectEdit(true);
              } else if (type === "task") {
                setShowTaskEdit(true);
              }
            }}
          />
          {type === "project" && showProjectEdit && (
            <AddEditForms
              onClick={closeModal}
              flag="edit"
              existingProject={project}
            />
          )}
          {type === "task" && showTaskEdit && (
            <AddTaskModal
              onClick={closeModal}
              project={project}
              flag="edit"
              existingTask={item_id}
            />
          )}
          <FontAwesomeIcon
            icon={faTrash}
            className="cursor-pointer p-2 hover:bg-neutral-800"
            onClick={onTrash}
          />
        </>
      )}
    </p>
  );
};

export { CrudButtons };
