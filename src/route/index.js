// eslint-disable-next-line no-unused-vars
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import {
  Login,
  Logout,
  NoMatch,
  Dashboard,
  User,
  CreateUser,
  UpdateUser,
  Produk,
  CreateProduk,
  UpdateProduk,
  Transaksi,
  CreateTransaksi,
  DetailTransaksi,
} from "../pages";

import Protected from "./protected";

function Apps() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/Logout"
          element={
            <Protected>
              <Logout />
            </Protected>
          }
        />
        <Route
          path="/dashboard"
          element={
            <Protected>
              <Dashboard />
            </Protected>
          }
        />
        <Route
          path="/user"
          element={
            <Protected>
              <User />
            </Protected>
          }
        />
        <Route
          path="/user/create"
          element={
            <Protected>
              <CreateUser />
            </Protected>
          }
        />
        <Route
          path="/user/edit/:id"
          element={
            <Protected>
              <UpdateUser />
            </Protected>
          }
        />
        <Route
          path="/produk"
          element={
            <Protected>
              <Produk />
            </Protected>
          }
        />
        <Route
          path="/produk/create"
          element={
            <Protected>
              <CreateProduk />
            </Protected>
          }
        />
        <Route
          path="/produk/edit/:id"
          element={
            <Protected>
              <UpdateProduk />
            </Protected>
          }
        />
        <Route
          path="/transaksi"
          element={
            <Protected>
              <Transaksi />
            </Protected>
          }
        />
        <Route
          path="/transaksi/create"
          element={
            <Protected>
              <CreateTransaksi />
            </Protected>
          }
        />
        <Route
          path="/transaksi/detail/:id"
          element={
            <Protected>
              <DetailTransaksi />
            </Protected>
          }
        />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </Router>
  );
}

export default Apps;
