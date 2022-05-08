import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import _ from "lodash";
import MenuItem from "@mui/material/MenuItem";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../../components";

const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

const CreateUser = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState([]);
  const fetchRole = async () => {
    await axios.get("http://127.0.0.1:8000/api/role").then((response) => {
      setRole(response.data);
    });
  };

  const token = localStorage.getItem("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  useEffect(() => {
    if (!token) {
      //redirect login page
      navigate("/");
    }
    fetchRole();
  }, []);
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
      //   role_id: "1",
    },
    validationSchema: validationSchema,

    onSubmit: (values) => {
      console.log(values);

      axios
        .post("http://127.0.0.1:8000/api/user", values)
        .then((response) => {
          console.log(response);
          Swal.fire({
            title: "Success",
            text: "User created successfully",
            icon: "success",
            confirmButtonText: "OK",
          });
          navigate("/user");
        })
        .catch((error) => {
          console.log(error.response);
        });
      //   alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <Navbar>
      <form onSubmit={formik.handleSubmit}>
        <meta name="csrf-token" content="{{ csrf_token() }}"></meta>
        <Grid
          container
          spacing={0}
          direction="row"
          alignItems="start"
          justifyContent="top"
          style={{ minHeight: "100vh" }}
          width="100%"
        >
          <FormControl variant="standard">
            <Typography variant="h5" gutterBottom>
              Edit User
            </Typography>
            <Grid item xs={12}>
              <TextField
                id="name"
                name="name"
                label="name"
                variant="standard"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
                sx={{
                  mb: 2,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="email"
                name="email"
                label="Email"
                variant="standard"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                sx={{
                  mb: 2,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="password"
                name="password"
                label="Password"
                type="password"
                variant="standard"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
                sx={{
                  mb: 2,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="password_confirmation"
                name="password_confirmation"
                label="password_confirmation"
                type="password"
                variant="standard"
                value={formik.values.password_confirmation}
                onChange={formik.handleChange}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
                sx={{
                  mb: 2,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="role_id"
                name="role_id"
                select
                label="role_id"
                variant="standard"
                value={formik.values.role_id}
                onChange={formik.handleChange}
                error={formik.touched.role_id && Boolean(formik.errors.role_id)}
                helperText={formik.touched.role_id && formik.errors.role_id}
                sx={{
                  mb: 2,
                  width: "100%",
                }}
              >
                {_.map(role.roles, (role) => {
                  console.log(role.id);
                  return (
                    <MenuItem key={role.id} value={role.id}>
                      {role.role}
                    </MenuItem>
                  );
                })}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <Button color="primary" variant="contained" type="submit">
                Submit
              </Button>
            </Grid>
          </FormControl>
        </Grid>
      </form>
    </Navbar>
  );
};

export default CreateUser;
