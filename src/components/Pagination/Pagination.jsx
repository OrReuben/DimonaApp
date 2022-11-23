import React from "react";
import "./Pagination.css";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";

const Pagination = () => {
  return (
    <div className="Pagination">
      <KeyboardDoubleArrowLeftIcon />
      <KeyboardArrowLeftIcon />
      <b>1</b>
      <KeyboardArrowRightIcon />
      <KeyboardDoubleArrowRightIcon />
    </div>
  );
};

export default Pagination;
