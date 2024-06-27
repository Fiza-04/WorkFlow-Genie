import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState, useRef } from "react";
import TextArea from "./TextArea";
import { authControll } from "../../utils/dataOperations";
import { useNavigate } from "react-router-dom";

const AddTaskModal = ({ onClick, project }) => {
  const hasFetchedData = useRef(false);
  const navigate = useNavigate();
  const [taskTitle, setTaskTitle] = useState("");
  const [taskEod, setTaskEod] = useState("");
  const [taskPriority, setTaskPriority] = useState("");
  const [taskStage, setTaskStage] = useState("");
  const [taskDesc, setTaskDesc] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const user = await authControll(navigate, true);
      if (user) {
        setUserId(user.userId);
      }
    };

    if (!hasFetchedData.current) {
      fetchData();
      hasFetchedData.current = true;
    }
  }, []);

  const addTask = async (event) => {
    event.preventDefault();

    const response = await fetch("http://localhost:/3000/api/task/new-task", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        taskTitle,
        taskEod,
        taskDesc,
        taskPriority,
        taskStage,
        assignedTo,
        assignedBy: userId,
        taskCreatedBy: userId,
        project: project._id,
      }),
    });

    const data = await response.json();

    if (data.status) {
      alert("Task Added Successfully");
      onClick(onClick);
    } else {
      alert("Error adding project");
    }
  };

  const handlePriorityChange = (event) => {
    setTaskPriority(event.target.value);
  };

  const handleStageChange = (event) => {
    setTaskStage(event.target.value);
  };
  const handleAssignedTo = (event) => {
    console.log(event.target.value);
    setAssignedTo(event.target.value);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-neutral-900 text-neutral-300 w-[40%] scrollable-div icon-shadow rounded-[50px]">
        <div className=" flex justify-between mt-7 ml-7 mr-8">
          <p className="text-2xl font-thin">Add Task</p>
          <FontAwesomeIcon
            icon={faClose}
            onClick={onClick}
            className="cursor-pointer border border-neutral-300 hover:text-white glow-effect rounded-full p-1 pl-2 pr-2"
          />
        </div>
        <form onSubmit={addTask} className="m-7">
          <div className="flex flex-col mb-5 mt-5">
            <label htmlFor="title">Task Name</label>
            <input
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              type="text"
              placeholder="Task Name"
              className="input-style text-sm"
            />
          </div>
          <div className="flex flex-row space-x-10  mb-5">
            <div className="flex flex-col space-y-1">
              <label htmlFor="endDate">End Date</label>
              <input
                value={taskEod}
                onChange={(e) => setTaskEod(e.target.value)}
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
                value={taskPriority}
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
                value={taskStage}
                onChange={handleStageChange}
                className="input-style  w-40"
              >
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Complete</option>
              </select>
            </div>
          </div>
          <TextArea
            value={taskDesc}
            onChange={(e) => setTaskDesc(e.target.value)}
          />
          <div className="flex flex-col space-y-1 mt-5">
            <label htmlFor="assignedTo">Assigned To</label>
            <select
              id="assignedTo"
              name="assignedTo"
              value={assignedTo}
              onChange={handleAssignedTo}
              className="input-style  w-40"
            >
              <option value=""></option>
              {project.map((member) => (
                <option value={`${member._id}`}>{member.username}</option>
              ))}
            </select>
          </div>
          <div className="flex justify-end mr-10">
            <input
              type="submit"
              value="Add Task"
              className=" text-xl text-center hover:bg-neutral-900 hover:text-neutral-50 p-2 pl-4 pr-4 cursor-pointer rounded-[10px]"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTaskModal;
