import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import "./SuggestionCard.css";

export default function SuggestionCard({ suggestion }) {
  return (
    <Card sx={{ height: "100%", width: "100%", direction:"rtl" }}>
      <CardHeader
        title={suggestion.title}
        subheader={suggestion.fullName}
      />
      <div style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
      <CardMedia
        component="img"
        sx={{width:"300px", height:"200px"}}
        image={
          suggestion.img
            ? suggestion.img
            : "https://adom-it.co.il/wp-content/uploads/2020/01/placeholder.png"
        }
        alt="Paella dish"
      />
      </div>
      <CardContent sx={{overflowY:"scroll", height:300}}>
        <Typography variant="body2" color="text.secondary">
          {suggestion.body}
        </Typography>
      </CardContent>
    </Card>
  );
}
