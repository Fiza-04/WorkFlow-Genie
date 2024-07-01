import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import {
  faAngleLeft,
  faListCheck,
  faUser,
  faTrash,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Profile from "../pages/Profile";

const Sidebar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const [showProfile, setShowProfile] = useState(false);

  const MenuItems = [
    { title: "Profile", src: faUser, func: () => setShowProfile(true) },
    { title: "Projects", src: faListCheck, route: "/projects" },
    { title: "Trash", src: faTrash, route: "/dump" },
    {
      title: "Logout",
      src: faRightFromBracket,
      rotate: true,
      func: handleLogout,
    },
  ];

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
    <div>
      <div
        className={` ${
          open ? "w-72 md:w-60" : "w-20 "
        } h-screen pl-1 pt-8 relative duration-300 bg-neutral-800 right-shadow`}
      >
        <FontAwesomeIcon
          icon={faAngleLeft}
          className={`absolute cursor-pointer top-32 -right-3 p-[5px] w-3 h-3 border-2 border-neutral-800 bg-white rounded-full  ${
            !open && "rotate-180"
          }`}
          onClick={() => setOpen(!open)}
        />
        <div className="flex gap-x-4 items-center">
          <img
            src="/assets/icons/tm_logo.png"
            className={`cursor-pointer w-[70px] h-[70px] duration-700 ${
              open && "rotate-[360deg]"
            }`}
          />
          <h1
            className={`text-white nunito-style origin-left font-light text-xl duration-200 ${
              !open && "scale-0"
            }`}
          >
            WorkflowGenie
          </h1>
        </div>
        <ul className="pt-6">
          {MenuItems.map((menu, index) => (
            <li
              key={index}
              className={`text-white text-md font-light flex items-center gap-x-4 cursor-pointer p-3 m-2 hover:bg-neutral-900 hover-shadow rounded-md ${
                !open && "mr-6"
              }`}
              onClick={() => {
                if (menu.func) {
                  menu.func();
                } else if (menu.route) {
                  navigate(menu.route);
                }
              }}
            >
              <FontAwesomeIcon
                icon={menu.src}
                className={` ${menu.rotate && "rotate-180"} w-5 h-5`}
              />
              <span className={`${!open && "hidden"} origin-left duration-700`}>
                {menu.title}
              </span>
            </li>
          ))}
        </ul>
      </div>
      {showProfile ? <Profile onClose={() => setShowProfile(false)} /> : ""}
    </div>
  );
};

export default Sidebar;
