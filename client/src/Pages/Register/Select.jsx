import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function BasicSelect({ setProfession, profession }) {
  const handleChange = (event) => {
    setProfession(event.target.value);
  };

  return (
      <Box dir="rtl" sx={{ minWidth: 120, margin: "20px 0px" }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">תפקיד</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={profession}
            label="תפקיד"
            onChange={handleChange}
          >
            <MenuItem style={{ direction: "rtl" }} value={"clean"}>
              ניקיון
            </MenuItem>
            <MenuItem style={{ direction: "rtl" }} value={"unusual-trash"}>
              פסולת חריגה
            </MenuItem>
            <MenuItem style={{ direction: "rtl" }} value={"animals"}>
              בעלי חיים
            </MenuItem>
            <MenuItem style={{ direction: "rtl" }} value={"construction"}>
              בינוי
            </MenuItem>
            <MenuItem style={{ direction: "rtl" }} value={"roads"}>
              כבישים
            </MenuItem>
          </Select>
        </FormControl>
      </Box>
  );
}
