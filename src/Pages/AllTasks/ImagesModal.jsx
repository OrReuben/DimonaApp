import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Card from "@mui/material/Card";
import { useState } from "react";
import ImageIcon from "@mui/icons-material/Image";
import CardMedia from "@mui/material/CardMedia";

export default function ImagesModal({ cellValues }) {
  const [open, setOpen] = useState(false);
  const [currentImages, setCurrentImages] = useState(null);

  const handleClickOpen = () => {
    setOpen(true);
    setCurrentImages(cellValues.img);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <i onClick={handleClickOpen}>
        <ImageIcon style={{ cursor: "pointer" }} />
      </i>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ textAlign: "center" }}>תמונות</DialogTitle>
        <DialogContent>
          {currentImages?.map((image, index) => (
            <Card key={index} sx={{margin:'10px 0px'}}>
              <CardMedia component="img" height="300" width="500" src={image} />
            </Card>
          ))}
        </DialogContent>
      </Dialog>
    </div>
  );
}
