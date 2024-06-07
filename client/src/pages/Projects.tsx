import { useState } from "react";

const Projects = () => {
  const [title, setTitle] = useState("");
  const [endDate, setEndDate] = useState("");
  const [teamMates, setTeamMates] = useState("");
  const [priority, setPriority] = useState("");
  const [desc, setDesc] = useState("");
  const [openProject, setOpenProject] = useState(false);

  const [taskTitle, setTaskTitle] = useState("");
  const [taskEndDate, setTaskEndDate] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [taskPriority, setTaskPriority] = useState("");
  const [taskDesc, setTaskDesc] = useState("");
  const [openTask, setOpenTask] = useState(false);

  return (
    <div className="flex flex-col">
      <h1>Projects</h1>
      <form className="flex flex-col">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setOpenProject(!openProject); // Close task form when opening project form
          }}
        >
          New Project
        </a>
        <div className={`flex flex-col ${openProject ? "" : "hidden"}`}>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Project Title"
            className="mb-7"
          />
          <input
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            type="date"
            placeholder="End Date"
            className="mb-7"
          />
          <input
            value={teamMates}
            onChange={(e) => setTeamMates(e.target.value)}
            type="text"
            placeholder="Select Team"
            className="mb-7"
          />
          <input
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            type="text"
            placeholder="Priority"
            className="mb-7"
          />
          <input
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            type="text"
            placeholder="Project Description"
            className="mb-7"
          />
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setOpenTask(!openTask); // Close project form when opening task form
            }}
            className="new-task mb-7"
          >
            Add Tasks
          </a>
          <div className={`flex flex-col ${openTask ? "" : "hidden"}`}>
            <input
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              type="text"
              placeholder="Task Title"
              className="mb-7"
            />
            <input
              value={taskEndDate}
              onChange={(e) => setTaskEndDate(e.target.value)}
              type="date"
              placeholder="End Date"
              className="mb-7"
            />
            <input
              value={assignedTo}
              onChange={(e) => setAssignedTo(e.target.value)}
              type="text"
              placeholder="Assign To"
              className="mb-7"
            />
            <input
              value={taskPriority}
              onChange={(e) => setTaskPriority(e.target.value)}
              type="text"
              placeholder="Priority"
              className="mb-7"
            />
            <input
              value={taskDesc}
              onChange={(e) => setTaskDesc(e.target.value)}
              type="text"
              placeholder="Description"
              className="mb-7"
            />
          </div>

          <input type="submit" value="Done" />
        </div>
      </form>
    </div>
  );
};

export default Projects;
