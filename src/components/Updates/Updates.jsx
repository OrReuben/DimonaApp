import React from "react";
import "./Updates.css";
import moment from "moment";
import axios from "axios";
import { useEffect, useState } from "react";
import { Skeleton } from "@mui/material";

const Updates = ({ api }) => {
  const [UpdatesData, setUpdatesData] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getUpdates = async () => {
      try {
        setLoading(true);
        await axios
          .get(`${api}updates`)
          .then((res) => setUpdatesData(res.data));
        setLoading(false);
      } catch {}
    };
    getUpdates();
  }, [api]);

  return (
    <div className="Updates">
      {loading ? (
        <div
          style={{
            width: "100%",
          }}
        >
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
              marginBottom:"15px"
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                width: "100%",
                marginRight: "9px",
              }}
            >
              <Skeleton
                variant="text"
                sx={{ fontSize: "1rem", width: "100%", height: "2vw" }}
              />
              <Skeleton
                variant="text"
                sx={{ fontSize: "1rem", width: "100%", height: "2vw" }}
              />
              <Skeleton
                variant="text"
                sx={{ fontSize: "1rem", width: "100%", height: "2vw" }}
              />
            </div>
            <div>
              <Skeleton variant="circular" width={40} height={40} />
              <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
            </div>
          </div>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                width: "100%",
                marginRight: "9px",
              }}
            >
              <Skeleton
                variant="text"
                sx={{ fontSize: "1rem", width: "100%", height: "2vw" }}
              />
              <Skeleton
                variant="text"
                sx={{ fontSize: "1rem", width: "100%", height: "2vw" }}
              />
              <Skeleton
                variant="text"
                sx={{ fontSize: "1rem", width: "100%", height: "2vw" }}
              />
            </div>
            <div>
              <Skeleton variant="circular" width={40} height={40} />
              <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
            </div>
          </div>
        </div>
      ) : (
        UpdatesData?.map((update, index) => {
          return (
            index < 2 && (
              <div className="update" key={index}>
                <div className="noti">
                  <div style={{ marginBottom: "0.5rem" }}>
                    <span>
                      {update.name} <br />
                    </span>
                    <span>
                      {" "}
                      <span style={{ color: "#00b5ff", fontWeight: 600 }}>
                        {" "}
                        בעיה -{" "}
                      </span>
                      {update.problem}
                      <br />
                    </span>
                    <span>
                      <span style={{ color: "#00b5ff", fontWeight: 600 }}>
                        {" "}
                        מיקום -{" "}
                      </span>
                      {update.where} <br />
                    </span>
                    <span>
                      {" "}
                      {update.noti} <br />
                    </span>
                    <span>
                      {moment(
                        UpdatesData && UpdatesData[index].createdAt
                      )?.fromNow()}
                    </span>
                  </div>
                </div>
                <img src={update.img} alt="profile" />
              </div>
            )
          );
        })
      )}
    </div>
  );
};

export default Updates;
