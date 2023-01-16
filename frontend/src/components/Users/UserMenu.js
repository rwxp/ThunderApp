import React from "react";
import {
  Box,
  Divider,
  IconButton,
  ListItemIcon,
  Tooltip,
  Avatar,
  Menu,
  MenuItem,
} from "@mui/material";

import Logout from "@mui/icons-material/Logout";
import Settings from "@mui/icons-material/Settings";

import { useNavigate } from "react-router-dom";

import { useAuth } from "../../context/Context";

import Swal from "sweetalert2";

const UserMenu = () => {
  const { name } = useAuth();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();

  const logoutConfirmation = () => {
    Swal.fire({
      title: "Espera",
      text: "¿Estás seguro que quieres cerrar sesión?",
      icon: "info",
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "Cerrar sesión",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#E05454",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/");
      }
    });
  };

  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar sx={{ width: 36, height: 36, bgcolor: "#33b4db" }}>
              <span
                style={{
                  fontWeight: "bold",
                  fontSize: 18,
                  fontFamily: "Montserrat",
                }}
              >
                {name.substring(0, 1)}
              </span>
            </Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        sx={{
          "& .MuiPaper-root": {
            backgroundColor: "aliceblue",
          },
        }}
        PaperProps={{
          elevation: 0,
          fontFamily: "Montserrat",

          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "& .MuiMenuItem-root": {
              fontFamily: "Montserrat",
            },

            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "top" }}
      >
        <MenuItem>
          <Avatar />
          {<span style={{ color: "gray", fontWeight: "bold" }}>{name}</span>}
        </MenuItem>
        <Divider />
        <MenuItem>
          <Avatar /> My account
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={logoutConfirmation}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
};

export default UserMenu;
