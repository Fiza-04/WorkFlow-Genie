import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExpand, faTrash, faPen } from "@fortawesome/free-solid-svg-icons";

const CrudButtons = ({ onExpand }) => {
  return (
    <p className="font-light text-[15px] flex items-center space-x-4">
      <FontAwesomeIcon
        icon={faExpand}
        className="cursor-pointer p-2 hover:bg-neutral-800"
        onClick={() => onExpand}
      />
      <FontAwesomeIcon
        icon={faTrash}
        className="cursor-pointer p-2 hover:bg-neutral-800"
      />
      <FontAwesomeIcon
        icon={faPen}
        className="cursor-pointer p-2 hover:bg-neutral-800"
      />
    </p>
  );
};

export { CrudButtons };
