import React, { useState } from "react";
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
  useMediaQuery,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

import MuiAppBar from "@mui/material/AppBar";

import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import AssignmentLateOutlined from "@mui/icons-material/AssignmentLateOutlined";
import ReceiptOutlined from "@mui/icons-material/ReceiptOutlined";
import MonetizationOnOutlined from "@mui/icons-material/MonetizationOnOutlined";

import UserMenu from "./UserMenu";
import Factura from "../Bill/Factura";
import Home from "@mui/icons-material/Home";

import logo from ".././LandingPage/Images/logo3.png";

import Download from "@mui/icons-material/Download";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,

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

const Customer = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [viewStatus, setviewStatus] = useState(false);
  const [payment, setPayment] = useState(false);
  const [billView, setbillView] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleViewStatus = () => {
    setviewStatus(true);
    setPayment(false);
    setbillView(false);
  };

  const handlePayment = () => {
    setPayment(true);
    setviewStatus(false);
    setbillView(false);
  };

  const handleBillView = () => {
    setbillView(true);
    setviewStatus(false);
    setPayment(false);
  };

  const loggedInUser = window.localStorage.getItem("loggedInUser");
  const userJson = JSON.parse(loggedInUser);
  const name = userJson.firstName + " " + userJson.lastName;

  const handleDrawerItem = ({ index }) => {
    if (isMobile) {
      handleDrawerClose();
    }

    if (index === 0) {
      handleViewStatus();
    } else if (index === 1) {
      handlePayment();
    } else if (index === 2) {
      handleBillView();
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        backgroundColor: isMobile ? "gray" : "white",
        height: isMobile ? "62em" : "100%",
      }}
    >
      <CssBaseline />
      <AppBar
        position="fixed"
        open={open}
        sx={{
          backgroundColor: "#124265",
        }}
      >
        <Toolbar
          sx={{
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
              {userJson.role}
            </Typography>
          </Grid>
          <Grid display="flex" flexDirection="row" columnGap={4}>
            <UserMenu />
            <IconButton onClick={() => navigate("/")}>
              <Home sx={{ color: "white", width: "30px", height: "auto" }} />
            </IconButton>
          </Grid>
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
        <Divider
          sx={{
            border: "1px solid white",
          }}
        />
        <Grid sx={{ py: 3, display: "grid", justifyContent: "center" }}>
          <img src={logo} alt="logo" width="100px" height="auto" />
        </Grid>
        <List>
          {["Consultar estado", "Pagar factura", "Ver factura"].map(
            (text, index) => (
              <ListItem
                key={text}
                disablePadding
                onClick={() => handleDrawerItem({ index })}
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
        <Grid sx={{ display: "grid", placeItems: "center", height: "100vh" }}>
          {viewStatus ? (
            <Box>
              <h1>VISTA ESTADO</h1>
            </Box>
          ) : payment ? (
            <Box>
              <h1>VISTA PAGO</h1>
            </Box>
          ) : billView ? (
            <Box sx={{ backgroundColor: "white", mt: 14 }}>
              <IconButton
                sx={{ position: "absolute", top: 62, right: 20 }}
                onClick={() =>
                  window.open(
                    "/factura",
                    "Download PDF",
                    "height=500,width=900"
                  )
                }
              >
                <Download />
              </IconButton>

              <Factura />
            </Box>
          ) : (
            <Typography
              variant={isMobile ? "h6" : "h4"}
              textAlign={"justify"}
              fontWeight={600}
              mt="12px"
            >
              Bienvenido {<span style={{ color: "#33b4db" }}>{name}</span>}
            </Typography>
          )}
        </Grid>
      </Main>
    </Box>
  );
};

export default Customer;
