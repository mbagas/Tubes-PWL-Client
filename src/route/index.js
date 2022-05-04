// eslint-disable-next-line no-unused-vars
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login, User, CreateUser } from "../pages/index.js";

function Apps() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/user" element={<User />} />
        <Route path="/user/create" element={<CreateUser />} />
      </Routes>
    </Router>
  );
}

export default Apps;
