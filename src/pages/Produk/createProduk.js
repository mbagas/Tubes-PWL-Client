import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import _ from "lodash";
import PropTypes from "prop-types";
import NumberFormat from "react-number-format";
import MenuItem from "@mui/material/MenuItem";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../../components";

const validationSchema = yup.object({
  nama_produk: yup
    .string("Enter a valid nama_produk")
    .required("nama_produk is required"),
  harga: yup.string("Enter Harga").required("Harga is required"),
});

const NumberFormatCustom = React.forwardRef(function NumberFormatCustom(
  props,
  ref
) {
  const { onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            //   id: props.id,
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
      prefix="Rp "
    />
  );
});

NumberFormatCustom.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

const CreateUser = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  useEffect(() => {
    if (!token) {
      //redirect login page
      navigate("/");
    }
  }, []);
  const formik = useFormik({
    initialValues: {
      nama_produk: "",
      harga: "",
    },
    validationSchema: validationSchema,

    onSubmit: (values) => {
      console.log(values);

      axios
        .post("https://waroengmakan.herokuapp.com/api/produk", values)
        .then((response) => {
          console.log(response);
          Swal.fire({
            title: "Success",
            text: "Produk created successfully",
            icon: "success",
            confirmButtonText: "OK",
          });
          navigate("/produk");
        })
        .catch((error) => {
          console.log(error.response);
        });
    },
  });

  return (
    <Navbar>
      <form onSubmit={formik.handleSubmit}>
        <meta nama_produk="csrf-token" content="{{ csrf_token() }}"></meta>
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
              Create Produk
            </Typography>
            <Grid item xs={12}>
              <TextField
                id="nama_produk"
                name="nama_produk"
                label="nama_produk"
                variant="standard"
                value={formik.values.nama_produk}
                onChange={formik.handleChange}
                error={
                  formik.touched.nama_produk &&
                  Boolean(formik.errors.nama_produk)
                }
                helperText={
                  formik.touched.nama_produk && formik.errors.nama_produk
                }
                sx={{
                  mb: 2,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                InputProps={{
                  inputComponent: NumberFormatCustom,
                }}
                id="harga"
                name="harga"
                label="harga"
                variant="standard"
                value={formik.values.harga}
                onChange={formik.handleChange}
                helperText={formik.touched.harga && formik.errors.harga}
                sx={{
                  mb: 2,
                }}
              />
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
