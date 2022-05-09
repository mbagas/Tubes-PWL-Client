import React, { useState, useEffect, useRef } from "react";
import Button from "@mui/material/Button";
import DataTable from "react-data-table-component";
import { FilterComponent, Navbar, Nota, Grafik } from "../../components";
import { useNavigate } from "react-router-dom";
import _ from "lodash";
import axios from "axios";
import Swal from "sweetalert2";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ReceiptIcon from "@mui/icons-material/Receipt";
import { Typography } from "@mui/material";
import moment from "moment";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import { useReactToPrint } from "react-to-print";

const Transaksi = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  return (
    <Navbar>
      <Typography variant="h4">Dashboard</Typography>
      <Grafik />
    </Navbar>
  );
};

export default Transaksi;
