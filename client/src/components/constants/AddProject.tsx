import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const AddProject = ({ onClick, text = "" }) => {
  return (
    <div
      className="flex-col items-center justify-center bg_img bg_shadow rounded-[30px] w-60 h-60 hover:bg-[#19253f] hover:transition hover:duration-500 hover:ease-in-out"
      onClick={onClick}
    >
      <div className="flex items-center pl-5 pt-5">
        <FontAwesomeIcon icon={faPlus} className="text-2xl" />
        <p className="pl-5">
          {text === "goto" ? "Go To Projects" : "New Project"}
        </p>
      </div>
      <img
        src="/assets/images/rocket_3.png"
        className="h-60 rotate-45 cursor-pointer hover_img"
      />
    </div>
  );
};

export default AddProject;
