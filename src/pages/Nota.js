import { Card, CardContent, Divider, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";

export default function Nota() {
  return (
    <Card sx={{ width: 600, margin: "auto" }} elevation={10}>
      <CardContent>
        <Typography align="center" variant="h5">
          WAROENG MAKAN
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
              1
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
              09/05/2022
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
            <Typography variant="h6" align="center">
              Nasi Ayam
            </Typography>
            <Typography variant="h6" align="center">
              Nasi Ikan
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="h6" gutterBottom align="center">
              Jumlah
            </Typography>
            <Typography variant="h6" align="center">
              1
            </Typography>
            <Typography variant="h6" align="center">
              4
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h6" gutterBottom align="center">
              Harga
            </Typography>
            <Typography variant="h6" align="center">
              Rp15.000
            </Typography>
            <Typography variant="h6" align="center">
              Rp40.000
            </Typography>
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
              Rp55.000
            </Typography>
          </Grid>
        </Grid>
        <Divider />

        <Box margin="20px"></Box>

        <Grid>
          <Typography variant="h6" gutterBottom align="right">
            Tunai : Rp60.000
          </Typography>
          <Typography variant="h6" gutterBottom align="right">
            Kembali : Rp5.000
          </Typography>
        </Grid>
      </CardContent>
    </Card>
  );
}
