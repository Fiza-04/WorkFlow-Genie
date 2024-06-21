import { useEffect, useRef } from "react";
import { dateFormat } from "../utils/dataOperations";

const ProjectCard = ({ project }) => {
  const hasFetchedData = useRef(false);

  async function getTaskCount() {
    try {
      const response = await fetch(
        `http://localhost:3000/api/task/count/${project._id}`
      );

      if (!response.status) {
        throw new Error("Tasks not fetched");
      }

      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (!hasFetchedData.current) {
      getTaskCount(project._id);
      hasFetchedData.current = true;
    }
  }, [project._id]);

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
            <b className="font-bold text-[15px]">12</b> Pending
          </p>
          <p>
            <b className="font-bold text-[15px]">12</b> In-progress
          </p>
          <p>
            <b className="font-bold text-[15px]">8</b> Completed
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
