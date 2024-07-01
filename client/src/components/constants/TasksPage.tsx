import { useEffect, useState, useRef } from "react";
import TaskCount from "./TaskCount";
import { useLocation } from "react-router-dom";
import TaskCard from "./Taskcard";
import AddTaskButton from "./AddTaskButton";

const TasksPage = () => {
  const hasFetchedData = useRef(false);
  const location = useLocation();
  const { project, userId } = location.state;
  const [taskData, setTaskData] = useState([]);

  const getTaskData = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/task/project/${project._id}`
      );

      if (!response.ok) {
        throw new Error("Data not fetched");
      }

      const result = await response.json();
      setTaskData(result.tasks || []);
    } catch (error) {
      setTaskData([]);
    }
  };

  const handleTask = () => {
    getTaskData();
  };

  useEffect(() => {
    if (!hasFetchedData.current) {
      handleTask();
      hasFetchedData.current = true;
    }
  }, []);

  return (
    <div className="h-[95%] flex flex-row">
      <div className="w-[10%] h-[95%] mt-4">
        <TaskCount flag="tasks" project={project._id} />
      </div>
      <div className="w-[100%] h-[95%]">
        <div className="scrollable-div-4">
          <div className="bg-neutral-800 icon-shadow w-full h-[9%] grid grid-cols-7 gap-10 p-2 sticky top-0 text-neutral-400">
            <p className="text-start">Title</p>
            <p className="text-start">Deadline</p>
            <p className="text-start">Description</p>
            <p className="text-start">Assigned By</p>
            <p className="text-start">Assigned To</p>
            <p className="text-start">Status</p>
            <p className="text-start">
              <AddTaskButton project={project} onTaskAdded={handleTask} />
            </p>
          </div>
          {taskData.length > 0 ? (
            taskData.map((task) => (
              <TaskCard
                key={task._id}
                project={project}
                task={task}
                loadData={handleTask}
                userId={userId}
              />
            ))
          ) : (
            <div className="flex flex-col p-40 font-light text-neutral-600">
              <p className="text-3xl pb-3">Hey!</p>
              <p className="text-xl pb-3">
                Looks like you don't have any Tasks yet!!
              </p>
              <p className="text-xl">Get started on your first one!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TasksPage;
