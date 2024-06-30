import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import TextArea from "./TextArea";
import MultiSelectDropdown from "./MultiSelectDropdown";
import { authControll, dateFormat } from "../../utils/dataOperations";

const AddEditForms = ({ onClick, flag = "add", existingProject }) => {
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
      if (flag === "edit" && existingProject) {
        console.log(existingProject);
        setTitle(existingProject.title);
        setEndDate(dateFormat(existingProject.eod).otherformattedDate);
        setDesc(existingProject.desc);
        setPriority(existingProject.priority);
        setStage(existingProject.stage);
        setTeamIds(existingProject.team.map((member) => member._id));
      }

      hasFetchedData.current = true;
    }
  }, [flag, existingProject, navigate]);

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
      setOptions(filteredOptions);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const team = [...teamIds, userId];
    const projectData = {
      title,
      eod,
      desc,
      priority,
      stage,
      team: team,
      createdBy: userId,
    };

    const url =
      flag === "add"
        ? "http://localhost:3000/api/new-project"
        : `http://localhost:3000/api/update/${existingProject._id}`;
    const method = flag === "add" ? "POST" : "PUT";

    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(projectData),
    });

    const data = await response.json();

    if (data.status) {
      alert(
        flag === "add"
          ? "Project Added Successfully"
          : "Project Updated Successfully"
      );
      onClick(true);
    } else {
      alert("Error saving project");
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-neutral-900 text-neutral-300 w-[40%] mr-5 ml-5 scrollable-div icon-shadow rounded-[50px]">
        <div className="flex flex-row mb-5 justify-between items-center top-0 m-7">
          <p className="text-3xl">
            {flag === "add" ? "New Project" : "Edit Project"}
          </p>
          <p className="ml-auto cursor-pointer" onClick={onClick}>
            Close
          </p>
        </div>

        <form
          className="flex flex-col space-y-6 pl-5 pr-5"
          onSubmit={handleFormSubmit}
        >
          <div className="flex flex-col space-y-1">
            <label htmlFor="title">Project Name</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              placeholder="Project Name"
              className="input-style text-sm"
              required
            />
          </div>
          <div className="flex flex-row space-x-10">
            <div className="flex flex-col space-y-1">
              <label htmlFor="endDate">End Date</label>
              <input
                value={eod}
                onChange={(e) => setEndDate(e.target.value)}
                type="date"
                placeholder="End Date"
                className="input-style w-40"
                required
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
          <div className="flex justify-center items-center mb-2">
            <input
              type="submit"
              value={flag === "add" ? "Add Project" : "Update Project"}
              className="hover:bg-neutral-900 w-40 p-2 rounded-full cursor-pointer"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEditForms;
