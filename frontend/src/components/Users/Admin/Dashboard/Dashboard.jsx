import React, { useState } from "react";
import {
  Box,
  Button,
  CssBaseline,
  ThemeProvider,
  styled,
  Grid,
  useTheme,
  useMediaQuery,
  Menu,
  MenuItem,
  ListItemIcon,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import { tokens, ColorModeContext, useMode } from "../Theme";
import Header from "../ComponentsDashboard/Header";

import Sidebar from "../Sidebar";
import Topbar from "../Topbar";
import Charts from "./Charts";
import { useAuth } from "../../../../context/Context";
import AssignmentLateOutlined from "@mui/icons-material/AssignmentLateOutlined";
import MonetizationOnOutlined from "@mui/icons-material/MonetizationOnOutlined";
import ReceiptOutlined from "@mui/icons-material/ReceiptOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import ReceiptIcon from "@mui/icons-material/Receipt";
import PersonAdd from "@mui/icons-material/PersonAdd";

import { useNavigate, useParams } from "react-router-dom";

import UserList from "./../../../UserList/UserList";
import UserAdd from "../../../Register/Register";
import UserForm from "../../../UserData/UserData";
import Map from "../../../UserData/Map";

const sidebarWidth = 240;

const PageContent = styled(Box, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  flexGrow: 1,
  transition: theme.transitions.create("padding", {
    easing: theme.transitions.easing.easeIn,
    duration: 300,
  }),
  ...(!useMediaQuery(theme.breakpoints.down("sm")) && { paddingLeft: `80px` }),
  ...(open && {
    paddingLeft: `${sidebarWidth}px`,
    transition: theme.transitions.create("padding", {
      easing: theme.transitions.easing.easeOut,
      duration: 300,
    }),
  }),
}));

const Dashboard = () => {
  const navigate = useNavigate();
  const [theme, colorMode] = useMode();
  const muiTheme = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("sm"));

  const loggedInUser = window.localStorage.getItem("loggedInUser");
  const userJson = JSON.parse(loggedInUser);
  const name = userJson.firstName + " " + userJson.lastName;

  const { isSidebar } = useAuth();

  const colors = tokens(theme.palette.mode);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const hashLoc = window.location.hash;

  const handleDashboard = () => {
    navigate("/Dashboard");
    handleClose();
  };

  const handleUserList = () => {
    navigate("/Dashboard#users");
    handleClose();
  };

  const handleRegisterUser = () => {
    navigate("/Dashboard#register");
    handleClose();
  };

  const buttons = {
    dashboard: {
      icon: <HomeIcon fontSize="small" />,
      name: "Dashboard",
      onclick: handleDashboard,
    },
    userList: {
      icon: <ReceiptIcon fontSize="small" />,
      name: "UserList",
      onclick: handleUserList,
    },
    registerUser: {
      icon: <PersonAdd fontSize="small" />,
      name: "Add user",
      onclick: handleRegisterUser,
    },
  };

  getUpdateID(hashLoc);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box
          display="flex"
          justifyContent="left"
          sx={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            zIndex: 1,
          }}
        >
          {isMobile ? null : (
            <Sidebar
              handleDashboard={handleDashboard}
              handleUserList={handleUserList}
              handleRegister={handleRegisterUser}
            />
          )}
        </Box>
        <Box
          sx={{
            display: "grid",
            justifyContent: "center",
            position: "relative",
            overflowX: "hidden",
          }}
        >
          <PageContent
            open={isSidebar}
            sx={{ width: "100vw", height: "100vh" }}
          >
            <Grid
              justifyContent="center"
              height="100%"
              backgroundColor="rgba(255,255,255,0)"
              px={isMobile ? 6 : 14}
              pb={6}
            >
              {!isMobile ? null : (
                <Box sx={{ position: "absolute", top: 15, left: 30 }}>
                  <IconButton
                    id="fade-button"
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleMenu}
                    disableRipple
                  >
                    <MenuIcon />
                  </IconButton>

                  <Menu
                    id="fade-menu"
                    MenuListProps={{
                      "aria-labelledby": "fade-button",
                    }}
                    PaperProps={{ backgroundColor: colors.primary[300] }}
                    anchorEl={anchorEl}
                    open={openMenu}
                    onClose={handleClose}
                    sx={{
                      "& .MuiDivider-root": { backgroundColor: "white" },
                    }}
                  >
                    {Object.values(buttons).map((button, index) => (
                      <MenuItem value={index} onClick={button.onclick}>
                        <ListItemIcon>{button.icon}</ListItemIcon>
                        {button.name}
                      </MenuItem>
                    ))}
                  </Menu>
                </Box>
              )}
              <Topbar isMobile={isMobile} />
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Header title={"Bienvenido"} subtitle={name} />
              </Box>
              <Box
                sx={{
                  height: "100%",
                  width: "100%",
                  display: "grid",
                  placeItems: "center",
                  my: 4,
                }}
              >
                {hashLoc === "" ? (
                  <Box sx={{ pb:10, position:"absolute", top: 250}}>
                    <Charts />
                  </Box>
                ) : hashLoc === "#users" ? (
                  <UserList />
                ) : hashLoc === "#register" ? (
                  <UserAdd />
                ) : getUpdateID(hashLoc)[0] === "#users" ? (
                  <UserForm
                    idUser={getUpdateID(hashLoc)[1]}
                    isMobile={isMobile}
                  />
                ) : getUpdateID(hashLoc)[0] === "#map" ? (
                  <Map />
                ) : null}
              </Box>
            </Grid>
          </PageContent>
        </Box>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default Dashboard;

const getUpdateID = (path) => {
  const id = path.split("/");
  return id;
};