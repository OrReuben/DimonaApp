import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import TaskFinishedModal from "./TaskFinishedModal";
import { useState } from "react";
import { useEffect } from "react";
import Loader from "../../components/Loader/Loader";
import "./TaskTable.css";
import ImagesModal from "./ImagesModal";
import { userRequest } from "../../requestMethods";

export default function TaskTable() {
  const [allTasks, setAllTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageSize, setPageSize] = useState(8);
  const user = localStorage.getItem("logged");
  const profession = JSON.parse(user).profession;
  const isAdmin = JSON.parse(localStorage.getItem("logged")).isAdmin;

  useEffect(() => {
    const getAllHazards = async () => {
      setLoading(true);
      if (isAdmin) {
        await userRequest.get(`/hazards`).then((res) => setAllTasks(res.data));
        setLoading(false);
      } else {
        await userRequest
          .get(`/hazardsNotDone/${profession}`)
          .then((res) => setAllTasks(res.data));
        setLoading(false);
      }
    };
    getAllHazards();
  }, [profession, isAdmin]);
  const columns = [
    {
      field: "action",
      headerName: "פעולה",
      width: 100,
      align: "center",
      headerAlign: "center",
      sortable: false,
      disableColumnMenu: true,
      renderCell: (cellValues) => {
        return (
          <>
            <div>
              <TaskFinishedModal cellValues={cellValues && cellValues.row} />
            </div>
          </>
        );
      },
    },
    {
      field: "type",
      headerName: "סוג דיווח",
      width: 125,
      align: "right",
      headerAlign: "right",
    },
    {
      field: "location",
      headerName: "מיקום",
      width: 175,
      align: "right",
      headerAlign: "right",
      renderCell: (params) => (
        <a
          style={{color:"black"}}
          target="_blank"
          rel="noreferrer"
          href={`https://www.google.com/maps/dir/?api=1&destination=${params.value}+דימונה`}
        >
          {params.value?.toString()}
        </a>
      ),
    },
    {
      field: "date",
      headerName: "תאריך",
      width: 125,
      minWidth: 150,
      maxWidth: 200,
      align: "right",
      headerAlign: "right",
    },
    {
      field: "status",
      headerName: "סטטוס",
      width: 125,
      align: "right",
      headerAlign: "right",
    },
    {
      field: "body",
      headerName: "סיבה",
      width: 175,
      align: "right",
      headerAlign: "right",
    },
    {
      field: "images",
      headerName: "תמונות",
      width: 100,
      minWidth: 100,
      maxWidth: 100,
      align: "center",
      headerAlign: "center",
      sortable: false,
      disableColumnMenu: true,
      renderCell: (cellValues) => {
        return (
          <>
            <div>
              <ImagesModal cellValues={cellValues && cellValues.row} />
            </div>
          </>
        );
      },
    },
  ];

  return (
    <div
      style={{
        height: "95%",
        width: "100%",
        marginTop: 10,
        textAlign: "right",
      }}
    >
      {loading ? (
        <Loader />
      ) : (
        <DataGrid
          loading={loading}
          getRowId={(task) => task && task._id}
          rows={allTasks && allTasks}
          columns={columns}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[6, 8, 12, 14]}
        />
      )}
    </div>
  );
}
