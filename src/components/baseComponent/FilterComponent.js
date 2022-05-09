import React from "react";
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
const FilterComponent = ({ filterText, onFilter }) => (
  <>
    <TextField
      id="search"
      type="text"
      placeholder="Filter"
      aria-label="Search Input"
      value={filterText}
      onChange={onFilter}
    />
  </>
);

export default FilterComponent;
