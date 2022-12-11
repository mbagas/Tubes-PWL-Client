import React, { useState, useEffect, useRef } from "react";
import Button from "@mui/material/Button";
import { useReactToPrint } from "react-to-print";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Navbar, Nota } from "../../components";
import ReceiptIcon from "@mui/icons-material/Receipt";

const DetailTransaksi = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const token = localStorage.getItem("token");

  const [transaksi, setTransaksi] = useState({});

  //   const fetchTransaksi = async () => {
  //     axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  //     await axios
  //       .get(`http://127.0.0.1:8000/api/transaksi/${id}`)
  //       .then((response) => {
  //         setTransaksi(response.data);
  //         console.log(transaksi);
  //       });
  //   };
  //   useEffect(() => {
  //     fetchTransaksi();
  //     console.log(transaksi);
  //   }, [transaksi]);

  //   console.log(transaksi);
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <Navbar>
      <Nota ref={componentRef} id={id} />
      <Button
        variant="contained"
        startIcon={<ReceiptIcon />}
        onClick={handlePrint}
        sx={{
          my: "3rem",
          mx: "46%",
          alignSelf: "center",
        }}
      >
        Cetak Nota
      </Button>
    </Navbar>
  );
};

export default DetailTransaksi;
