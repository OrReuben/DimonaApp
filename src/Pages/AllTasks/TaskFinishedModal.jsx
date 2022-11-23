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
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function TasksFinishedModal({ cellValues, setLoading }) {
  const [open, setOpen] = useState(false);
  const [currentHazard, setCurrentHazard] = useState(null);
  const [noti, setNoti] = useState("");
  const navigate = useNavigate();
  let timeCreated = moment().format("DD-MM-YYYY");

  const userId = JSON.parse(localStorage.getItem("logged"))._id;
  const loggedUser = JSON.parse(localStorage.getItem("logged")).name;
  const loggedUserImg = JSON.parse(localStorage.getItem("logged")).img;
  const isAdmin = JSON.parse(localStorage.getItem("logged")).isAdmin;
  const toastOptions = {
    position: "top-left",
    autoClose: 2000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const handleClickOpen = () => {
    setOpen(true);
    setCurrentHazard(cellValues);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOngoing = async () => {
    if (currentHazard.status === "לא בוצע") {
      try {
        setLoading(true);
        await userRequest
          .put(`/hazards/${currentHazard?._id}`, {
            status: "בביצוע",
            _wid: userId,
          })
          .then((res) => console.log(res.data));
        await axios.post(
          `https://long-blue-walrus-tie.cyclic.app/api/phone/hazzardon`,
          {
            _uid: cellValues._uid,
            phone: "+972" + cellValues.phone,
            location: cellValues.location,
          }
        );
        setLoading(false);
        toast.success("הפעולה הושלמה בהצלחה", toastOptions);
        handleClose();
        setTimeout(() => {
          navigate("/ongoing-tasks");
        }, 2500);
      } catch {
        console.log("error");
      }
    }
  };

  const handleSubmit = async () => {
    if (
      currentHazard.status === "לא בוצע" ||
      currentHazard.status === "בביצוע"
    ) {
      setLoading(true);
      try {
        await userRequest.put(`/hazards/${currentHazard?._id}`, {
          status: "בוצע",
          _wid: userId,
        });
        await axios.post(
          `https://long-blue-walrus-tie.cyclic.app/api/phone/hazzardfinish`,
          {
            _uid: cellValues._uid,
            phone: "+972" + cellValues.phone,
            location: cellValues.location,
          }
        );
      } catch {
        toast.error("משהו השתבש.. נסה שוב", toastOptions);
      }
      const obj = {
        img: loggedUserImg,
        name: loggedUser,
        problem: currentHazard && currentHazard.body,
        where: currentHazard && currentHazard.location,
        noti: noti,
        time: timeCreated,
      };
      try {
        await userRequest.post(`/updates/${userId}`, obj);
        toast.success("הפעולה הושלמה בהצלחה", toastOptions);
        setLoading(false);
        handleClose();
        setTimeout(() => {
          navigate("/");
        }, 2500);
      } catch {}
    } else if (isAdmin && currentHazard.status === "בוצע") {
      try {
        userRequest
          .delete(`/hazards/${currentHazard?._id}`)
          .then((res) => console.log(res.data));
        handleClose();
        toast.success("נמחק בהצלחה מהמערכת!", toastOptions);
        setTimeout(() => {
          navigate("/");
        }, 2500);
      } catch {
        toast.error("משהו השתבש.. נסה שוב", toastOptions);
      }
    }
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
          <div>
            {currentHazard?.status === "לא בוצע" && (
              <Button onClick={handleOngoing}>בביצוע</Button>
            )}
            <Button
              onClick={handleSubmit}
              disabled={currentHazard?.status !== "בוצע" && noti.length === 0}
            >
              {currentHazard?.status === "בוצע" ? "מחק" : "שלח"}
            </Button>
          </div>
        </DialogActions>
      </Dialog>
      <ToastContainer />
    </div>
  );
}
