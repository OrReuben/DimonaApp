import React, { useEffect } from "react";
import "./Cards.css";
import {
  UilUsdSquare,
  UilMoneyWithdrawal,
  UilClipboardAlt,
} from "@iconscout/react-unicons";
import Card from "../Card/Card";
import { useState } from "react";
import { Skeleton } from "@mui/material";
import { userRequest } from "../../requestMethods";

const Cards = () => {
  const [weeklyHazards, setWeeklyHazards] = useState();
  const [doneHazards, setDoneHazards] = useState();
  const [notDoneHazards, setNotDoneHazards] = useState();
  const [pendingHazards, setPendingHazards] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getWeeklyHazards = async () => {
      setLoading(true);
      await userRequest
        .get(`/weekly/hazards`)
        .then((res) => setWeeklyHazards(res.data));
      setLoading(false);
    };
    const getDoneHazards = async () => {
      await userRequest
        .get(`/hazardsDone`)
        .then((res) => setDoneHazards(res.data));
    };
    getDoneHazards();
    const getNotDoneHazards = async () => {
      await userRequest
        .get(`/allHazardsNotDone`)
        .then((res) => setNotDoneHazards(res.data));
    };
    getDoneHazards();
    const getPendingHazards = async () => {
      await userRequest
        .get(`/hazardsPending`)
        .then((res) => setPendingHazards(res.data));
    };
    getWeeklyHazards();
    getDoneHazards();
    getNotDoneHazards();
    getPendingHazards();
  }, []);

  const hazardPercentage = (partialValue, totalValue) => {
    if (partialValue > 0) {
      if (partialValue && totalValue) {
        return Math.round((100 * partialValue) / totalValue);
      }
    } else return 0;
  };

  const cardsData = [
    {
      title: "משימות שלא בוצעו",
      color: {
        backGround: "linear-gradient(180deg, #bb67ff 0%, #c484f3 100%)",
        boxShadow: "0px 10px 20px 0px #e0c6f5",
      },
      barValue: hazardPercentage(
        notDoneHazards && notDoneHazards.length,
        weeklyHazards && weeklyHazards.length
      ),
      value: notDoneHazards && notDoneHazards.length,
      png: UilUsdSquare,
      series: [
        {
          name: "not available",
          data: [31, 40, 28, 51, 42, 109, 100],
        },
      ],
    },
    {
      title: "משימות שבביצוע",
      color: {
        backGround: "linear-gradient(180deg, #FF919D 0%, #FC929D 100%)",
        boxShadow: "0px 10px 20px 0px #FDC0C7",
      },
      barValue: hazardPercentage(
        pendingHazards && pendingHazards.length,
        weeklyHazards && weeklyHazards.length
      ),
      value: pendingHazards && pendingHazards.length,
      png: UilMoneyWithdrawal,
      series: [
        {
          name: "Revenue",
          data: [10, 100, 50, 70, 80, 30, 40],
        },
      ],
    },
    {
      title: "משימות שבוצעו",
      color: {
        backGround:
          "linear-gradient(rgb(248, 212, 154) -146.42%, rgb(255 202 113) -46.42%)",
        boxShadow: "0px 10px 20px 0px #F9D59B",
      },
      barValue: hazardPercentage(
        doneHazards && doneHazards.length,
        weeklyHazards && weeklyHazards.length
      ),
      value: doneHazards && doneHazards.length,
      png: UilClipboardAlt,
      series: [
        {
          name: "Expenses",
          data: [10, 25, 15, 30, 12, 15, 20],
        },
      ],
    },
  ];
  return (
    <div className="Cards">
      {cardsData.map((card, id) => {
        return (
          <div className="parentContainer" key={id}>
            {loading ? (
              <Skeleton
                variant="rectangular"
                sx={{ borderRadius: 2, width: { s: 400, m: 210 }, height: 130 }}
              />
            ) : (
              <Card
                title={card.title}
                color={card.color}
                barValue={card.barValue}
                value={card.value}
                png={card.png}
                series={card.series}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Cards;
