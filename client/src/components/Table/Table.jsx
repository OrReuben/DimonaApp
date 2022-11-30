import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./Table.css";
import { Card, Skeleton } from "@mui/material";

const makeStyle = (status) => {
  if (status === "בוצע") {
    return {
      background: "rgb(145 254 159 / 47%)",
      color: "green",
    };
  } else if (status === "לא בוצע") {
    return {
      background: "#ffadad8f",
      color: "red",
    };
  } else {
    return {
      background: "#59bfff",
      color: "white",
    };
  }
};

export default function BasicTable({ api, loading, rows }) {
  return (
    <div className="Table">
      <h3 style={{ textAlign: "right" }}>בקשות אחרונות</h3>
      {loading ? (
        <>
          <Skeleton variant="text" sx={{ fontSize: "1rem", width: "100%" }} />
          <Skeleton variant="text" sx={{ fontSize: "1rem", width: "100%" }} />
          <Skeleton variant="text" sx={{ fontSize: "1rem", width: "100%" }} />
          <Skeleton variant="text" sx={{ fontSize: "1rem", width: "100%" }} />
          <Skeleton variant="text" sx={{ fontSize: "1rem", width: "100%" }} />
          <Skeleton variant="text" sx={{ fontSize: "1rem", width: "100%" }} />
          <Skeleton variant="text" sx={{ fontSize: "1rem", width: "100%" }} />
          <Skeleton variant="text" sx={{ fontSize: "1rem", width: "100%" }} />
        </>
      ) : rows?.length === 0 ? (
        <Card sx={{ margin: "20px 0px" }}>
          <div style={{ textAlign: "center", padding: 10 }}>
            אין בקשות אחרונות
          </div>
        </Card>
      ) : (
        <TableContainer
          component={Paper}
          style={{ boxShadow: "0px 13px 20px 0px #80808029" }}
        >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="right">מיקום</TableCell>
                <TableCell align="right">תאריך</TableCell>
                <TableCell align="right">סטטוס</TableCell>
                <TableCell align="right">סיבה</TableCell>
              </TableRow>
            </TableHead>
            <TableBody style={{ color: "white" }}>
              {rows.map(
                (row, index) =>
                  index < 4 && (
                    <TableRow
                      key={index}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align="right">
                        {row.location.split(",")[0] &&
                        row.location.split(",")[1] ? (
                          <span>
                            {" "}
                            {row.location.split(",")[0]},
                            {row.location.split(",")[1]}
                          </span>
                        ) : (
                          row.location
                        )}
                      </TableCell>
                      <TableCell align="right">
                        {row.createdAt && row.createdAt.split("T")[0]}
                      </TableCell>
                      <TableCell align="right">
                        <span className="status" style={makeStyle(row.status)}>
                          {row.status}
                        </span>
                      </TableCell>
                      <TableCell align="right" className="Details">
                        {row.body}
                      </TableCell>
                    </TableRow>
                  )
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}
