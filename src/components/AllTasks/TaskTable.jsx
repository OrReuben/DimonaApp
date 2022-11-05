import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import TaskFinishedModal from "./TaskFinishedModal";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";

export default function TaskTable({ api }) {
  const [allTasks, setAllTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getAllHazards = async () => {
      setLoading(true);
      await axios.get(`${api}hazards`).then((res) => setAllTasks(res.data));
      setLoading(false);
    };
    getAllHazards();
  }, [api]);
  const columns = [
    {
      field: "action",
      headerName: "פעולה",
      width: 160,
      align: "center",
      headerAlign: "center",
      sortable: false,
      disableColumnMenu: true,
      renderCell: (cellValues) => {
        return (
          <>
            <div>
              <TaskFinishedModal
                cellValues={cellValues && cellValues.row}
                api={api}
              />
            </div>
          </>
        );
      },
    },
    {
      field: "type",
      headerName: "סוג דיווח",
      width: 160,
      align: "right",
      headerAlign: "right",
    },
    {
      field: "location",
      headerName: "מיקום",
      width: 160,
      align: "right",
      headerAlign: "right",
    },
    {
      field: "date",
      headerName: "תאריך",
      width: 160,
      align: "right",
      headerAlign: "right",
    },
    {
      field: "status",
      headerName: "סטטוס",
      width: 160,
      align: "right",
      headerAlign: "right",
    },
    {
      field: "body",
      headerName: "סיבה",
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
          getRowId={(task) => task && task._id}
          rows={allTasks && allTasks}
          columns={columns}
          pageSize={8}
          rowsPerPageOptions={[8]}
        />
      )}
    </div>
  );
}
