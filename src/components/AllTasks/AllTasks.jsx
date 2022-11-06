import React from "react";
import Sidebar from "../Sidebar";
import "./AllTasks.css";
import TaskTable from "./TaskTable";

const AllTasks = ({api, setSelected, selected}) => {
  return (
    <div className="AllTasks">
      <div className="AllTasksGlass">
      <Sidebar setSelected={setSelected} selected={selected}/>
      <TaskTable api={api} />
      </div>
    </div>
  );
};

export default AllTasks;
