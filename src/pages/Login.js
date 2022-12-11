// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Paper } from "@mui/material";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="#">
        csgo
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const token = localStorage.getItem("token");
  const checkLogin = async () => {
    if (token) {
      navigate("/dashboard");
    }
  };

  useEffect(() => {
    checkLogin();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    values.email = data.get("email");
    values.password = data.get("password");

    axios
      .post("http://127.0.0.1:8000/api/login", values)
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.user.role_id);
        navigate("/dashboard");
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  const paperStyle = {
    padding: 20,
    heigth: "100vh",
    width: 400,
    margin: "17vh auto",
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid component="main">
        <Paper elevation={20} style={paperStyle} maxWidth="xs">
          <Container>
            
            <CssBaseline />
            <Box
              sx={{
                marginTop: 3,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              

             
              
              <Avatar
                 alt=""
                 src="/hitado.png"
                 sx={{ width: '40%', height: '40%' }}
                  />
             
              <Typography component="h1" variant="h5">
                Welcome
              </Typography>
              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 3 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 5, mb: 2, bgcolor:'maroon' }}
                >
                  Login
                </Button>
              </Box>
            </Box>
            <Copyright sx={{ mt: 8, mb: 2 }} />
          </Container>
        </Paper>
      </Grid>
    </ThemeProvider>
  );
}
