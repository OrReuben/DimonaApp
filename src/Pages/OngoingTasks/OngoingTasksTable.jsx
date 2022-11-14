import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import { useEffect } from "react";
import Loader from "../../components/Loader/Loader";
import OngoingTasksModal from "./OngoingTasksModal";
import { userRequest } from "../../requestMethods";

export default function OngoingTasksTable() {
  const [allOngoingHazards, setAllOngoingHazards] = useState([]);
  const [loading, setLoading] = useState(false);

  const userId = JSON.parse(localStorage.getItem("logged"))._id;
  const isAdmin = JSON.parse(localStorage.getItem("logged")).isAdmin;

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
              <OngoingTasksModal cellValues={cellValues && cellValues.row} />
            </div>
          </>
        );
      },
    },
    {
      field: "type",
      headerName: "סוג דיווח",
      width: 125,
      minWidth: 150,
      maxWidth: 200,
      align: "right",
      headerAlign: "right",
    },
    {
      field: "location",
      headerName: "מיקום",
      width: 125,
      minWidth: 150,
      maxWidth: 200,
      align: "right",
      headerAlign: "right",
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
      minWidth: 150,
      maxWidth: 200,
      align: "right",
      headerAlign: "right",
    },
    {
      field: "body",
      headerName: "סיבה",
      width: 125,
      minWidth: 150,
      maxWidth: 200,
      align: "right",
      headerAlign: "right",
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
          rows={allOngoingHazards && allOngoingHazards}
          columns={columns}
          pageSize={8}
          rowsPerPageOptions={[8]}
        />
      )}
    </div>
  );
}
