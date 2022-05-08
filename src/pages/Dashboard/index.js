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

const Dashboard = () => {
  const handleButtonClick = (id) => {
    console.log("clicked");
  };

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

  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Role",
      selector: (row) => row.roles.role,
      sortable: true,
    },
    {
      cell: (row) =>
        row.id ? (
          <Button
            variant="contained"
            startIcon={<EditIcon />}
            onClick={() => {
              handleButtonClick(row.id);
              navigate("/user/edit/" + row.id);
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
            onClick={() => deleteProduct(row.id)}
          >
            Delete
          </Button>
        ) : (
          console.log("gagal")
        ),
    },
  ];

  const [user, setUser] = useState({});

  const token = localStorage.getItem("token");

  const fetchUsers = async () => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    await axios.get("http://127.0.0.1:8000/api/user").then((response) => {
      setUser({ users: response.data });
      console.log(user);
    });
  };

  useEffect(() => {
    if (!token) {
      //redirect login page
      navigate("/");
    }

    fetchUsers();
  }, []);

  const deleteProduct = async (id) => {
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
      .delete(`http://localhost:8000/api/user/${id}`)
      .then(({ data }) => {
        Swal.fire({
          icon: "success",
          text: data.message,
        });
        fetchUsers();
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
    user.users,
    (item) =>
      item.name && item.name.toLowerCase().includes(filterText.toLowerCase())
  );

  const subHeaderComponentMemo = React.useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };

    return (
      <FilterComponent
        onFilter={(e) => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
      />
    );
  }, [filterText, resetPaginationToggle]);
  return (
    <Navbar>
      <Typography variant="h4">User</Typography>
      <Button
        variant="contained"
        onClick={() => {
          navigate("/user/create");
        }}
      >
        Create User
      </Button>
      <DataTable
        data={filteredItems}
        pagination
        paginationResetDefaultPage={resetPaginationToggle}
        columns={columns}
        customStyles={customStyles}
        subHeader
        subHeaderComponent={subHeaderComponentMemo}
      />
    </Navbar>
  );
};
export default Dashboard;
