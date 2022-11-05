import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";

export default function AllUpdatesTable({ api }) {
  const [allUpdates, setAllUpdates] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getAllUpdates = async () => {
      setLoading(true);
      await axios.get(`${api}updates`).then((res) => setAllUpdates(res.data));
      setLoading(false);
    };
    getAllUpdates();
  }, [api]);
  const columns = [
    {
      field: "time",
      headerName: "תאריך סיום",
      width: 200,
      align: "right",
      headerAlign: "right",
    },
    {
      field: "noti",
      headerName: "הודעה",
      width: 250,
      align: "right",
      headerAlign: "right",
    },
    {
      field: "where",
      headerName: "מיקום",
      width: 160,
      align: "right",
      headerAlign: "right",
    },
    {
      field: "problem",
      headerName: "בעיה",
      width: 160,
      align: "right",
      headerAlign: "right",
    },
    {
      field: "name",
      headerName: "שם",
      width: 160,
      align: "right",
      headerAlign: "right",
    },
  ];

  return (
    <div style={{ height: "95%", width: "100%", marginTop: 10 }}>
      {loading ? (
        <Loader />
      ) : (
        <DataGrid
          loading={loading}
          getRowId={(update) => update && update._id}
          rows={allUpdates && allUpdates}
          columns={columns}
          pageSize={8}
          rowsPerPageOptions={[8]}
        />
      )}
    </div>
  );
}
