import React, { useState } from "react";
import "./Sidebar.css";
import Logo from "../imgs/logo.png";
import {
  UilPackage,
  UilChart,
  UilBars,
  UilSignOutAlt,
  UilEstate,
  UilClipboardAlt,
  UilUsersAlt,
} from "@iconscout/react-unicons";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ setSelected, selected }) => {
  const [expanded, setExpaned] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("logged");
    window.location.reload();
  };

  const handleClick = (index) => {
    setSelected(index);
    index === 0
      ? navigate("/")
      : index === 1
      ? navigate("/tasks")
      : index === 2
      ? navigate("/noti")
      : index === 3
      ? navigate("/ongoing-tasks")
      : navigate("/admin");
  };
  const sidebarVariants = {
    true: {
      left: "0%",
    },
    false: {
      left: "-60%",
    },
  };
  const user = localStorage.getItem("logged");
  const isAdmin = JSON.parse(user).isAdmin;
  return (
    <>
      <div
        className="bars"
        style={expanded ? { left: "60%" } : { left: "5%" }}
        onClick={() => setExpaned(!expanded)}
      >
        <UilBars />
      </div>
      <motion.div
        className="sidebar"
        variants={sidebarVariants}
        animate={window.innerWidth <= 768 ? `${expanded}` : ""}
      >
        <div className="logo">
          <img src={Logo} alt="logo" />
          <span>
            M<span>o</span>ked
          </span>
        </div>

        <div className="menu">
          <div
            className={selected === 0 ? "menuItem active" : "menuItem"}
            onClick={() => handleClick(0)}
          >
            <UilEstate />
            <span>בית</span>
          </div>
          <div
            className={selected === 1 ? "menuItem active" : "menuItem"}
            onClick={() => handleClick(1)}
          >
            <UilClipboardAlt />
            <span>משימות</span>
          </div>
          <div
            className={selected === 3 ? "menuItem active" : "menuItem"}
            onClick={() => handleClick(3)}
          >
            <UilChart />
            <span>משימות בביצוע</span>
          </div>
          <div
            className={selected === 2 ? "menuItem active" : "menuItem"}
            onClick={() => handleClick(2)}
          >
            <UilUsersAlt />
            <span>כל העדכונים</span>
          </div>
          {isAdmin && (
            <div
              className={selected === 4 ? "menuItem active" : "menuItem"}
              onClick={() => handleClick(4)}
            >
              <UilPackage />
              <span>הגדרות מנהל</span>
            </div>
          )}
          <div className="menuItem">
            <UilSignOutAlt onClick={handleLogout} />
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;
