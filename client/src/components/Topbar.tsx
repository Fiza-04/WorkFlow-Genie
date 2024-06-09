import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faUser } from "@fortawesome/free-solid-svg-icons";
const Topbar = () => {
  return (
    <div className="flex w-full h-24 text-white pt-5">
      <div className="text-3xl font-light p-4">Dashboard</div>
      <div className="flex space-x-8 text-lg ml-auto pr-10">
        <FontAwesomeIcon icon={faBell} className="topbar-icons" />
        <FontAwesomeIcon icon={faUser} className="topbar-icons" />
      </div>
    </div>
  );
};

export default Topbar;
