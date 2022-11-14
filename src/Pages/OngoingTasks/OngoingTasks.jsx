import React from "react";
import { useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import "./OngoingTasks.css";
import OngoingTasksTable from "./OngoingTasksTable";

const OngoingTasks = ({ setSelected, selected }) => {
  useEffect(() => {
    setSelected(3);
  }, [setSelected]);
  return (
    <div className="OngoingTasks">
      <div className="OngoingTasksGlass">
        <Sidebar selected={selected} setSelected={setSelected} />
        <OngoingTasksTable />
      </div>
    </div>
  );
};

export default OngoingTasks;
