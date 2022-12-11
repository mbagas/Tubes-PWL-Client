import React, { useState, useEffect, useRef } from "react";
import Button from "@mui/material/Button";
import DataTable from "react-data-table-component";
import { Navbar, Nota } from "../../components";
import { useNavigate } from "react-router-dom";
import _ from "lodash";
import axios from "axios";
import Swal from "sweetalert2";
import DeleteIcon from "@mui/icons-material/Delete";
import ReceiptIcon from "@mui/icons-material/Receipt";
import { Typography } from "@mui/material";
import moment from "moment";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import { useReactToPrint } from "react-to-print";
import { VisibilityOutlined } from "@mui/icons-material";

const Transaksi = () => {
  const customStyles = {
    rows: {
      style: {
        minHeight: "60px", // override the row height
      },
    },
    headCells: {
      style: {
        paddingLeft: "8px", // override the cell padding for head cells
        paddingRight: "8px",
        fontWeight: "bold",
      },
    },
    cells: {
      style: {
        paddingLeft: "8px", // override the cell padding for data cells
        paddingRight: "8px",
      },
    },
  };

  let role = "";
  if (localStorage.getItem("token")) {
    if (localStorage.getItem("role")) {
      role = localStorage.getItem("role");
    }
  }
  let columns = [];
  if (role == 1) {
    columns = [
      {
        name: "Total Harga",

        selector: "total_harga",
        sortable: true,
      },
      {
        name: "Uang bayar",

        selector: "uang_bayar",
        sortable: true,
      },
      {
        name: "Uang Kembali",

        selector: `uang_kembali`,
        cell: (row) => {
          return row.uang_kembali;
        },
        sortable: true,
      },
      {
        name: "Waktu Transaksi",

        selector: "Waktu Transaksi",
        cell: (row) => moment(row.created_at).format("DD/MM/YYYY, h:mm:ss"),
        sortable: true,
      },
      {
        cell: (row) =>
          row.id ? (
            <Button
              variant="contained"
              startIcon={<VisibilityOutlined />}
              onClick={() => navigate(`/transaksi/detail/${row.id}`)}
              sx={{bgcolor:'#22367E'}}
            >
              lihat
            </Button>
          ) : (
            console.log("gagal")
          ),
      },
      {
        cell: (row) =>
          row.id ? (
            <Button
              variant="outlined"
              color="error"
              startIcon={<DeleteIcon />}
              onClick={() => deleteTransaksi(row.id)}
            >
              Delete
            </Button>
          ) : (
            console.log("gagal")
          ),
      },
    ];
  } else {
    columns = [
      {
        name: "Total Harga",

        selector: "total_harga",
        sortable: true,
      },
      {
        name: "Uang bayar",

        selector: "uang_bayar",
        sortable: true,
      },
      {
        name: "Uang Kembali",

        selector: `uang_kembali`,
        cell: (row) => {
          return row.uang_kembali;
        },
        sortable: true,
      },
      {
        name: "Waktu Transaksi",

        selector: "Waktu Transaksi",
        cell: (row) => moment(row.created_at).format("DD/MM/YYYY, h:mm:ss"),
        sortable: true,
      },
      {
        cell: (row) =>
          row.id ? (
            <Button
              variant="contained"
              startIcon={<VisibilityOutlined />}
              onClick={() => navigate(`/transaksi/detail/${row.id}`)}
              sx={{bgcolor:'#22367E'}}
            >
              LIHAT
            </Button>
          ) : (
            console.log("gagal")
          ),
      },
      
    ];
  }
  const navigate = useNavigate();
  const [transaksi, setTransaksi] = useState([]);

  const token = localStorage.getItem("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  const fetchTransaksi = async () => {
    await axios
      .get("http://127.0.0.1:8000/api/transaksi")
      .then((response) => {
        setTransaksi(response.data);
        console.log(transaksi);
      });
  };

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
    fetchTransaksi();
  }, []);

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => Nota,
  });

  const deleteTransaksi = async (id) => {
    const isConfirm = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      return result.isConfirmed;
    });

    if (!isConfirm) {
      return;
    }

    await axios
      .delete(`http://127.0.0.1:8000/api/transaksi/${id}`)
      .then(({ data }) => {
        Swal.fire({
          icon: "success",
          text: data.message,
        });
        fetchTransaksi();
      })
      .catch(({ response: { data } }) => {
        Swal.fire({
          text: data.message,
          icon: "error",
        });
      });
  };

  const [filterText, setFilterText] = React.useState("");
  const [resetPaginationToggle, setResetPaginationToggle] =
    React.useState(false);
  const filteredItems = _.filter(
    transaksi.transaksis,
    (item) =>
      item.created_at &&
      item.created_at.toLowerCase().includes(filterText.toLowerCase())
  );

  const tableData = {
    columns,
    data: filteredItems,
  };

  return (
    <Navbar>
      <Typography variant="h4">Transaksi</Typography>
      <Button
        variant="contained"
        onClick={() => {
          navigate("/transaksi/create");
        }}
        sx={{
          mb: 2,bgcolor:'#495C83'
        }}
      >
        Create Transaksi
      </Button>
      <DataTableExtensions {...tableData}>
        <DataTable
          data={filteredItems}
          pagination
          paginationResetDefaultPage={resetPaginationToggle}
          columns={columns}
          customStyles={customStyles}
        />
      </DataTableExtensions>
    </Navbar>
  );
};

export default Transaksi;
