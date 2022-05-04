import React, { useState, useEffect } from "react";
// import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import DataTable from "react-data-table-component";
import _ from "lodash";
import { FilterComponent } from "../../components";
const User = () => {
  const handleButtonClick = (id) => {
    console.log("clicked");
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
      selector: (row) => row.role,
      sortable: true,
    },
    {
      cell: (row) =>
        row.id ? (
          <Button
            variant="contained"
            onClick={() => {
              console.log(row.id);
              handleButtonClick(row.id);
            }}
          >
            Edit {row.id}
          </Button>
        ) : (
          console.log("gagal")
        ),
    },
  ];

  const [user, setUser] = useState({});

  const fetchUsers = async () => {
    const response = await fetch("http://127.0.0.1:8000/api/user");
    setUser({ users: await response.json() });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

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
    <DataTable
      title="Users"
      data={filteredItems}
      pagination
      paginationResetDefaultPage={resetPaginationToggle}
      columns={columns}
      subHeader
      subHeaderComponent={subHeaderComponentMemo}
    />
  );
};
export default User;
