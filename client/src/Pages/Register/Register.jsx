import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";
import BasicSelect from "./Select";
import { useEffect } from "react";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import { CacheProvider } from "@emotion/react";
import rtlPlugin from "stylis-plugin-rtl";

const theme = createTheme();

export default function Register() {
  const [loading, setLoading] = useState(false);
  const [profession, setProfession] = useState("");
  const [img, setImg] = useState("");
  const [selectedImg, setSelectedImg] = useState("");

  useEffect(() => {
    if (img) {
      const formData = new FormData();
      formData.append("file", img);
      formData.append("upload_preset", "pg6r4kyt");
      const getImgUrl = async () => {
        setLoading(true);
        await axios
          .post(
            "https://api.cloudinary.com/v1_1/dmxcfpaqb/image/upload",
            formData
          )
          .then((res) => setSelectedImg(res.data.secure_url));
        setLoading(false);
      };
      getImgUrl();
    }
  }, [img]);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    try {
      const newRegister = {
        name: data.get("name"),
        email: data.get("email"),
        password: data.get("password"),
        profession,
        img: selectedImg && selectedImg,
      };
      setLoading(true);
      await axios
        .post(`/register`, newRegister)
        .then((res) => console.log(res.data));
      setLoading(false);
    } catch {}
  };

  // Create rtl cache
  const cacheRtl = createCache({
    key: "muirtl",
    stylisPlugins: [prefixer, rtlPlugin],
  });

  return (
    <ThemeProvider theme={theme}>
      <CacheProvider value={cacheRtl}>
        <Grid container component="main" sx={{ height: "100vh" }}>
          <CssBaseline />
          <Grid item xs={12} component={Paper} elevation={6} square>
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                הרשמה
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 1 }}
                dir="rtl"
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="אימייל"
                  name="email"
                  autoComplete="email"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="name"
                  label="שם פרטי"
                  name="name"
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="סיסמא"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                <BasicSelect
                  setProfession={setProfession}
                  profession={profession}
                />
                <Box className="file-style">
                  <input
                    type="file"
                    id="files"
                    style={{ display: "none" }}
                    onChange={(e) => setImg(e.target.files[0])}
                  />
                  <label htmlFor="files" className="file-label">
                    בחר תמונה לעובד
                  </label>
                </Box>
                <Box sx={{ display: "flex" }}>
                  <Button
                    fullWidth
                    variant="outlined"
                    color="error"
                    sx={{ mt: 3, mb: 2, mr: 2, ml: 2 }}
                    onClick={() => navigate("/admin")}
                  >
                    חזור
                  </Button>
                  <Button
                    disabled={loading}
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2, mr: 2, ml: 2 }}
                  >
                    הרשמה
                  </Button>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </CacheProvider>
    </ThemeProvider>
  );
}
