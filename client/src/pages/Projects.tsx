const Projects = () => {
  const data = [
    { title: "All", count: "12", color: "bg-purple-300 purple_shadow" },
    { title: "Pending", count: "35", color: "bg-red-200 red_shadow" },
    { title: "In-progress", count: "67", color: "bg-yellow-200 yellow_shadow" },
    { title: "Completed", count: "6", color: "bg-green-300 green_shadow" },
  ];
  return (
    <div className="flex flex-col bg-neutral-800 m-5 w-[20%] h-[80%] rounded-[20px] icon-shadow">
      <div className="flex flex-wrap ml-3 mt-2 h-[50%]">
        {data.map((item) => (
          <div
            className={`${item.color} w-[40%] h-[40%] m-2 rounded-[20px] flex-col text-center justify-center`}
          >
            <div className="pt-5 text-[30px] font-medium">{item.count}</div>
            <div className="text-sm font-normal text-neutral-800">
              {item.title}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
