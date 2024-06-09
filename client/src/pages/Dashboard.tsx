import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const Dashboard = () => {
  const navigate = useNavigate();
  const cardDetails = [
    {
      title: "Pending",
      color: "bg-red-200",
      data: "3 Projects",
      type: "project",
    },
    {
      title: "Inprogress",
      color: "bg-yellow-200",
      data: "2 Projects",
      type: "project",
    },
    {
      title: "Completed",
      color: "bg-green-200",
      data: "5 Projects",
      type: "project",
    },
    { title: "Pending", color: "bg-red-200", data: "21 Tasks", type: "task" },
    {
      title: "Inprogress",
      color: "bg-yellow-200",
      data: "25 Tasks",
      type: "task",
    },
    {
      title: "Completed",
      color: "bg-green-200",
      data: "112 Task",
      type: "task",
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
    <div className="text-white ml-2">
      <div className="flex space-x-3 ml-7 mr-2">
        {cardDetails.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-3 h-20 items-center bg-neutral-800 rounded-[25px]"
          >
            <div
              className={`flex mr-2 items-center text-neutral-700 text-3xl justify-center ${item.color} ml-4 h-12 w-12 rounded-full`}
            >
              <FontAwesomeIcon icon={faSpinner} />
            </div>
            <div>
              <p className="text-md">{item.data}</p>
              <p className="text-sm font-thin text-neutral-400">{item.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
