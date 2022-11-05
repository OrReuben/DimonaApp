import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import moment from "moment";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function TasksFinishedModal({ cellValues, api }) {
  const [open, setOpen] = useState(false);
  const [currentHazard, setCurrentHazard] = useState(null);
  const [noti, setNoti] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  let timeCreated = moment();
  const loggedUser = JSON.parse(localStorage.getItem("logged")).name;
  const loggedUserImg = JSON.parse(localStorage.getItem("logged")).img;
  const isAdmin = JSON.parse(localStorage.getItem("logged")).isAdmin;

  const handleClickOpen = () => {
    setOpen(true);
    setCurrentHazard(cellValues);
    currentHazard?.status === "בוצע" && setError(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    if (currentHazard.status === "לא בוצע" || currentHazard.status === "בביצוע") {
      try {
        try {
          await axios
            .put(`${api}hazards/${currentHazard?._id}`, {
              status: "בוצע",
            })
            .then((res) => console.log(res.data));
        } catch {}
        const obj = {
          img: loggedUserImg,
          name: loggedUser,
          problem: currentHazard && currentHazard.body,
          where: currentHazard && currentHazard.location,
          noti: noti,
          time: timeCreated,
        };
        try {
          await axios.post(`${api}updates`, obj).then(navigate("/"));
        } catch {}
      } catch {}
    } else if (isAdmin === true) {
      try {
        axios
          .delete(`${api}hazards/${currentHazard?._id}`)
          .then((res) => console.log(res.data));
      } catch {}
    } else setError(true)
    handleClose();
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        בוצע
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ textAlign: "right" }}>טופס מילוי משימה</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ textAlign: "right" }}>
            :בבקשה תמלאו פה את הפרטים הבאים על מנת להמשיך
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="פירוט"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setNoti(e.target.value)}
          />
        </DialogContent>
        {error && (
          <div
            style={{
              textAlign: "right",
              marginRight: 10,
              color: "red",
              fontWeight: 700,
            }}
          >
            !המשימה כבר בוצעה
          </div>
        )}
        <DialogActions>
          <Button onClick={handleClose}>ביטול</Button>
          <Button
            onClick={handleSubmit}
            disabled={
              noti.length === 0 ||
              (currentHazard?.status === "בוצע" && isAdmin === false)
            }
          >
            {currentHazard?.status === "בוצע" ? "מחק" : "שלח"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
