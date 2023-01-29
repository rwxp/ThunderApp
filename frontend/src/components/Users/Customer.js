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
  TextField, 
  FormControlLabel,
  Checkbox,
  Avatar,
  ListItemAvatar,
  Menu,
  MenuItem,
  Button
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
    transition: theme.transitions.create("padding", {
      easing: theme.transitions.easing.sharp,
      duration: 300,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      paddingLeft: `${drawerWidth}px`,
      transition: theme.transitions.create("padding", {
        easing: theme.transitions.easing.easeOut,
        duration: 300,
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

  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [Updateprofile, setUpdateprofile] = useState(false);
  const [viewStatus, setviewStatus] = useState(false);
  const [payment, setPayment] = useState(false);
  const [billView, setbillView] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleUpdateprofile = () => {
    setUpdateprofile(true);
    setviewStatus(false);
    setPayment(false);
    setbillView(false);
  };


  const handleViewStatus = () => {

    setviewStatus(true);
    setUpdateprofile(false);
    setPayment(false);
    setbillView(false);
    handleClose();
  };

  const handlePayment = () => {
    setPayment(true);
    setUpdateprofile(false);
    setviewStatus(false);
    setbillView(false);
    handleClose();
  };

  const handleBillView = () => {
    setbillView(true);
    setUpdateprofile(false);
    setviewStatus(false);
    setPayment(false);
    handleClose();
  };

  const loggedInUser = window.localStorage.getItem("loggedInUser");
  const userJson = JSON.parse(loggedInUser);
  const name = userJson.firstName + " " + userJson.lastName;

  const handleDrawerItem = ({ index }) => {
    if (isMobile) {
      handleDrawerClose();
    }

    if (index === 0) {
      handleUpdateprofile();
    }else if (index === 1) {
      handleViewStatus();
    } else if (index === 2) {
      handlePayment();
    } else if (index === 3) {
      handleBillView();
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        backgroundColor: isMobile && billView ? "gray" : "white",
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
              onClick={isMobile ? handleMenu : handleDrawerOpen}
              edge="start"
              sx={{ mr: 2, ...(open && { display: "none" }) }}
            >
              <MenuIcon />
            </IconButton>
            <Box>
              <Menu
                id="fade-menu"
                MenuListProps={{
                  "aria-labelledby": "fade-button",
                }}
                anchorEl={anchorEl}
                open={openMenu}
                onClose={handleClose}
                sx={{
                  "& .MuiPaper-root": { backgroundColor: "#33b4db" },
                  "& .MuiMenuItem-root": { color: "white" },
                  "& .MuiDivider-root": { backgroundColor: "white" },
                }}
              >
                <MenuItem onClick={handleViewStatus}>
                  <ListItemIcon>
                    <AssignmentLateOutlined sx={{ color: "white" }} />
                  </ListItemIcon>
                  Consultar estado
                </MenuItem>
                <Divider />
                <MenuItem onClick={handlePayment}>
                  <ListItemIcon>
                    <MonetizationOnOutlined sx={{ color: "white" }} />
                  </ListItemIcon>
                  Pagar factura
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleBillView}>
                  <ListItemIcon>
                    <ReceiptOutlined sx={{ color: "white" }} />
                  </ListItemIcon>
                  Ver factura
                </MenuItem>
              </Menu>
            </Box>
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
          {["update profile","Consultar estado", "Pagar factura", "Ver factura"].map(
            (text, index) => (
              <ListItem
                key={text}
                disablePadding
                onClick={() => handleDrawerItem({ index })}
              >
                <ListItemButton>
                  <ListItemIcon>
                    {index === 0 ? (
                      <UserMenu sx={{ color: "white" }} />
                    ): index === 1 ? (
                      <AssignmentLateOutlined sx={{ color: "white" }} />
                    ) : index === 2 ? (
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
          {Updateprofile ? (
            <Box>
              <h1>Update your profile</h1>
            </Box>
          ) :viewStatus ? (
            <Box>
              <h1>VISTA ESTADO</h1>
            </Box>
          ) : payment ? (
            <Box sx={{ backgroundColor: "white", mt: 14 }}>
                <Typography variant="h6" gutterBottom>
                   Payment method
                </Typography>
                <ListItemAvatar>
                  <Box>
                  <Avatar alt="Remy Sharp" 
                  src="https://s3.pagegear.co/121/75/imagenes-editor/2021/12/1209_psen_lxemd3.png" 
                   />
                  <Avatar alt="Remy Sharp" 
                  src="https://e7.pngegg.com/pngimages/910/492/png-clipart-mastercard-logo-credit-card-visa-brand-mastercard-text-label.png" /> 
                  <Avatar alt="Remy Sharp" 
                  src="https://e7.pngegg.com/pngimages/83/811/png-clipart-mastercard-visa-payment-business-credit-card-mastercard-text-trademark.png
                  "/>
                
                  </Box>
                  </ListItemAvatar>
                  <Grid item xs={12} md={6}>
                    <TextField
                      required
                      id="cardName"
                      label="Name on card"
                      fullWidth
                      autoComplete="cc-name"
                      variant="standard"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      required
                      id="cardNumber"
                      label="Card number"
                      fullWidth
                      autoComplete="cc-number"
                      variant="standard"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      required
                      id="expDate"
                      label="Expiry date"
                      fullWidth
                      autoComplete="cc-exp"
                      variant="standard"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      required
                      id="cvv"
                      label="CVV"
                      helperText="Last three digits on signature strip"
                      fullWidth
                      autoComplete="cc-csc"
                      variant="standard"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={<Checkbox color="secondary" name="saveCard" value="yes" />}
                      label="Remember credit card details for next time"
                    />
                  </Grid>
                
            </Box>
          ) : billView ? (
            <Box sx={{ backgroundColor: "white", mt: isMobile ? 14 : 4 }}>
              {isMobile ? (
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
              ) : null}
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
