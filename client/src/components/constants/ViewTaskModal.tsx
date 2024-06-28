import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { dateFormat } from "../../utils/dataOperations";
import { faClose, faFireFlameCurved } from "@fortawesome/free-solid-svg-icons";

const ViewTaskModal = ({ task, onClick }) => {
  const priority = () => {
    switch (task.taskPriority) {
      case "normal":
        return "text-blue-300";
      case "medium":
        return "text-yellow-300";
      case "high":
        return "text-red-500";
      default:
        return "";
    }
  };

  const stage = () => {
    switch (task.taskStage) {
      case "pending":
        return "bg-blue-700";
      case "in-progress":
        return "bg-yellow-700";
      case "completed":
        return "bg-green-700";
      default:
        return "";
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-neutral-900 text-neutral-300 w-[30%] scrollable-div-5 icon-shadow rounded-[50px]">
        <div className="flex justify-between mt-7 ml-7 mr-6">
          <p className="text-2xl font-thin">{task.taskTitle}</p>
          <button
            onClick={onClick}
            className="cursor-pointer text-sm  hover:text-white hover:bg-neutral-900 glow-effect rounded-full p-1 pl-[12px] pr-[12px]"
          >
            <FontAwesomeIcon icon={faClose} />
          </button>
        </div>
        <div className="m-7">
          <div className="flex flex-row justify-between mr-7">
            <div className="text-[12px]">
              <p className="mb-3">Deadline: </p>
              <p className="text-[15px]">
                {dateFormat(task.taskEod).formattedDate}
              </p>
            </div>

            <div className="flex justify-center items-center space-x-3">
              <p className="text-[12px]">Days Remaining: </p>
              <div className="bg-red-600 w-[50px] p-3 rounded-full text-xl text-neutral-200 font-bold red_shadow_btn">
                10
              </div>
            </div>
          </div>
          <div className="flex flex-row justify-between mr-16 mt-7">
            <div>
              <p className="text-[12px]">Assigned By:</p>
              <p>
                <strong>{task.assignedBy.username}</strong>
              </p>
            </div>
            <div className="mr-[45px]">
              <p className="text-[12px]">Assigned To:</p>
              <p>
                <strong>{task.assignedTo.username}</strong>
              </p>
            </div>
          </div>
          <div className="flex flex-row justify-between mr-16 mt-7">
            <div className="flex items-center justify-center w-20">
              <p className="text-[12px] pr-3">Priority:</p>
              <FontAwesomeIcon
                icon={faFireFlameCurved}
                className={`${priority()} text-[30px]`}
              />
            </div>
            <div className="mr-[25px]">
              <p className="text-[12px] mb-2">Stage:</p>
              <p
                className={`text-[16px] ${stage()} pl-4 pr-4 p-1 rounded-full`}
              >
                {task.taskStage}
              </p>
            </div>
          </div>

          <div className="mt-7">
            <p className="text-[12px]">Description:</p>
            {task.taskDesc === null ? (
              <div className="pt-2 font-thin text-[14px]">
                No Description :(
              </div>
            ) : (
              <p className=" text-[17px] font-thin">{task.taskDesc}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewTaskModal;
