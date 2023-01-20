import { Box, IconButton, useTheme, Button, Grid } from "@mui/material";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { ColorModeContext, tokens } from "./Theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { lightBlue } from "@mui/material/colors";

import logo from "../../LandingPage/Images/logo3.png";

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    window.localStorage.removeItem("loggedInUser");
    navigate("/");
  };

  return (
    <Box display="flex" justifyContent="space-between" py={4} alignItems="center">
      {/* SEARCH BAR */}
      <Box>
        <Box display="flex" alignItems={"center"}>
          <Grid>
            <img
              src={logo}
              alt="logo"
              style={{ width: "80px", height: "auto", marginRight: "3em"}}
            />
          </Grid>
          <Grid
            item
            sx={{
              height: "36px",
              backgroundColor: colors.primary[400],
              display: "flex",
              alignItems: "center",
              borderRadius: "3px",
            }}
          >
            <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
            <IconButton type="button" sx={{ p: 1 }}>
              <SearchIcon />
            </IconButton>
          </Grid>
        </Box>
      </Box>

      {/* ICONS */}
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        <IconButton>
          <NotificationsOutlinedIcon />
        </IconButton>
        <IconButton>
          <SettingsOutlinedIcon />
        </IconButton>
        <IconButton>
          <PersonOutlinedIcon />
        </IconButton>
        <Box sx={{ ml: 3 }}>
          <Button
            variant="contained"
            sx={{
              background: "aliceblue",
              color: "black",
              ":hover": { background: "lightBlue" },
            }}
            onClick={handleLogout}
          >
            Log out
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Topbar;
