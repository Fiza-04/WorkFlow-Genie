import { useState, useEffect, useRef } from "react";
import ProjectCard from "../components/constants/ProjectCard";
import AddProject from "../components/constants/AddProject";
import AddEditForms from "../components/constants/AddEditForms";
import { authControll } from "../utils/dataOperations";
import { useNavigate } from "react-router-dom";

const Projects = () => {
  const hasFetchedData = useRef(false);
  const navigate = useNavigate();

  const [projectData, setProjectData] = useState({
    projects: [],
    count: { all: 0, pending: 0, inProgress: 0, completed: 0 },
  });
  const [userId, setUserId] = useState(null);
  const [visibility, setVisibility] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const user = await authControll(navigate, true);
      if (user) {
        setUserId(user.userId);
      }
    };

    fetchData();
  }, [navigate]);

  const getProjectData = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/all/${userId}`);

      if (!response.ok) {
        throw new Error("Data not fetched");
      }

      const result = await response.json();
      setProjectData(result);
    } catch (error) {
      console.log(error);
      setProjectData({
        projects: [],
        count: { all: 0, pending: 0, inProgress: 0, completed: 0 },
      });
    }
  };

  const openForm = () => {
    return setVisibility(true);
  };

  const handleProject = () => {
    getProjectData();
  };

  const closeForm = (flag = false) => {
    if (flag) {
      handleProject();
    }
    return setVisibility(false);
  };

  const data = [
    {
      title: "All",
      count: `${projectData.count.all}`,
      color: "bg-purple-500 purple_shadow",
    },
    {
      title: "Pending",
      count: `${projectData.count.pending}`,
      color: "bg-red-500 red_shadow_2",
    },
    {
      title: "In-progress",
      count: `${projectData.count.inProgress}`,
      color: "bg-yellow-200 yellow_shadow",
    },
    {
      title: "Completed",
      count: `${projectData.count.completed}`,
      color: "bg-green-300 green_shadow",
    },
  ];

  useEffect(() => {
    if (userId && !hasFetchedData.current) {
      handleProject();
      hasFetchedData.current = true;
    }
  }, [userId]);

  return (
    <div className="flex w-[100%] h-[80%]">
      <div className="flex flex-col  w-[25%]">
        <div className="bg-neutral-800 ml-7 mr-5 h-[50%] rounded-[20px] icon-shadow">
          <div className="flex flex-wrap ml-3 mt-2 h-[50%]">
            {data.map((item) => (
              <div
                key={item.title}
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
      <div className="w-[73%]">
        {visibility ? (
          <div className="text-white scrollable-div">
            <AddEditForms onClick={closeForm} flag="add" existingProject={""} />
          </div>
        ) : (
          <div className="scrollable-div">
            <div className="bg-neutral-800 icon-shadow w-full grid grid-cols-6 gap-10 p-2 sticky top-0 text-neutral-400">
              <p className="text-start">Title</p>
              <p className="text-start">Deadline</p>
              <p className="text-start">Description</p>
              <p className="text-start">Created By</p>
              <p className="text-start">Status</p>
              <p className="text-start"></p>
            </div>
            {projectData.projects.length > 0 ? (
              projectData.projects.map((project) => (
                <ProjectCard
                  key={project._id}
                  project={project}
                  loadData={() => handleProject()}
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
