import {
  faFireFlameCurved,
  faSpinner,
  faCheck,
  faListCheck,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation } from "react-router-dom";
import { dateFormat } from "../utils/dataOperations";

const ProjectDashboard = () => {
  const location = useLocation();
  const { project } = location.state;

  console.log(project);

  const priority = () => {
    switch (project.priority) {
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
    switch (project.stage) {
      case "pending":
        return { color: "bg-red-200", icon: faSpinner };
      case "in-progress":
        return { color: "bg-yellow-200", icon: faListCheck };
      case "completed":
        return { color: "bg-green-200", icon: faCheck };
      default:
        return "";
    }
  };

  return (
    <div className="ml-7 mr-5 h-[83%] p-2">
      <div className="flex flex-row space-x-12 text-neutral-300 font-light mb-5">
        <p>Overview</p>
        <p>Tasks</p>
      </div>
      <div className="flex flex-row">
        <div className="w-[50%]  scrollable-div-2">
          <p className="text-neutral-400 font-light text-justify">
            {project.desc}
          </p>
        </div>
        <div className="ml-12 h-28 w-[50%]">
          <div className="ml-2 flex flex-row  space-x-16">
            <div className="">
              <p className="font-light text-neutral-300 mb-1">Priority</p>
              <FontAwesomeIcon
                icon={faFireFlameCurved}
                className={`text-4xl ${priority()} p-2`}
              />
              <p className="text-[15px] text-center font-light text-neutral-300">
                {project.priority}
              </p>
            </div>
            <div className="">
              <p className="font-light text-neutral-300  mb-2">Stage</p>
              <FontAwesomeIcon
                icon={stage().icon}
                className={`text-2xl ${stage().color} p-2 m-1 rounded-full`}
              />
              <p className="text-[15px] font-light text-neutral-300">
                {project.stage}
              </p>
            </div>
            <div className="mt-2">
              <p className="font-light text-neutral-300 text-center mb-2">
                Deadline
              </p>
              <p className="text-[15px] font-light text-neutral-300 icon-shadow p-4 rounded-[10px]">
                {dateFormat(project.eod).formattedDate}
              </p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <p className="font-light text-neutral-300 text-center mb-2">
                Remaining Days
              </p>
              <div className="bg-red-200 red_shadow w-14 h-14 flex items-center justify-center rounded-full">
                <p className="text-[25px] font-bold text-neutral-800 text-center">
                  {dateFormat(project.eod).remainingDays}
                </p>
              </div>
            </div>
          </div>

          <div className=" mt-10 h-40 flex-wrap">
            <p className="text-xl text-neutral-500">Team Members</p>
            <div className="grid grid-cols-3 gap-7 mt-3 text-neutral-300 font-light h-28">
              {project.team > 0 ? (
                <div className="flex flex-row">
                  <FontAwesomeIcon
                    icon={faUser}
                    className="p-3  rounded-full icon-shadow"
                  />
                  <div className="flex flex-col ml-2 mt-2">
                    <p>{project.team.email}</p>
                  </div>
                </div>
              ) : (
                <div></div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDashboard;
