import { useState } from "react";

const MultiSelectDropdown = ({ options, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSelect = (user) => {
    const userId = user._id;
    const isAlreadySelected = selectedUsers.some((u) => u._id === userId);

    const newSelectedUsers = isAlreadySelected
      ? selectedUsers.filter((u) => u._id !== userId)
      : [...selectedUsers, user];
    setSelectedUsers(newSelectedUsers);

    const userIds = newSelectedUsers.map((user) => user._id);
    onSelect(userIds);
  };

  const isSelected = (userId) =>
    selectedUsers.some((user) => user._id === userId);

  return (
    <div className="relative inline-block w-full">
      <div
        className="border rounded-[10px] p-2 cursor-pointer"
        onClick={toggleDropdown}
      >
        {selectedUsers.length > 0
          ? selectedUsers
              .map((user) => `${user.username} (${user.email})`)
              .join(", ")
          : "Select users"}
      </div>
      {isOpen && (
        <div className="absolute z-10 w-full bg-neutral-800 rounded-md mt-1">
          {options.map((user) => (
            <div
              key={user._id}
              className={`p-2 cursor-pointer ${
                isSelected(user._id)
                  ? "bg-neutral-700 icon-shadow text-white"
                  : ""
              }`}
              onClick={() => handleSelect(user)}
            >
              {`${user.username} (${user.email})`}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiSelectDropdown;
