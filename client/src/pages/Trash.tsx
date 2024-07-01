import { faRotate, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { authControll } from "../utils/dataOperations";

const Trash = () => {
  const hasFetchedData = useRef(false);
  const navigate = useNavigate();
  const [projectData, setProjectData] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const user = await authControll(navigate, true);
      if (user) {
        setUserId(user.userId);
      }
    };

    fetchData();
  }, [navigate]);

  const getTrashedProjectData = async () => {
    try {
      if (!userId) {
        throw new Error("User ID is not set");
      }

      const response = await fetch(
        `http://localhost:3000/api/trashed/${userId}?isTrashed=true`
      );

      if (!response.ok) {
        throw new Error("Data not fetched");
      }

      const result = await response.json();
      setProjectData(result.projects);
    } catch (error) {
      console.log(error.message);
      setProjectData([]);
    }
  };

  const priority = (priority, stage) => {
    if (stage !== "completed") {
      switch (priority) {
        case "normal":
          return "bg-blue-700";
        case "medium":
          return "bg-yellow-700";
        case "high":
          return "bg-red-700";
        default:
          return "";
      }
    } else {
      return "bg-green-700";
    }
  };

  const handleDeleteProject = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/delete-restore/${id}?action=delete`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete project");
      }

      getTrashedProjectData(); // Refresh the data
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleRestoreProject = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/delete-restore/${id}?action=restore`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to restore project");
      }

      getTrashedProjectData();
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeleteAllProjects = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/delete-restore/?action=deleteAll`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete all projects");
      }

      getTrashedProjectData();
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleRestoreAllProjects = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/delete-restore/?action=restoreAll`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to restore all projects");
      }

      getTrashedProjectData();
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (userId && !hasFetchedData.current) {
      getTrashedProjectData();
      hasFetchedData.current = true;
    }
  }, [userId]);

  return (
    <div className="h-[82%] mr-7 ml-7">
      <div className="flex flex-row space-x-12 text-neutral-300 font-light mb-0 relative">
        <p className={`cursor-auto hover:text-neutral-50 glow-effect`}>
          Projects
        </p>
      </div>
      <div className="scrollable-div">
        <div className="flex justify-end mr-2 mb-3">
          <div className="flex flex-row text-[15px] text-neutral-300">
            <p className="icon-shadow pt-2 pb-2 pl-6 pr-6 rounded-l-[15px]">
              All
            </p>
            <p
              className="icon-shadow pt-2 pb-2 pl-6 pr-6 cursor-pointer hover:bg-neutral-700"
              onClick={handleDeleteAllProjects}
            >
              Delete
            </p>
            <p
              className="icon-shadow pt-2 pb-2 pl-6 pr-6 cursor-pointer hover:bg-neutral-700"
              onClick={handleRestoreAllProjects}
            >
              Restore
            </p>
          </div>
        </div>
        <div className="flex flex-row flex-wrap space-between">
          {projectData.length > 0 ? (
            projectData.map((project) => (
              <div
                key={project._id}
                className="w-[30%] h-[120px] icon-shadow rounded-[12px] mr-5 mb-3"
              >
                <div className="flex flex-row justify-between p-4">
                  <div>
                    <p className="text-[16px] font-light text-neutral-400 w-52  overflow-hidden whitespace-nowrap overflow-ellipsis ">
                      {project.title}
                    </p>
                    <p
                      className={`flex justify-center mt-1 text-[12px] text-neutral-200 font-normal w-24 rounded-full ${priority(
                        project.priority,
                        project.stage
                      )}`}
                    >
                      {project.stage}
                    </p>
                  </div>
                  <p className="text-neutral-300 text-[12px] space-x-2">
                    <FontAwesomeIcon
                      icon={faTrash}
                      className="bg-neutral-900 p-2 rounded-full hover:bg-neutral-950 hover:text-neutral-50 cursor-pointer"
                      onClick={() => handleDeleteProject(project._id)}
                    />
                    <FontAwesomeIcon
                      icon={faRotate}
                      className="bg-neutral-900 p-2 rounded-full hover:bg-neutral-950 hover:text-neutral-50 cursor-pointer"
                      onClick={() => handleRestoreProject(project._id)}
                    />
                  </p>
                </div>
                <div className="text-neutral-200 font-thin text-[14px] mr-5 ml-5 w-72 overflow-hidden whitespace-nowrap overflow-ellipsis">
                  {project.desc !== "" ? (
                    <p>{project.desc}</p>
                  ) : (
                    "No description :("
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="text-neutral-500 text-[20px] flex flex-col items-center font-thin w-full">
              <p>Hey! No trashed projects.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Trash;
