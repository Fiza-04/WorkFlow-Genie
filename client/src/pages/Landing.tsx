import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const Landing = () => {
  const navigate = useNavigate();

  const Images = [
    { src: "/assets/images/landing_img.png", className: "landing_img" },
    {
      src: "/assets/images/pie_chart.png",
      className: "pie_chart_img absolute",
    },
    { src: "/assets/images/clock.png", className: "clock_img absolute" },
    { src: "/assets/images/robot_2.png", className: "robot_2_img absolute" },
    { src: "/assets/images/robot_1.png", className: "robot_1_img absolute" },
  ];
  useEffect(() => {
    const token = Cookies.get("token");

    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);

  return (
    <div className="relative flex flex-col h-screen bg-gradient nunito-style">
      <div className="flex flex-col justify-between">
        <div className="flex justify-between p-6 pb-0">
          <div>
            <a href="\" className="inline-flex">
              <img src="/assets/icons/tm_logo.png" className="logo" />
              <p className="logo-text">WorkflowGenie</p>
            </a>
          </div>
          <div className="flex space-x-12 mt-6 mr-10">
            <a href="\login" className="basic_btn1 text-white">
              Login
            </a>
            <a href="\signup" className="basic_btn2 text-white">
              Sign Up
            </a>
          </div>
        </div>

        {/* Centered main image */}
        <div className="flex relative justify-end">
          {Images.map((image) => (
            <img src={image.src} alt="image" className={image.className} />
          ))}
        </div>

        <div className="absolute m-6 top-[30%] left-[5%] text-white">
          <div className="title_container mb-8">
            <span className="text-style">Task-</span>
            <span className="text-style">Manager</span>
          </div>
          <div className="font-extralight tracking-widest pl-2">
            <p className="subtext">
              Manage your tasks efficiently and effectively.
            </p>
            <p className="subtext">
              Collaborate with your team and stay on track.
            </p>
            <p className="subtext">Get real-time updates and notifications.</p>
            <p className="subtext">
              Optimize your workflow and increase productivity.
            </p>
            <p className="subtext">
              Track your progress and achieve your goals.
            </p>
          </div>
        </div>
        <a
          href="\signup"
          className="get_started swipe_btn absolute bottom-6 text-white ml-4 mt-3 p-4"
        >
          Swipe to get Started
          <div className="arrow">
            <FontAwesomeIcon icon={faArrowRight} className="icon_color" />
          </div>
        </a>
      </div>
    </div>
  );
};

export default Landing;
