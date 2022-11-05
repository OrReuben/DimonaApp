import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Cards from "../Cards/Cards";
import BasicTable from "../Table/Table";
import "./MainDash.css";
import axios from "axios";

const MainDash = ({ api }) => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getHazards = async () => {
      setLoading(true);
      await axios.get(`${api}hazards`).then((res) => setRows(res.data));
      setLoading(false);
    };
    getHazards();
  }, [api]);

  return (
    <div className="MainDash">
      <h1 style={{ textAlign: "right" }}>נתונים</h1>
      <Cards api={api} rows={rows && rows} />
      <BasicTable api={api} rows={rows && rows} loading={loading} />
    </div>
  );
};

export default MainDash;
