import { Button } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import "./AdminPanel.css";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import AssistantIcon from "@mui/icons-material/Assistant";
import EngineeringIcon from "@mui/icons-material/Engineering";
import { useNavigate } from "react-router-dom";

const AdminPanel = ({ setSelected, selected }) => {
  const navigate = useNavigate();

  useEffect(() => {
    setSelected(4);
  }, [setSelected]);

  return (
    <div className="AdminPanel">
      <div className="AdminPanelGlass">
        <Sidebar setSelected={setSelected} selected={selected} />
        <div className="all-btn">
          <div className="btn">
            <AppRegistrationIcon style={{ fontSize: "2rem", marginLeft: 10 }} />
            <Button
              sx={{ width: "70vw", padding: 2, margin: "10px 0px" }}
              variant="contained"
              onClick={() => navigate("/register")}
            >
              רישום של עובד חדש
            </Button>
          </div>
          <div className="btn">
            <AssistantIcon style={{ fontSize: "2rem", marginLeft: 10 }} />
            <Button
              sx={{ width: "70vw", padding: 2, margin: "10px 0px" }}
              variant="contained"
            >
              כל ההצעות לייעול
            </Button>
          </div>
          <div className="btn">
            <EngineeringIcon style={{ fontSize: "2rem", marginLeft: 10 }} />
            <Button
              sx={{ width: "70vw", padding: 2, margin: "10px 0px" }}
              variant="contained"
            >
              עובד החודש
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
