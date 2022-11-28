import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import { useEffect } from "react";
import Loader from "../../components/Loader/Loader";
import OngoingTasksModal from "./OngoingTasksModal";
import { userRequest } from "../../requestMethods";
import ImagesModal from "../AllTasks/ImagesModal";

export default function OngoingTasksTable() {
  const [allOngoingHazards, setAllOngoingHazards] = useState([]);
  const [loading, setLoading] = useState(false);
  const userId = JSON.parse(localStorage.getItem("logged"))._id;
  const isAdmin = JSON.parse(localStorage.getItem("logged")).isAdmin;
  const [pageSize, setPageSize] = useState(8);

  useEffect(() => {
    const getAllOngoingHazards = async () => {
      setLoading(true);
      if (isAdmin) {
        await userRequest
          .get(`/hazardsPending`)
          .then((res) => setAllOngoingHazards(res.data));
        setLoading(false);
      } else {
        await userRequest
          .get(`/onGoingHazards/${userId}`)
          .then((res) => setAllOngoingHazards(res.data));
        setLoading(false);
      }
    };
    getAllOngoingHazards();
  }, [userId, isAdmin]);
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
    },
    {
      field: "status",
      headerName: "סטטוס",
      width: 125,
      minWidth: 150,
      maxWidth: 200,
      align: "left",
    },
    {
      field: "updatedAt",
      headerName: "טופל בתאריך",
      width: 125,
      minWidth: 150,
      maxWidth: 200,
      align: "left",
      renderCell: (cellValues) => {
        return (
          <>
            <div>
              <span>
                {cellValues.row.updatedAt &&
                  cellValues.row.updatedAt.split("T")[0]}{" "}
              </span>
            </div>
          </>
        );
      },
    },
    {
      field: "location",
      headerName: "מיקום",
      width: 175,
      align: "left",
      renderCell: (params) => (
        <a
          style={{ color: "black", textAlign: "right" }}
          target="_blank"
          rel="noreferrer"
          href={`https://www.google.com/maps/dir/?api=1&destination=${params.value}`}
        >
          {params.value.split(",")[0] && params.value.split(",")[1]
            ? `${params.value.split(",")[0].replace('"', " ")}, ${params.value
                .split(",")[1]
                .replace('"', " ")}`
            : params.value.replace('"', " ")}
        </a>
      ),
    },
    {
      field: "action",
      headerName: "פעולה",
      width: 125,
      minWidth: 150,
      maxWidth: 200,
      align: "center",
      headerAlign: "center",
      sortable: false,
      disableColumnMenu: true,
      renderCell: (cellValues) => {
        return (
          <>
            <div>
              <OngoingTasksModal
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
        direction: "rtl",
      }}
    >
      {loading ? (
        <Loader />
      ) : (
        <DataGrid
          loading={loading}
          getRowId={(task) => task && task._id}
          rows={allOngoingHazards && allOngoingHazards}
          columns={columns}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[6, 8, 12, 14]}
          density="comfortable"
        />
      )}
    </div>
  );
}
