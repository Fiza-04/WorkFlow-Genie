import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faUser } from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";

const Topbar = () => {
  const location = useLocation();

  const getHeading = () => {
    switch (location.pathname) {
      case "/dashboard":
        return "Dashboard";
      case "/profile":
        return "Profile";
      case "/projects":
        return "Projects";
      case "/dump":
        return "Trash";
      default:
        return "Dashboard";
    }
  };

  return (
    <div className="flex w-full h-24 text-white pt-5">
      <div className="text-3xl font-light p-4">{getHeading()}</div>
      <div className="flex space-x-8 text-lg ml-auto pr-10">
        <FontAwesomeIcon icon={faBell} className="topbar-icons" />
        <FontAwesomeIcon icon={faUser} className="topbar-icons" />
      </div>
    </div>
  );
};

export default Topbar;
