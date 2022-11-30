import React, { useEffect, useState } from "react";
import "./Suggestions.css";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useNavigate } from "react-router-dom";
import SuggestionList from "../../components/SuggestionList/SuggestionList";
import { Pagination } from "@mui/material";
import axios from "axios";
import Loader from "../../components/Loader/Loader";

const Suggestions = () => {
  const navigate = useNavigate();
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const pageSize = 6;
  const [from, setFrom] = useState(0);
  const [to, setTo] = useState(pageSize);
  const userToken = JSON.parse(localStorage.getItem("logged")).accessToken;

  useEffect(() => {
    const getSuggestions = async () => {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      };
      await axios
        .get(`${process.env.REACT_APP_API_URL}/api/suggestions`, config)
        .then((res) => setSuggestions(res.data));
      setLoading(false);
    };
    getSuggestions();
  }, [userToken]);

  const handlePageChange = (e, page) => {
    const from = (page - 1) * pageSize;
    const to = (page - 1) * pageSize + pageSize;
    setFrom(from);
    setTo(to);
  };

  return (
    <div className="suggestions">
      <div className="suggestions-glass">
        <div className="suggestions-top">
          <ChevronRightIcon onClick={() => navigate("/admin")} />
          <h1 style={{ textAlign: "center" }}>הצעות לייעול</h1>
        </div>
        <div className="suggestions-center">
          {loading ? (
            <Loader />
          ) : (
            <SuggestionList suggestions={suggestions} from={from} to={to} />
          )}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Pagination
            color="primary"
            count={Math.ceil(suggestions.length / pageSize)}
            onChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default Suggestions;

