import React, { useState } from "react";
import { Menu, MenuItem, Button } from "@mui/material";

const DropdownMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button variant="contained" onClick={handleClick}>
        Chọn
      </Button>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={handleClose}>1</MenuItem>
        <MenuItem onClick={handleClose}>2</MenuItem>
        <MenuItem onClick={handleClose}>3</MenuItem>
      </Menu>
    </div>
  );
};

export default DropdownMenu;
