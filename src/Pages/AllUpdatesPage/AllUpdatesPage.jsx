import React from "react";
import { useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import "./AllUpdatesPage.css";
import AllUpdatesTable from "./AllUpdatesTable";

const AllUpdatesPage = ({ setSelected, selected }) => {
  useEffect(() => {
    setSelected(2);
  }, [setSelected]);
  return (
    <div className="AllUpdatesPage">
      <div className="AllUpdatesPageGlass">
        <Sidebar setSelected={setSelected} selected={selected} />
        <AllUpdatesTable />
      </div>
    </div>
  );
};

export default AllUpdatesPage;
