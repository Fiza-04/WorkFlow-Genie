import { dateFormat } from "../../utils/dataOperations";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExpand, faTrash, faPen } from "@fortawesome/free-solid-svg-icons";

const ProjectCards = ({ project, taskCounts }) => {
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
  return (
    <div
      key={project._id}
      className="grid grid-cols-6 gap-10 border-b border-neutral-700 text-neutral-400 h-11 p-2 ml-2 mt-2"
    >
      <p className="font-light text-[15px] flex items-center overflow-hidden whitespace-nowrap overflow-ellipsis">
        {project.title}
      </p>
      <p className="text-[14px] overflow-hidden whitespace-nowrap overflow-ellipsis">
        {dateFormat(project.eod)}
      </p>
      <p className="font-light text-[15px] overflow-hidden whitespace-nowrap overflow-ellipsis">
        {project.desc}
      </p>
      <p className="font-light text-[15px] overflow-hidden whitespace-nowrap overflow-ellipsis">
        {project.createdBy}
      </p>
      <div className="font-light text-[15px] overflow-hidden whitespace-nowrap overflow-ellipsis ">
        <p
          className={`${priority()} rounded-full w-[75%] text-center text-white`}
        >
          {project.stage}
        </p>
      </div>
      <p className="font-light text-[15px] flex items-center space-x-4">
        <FontAwesomeIcon
          icon={faExpand}
          className="cursor-pointer p-2 hover:bg-neutral-800"
        />
        <FontAwesomeIcon
          icon={faTrash}
          className="cursor-pointer p-2 hover:bg-neutral-800"
        />
        <FontAwesomeIcon
          icon={faPen}
          className="cursor-pointer p-2 hover:bg-neutral-800"
        />
      </p>
    </div>
  );
};

export default ProjectCards;
