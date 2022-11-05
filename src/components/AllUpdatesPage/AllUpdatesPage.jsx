import React from "react";
import Sidebar from "../Sidebar";
import "./AllUpdatesPage.css";
import AllUpdatesTable from "./AllUpdatesTable";


const AllUpdatesPage = ({ api }) => {
  return (
    <div className="AllUpdatesPage">
      <div className="AllUpdatesPageGlass">
        <Sidebar />
      <AllUpdatesTable api={api} />
      </div>
    </div>
  );
};

export default AllUpdatesPage;
