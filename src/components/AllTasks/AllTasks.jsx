import React from "react";
import Sidebar from "../Sidebar";
import "./AllTasks.css";
import TaskTable from "./TaskTable";

const AllTasks = ({api}) => {
  return (
    <div className="AllTasks">
      <div className="AllTasksGlass">
      <Sidebar />
      <TaskTable api={api} />
      </div>
    </div>
  );
};

export default AllTasks;
