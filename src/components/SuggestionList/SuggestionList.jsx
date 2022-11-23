import React from "react";
import "./SuggestionList.css";
import { useNavigate } from "react-router-dom";

const SuggestionList = ({ suggestions, to, from }) => {
  const navigate = useNavigate();

  return (
    <div className="suggestion-list">
      <ul>
        {suggestions.map(
          (suggestion, index) =>
            index >= from &&
            index <= to && (
              <li
                key={suggestion._id}
                onClick={() => navigate("/suggestion", { state: suggestion })}
              >
                <b>תאריך: {suggestion.createdAt.split("T")[0]}</b>
                <b>מאת: {suggestion.fullName}</b>
                <b className="title"> נושא: {suggestion.title}</b>
              </li>
            )
        )}
      </ul>
    </div>
  );
};

export default SuggestionList;
