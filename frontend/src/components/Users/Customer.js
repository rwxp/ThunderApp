import React, { useState, useEffect } from "react";
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
  Menu,
  MenuItem,
  Button,
  Stack,
} from "@mui/material";

import { useParams, useNavigate } from "react-router-dom";
import * as UserAPI from "../UserList/UserAPI.js";
import MuiAppBar from "@mui/material/AppBar";

import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import AssignmentLateOutlined from "@mui/icons-material/AssignmentLateOutlined";
import ReceiptOutlined from "@mui/icons-material/ReceiptOutlined";
import MonetizationOnOutlined from "@mui/icons-material/MonetizationOnOutlined";

import * as FacturaAPI from "../Bill/FacturaAPI.js";
import UserMenu from "./UserMenu";
import Factura from "../Bill/Factura";
import Home from "@mui/icons-material/Home";

import logo from ".././LandingPage/Images/logo3.png";
import image from "./home.png";
import Download from "@mui/icons-material/Download";
import { BicyclingLayer } from "@react-google-maps/api";

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

  const params = useParams();
  const theme = useTheme();
  const [open, setOpen] = useState(true);

  const [bill, setBill] = useState();

  const getBill = async (searchVal) => {
    try {
      const res = await FacturaAPI.getBill(searchVal);
      const data = await res.json();
      setBill(data.bill);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBill();
    // eslint-disable-next-line
  }, []);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const hashLoc = window.location.hash;

  const handleUpdateprofile = () => {
    navigate("/Cliente#profile");
    handleClose();
  };

  const handleViewStatus = () => {
    navigate("/Cliente#status");
    handleClose();
  };

  const handlePayment = () => {
    navigate("/Cliente#payment");
    handleClose();
  };

  const handleBillView = () => {
    navigate("/Cliente#bill");
    handleClose();
  };

  const handlePagar = () => {
    navigate("/Cliente#pagoexitoso");
    handleClose();
  };

  const loggedInUser = window.localStorage.getItem("loggedInUser");
  const userJson = JSON.parse(loggedInUser);
  const name = userJson.firstName + " " + userJson.lastName;

  const billStatus = window.localStorage.getItem("clientBill");
  const billJson = JSON.parse(billStatus);
  console.log(billJson.status);
  const estado = userJson.isActive;

  const handleDrawerItem = ({ index }) => {
    if (isMobile) {
      handleDrawerClose();
    }

    if (index === 0) {
      handleUpdateprofile();
    } else if (index === 1) {
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
        backgroundColor: isMobile && hashLoc === "#bill" ? "gray" : "white",
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
          {[
            "Editar perfil",
            "Consultar estado",
            "Pagar factura",
            "Ver factura",
          ].map((text, index) => (
            <ListItem
              key={text}
              disablePadding
              onClick={() => handleDrawerItem({ index })}
            >
              <ListItemButton>
                <ListItemIcon>
                  {index === 0 ? (
                    <Avatar
                      sx={{
                        color: "white",
                        width: 28,
                        height: 28,
                        bgcolor: "rgba(46, 88, 148, 0.3)",
                      }}
                    >
                      {name.substring(0, 1)}
                    </Avatar>
                  ) : index === 1 ? (
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
          ))}
        </List>
      </Drawer>

      <Main open={open}>
        <Grid sx={{ display: "grid", placeItems: "center", height: "100vh" }}>
          {hashLoc === "#profile" ? (
            <UpdateProfile isMobile={isMobile} />
          ) : hashLoc === "#pagoexitoso" ? (
            <Box
              sx={{
                backgroundColor: "#E6E6FA",
                mt: 10,
                py: 5,
                px: 8,
                width: "500px",
                borderRadius: "16px",
              }}
            >
              <Typography
                fontSize={isMobile ? 22 : 40}
                sx={{
                  fontWeight: 800,
                  color: "#124265",
                  textAlign: "center",
                  fontFamily: "Montserrat",
                }}
              >
                Pago exitoso
              </Typography>
              <Typography
                fontSize={isMobile ? 20 : 25}
                sx={{
                  fontWeight: 200,
                  color: "#124265",
                  textAlign: "center",
                  fontFamily: "Montserrat",
                }}
              >
                Usted acaba de registrar el pago de manera exitosa
              </Typography>
              <Grid container justifyContent={"center"}>
                <Button
                  variant="contained"
                  sx={{ mt: 2.5, mb: 2.5 }}
                  onClick={() => navigate("")}
                >
                  Go back
                </Button>
              </Grid>
            </Box>
          ) : hashLoc === "#status" ? (
            <Box
              sx={{
                backgroundColor: "#E6E6FA",
                mt: 10,
                py: 5,
                px: 8,
                mx: isMobile ? 8 : 30,
                borderRadius: "16px",
              }}
            >
              <Typography
                fontSize={isMobile ? 22 : 40}
                sx={{
                  fontWeight: 800,
                  color: "#124265",
                  textAlign: "center",
                  fontFamily: "Montserrat",
                }}
              >
                Tu estado en Thunder
              </Typography>
              <Typography
                fontSize={isMobile ? 20 : 25}
                sx={{
                  fontWeight: 200,
                  color: "#124265",
                  textAlign: "center",
                  fontFamily: "Montserrat",
                }}
              >
                Hola {name} recuerda que debes estar al día con el pago de tus
                facturas, en caso de que tu estado no esté activado, dirigete a
                la pestaña de pagos. Tu estado es:{" "}
                <span
                  style={{
                    fontWeight: "bold",
                    color: billJson.status === "mora" ? "red" : "blue",
                  }}
                >
                  {billJson.status === "mora" ? "en mora" : "al día"}
                </span>
              </Typography>
            </Box>
          ) : hashLoc === "#payment" ? (
            <Payment />
          ) : hashLoc === "#bill" ? (
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
            <WelcomeUser isMobile={isMobile} name={name} />
          )}
        </Grid>
      </Main>
    </Box>
  );
};

export default Customer;

const UpdateProfile = ({ isMobile }) => {
  const [isLoading, setisLoading] = useState(false);

  const loggedInUser = window.localStorage.getItem("loggedInUser");
  const userJson = JSON.parse(loggedInUser);
  const idUser = userJson.id;

  const initialState = {
    id: 0,
    lastName: "",
    firstName: "",
    birthDate: "",
    address: "",
    phone: "",
    role: "",
    isActive: false,
  };

  const navigate = useNavigate();
  const [user, setUser] = useState(initialState);

  const handleInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (id) => {
    try {
      await UserAPI.updateUser(id, user);
      window.localStorage.setItem("loggedInUser", JSON.stringify(user));
      navigate("/Cliente");
    } catch (error) {
      console.log(error);
    }
  };

  const loadUser = async () => {
    setisLoading(true);
    try {
      const res = await UserAPI.getUser(idUser);
      const data = await res.json();
      setUser(data.user);
      setisLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <Box
      sx={{
        backgroundColor: "#E6E6FA",
        my: 12,
        py: 5,
        px: 5,
        borderRadius: "16px",
      }}
    >
      <Typography
        fontSize={isMobile ? 22 : 30}
        sx={{
          fontWeight: 800,
          color: "#124265",
          textAlign: "center",
          fontFamily: "Montserrat",
        }}
      >
        Actualiza los datos de tu perfil
      </Typography>
      <Box sx={{ my: 2, px: 2 }}>
        <Box sx={{ my: 2, px: 2 }}>
          <Grid
            container
            width={isMobile ? 300 : 600}
            justify="center"
            direction="column"
            spacing="15px"
          >
            <Grid item>
              <TextField
                fullWidth
                sx={{
                  input: {
                    background: "white",
                  },
                }}
                label="First Name"
                name="firstName"
                type="text"
                value={user.firstName}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item>
              <TextField
                fullWidth
                sx={{
                  input: {
                    background: "white",
                  },
                }}
                id="lname-input"
                label="Last Name"
                name="lastName"
                type="text"
                value={user.lastName}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item>
              <TextField
                fullWidth
                sx={{
                  input: {
                    background: "white",
                  },
                }}
                id="bdate-input"
                label="Birth Date"
                name="birthDate"
                type="text"
                value={user.birthDate}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item>
              <TextField
                fullWidth
                sx={{
                  input: {
                    background: "white",
                  },
                }}
                id="address-input"
                label="Address"
                name="address"
                type="text"
                value={user.address}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item>
              <TextField
                fullWidth
                sx={{
                  input: {
                    background: "white",
                  },
                }}
                id="phone-input"
                label="Phone Number"
                name="phone"
                type="text"
                value={user.phone}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item sx={{ mt: 5 }}>
              <Button
                variant="contained"
                disableElevation
                onClick={() => handleSubmit(user.id)}
              >
                Guardar
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

const Payment = ({ isMobile }) => {
  const navigate = useNavigate();

  const handlePagar = () => {
    const loggedInUser = localStorage.getItem("clientBill");
    const userJson = JSON.parse(loggedInUser);
    FacturaAPI.payBill(userJson.userID);
    navigate("/Cliente#pagoexitoso");
    handleClose();
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box
      sx={{
        backgroundColor: "#E6E6FA",
        mt: 10,
        py: 5,
        px: 8,
        borderRadius: "16px",
      }}
    >
      <Typography
        fontSize={isMobile ? 22 : 30}
        sx={{
          fontWeight: 800,
          color: "#124265",
          textAlign: "center",
          fontFamily: "Montserrat",
        }}
      >
        Paga tu factura
      </Typography>
      <Stack direction="row" spacing={4} marginTop="30px">
        <Avatar
          alt="Remy Sharp"
          sx={{ width: 56, height: 56 }}
          src="https://s3.pagegear.co/121/75/imagenes-editor/2021/12/1209_psen_lxemd3.png"
        />
        <Avatar
          alt="Remy Sharp"
          sx={{ width: 56, height: 56 }}
          src="https://e7.pngegg.com/pngimages/910/492/png-clipart-mastercard-logo-credit-card-visa-brand-mastercard-text-label.png"
        />
        <Avatar
          alt="Remy Sharp"
          sx={{ width: 56, height: 56 }}
          src="https://e7.pngegg.com/pngimages/83/811/png-clipart-mastercard-visa-payment-business-credit-card-mastercard-text-trademark.png
                  "
        />
        <Avatar
          alt="Remy Sharp"
          sx={{ width: 56, height: 56 }}
          src="data:image/png;base64,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
                  X36JMzdlKh/bjzTzjeX5v/xeU9Q4YMGTJkyJAhQ4YMGTJkyJAhQ4YMGTJkyJAhQ4YMGTJkyJAhQ4YMGTJkyPD/HP8HzndsJW45CJgAAAAASUVORK5CYII="
        />
      </Stack>
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
      <Box component="form" sx={{ py: 2 }}>
        <Button variant="contained" sx={{ mt: 2 }} onClick={handlePagar}>
          pagar
        </Button>
      </Box>
    </Box>
  );
};

const WelcomeUser = ({ isMobile, name }) => {
  return (
    <Box sx={{ m: 8, pt: isMobile ? 4 : 0 }}>
      <Grid
        container
        display="flex"
        flexDirection="row"
        justifyContent="center"
        sx={{ my: isMobile ? 0 : 8, alignItems: "center" }}
      >
        <Grid
          item
          xs={12}
          md={4}
          sx={{
            textAlign: "center",
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            height: "60vh",
          }}
        >
          <Typography
            variant="h1"
            style={{
              fontWeight: 600,
              fontSize: 40,
              color: "#1a5c83",
              textAlign: "center",
              fontFamily: "montserrat",
            }}
          >
            Thunder App
          </Typography>
          <br />
          <br />
          <Typography variant="h6" textAlign="justify">
            Bienvenido a thunder{" "}
            {<span style={{ color: "#33b4db" }}>{name + ", "}</span>}
            somos una aplicación segura para generar facturas automáticas del
            consumo energético de cada uno de nuestros usuarios le agradecemos
            su apoyo y esperemos que su experiencia en nuestra aplicación sea la
            mejor
          </Typography>
        </Grid>

        <Grid
          item
          xs={12}
          md={4}
          sx={{
            mt: isMobile ? 8 : 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            height: "60vh",
          }}
        >
          {isMobile ? null : (
            <img src={logo} width="25%" height="auto" alt="logo" />
          )}
          <img src={image} alt="img" width="60%" height="auto" />
        </Grid>
      </Grid>
    </Box>
  );
};
