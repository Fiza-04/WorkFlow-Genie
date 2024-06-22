import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSpinner,
  faListDots,
  faFireFlameCurved,
  faListCheck,
  faCheck,
  faFolder,
} from "@fortawesome/free-solid-svg-icons";
import AddProject from "../components/AddProject";

const Dashboard = () => {
  const navigate = useNavigate();
  const cardDetails = [
    {
      title: "Pending",
      color: "bg-red-200",
      data: "0",
      type: "Project",
      icon: faSpinner,
    },
    {
      title: "Inprogress",
      color: "bg-yellow-200",
      data: "0",
      type: "Project",
      icon: faListCheck,
    },
    {
      title: "Completed",
      color: "bg-green-200",
      data: "0",
      type: "Project",
      icon: faCheck,
    },
    {
      title: "Pending",
      color: "bg-red-200",
      data: "0",
      type: "Tasks",
      icon: faSpinner,
    },
    {
      title: "Inprogress",
      color: "bg-yellow-200",
      data: "0",
      type: "Tasks",
      icon: faListCheck,
    },
    {
      title: "Completed",
      color: "bg-green-200",
      data: "0",
      type: "Tasks",
      icon: faCheck,
    },
  ];

  const taskdata = [
    {
      type: "task",
      title: "Add functions to UI",
      projName: "WEB 1",
      endDate: "10 January 2025",
      priority: "high",
    },
    {
      type: "task",
      title: "Add functions to UI",
      projName: "WEB 1",
      endDate: "10 June 2024",
      priority: "medium",
    },
    {
      type: "task",
      title: "Add functions to UI",
      projName: "WEB 1",
      endDate: "10 June 2024",
      priority: "low",
    },
    {
      type: "projects",
      title: "ProjNAme",
      createdBy: "Fiza J",
      endDate: "10 June 2024",
      priority: "high",
    },
    {
      type: "projects",
      title: "ProjNAme",
      createdBy: "Fiza J",
      endDate: "10 June 2024",
      priority: "medium",
    },
    {
      type: "projects",
      title: "ProjNAme",
      createdBy: "Fiza J",
      endDate: "10 June 2024",
      priority: "low",
    },
  ];

  useEffect(() => {
    const token = Cookies.get("token");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const user = jwtDecode(token);
      if (!user) {
        Cookies.remove("token");
        navigate("/login");
      }
    } catch (error) {
      console.error("Invalid token:", error);
      Cookies.remove("token");
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="text-white ml-10">
      <div className="flex space-x-3 mr-2">
        {cardDetails.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-4 h-20 items-center bg-neutral-800 rounded-[25px] icon-shadow"
          >
            <div
              className={`flex mr-1 items-center text-neutral-700 text-xl justify-center ${item.color} ml-4 h-10 w-10 rounded-full`}
            >
              <FontAwesomeIcon icon={item.icon} />
            </div>
            <div className="flex-col w-32 ml-4 mr-0">
              <p className="text-[15px]">
                {item.data} {item.type}
              </p>
              <p className="text-sm font-thin text-neutral-400">{item.title}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex mt-2 space-x-4">
        <AddProject />
        <div className="dashboard_box">
          <p className="mb-3">My Tasks</p>
          {taskdata.map(
            (item) =>
              item.type === "task" && (
                <div className="mb-4 ml-1">
                  <div className="flex items-center">
                    <FontAwesomeIcon icon={faListDots} className="mr-3" />
                    <div className="w-52">
                      <p className="text-[15px] font-light">{item.title}</p>
                    </div>
                    <FontAwesomeIcon
                      icon={faFireFlameCurved}
                      className={`ml-4 ${
                        item.priority === "high"
                          ? "text-red-500"
                          : item.priority === "medium"
                          ? "text-yellow-300"
                          : "text-blue-300"
                      }`}
                    />
                  </div>
                  <p className="ml-7 text-[12px] text-neutral-500">
                    {item.projName}
                  </p>
                  <div
                    className={`${
                      item.priority === "high"
                        ? "bg-red-700"
                        : item.priority === "medium"
                        ? "bg-yellow-700"
                        : "bg-blue-700"
                    } w-24 rounded-full`}
                  >
                    <p className="text-[11px] text-center font-extralight">
                      {item.endDate}
                    </p>
                  </div>
                </div>
              )
          )}
        </div>
        <div className="dashboard_box">
          <p className="mb-3">My Projects</p>
          {taskdata.map(
            (item) =>
              item.type === "projects" && (
                <div className="mb-4 ml-1">
                  <div className="flex items-center">
                    <FontAwesomeIcon icon={faFolder} className="mr-3" />
                    <div className="w-52">
                      <p className="text-[15px] font-light">{item.title}</p>
                    </div>
                    <FontAwesomeIcon
                      icon={faFireFlameCurved}
                      className={`ml-4 ${
                        item.priority === "high"
                          ? "text-red-500"
                          : item.priority === "medium"
                          ? "text-yellow-300"
                          : "text-blue-300"
                      }`}
                    />
                  </div>
                  <p className="ml-7 text-[12px] text-neutral-500">
                    {item.createdBy}
                  </p>
                  <div
                    className={`${
                      item.priority === "high"
                        ? "bg-red-700"
                        : item.priority === "medium"
                        ? "bg-yellow-700"
                        : "bg-blue-700"
                    } w-24 rounded-full`}
                  >
                    <p className="text-[11px] text-center font-extralight">
                      {item.endDate}
                    </p>
                  </div>
                </div>
              )
          )}
        </div>
        <div className="bg-neutral-800 icon-shadow rounded-[30px] w-[25%] h-72">
          OverAll Stats
        </div>
      </div>
      <div className="flex mt-1">
        <div className="mt-[-3%] bg-neutral-800 icon-shadow rounded-[30px] w-60 h-70 mr-3">
          Daily Progress
        </div>
        <div className="w-[35%] h-52">Bar Chart</div>
        <div className="bg-neutral-800 ml-3 icon-shadow rounded-[30px] w-52 h-52">
          Team members
        </div>
        <div className="w-[19rem] h-52">Calendar</div>
      </div>
    </div>
  );
};

export default Dashboard;
