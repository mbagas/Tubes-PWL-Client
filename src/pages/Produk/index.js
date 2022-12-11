import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import DataTable from "react-data-table-component";
import _ from "lodash";
import { FilterComponent, Navbar } from "../../components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Typography } from "@mui/material";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";

const Produk = () => {
  const navigate = useNavigate();

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
        name: "Nama Produk",
        selector: "nama_produk",
        sortable: true,
      },
      {
        name: "Harga",
        selector: "harga",
        sortable: true,
      },
      {
        cell: (row) =>
          row.id ? (
            <Button
              variant="contained"
              startIcon={<EditIcon />}
              onClick={() => {
                navigate("/produk/edit/" + row.id);
              }}
            >
              Edit
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
              onClick={() => deleteProduk(row.id)}
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
        name: "Nama Produk",
        selector: "nama_produk",
        sortable: true,
      },
      {
        name: "Harga",
        selector: "harga",
        sortable: true,
      },
    ];
  }

  const [produk, setProduk] = useState({});

  const token = localStorage.getItem("token");

  const fetchProduk = async () => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    await axios
      .get("http://127.0.0.1:8000/api/produk")
      .then((response) => {
        console.log(response.data);
        setProduk(response.data);
        console.log(produk);
      });
  };

  useEffect(() => {
    if (!token) {
      //redirect login page
      navigate("/");
    }

    fetchProduk();
  }, []);

  const deleteProduk = async (id) => {
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
      .delete(`http://127.0.0.1:8000/api/produk/${id}`)
      .then(({ data }) => {
        Swal.fire({
          icon: "success",
          text: data.message,
        });
        fetchProduk();
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
    produk.produks,
    (item) =>
      item.nama_produk &&
      item.nama_produk.toLowerCase().includes(filterText.toLowerCase())
  );

  const tableData = {
    columns,
    data: filteredItems,
  };

  return (
    <Navbar>
      <Typography variant="h4">produk</Typography>
      {role == 1 ? (
        <Button
          variant="contained"
          onClick={() => {
            navigate("/produk/create");
          }}
          sx={{
            mb: 2, bgcolor:'#495C83'
          }}
        >
          Create produk
        </Button>
      ) : null}

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
export default Produk;
