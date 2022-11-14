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
import { useNavigate } from "react-router-dom";
import { userRequest } from "../../requestMethods";

export default function OngoingTasksModal({ cellValues }) {
  const [open, setOpen] = useState(false);
  const [currentHazard, setCurrentHazard] = useState(null);
  const [noti, setNoti] = useState("");
  const navigate = useNavigate();
  let timeCreated = moment().format("DD-MM-YYYY");

  const userId = JSON.parse(localStorage.getItem("logged"))._id;
  const loggedUser = JSON.parse(localStorage.getItem("logged")).name;
  const loggedUserImg = JSON.parse(localStorage.getItem("logged")).img;
  const isAdmin = JSON.parse(localStorage.getItem("logged")).isAdmin;

  const handleClickOpen = () => {
    setOpen(true);
    setCurrentHazard(cellValues);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    if (currentHazard.status === "לא בוצע") {
      try {
        try {
          await userRequest
            .put(`/hazards/${currentHazard?._id}`, {
              status: "בוצע",
              _wid: userId,
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
          await userRequest.post(`/updates/${userId}`, obj).then(navigate("/"));
        } catch {}
      } catch {}
    } else if (isAdmin === true) {
      try {
        userRequest
          .delete(`/hazards/${currentHazard?._id}`)
          .then((res) => console.log(res.data));
      } catch {}
    }
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

        <DialogActions>
          <Button onClick={handleClose}>ביטול</Button>
          <Button onClick={handleSubmit} disabled={noti.length === 0}>
            שלח
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
