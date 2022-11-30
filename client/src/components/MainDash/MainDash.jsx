import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Cards from "../Cards/Cards";
import BasicTable from "../Table/Table";
import "./MainDash.css";
import { userRequest } from "../../requestMethods";

const MainDash = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const user = localStorage.getItem("logged");
  let accessToken = JSON.parse(user)?.accessToken;

  useEffect(() => {
    const getHazards = async () => {
      if (accessToken) {
        setLoading(true);
        await userRequest
          .get(`/hazards`)
          .then((res) => setRows(res.data));
        setLoading(false);
      }
    };
    getHazards();
  }, [accessToken]);

  return (
    <div className="MainDash">
      <h1 style={{ textAlign: "right" }}>נתונים</h1>
      <Cards rows={rows && rows} />
      <BasicTable rows={rows && rows} loading={loading} />
    </div>
  );
};

export default MainDash;
