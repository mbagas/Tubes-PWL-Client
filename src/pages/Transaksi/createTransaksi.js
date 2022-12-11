import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import DataTable from "react-data-table-component";
import axios from "axios";
import Swal from "sweetalert2";
import { navigate, useNavigate } from "react-router-dom";
import { Navbar } from "../../components";
import _ from "lodash";

const CreateTransaksi = () => {
  const navigate = useNavigate();

  const [produk, setProduk] = useState([]);
  const [pesanan, setPesanan] = useState([]);
  const [pesananDetail, setPesananDetail] = useState({
    produk_id: "",
    nama_produk: "",
    harga: "",
    jumlah: "1",
    sub_total: "",
  });
  const [transaksi, setTransaksi] = useState({
    total_harga: "",
    uang_bayar: "",
    uang_kembali: "",
    data: [
      {
        produk_id: "",
        jumlah: "",
      },
    ],
  });

  const token = localStorage.getItem("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  const fetchProduk = async () => {
    await axios
      .get("http://127.0.0.1:8000/api/produk")
      .then((response) => {
        setProduk(response.data);
      });
  };

  useEffect(() => {
    if (!token) {
      //redirect login page
      navigate("/");
    }
    fetchProduk();
    console.log(pesanan);
    transaksi.total_harga = pesanan.reduce((acc, curr) => {
      return acc + curr.sub_total;
    }, 0);
  }, [pesanan]);

  useEffect(() => {
    console.log(transaksi);
  }, [transaksi]);

  const pesananHandleChange = (event) => {
    const produkPilihan = _.filter(
      produk.produks,
      (produk) => produk.id === event.target.value
    );
    pesananDetail.produk_id = produkPilihan[0].id;
    pesananDetail.nama_produk = produkPilihan[0].nama_produk;
    pesananDetail.harga = produkPilihan[0].harga;
    pesananDetail.sub_total = produkPilihan[0].harga * pesananDetail.jumlah;
    setPesananDetail(pesananDetail);
    setPesananDetail({
      produk_id: produkPilihan[0].id,
      harga: produkPilihan[0].harga,
      nama_produk: produkPilihan[0].nama_produk,
      jumlah: pesananDetail.jumlah,
      sub_total: produkPilihan[0].harga * pesananDetail.jumlah,
    });
  };

  const pesananSubmitHandler = async (event) => {
    event.preventDefault();
    await setPesanan([...pesanan, pesananDetail]);
    await setPesananDetail({
      produk_id: "",
      nama_produk: "",
      harga: "",
      jumlah: "1",
      sub_total: "",
    });
  };

  const pesananDeleteHandler = (index) => {
    const newPesanan = [...pesanan];
    newPesanan.splice(index, 1);
    setPesanan(newPesanan);
  };

  const uangBayarHandler = (event) => {
    event.preventDefault();
    transaksi.uang_bayar = event.target.value;
    transaksi.uang_kembali = transaksi.uang_bayar - transaksi.total_harga;
    setTransaksi({ ...transaksi });
  };

  const transaksiSubmitHandler = (event) => {
    event.preventDefault();
    if (transaksi.uang_bayar < transaksi.total_harga) {
      Swal.fire({
        icon: "error",
        title: "Uang Bayar Kurang",
        text: "Uang bayar kurang dari total harga",
      });
    } else {
      setTransaksi({
        ...transaksi,
        data: pesanan.map((pesanan) => {
          return {
            produk_id: pesanan.produk_id,
            jumlah: pesanan.jumlah,
          };
        }),
      });

      axios
        .post("http://127.0.0.1:8000/api/transaksi", transaksi)
        .then((response) => {
          console.log(response.data);
          Swal.fire({
            title: "Transaksi Berhasil",
            text: "Transaksi berhasil ditambahkan",
            icon: "success",
            confirmButtonText: "OK",
          }).then((result) => {
            if (result.value) {
              navigate("/transaksi");
            }
          });
        });
    }
  };

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

  const columns = [
    {
      name: "Id Produk",
      selector: (row) => row.produk_id,
      sortable: true,
    },
    {
      name: "Nama Produk",
      selector: (row) => row.nama_produk,
      sortable: true,
    },
    {
      name: "Harga Satuan",
      selector: (row) => row.harga,
      sortable: true,
    },
    {
      name: "Jumlah",
      selector: (row) => row.jumlah,
      sortable: true,
    },
    {
      name: "Harga Total",
      selector: (row) => row.sub_total,
      sortable: true,
    },

    {
      cell: (row, index) =>
        row.produk_id ? (
          <Button
            variant="outlined"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={pesananDeleteHandler.bind(this, index)}
          >
            Delete
          </Button>
        ) : (
          console.log("gagal")
        ),
    },
  ];

  return (
    <Navbar>
      <Grid
        container
        spacing={0}
        direction="row"
        alignItems="start"
        justifyContent="top"
        style={{ minHeight: "60vh" }}
        width="100%"
      >
        <Grid item xs={6}>
          <Grid container spacing={0} direction="row" alignItems="start">
            <Grid item xs={12}>
              <Typography variant="h5">Create Transaksi</Typography>
            </Grid>

            <Grid item xs={12}>
              <TextField
                id="produk_id"
                name="produk_id"
                select
                label="produk_id"
                variant="standard"
                value={pesananDetail.produk_id}
                onChange={pesananHandleChange}
                sx={{
                  mb: 2,
                  width: "20%",
                  height: "50%",
                }}
              >
                {_.map(produk.produks, (produk) => {
                  return (
                    <MenuItem key={produk.id} value={produk.id}>
                      {produk.nama_produk}
                    </MenuItem>
                  );
                })}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="harga"
                name="harga"
                label="harga"
                variant="standard"
                value={pesananDetail.harga}
                sx={{
                  mb: 2,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="jumlah"
                name="jumlah"
                label="jumlah"
                variant="standard"
                value={pesananDetail.jumlah}
                onChange={(event) => {
                  setPesananDetail({
                    ...pesananDetail,
                    jumlah: event.target.value,
                    sub_total: pesananDetail.harga * event.target.value,
                  });
                }}
                sx={{
                  mb: 2,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="harga"
                name="harga"
                label="Sub Total"
                variant="standard"
                value={pesananDetail.sub_total}
                sx={{
                  mb: 2,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                onClick={pesananSubmitHandler}
              >
                Tambah
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Grid container spacing={0} direction="row" alignItems="start">
            <Grid item xs={12}>
              <Typography variant="h5">Bayaran</Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="total_harga"
                name="total_harga"
                label="Total Harga"
                variant="standard"
                value={transaksi.total_harga}
                sx={{
                  mb: 2,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="uang_bayar"
                name="uang_bayar"
                label="Uang Bayar"
                variant="standard"
                value={transaksi.uang_bayar}
                onChange={uangBayarHandler}
                sx={{
                  mb: 2,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="uang_kembali"
                name="uang_kembali"
                label="uang kembali"
                variant="standard"
                value={transaksi.uang_kembali}
                sx={{
                  mb: 2,
                }}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5">Pesanan</Typography>
          <DataTable
            data={pesanan}
            pagination
            columns={columns}
            customStyles={customStyles}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={transaksiSubmitHandler}
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </Navbar>
  );
};

export default CreateTransaksi;
