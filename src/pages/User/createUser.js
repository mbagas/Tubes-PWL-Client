import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import axios from "axios";

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
        })
        .catch((error) => {
          console.log(error.response);
        });
      //   alert(JSON.stringify(values, null, 2));
    },
  });

  const theme = createTheme();

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <meta name="csrf-token" content="{{ csrf_token() }}"></meta>
        <ThemeProvider theme={theme}>
          <Container component="main" maxWidth="xs">
            <Box
              sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <TextField
                id="name"
                name="name"
                label="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
                sx={{
                  mb: 2,
                }}
              />
              <TextField
                id="email"
                name="email"
                label="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                sx={{
                  mb: 2,
                }}
              />
              <TextField
                id="password"
                name="password"
                label="Password"
                type="password"
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
              <TextField
                id="password_confirmation"
                name="password_confirmation"
                label="password_confirmation"
                type="password"
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
              {/* asdasd */}
              <TextField
                id="role_id"
                name="role_id"
                label="role_id"
                value={formik.values.role_id}
                onChange={formik.handleChange}
                error={formik.touched.role_id && Boolean(formik.errors.role_id)}
                helperText={formik.touched.role_id && formik.errors.role_id}
                sx={{
                  mb: 2,
                }}
              />
              <Button color="primary" variant="contained" type="submit">
                Submit
              </Button>
            </Box>
          </Container>
        </ThemeProvider>
      </form>
    </div>
  );
};

export default CreateUser;
