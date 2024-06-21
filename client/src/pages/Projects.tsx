import { useState, useEffect, useRef } from "react";
import ProjectCard from "../components/ProjectCard";

const Projects = () => {
  const hasFetchedData = useRef(false);
  const [projectData, setProjectData] = useState([]);

  const data = [
    { title: "All", count: "12", color: "bg-purple-300 purple_shadow" },
    { title: "Pending", count: "35", color: "bg-red-200 red_shadow" },
    { title: "In-progress", count: "67", color: "bg-yellow-200 yellow_shadow" },
    { title: "Completed", count: "6", color: "bg-green-300 green_shadow" },
  ];

  async function getProjectData() {
    try {
      const response = await fetch("http://localhost:3000/api/");

      if (!response.status) {
        throw new Error("Data not fetched");
      }

      const result = await response.json();
      console.log(result);
      setProjectData(result.projects || []);
    } catch (error) {
      console.log(error);
      setProjectData([]);
    }
  }

  useEffect(() => {
    if (!hasFetchedData.current) {
      getProjectData();
      hasFetchedData.current = true;
    }
  }, []);

  return (
    <div className="flex w-[100%] h-[80%]">
      <div className="flex flex-col bg-neutral-800 m-5 w-[800px] h-[100%] rounded-[20px] icon-shadow">
        <div className="flex flex-wrap ml-3 mt-2 h-[50%]">
          {data.map((item) => (
            <div
              className={`${item.color} w-[40%] h-[40%] m-2 rounded-[20px] flex-col text-center justify-center`}
            >
              <div className="pt-5 text-[30px] font-medium">{item.count}</div>
              <div className="text-sm font-normal text-neutral-800">
                {item.title}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-row flex-wrap">
        {projectData.length > 0 ? (
          projectData.map((project, key) => (
            <ProjectCard key={key} project={project} />
          ))
        ) : (
          <div className="text-white">Add New Project</div>
        )}
      </div>
    </div>
  );
};

export default Projects;
