import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import TextArea from "./TextArea";
import MultiSelectDropdown from "./MultiSelectDropdown";
import { authControll } from "../../utils/dataOperations";

const AddEditForms = ({ onClick }) => {
  const hasFetchedData = useRef(false);
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [eod, setEndDate] = useState("");
  const [desc, setDesc] = useState("");
  const [priority, setPriority] = useState("normal");
  const [stage, setStage] = useState("pending");
  const [teamIds, setTeamIds] = useState([]);
  const [options, setOptions] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const user = await authControll(navigate, true);
      if (user) {
        setUserId(user.userId);
        fetchUsername(user.userId);
      }
    };

    if (!hasFetchedData.current) {
      fetchData();
      hasFetchedData.current = true;
    }
  }, []);

  const fetchUsername = async (currentUserId) => {
    try {
      const response = await fetch("http://localhost:3000/api/users");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const result = await response.json();

      const filteredOptions = result.filter(
        (user) => user._id !== currentUserId
      );
      console.log(filteredOptions);
      setOptions(filteredOptions);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const addProject = async (event) => {
    event.preventDefault();
    const team = [...teamIds, userId];

    const response = await fetch("http://localhost:3000/api/new-project", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        eod,
        desc,
        priority,
        stage,
        team: team,
        createdBy: userId,
      }),
    });

    const data = await response.json();

    if (data.status) {
      alert("Project Added Successfully");
      onClick(true);
    } else {
      alert("Error adding project");
    }
  };

  const handleSelect = (selectedUsers) => {
    setTeamIds(selectedUsers);
  };

  const handlePriorityChange = (event) => {
    setPriority(event.target.value);
  };

  const handleStageChange = (event) => {
    setStage(event.target.value);
  };

  return (
    <div className="">
      <div className="flex flex-row mb-5 justify-between items-center  top-0 bg-neutral-800 z-10 p-4 rounded-[20px] icon-shadow">
        <p className="text-3xl">New Project</p>
        <p className="ml-auto cursor-pointer" onClick={onClick}>
          Close
        </p>
      </div>

      <form
        className="flex flex-col space-y-10 pl-5 pr-5"
        onSubmit={addProject}
      >
        <div className="flex flex-col space-y-1">
          <label htmlFor="title">Project Name</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Project Name"
            className="input-style text-sm"
          />
        </div>
        <div className="flex flex-row space-x-20">
          <div className="flex flex-col space-y-1">
            <label htmlFor="endDate">End Date</label>
            <input
              value={eod}
              onChange={(e) => setEndDate(e.target.value)}
              type="date"
              placeholder="End Date"
              className="input-style w-40"
            />
          </div>
          <div className="flex flex-col space-y-1">
            <label htmlFor="priority">Priority</label>
            <select
              id="priority"
              name="priority"
              value={priority}
              onChange={handlePriorityChange}
              className="input-style w-40"
            >
              <option value="normal">Normal</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <div className="flex flex-col space-y-1">
            <label htmlFor="stage">Stage</label>
            <select
              id="stage"
              name="stage"
              value={stage}
              onChange={handleStageChange}
              className="input-style  w-40"
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Complete</option>
            </select>
          </div>
        </div>
        <TextArea value={desc} onChange={(e) => setDesc(e.target.value)} />
        <div className="flex flex-col space-y-1">
          <label>Select Team Members</label>
          <MultiSelectDropdown options={options} onSelect={handleSelect} />
        </div>

        <input type="submit" value="Add Project" />
      </form>
    </div>
  );
};

export default AddEditForms;
