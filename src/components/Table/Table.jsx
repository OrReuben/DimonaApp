import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./Table.css";
import Loader from "../Loader/Loader";

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
        <Loader />
      ) : (
        <TableContainer
          component={Paper}
          style={{ boxShadow: "0px 13px 20px 0px #80808029" }}
        >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="right">סוג דיווח</TableCell>
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
                      <TableCell align="right" component="th" scope="row">
                        {row.type}
                      </TableCell>
                      <TableCell align="right">{row.location}</TableCell>
                      <TableCell align="right">{row.date}</TableCell>
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
