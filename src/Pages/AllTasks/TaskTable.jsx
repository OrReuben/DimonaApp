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
    {
      field: "body",
      headerName: "סיבה",
      width: 200,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "status",
      headerName: "סטטוס",
      width: 125,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "createdAt",
      headerName: "תאריך",
      width: 125,
      minWidth: 150,
      maxWidth: 200,
      align: "left",
      headerAlign: "left",
      renderCell: (cellValues) => {
        return (
          <>
            <div>
              <span>
                {cellValues.row.createdAt &&
                  cellValues.row.createdAt.split("T")[0]}
              </span>
            </div>
          </>
        );
      },
    },
    {
      field: "location",
      headerName: "מיקום",
      width: 200,
      align: "left",
      renderCell: (params) => (
        <a
        style={{ color: "black", textAlign:"right" }}
        target="_blank"
        rel="noreferrer"
        href={`https://www.google.com/maps/dir/?api=1&destination=${params.value}`}
        >
          {params.value.split(",")[0] && params.value.split(",")[1]
            ? `${params.value.split(",")[0].replace('"', " ")}, ${params.value.split(",")[1].replace('"', " ")}`
            : params.value.replace('"', " ")}
        </a>
      ),
    },
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
              <TaskFinishedModal
                cellValues={cellValues && cellValues.row}
                setLoading={setLoading}
              />
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
        width: "98%",
        marginTop: 10,
        textAlign: "left",
        direction:"rtl"
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
          density="comfortable"
          disableSelectionOnClick
        />
      )}
    </div>
  );
}
