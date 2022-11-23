import React, { useState } from "react";
import { useEffect } from "react";
import Chart from "react-apexcharts";
import { userRequest } from "../../requestMethods";
import Loader from "../../components/Loader/Loader";

const CustomerReview = () => {
  const [requests, setRequests] = useState();
  const [loading, setLoading] = useState(true);

  const categories = [
    new Date(new Date() - 7 * 60 * 60 * 24 * 1000).toISOString().split("T")[0],
    new Date(new Date() - 6 * 60 * 60 * 24 * 1000).toISOString().split("T")[0],
    new Date(new Date() - 5 * 60 * 60 * 24 * 1000).toISOString().split("T")[0],
    new Date(new Date() - 4 * 60 * 60 * 24 * 1000).toISOString().split("T")[0],
    new Date(new Date() - 3 * 60 * 60 * 24 * 1000).toISOString().split("T")[0],
    new Date(new Date() - 2 * 60 * 60 * 24 * 1000).toISOString().split("T")[0],
    new Date(new Date() - 1 * 60 * 60 * 24 * 1000).toISOString().split("T")[0],
    new Date().toISOString().split("T")[0],
  ];
  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      setTimeout(() => {
        userRequest
          .get("/hazardstats")
          .then((res) =>
            setRequests([
              res.data.sevenDaysAgo,
              res.data.sixDaysAgo,
              res.data.fiveDaysAgo,
              res.data.fourDaysAgo,
              res.data.threeDaysAgo,
              res.data.twoDaysAgo,
              res.data.oneDaysAgo,
              res.data.today,
            ])
          );
        setLoading(false);
      }, 2500);
    };
    getData();
  }, []);

  const data = {
    series: [
      {
        name: "בקשות חדשות",
        data: requests && requests,
      },
    ],
    options: {
      chart: {
        type: "area",
        height: "auto",
      },

      fill: {
        colors: ["#fff"],
        type: "gradient",
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
        colors: ["#ff929f"],
      },
      tooltip: {
        x: {
          format: "dd/MM/yy",
        },
      },
      grid: {
        show: false,
      },
      xaxis: {
        type: "datetime",
        categories: categories,
      },
      yaxis: {
        show: false,
      },
      toolbar: {
        show: false,
      },
    },
  };
  return (
    <div className="CustomerReview">
      {loading ? (
        <Loader />
      ) : (
        <Chart
          options={data.options}
          series={data && data.series}
          type="area"
        />
      )}
    </div>
  );
};

export default CustomerReview;
