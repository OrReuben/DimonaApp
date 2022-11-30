import React from "react";
import "./Suggestion.css";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import SuggestionCard from "../../components/SuggestionCard/SuggestionCard";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import AttachEmailIcon from "@mui/icons-material/AttachEmail";

const Suggestion = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const suggestion = location.state;
  return (
    <div className="suggestion">
      <div className="suggestion-glass">
        <div className="suggestion-top">
          <ChevronRightIcon onClick={() => navigate("/suggestions")} />
          <h2 style={{ textAlign: "center" }}>
            הצעה מתאריך: {suggestion.createdAt.split("T")[0]}
          </h2>
        </div>
        <div className="suggestion-center">
          <SuggestionCard suggestion={suggestion} />
        </div>
        <div className="suggestion-bottom">
          <a href={`tel:+972${suggestion.phone}`}>
            {" "}
            <div className="icon-and-text">
              <LocalPhoneIcon /> <span>+972 {suggestion.phone}</span>
            </div>
          </a>
          <a href={`mailto:${suggestion.email}`}>
            {" "}
            <div className="icon-and-text">
              <AttachEmailIcon /> <span>{suggestion.email}</span>
            </div>{" "}
          </a>
          <b style={{ marginLeft: 10 }}> :צור קשר</b>
        </div>
      </div>
    </div>
  );
};

export default Suggestion;
