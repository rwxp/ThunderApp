import { Box, IconButton, useTheme, Button, Grid } from "@mui/material";
import React, { useContext } from "react";

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

import UserMenu from "../UserMenu";

const Topbar = ({ isMobile }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      py={4}
      alignItems="center"
      mt={isMobile ? 3.5 : 0}
    >
      {/* SEARCH BAR */}
      <Box>
        <Box display="flex" alignItems={"center"}>
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
            <InputBase
              sx={{ ml: 2, flex: 1, width: isMobile ? 90 : "auto" }}
              placeholder="Search"
            />
            <IconButton type="button" sx={{ p: 1 }}>
              <SearchIcon />
            </IconButton>
          </Grid>
        </Box>
      </Box>

      {/* ICONS */}
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode} disableRipple>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        <Box sx={{ ml: isMobile ? 0 : 1.5 }}>
          <UserMenu bgcolor={colors.primary[400]} />
        </Box>
      </Box>
    </Box>
  );
};

export default Topbar;
