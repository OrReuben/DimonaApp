import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import { useEffect } from "react";
import Loader from "../../components/Loader/Loader";
import { userRequest } from "../../requestMethods";

export default function AllUpdatesTable() {
  const [allUpdates, setAllUpdates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageSize, setPageSize] = useState(8);

  useEffect(() => {
    const getAllUpdates = async () => {
      setLoading(true);
      await userRequest.get(`/updates`).then((res) => setAllUpdates(res.data));
      setLoading(false);
    };
    getAllUpdates();
  }, []);
  const columns = [
    {
      field: "name",
      headerName: "שם",
      width: 160,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "problem",
      headerName: "בעיה",
      width: 175,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "where",
      headerName: "מיקום",
      width: 175,
      align: "left",
      headerAlign: "left",
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
      field: "noti",
      headerName: "הודעה",
      width: 250,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "time",
      headerName: "תאריך סיום",
      width: 200,
      align: "left",
      headerAlign: "left",
    },
  ];

  return (
    <div
      style={{
        height: "95%",
        width: "100%",
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
          getRowId={(update) => update && update._id}
          rows={allUpdates && allUpdates}
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
