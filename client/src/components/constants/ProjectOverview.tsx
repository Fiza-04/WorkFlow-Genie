import {
  faFireFlameCurved,
  faSpinner,
  faCheck,
  faListCheck,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation } from "react-router-dom";
import { dateFormat } from "../../utils/dataOperations";
import { Tooltip } from "react-tooltip";
import TaskCount from "./TaskCount";

const ProjectOverview = () => {
  const location = useLocation();
  const { project } = location.state;

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
    <div>
      <div className="flex flex-row">
        <div className="w-[50%]  scrollable-div-2">
          {project.desc === "" ? (
            <p className="flex justify-center items-center h-44 text-xl text-neutral-600">
              No Description Found :(
            </p>
          ) : (
            <p className="text-neutral-400 font-light text-justify">
              {project.desc}
            </p>
          )}
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

          <div className=" mt-7 h-40 flex-wrap scrollable-div-3">
            <p className="text-xl text-neutral-500 mb-4">Team Members</p>
            <div className="grid grid-cols-3 gap-7 mt-0 text-neutral-300 font-light h-24">
              {project.team && project.team.length > 0 ? (
                project.team.map((member, index) => (
                  <div key={index}>
                    <a
                      data-tooltip-id={`${member.email}`}
                      data-tooltip-content={`${member.email}`}
                      data-tooltip-place="top"
                      className="flex flex-row items-center h-8 cursor-pointer"
                    >
                      <FontAwesomeIcon
                        icon={faUser}
                        className="p-3 rounded-full icon-shadow"
                      />
                      <div className="flex flex-col ml-2 mt-0">
                        <p className="hover:text-neutral-100 glow-effect">
                          {member.username}
                        </p>
                      </div>
                    </a>
                    <Tooltip id={`${member.email}`} />
                  </div>
                ))
              ) : (
                <p className="text-neutral-300">No team members available</p>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row">
        <div className="rounded-[20px] ml-[-2%] w-[48%] mt-7 h-40">
          <TaskCount flag="overview" project={project._id} />
        </div>
        <div className="icon-shadow rounded-[20px] mt-0 ml-9 w-[52%] h-64  flex justify-center items-center">
          {project.tasks.length > 0 ? (
            <div>tasks found</div>
          ) : (
            <div className="flex justify-center items-center">
              <img src="/assets/images/no_tasks_3.png" width={130} />
              <div className="flex flex-col">
                <p className="font-semibold text-xl text-neutral-500">
                  No Tasks Found!!
                </p>
                {/* <AddTaskButton project={project} /> */}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectOverview;
