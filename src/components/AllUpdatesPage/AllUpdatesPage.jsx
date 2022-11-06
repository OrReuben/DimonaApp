import React from "react";
import { useEffect } from "react";
import Sidebar from "../Sidebar";
import "./AllUpdatesPage.css";
import AllUpdatesTable from "./AllUpdatesTable";

const AllUpdatesPage = ({ api, setSelected, selected }) => {
  useEffect(() => {
    setSelected(2);
  }, [setSelected]);
  return (
    <div className="AllUpdatesPage">
      <div className="AllUpdatesPageGlass">
        <Sidebar setSelected={setSelected} selected={selected} />
        <AllUpdatesTable api={api} />
      </div>
    </div>
  );
};

export default AllUpdatesPage;
