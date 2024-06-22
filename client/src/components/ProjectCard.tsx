import { dateFormat } from "../utils/dataOperations";

const ProjectCard = ({ project, taskCounts }) => {
  return (
    <div
      key={project._id}
      className="flex-col w-72 h-44 ml-5 mt-5 project_shadow rounded-[30px] "
    >
      <div className="mt-5 ml-3">
        <div className="flex flex-row mb-1">
          <div className="w-[70%] text-wrap">
            <h1 className="font-semibold text-[19px]">{project.title}</h1>
          </div>
          <div className="border-b mb-2  border-neutral-600">
            <a href="#" className="font-normal text-xs">
              View Details
            </a>
          </div>
        </div>

        <p className="text-[10px] mb-1">End date: {dateFormat(project.eod)}</p>
        <div className="h-[60px]">
          <p className="text-wrap font-light text-sm w-[80%]">{project.desc}</p>
        </div>
        <div className="flex flex-row font-light text-[12px] space-x-6">
          <p>
            <b className="font-bold text-[15px]">{taskCounts?.pending || 0} </b>
            Pending
          </p>
          <p>
            <b className="font-bold text-[15px]">
              {taskCounts?.inProgress || 0}{" "}
            </b>
            In-progress
          </p>
          <p>
            <b className="font-bold text-[15px]">
              {taskCounts?.completed || 0}{" "}
            </b>
            Completed
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
