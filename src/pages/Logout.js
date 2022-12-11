import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const LogoutHandler = async () => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    if (token) {
      await axios
        .post("http://127.0.0.1:8000/api/logout")
        .then((response) => {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          navigate("/");
        });
    }
  };

  useEffect(() => {
    navigate("/");
    LogoutHandler();
  }, []);
};
export default Logout;
