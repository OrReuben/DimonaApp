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
        {!cellValues.img?.length > 0 ? (
          <ImageIcon style={{ cursor: "pointer" }} />
        ) : (
          <ImageIcon style={{ cursor: "pointer", color: "red" }} />
        )}
      </i>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ textAlign: "center" }}>תמונות</DialogTitle>
        <DialogContent>
          {currentImages?.length > 0 ? (
            currentImages?.map((image, index) => (
              <Card key={index} sx={{ margin: "10px 0px" }}>
                <CardMedia
                  component="img"
                  height="300"
                  width="500"
                  src={image}
                />
              </Card>
            ))
          ) : (
            <Card sx={{ margin: "10px 0px" }}>
              <CardMedia
                component="img"
                height="300"
                width="500"
                src={
                  "https://st4.depositphotos.com/14953852/24787/v/600/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg"
                }
              />
            </Card>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
