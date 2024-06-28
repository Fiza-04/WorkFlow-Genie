import { useEffect, useState, useRef } from "react";
import { fetchTaskCounts } from "../../utils/dataOperations";

const TaskCount = ({ flag, project }) => {
  const hasFetchedData = useRef(false);
  const [taskCounts, setTaskCounts] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const count = await fetchTaskCounts(project);
      if (count) {
        setTaskCounts(count);
        setLoading(false);
      }
    };

    if (!hasFetchedData.current) {
      fetchData();
      hasFetchedData.current = true;
    }
  }, [project]);

  const taskData = [
    {
      title: "ALL",
      count: `${taskCounts.all}`,
      color: "bg-purple-500 purple_shadow",
    },
    {
      title: "PENDING",
      count: `${taskCounts.pending}`,
      color: "bg-red-500 red_shadow_2",
    },
    {
      title: "IN-PROGRESS",
      count: `${taskCounts.inProgress}`,
      color: "bg-yellow-700 yellow_shadow",
    },
    {
      title: "COMPLETED",
      count: `${taskCounts.completed}`,
      color: "bg-green-500 green_shadow",
    },
  ];

  const style = () => {
    switch (flag) {
      case "overview":
        return {
          container: " flex-row justify-center items-center space-x-12",
          countBox: `font-semibold`,
          text: " mb-3",
        };
      case "tasks":
        return {
          container: "flex-wrap",
          countBox: `mr-12`,
          text: "text-[12px] mb-5 mr-12",
        };
    }
  };

  return (
    <div className={`flex ${style().container}`}>
      {loading ? (
        <div className="text-neutral-400">Loading...</div>
      ) : (
        taskData.map((data, index) => (
          <div key={index} className="flex flex-col items-center">
            <p
              className={`flex justify-center items-center w-20 h-20 mb-2 rounded-[20px] text-2xl ${
                data.color
              } ${style().countBox}`}
            >
              {data.count}
            </p>
            <p className={`text-neutral-400 ${style().text}`}>{data.title}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default TaskCount;
