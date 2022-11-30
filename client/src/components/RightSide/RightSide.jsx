import React from "react";
import CustomerReview from "../CustomerReview/CustomerReview";
import Updates from "../Updates/Updates";
import "./RightSide.css";

const RightSide = () => {
  return (
    <div className="RightSide">
      <div>
        <h3 style={{textAlign:"center "}}>עדכונים</h3>
        <Updates />
      </div>
      <div>
        <h3 style={{textAlign:"center "}}>בקשות לפי זמנים</h3>
        <CustomerReview />
      </div>
    </div>
  );
};

export default RightSide;
