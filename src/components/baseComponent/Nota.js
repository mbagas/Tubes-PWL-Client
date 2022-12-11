import React, { useState, forwardRef, useEffect } from "react";
import { Card, CardContent, Divider, Grid, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { Box } from "@mui/system";
import moment from "moment";
import axios from "axios";
import _ from "lodash";

const Nota = forwardRef((props, ref) => {
  // console.log(props.id);
  const token = localStorage.getItem("token");

  const [transaksi, setTransaksi] = useState({
    transaksi: {
      id: 0,
      total_harga: "-",
      uang_bayar: "-",
      uang_kembali: "-",
      created_at: "-",
      data: [
        {
          produk_id: "-",
          jumlah: "-",
        },
      ],
    },
  });

  useEffect(() => {
    console.log("useEffect");
    const fetchTransaksi = async () => {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      try {
        await axios
          .get(`http://127.0.0.1:8000/api/transaksi/${props.id}`)
          .then((response) => {
            setTransaksi(response.data);
            console.log(transaksi);
          });
      } catch (err) {
        console.log(err);
      }
    };
    fetchTransaksi();
    console.log(transaksi.transaksi.id);
  }, [transaksi]);

  return (
    <div ref={ref}>
      <Card sx={{ width: 600, margin: "auto" }} elevation={10}>
        <CardContent>
        
          <Typography align="center" variant="h5">
          
           KOPI HITADO
          </Typography>
          <Divider />
          <Box margin="50px"></Box>

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="h6" gutterBottom align="left">
                ID
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h6" gutterBottom align="center">
                {transaksi.transaksi.id}
              </Typography>
            </Grid>
          </Grid>
          <Divider />
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="h6" gutterBottom align="left">
                Tanggal Pembayaran
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h6" gutterBottom align="center">
                {moment(transaksi.transaksi.created_at).format(
                  "DD/MM/YYYY, h:mm:ss"
                )}
              </Typography>
            </Grid>
          </Grid>
          <Divider />

          <Box margin="50px"></Box>
          <Typography variant="h6" gutterBottom align="left">
            RINGKASAN PEMBAYARAN
          </Typography>
          <Divider />

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="h6" gutterBottom align="center">
                Nama Produk
              </Typography>
              {_.map(transaksi.transaksi.pesanans, (pesananDetail) => {
                return (
                  <Typography variant="h6" gutterBottom align="center">
                    {pesananDetail.produks.nama_produk}
                  </Typography>
                );
              })}
            </Grid>
            <Grid item xs={2}>
              <Typography variant="h6" gutterBottom align="center">
                Jumlah
              </Typography>
              {_.map(transaksi.transaksi.pesanans, (pesananDetail) => {
                return (
                  <Typography variant="h6" gutterBottom align="center">
                    {pesananDetail.jumlah}
                  </Typography>
                );
              })}
            </Grid>
            <Grid item xs={4}>
              <Typography variant="h6" gutterBottom align="center">
                Harga Satuan
              </Typography>
              {_.map(transaksi.transaksi.pesanans, (pesananDetail) => {
                return (
                  <Typography variant="h6" gutterBottom align="center">
                    Rp {pesananDetail.produks.harga}
                  </Typography>
                );
              })}
            </Grid>
          </Grid>

          <Box margin="20px"></Box>

          <Divider />
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Typography variant="h6" gutterBottom align="left">
                JUMLAH PEMBAYARAN
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="h6" gutterBottom align="center">
                Rp {transaksi.transaksi.total_harga}
              </Typography>
            </Grid>
          </Grid>
          <Divider />

          <Box margin="20px"></Box>

          <Grid>
            <Typography variant="h6" gutterBottom align="right">
              Tunai : Rp {transaksi.transaksi.uang_bayar}
            </Typography>
            <Typography variant="h6" gutterBottom align="right">
              Kembali : Rp {transaksi.transaksi.uang_kembali}
            </Typography>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
});

export default Nota;
