import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cookies from "js-cookie";
import { faRightFromBracket, faUser } from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Profile } from "../pages";

const Topbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showProfile, setShowProfile] = useState(false);
  const { project } = location.state || {};

  const getHeading = () => {
    switch (location.pathname) {
      case "/projects":
        return "Projects";
      case "/project-dashboard":
        return project ? `${project.title}` : "Project Dashboard";
      case "/dump":
        return "Trash";
      default:
        return "Projects";
    }
  };

  async function handleLogout() {
    try {
      const response = await fetch("http://localhost:3000/api/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      if (data.status === "ok") {
        Cookies.remove("token");
        navigate("/");
      } else {
        console.error("Failed to log out:", data.message);
      }
    } catch (error) {
      console.error("Failed to log out:", error);
    }
  }

  return (
    <div className="flex w-full h-24 text-white pt-5">
      <div className="text-3xl font-light p-4">{getHeading()}</div>
      <div className="flex space-x-8 text-lg ml-auto pr-10">
        <FontAwesomeIcon
          icon={faRightFromBracket}
          className="topbar-icons hover:bg-neutral-900"
          onClick={() => handleLogout()}
        />
        <FontAwesomeIcon
          icon={faUser}
          className="topbar-icons hover:bg-neutral-900"
          onClick={() => setShowProfile(true)}
        />
      </div>
      {showProfile ? <Profile onClose={() => setShowProfile(false)} /> : ""}
    </div>
  );
};

export default Topbar;
