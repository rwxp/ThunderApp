import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import efecto from "./Operator/OperatorList.css";
import {
  styled,
  useTheme,
  Box,
  Drawer,
  CssBaseline,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Grid,
} from "@mui/material";

import MuiAppBar from "@mui/material/AppBar";

import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import AssignmentLateOutlined from "@mui/icons-material/AssignmentLateOutlined";
import ReceiptOutlined from "@mui/icons-material/ReceiptOutlined";
import MonetizationOnOutlined from "@mui/icons-material/MonetizationOnOutlined";

import UserMenu from "./UserMenu";
import logo from ".././LandingPage/Images/logo3.png";

import OperatorList from "./Operator/OperatorList";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const Operador = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleDrawerItem = ({ index }) => {
    if (index === 0) {
      handlePagos();
    }
  };
  const handlePagos = () => {
    navigate("/Operador#registerpay");
  };

  const loggedInUser = window.localStorage.getItem("loggedInUser");
  const userJson = JSON.parse(loggedInUser);
  const name = userJson.firstName + " " + userJson.lastName;

  const hashLoc = window.location.hash;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar
          sx={{
            backgroundColor: "#124265",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Grid
            sx={{
              display: "flex",
              direction: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{ mr: 2, ...(open && { display: "none" }) }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              Operador
            </Typography>
          </Grid>
          <UserMenu />
        </Toolbar>
      </AppBar>

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "#33b4db",
            color: "#FFFFFF",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon sx={{ color: "white" }} />
            ) : (
              <ChevronRightIcon sx={{ color: "white" }} />
            )}
          </IconButton>
        </DrawerHeader>
        <Grid sx={{ py: 3, display: "grid", justifyContent: "center" }}>
          <img src={logo} alt="logo" width="100px" height="auto" />
        </Grid>
        <Divider
          sx={{
            border: "1px solid white",
          }}
        />
        <List>
          {["Registrar pagos"].map(
            (text, index) => (
              <ListItem
                key={text}
                onClick={() => handleDrawerItem({ index })}
                disablePadding
              >
                <ListItemButton>
                  <ListItemIcon>
                    {index === 0 ? (
                      <AssignmentLateOutlined sx={{ color: "white" }} />
                    ) : index === 1 ? (
                      <MonetizationOnOutlined sx={{ color: "white" }} />
                    ) : (
                      <ReceiptOutlined sx={{ color: "white" }} />
                    )}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            )
          )}
        </List>
      </Drawer>

      <Main open={open}>
        <Grid
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 14,
            height: "100vh",
            width: "100vw",
          }}
        >
          {hashLoc === "" ? (
            <h1>
              Bienvenido <span style={{color:"#33b4db"}}>{name}</span>
            </h1>
          ) : hashLoc === "#registerpay" ? (
            <OperatorList />
          ) : null}
        </Grid>
      </Main>
    </Box>
  );
};

export default Operador;