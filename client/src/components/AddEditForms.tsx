import { useState } from "react";
import TextArea from "./TextArea";

const AddEditForms = ({ onClick }) => {
  const [title, setTitle] = useState("");
  const [endDate, setEndDate] = useState("");
  const [desc, setDesc] = useState("");
  const [priority, setPriority] = useState("");
  const [stage, setStage] = useState("");
  const [team, setTeam] = useState("");
  const [createdBy, setCreatedBy] = useState("");

  const handleSubmit = async () => {};

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
        onSubmit={handleSubmit}
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
              value={endDate}
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
              id="priority"
              name="priority"
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
          <label>Add More of your kind!</label>
          <input
            value={team}
            onChange={(e) => setTeam(e.target.value)}
            type="text"
            placeholder="Add Team"
            className="input-style"
          />
        </div>

        <input
          value={createdBy}
          onChange={(e) => setCreatedBy(e.target.value)}
          type="hidden"
        />
        <input type="submit" value="Add Project" />
      </form>
    </div>
  );
};

export default AddEditForms;
