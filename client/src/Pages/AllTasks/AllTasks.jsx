import React from "react";
import { useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import "./AllTasks.css";
import TaskTable from "./TaskTable";

const AllTasks = ({ setSelected, selected}) => {
  useEffect(() => {
    setSelected(1);
  }, [setSelected]);
  return (
    <div className="AllTasks">
      <div className="AllTasksGlass">
      <Sidebar setSelected={setSelected} selected={selected}/>
      <TaskTable />
      </div>
    </div>
  );
};

export default AllTasks;
