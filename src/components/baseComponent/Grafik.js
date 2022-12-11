import React, { useState, useEffect, useRef } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import _ from "lodash";
import axios from "axios";
import { useNavigate } from "react-router-dom";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Chart.js Line Chart",
    },
  },
};

export default function Grafik() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  const [grafikTransaksi, setGrafikTransaksi] = useState({
    grafikTransaksi: [
      {
        total_harga: "",
        bulan: "",
        jumlah: "",
      },
    ],
  });
  const fetchGrafikTransaksi = async () => {
    await axios
      .get("http://127.0.0.1:8000/api/grafik/transaksi")
      .then((response) => {
        setGrafikTransaksi(response.data);
        console.log(response.data);
      });
  };

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
    fetchGrafikTransaksi();
  }, []);
  const labels = _.map(
    grafikTransaksi.grafikTransaksi,
    (item) => item.bulan + " " + item.year
  );
  const data = {
    labels,
    datasets: [
      {
        label: "Grafik Transaksi",
        data: _.map(
          grafikTransaksi.grafikTransaksi,
          (transaksi) => transaksi.total_harga
        ),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  console.log(grafikTransaksi);
  return <Line options={options} data={data} />;
}
