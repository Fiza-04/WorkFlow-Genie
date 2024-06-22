import { useState, useEffect, useRef } from "react";
import ProjectCard from "../components/ProjectCard";
import AddProject from "../components/AddProject";
import AddEditForms from "../components/AddEditForms";

const Projects = () => {
  const hasFetchedData = useRef(false);
  const [projectData, setProjectData] = useState([]);
  const [taskCounts, setTaskCounts] = useState({});
  const [visibility, setVisibility] = useState(false);

  const data = [
    { title: "All", count: "0", color: "bg-purple-300 purple_shadow" },
    { title: "Pending", count: "0", color: "bg-red-200 red_shadow" },
    { title: "In-progress", count: "0", color: "bg-yellow-200 yellow_shadow" },
    { title: "Completed", count: "0", color: "bg-green-300 green_shadow" },
  ];

  const getProjectData = async () => {
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
  };

  const fetchTaskCounts = async (projectId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/task/count/${projectId}`
      );

      if (!response.status) {
        throw new Error("Tasks not fetched");
      }

      const result = await response.json();
      console.log(result.count);
      return result.count;
    } catch (error) {
      console.error("Error fetching task counts:", error);
      return { pending: 0, inProgress: 0, completed: 0 };
    }
  };

  const fetchAllTaskCounts = async (projects) => {
    const counts = {};
    for (const project of projects) {
      counts[project._id] = await fetchTaskCounts(project._id);
    }

    setTaskCounts(counts);
  };

  useEffect(() => {
    if (!hasFetchedData.current) {
      getProjectData();
      hasFetchedData.current = true;
    }
  }, []);

  useEffect(() => {
    if (projectData.length > 0) {
      fetchAllTaskCounts(projectData);
    }
  }, [projectData]);

  const openForm = () => {
    return setVisibility(true);
  };

  const closeForm = () => {
    return setVisibility(false);
  };

  return (
    <div className="flex w-[100%] h-[80%]">
      <div className="flex flex-col  w-[25%]">
        <div className="bg-neutral-800 ml-7 mr-5 h-[50%] rounded-[20px] icon-shadow">
          <div className="flex flex-wrap ml-3 mt-2 h-[50%]">
            {data.map((item) => (
              <div
                className={`${item.color} w-[40%] h-[80%] m-2 rounded-[20px] flex-col text-center justify-center`}
              >
                <div className="pt-5 text-[30px] font-medium">{item.count}</div>
                <div className="text-sm font-normal text-neutral-800">
                  {item.title}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 ml-6 text-white">
          <AddProject onClick={openForm} />
        </div>
      </div>

      <div className="w-[70%]">
        {visibility ? (
          <div className="text-white scrollable-div">
            <AddEditForms onClick={closeForm} />
          </div>
        ) : (
          <div className="flex flex-row flex-wrap scrollable-div">
            {projectData.length > 0 ? (
              projectData.map((project, key) => (
                <ProjectCard
                  key={key}
                  project={project}
                  taskCounts={taskCounts[project._id]}
                />
              ))
            ) : (
              <div className="flex flex-col p-40 font-light text-neutral-600">
                <p className="text-3xl pb-3">Hey! user1</p>
                <p className="text-xl pb-3">
                  Looks like you don't have any projects yet!!
                </p>
                <p className="text-xl">Get started on your first one!</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;
