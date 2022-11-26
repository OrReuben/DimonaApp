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
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import { CacheProvider } from "@emotion/react";
import rtlPlugin from "stylis-plugin-rtl";

export default function OngoingTasksModal({ cellValues, setLoading }) {
  const [open, setOpen] = useState(false);
  const [currentHazard, setCurrentHazard] = useState(null);
  const [noti, setNoti] = useState("");
  const navigate = useNavigate();
  let timeCreated = moment().format("DD-MM-YYYY");

  const userId = JSON.parse(localStorage.getItem("logged"))._id;
  const loggedUser = JSON.parse(localStorage.getItem("logged")).name;
  const loggedUserImg = JSON.parse(localStorage.getItem("logged")).img;

  const cacheRtl = createCache({
    key: "muirtl",
    stylisPlugins: [prefixer, rtlPlugin],
  });

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

  const handleSubmit = async () => {
    if (currentHazard.status === "בביצוע") {
      try {
        setLoading(true);
        await userRequest
          .put(`/hazards/${currentHazard?._id}`, {
            status: "בוצע",
            _wid: userId,
          })
          .then((res) => console.log(res.data));
        await axios.post(
          `https://long-blue-walrus-tie.cyclic.app/api/phone/hazzardfinish`,
          {
            _uid: currentHazard._uid,
            phone: "+972" + currentHazard.phone,
            location: currentHazard.location,
          }
        );
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
        await userRequest.post(`/updates/${userId}`, obj);
        toast.success("הפעולה הושלמה בהצלחה", toastOptions);
        setLoading(false);
        handleClose();
        setTimeout(() => {
          navigate("/");
        }, 2500);
      } catch {}
    }
    handleClose();
  };

  return (
    <div>
      <CacheProvider value={cacheRtl}>
        <Button variant="outlined" onClick={handleClickOpen}>
          בוצע
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle sx={{ textAlign: "right" }}>
            טופס מילוי משימה
          </DialogTitle>
          <DialogContent>
            <DialogContentText sx={{ textAlign: "right" }}>
              :בבקשה תמלאו פה את הפרטים הבאים על מנת להמשיך
            </DialogContentText>
            <div dir="rtl">
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
            </div>
          </DialogContent>

          <DialogActions>
            <Button onClick={handleClose}>ביטול</Button>
            <Button onClick={handleSubmit} disabled={noti.length === 0}>
              שלח
            </Button>
          </DialogActions>
        </Dialog>
        <ToastContainer />
      </CacheProvider>
    </div>
  );
}
