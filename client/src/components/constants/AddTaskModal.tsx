import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState, useRef } from "react";
import TextArea from "./TextArea";
import { authControll, dateFormat } from "../../utils/dataOperations";
import { useNavigate } from "react-router-dom";

const AddTaskModal = ({ onClick, project, flag = "add", existingTask }) => {
  const hasFetchedData = useRef(false);
  const navigate = useNavigate();

  const [taskTitle, setTaskTitle] = useState("");
  const [taskEod, setTaskEod] = useState("");
  const [taskPriority, setTaskPriority] = useState("normal");
  const [taskStage, setTaskStage] = useState("pending");
  const [taskDesc, setTaskDesc] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [assignedBy, setAssignedBy] = useState("");
  const [taskCreatedBy, setTaskCreatedBy] = useState("");
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const user = await authControll(navigate, true);
      if (user) {
        setUserId(user.userId);
        setAssignedBy(user.userId);
        setTaskCreatedBy(user.userId);
      }
    };

    const existingData = async (taskId) => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/task/${taskId}`
        );

        if (!response.status) {
          throw new Error("Data not fetched");
        }

        const data = await response.json();
        setTaskTitle(data.tasks.taskTitle);
        setTaskEod(dateFormat(data.tasks.taskEod).otherformattedDate);
        setTaskPriority(data.tasks.taskPriority);
        setTaskStage(data.tasks.taskStage);
        setTaskDesc(data.tasks.taskDesc);
        setAssignedTo(data.tasks.assignedTo._id);
      } catch (error) {
        console.log(error);
      }
    };

    if (!hasFetchedData.current) {
      fetchData();
      if (flag === "edit") {
        existingData(existingTask);
      }
      hasFetchedData.current = true;
    }
  }, [flag, existingTask]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const url =
      flag === "edit"
        ? `http://localhost:3000/api/task/update/${existingTask}`
        : "http://localhost:3000/api/task/new-task";
    const method = flag === "edit" ? "PUT" : "POST";

    const response = await fetch(url, {
      method: method,
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
        assignedBy,
        taskCreatedBy,
        project: project._id,
      }),
    });

    const data = await response.json();

    if (data.status) {
      alert(
        flag === "edit"
          ? "Task Updated Successfully"
          : "Task Added Successfully"
      );
      onClick(onClick);
    } else {
      alert(
        `Error ${flag === "edit" ? "updating" : "adding"} task: ${data.message}`
      );
    }
  };

  const today = new Date().toISOString().split("T")[0];

  const handlePriorityChange = (event) => {
    setTaskPriority(event.target.value);
  };

  const handleStageChange = (event) => {
    setTaskStage(event.target.value);
  };
  const handleAssignedTo = (event) => {
    setAssignedTo(event.target.value);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-neutral-900 text-neutral-300 w-[40%] scrollable-div icon-shadow rounded-[50px]">
        <div className="flex justify-between mt-7 ml-7 mr-8">
          <h2 className="text-2xl font-thin">
            {flag === "edit" ? "Edit Task" : "Add Task"}
          </h2>
          <FontAwesomeIcon
            icon={faClose}
            onClick={onClick}
            className="cursor-pointer border border-neutral-300 hover:text-white glow-effect rounded-full p-1 pl-2 pr-2"
          />
        </div>
        <form onSubmit={handleFormSubmit} className="m-7">
          <div className="flex flex-col mb-5 mt-5">
            <label htmlFor="title">Task Name</label>
            <input
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              type="text"
              placeholder="Task Name"
              className="input-style text-sm"
              required
            />
          </div>
          <div className="flex flex-row space-x-10 mb-5">
            <div className="flex flex-col space-y-1">
              <label htmlFor="endDate">End Date</label>
              <input
                value={taskEod}
                onChange={(e) => setTaskEod(e.target.value)}
                type="date"
                placeholder="End Date"
                className="input-style w-40"
                min={today}
                required
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
                className="input-style w-40"
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
              className="input-style w-40"
              required
            >
              <option value=""></option>
              {project.team.map((member) => (
                <option key={member._id} value={member._id}>
                  {member.username}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-end mr-10">
            <input
              type="submit"
              value={flag === "edit" ? "Update Task" : "Add Task"}
              className="text-xl text-center hover:bg-neutral-900 hover:text-neutral-50 p-2 pl-4 pr-4 cursor-pointer rounded-[10px]"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTaskModal;
