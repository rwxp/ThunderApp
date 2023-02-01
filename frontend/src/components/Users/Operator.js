import React, { useState, useMemo, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../App.css";
//import

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
  Button,
  useMediaQuery,
  TextField,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  TableSortLabel,
  Tooltip,
  FormControlLabel,
  Switch,
} from "@mui/material";

import * as UserAPI from "../UserList/UserAPI.js";
import MuiAppBar from "@mui/material/AppBar";

import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import AssignmentLateOutlined from "@mui/icons-material/AssignmentLateOutlined";
import ReceiptOutlined from "@mui/icons-material/ReceiptOutlined";
import MonetizationOnOutlined from "@mui/icons-material/MonetizationOnOutlined";

import UserMenu from "./UserMenu";

import logo from ".././LandingPage/Images/logo3.png";
import image from "./home.png";
import OperatorList from "./Operator/OperatorList";

//UserList imports
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import LocationOn from "@mui/icons-material/LocationOn";

import "../UserList/UserList.css";
import Swal from "sweetalert2";
import Map from "../UserData/Map";
import AdminRegister from "../Register/Register";
//

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

const Operador = () => {
  const params = useParams();
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const [users, setUser] = useState([]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleDrawerItem = ({ index }) => {
    if (index === 0) {
      navigate("/Operador#registerpay");
    } else if (index === 1) {
      navigate("/Operador#updateuser");
    } else if (index === 2) {
      navigate("/Operador#users");
    } else if (index === 3) {
      navigate("/Operador#registercliente");
    }
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
            color: "white",
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
          {[
            "Registrar pagos",
            "Actualiza tus datos",
            "Administrar usuarios",
            "Registrar Cliente",
          ].map((text, index) => (
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
          ))}
        </List>
      </Drawer>

      <Main open={open}>
        <Grid
          sx={{
            display: "grid",
            placeItems: "center",
            height: "100vh",
            width: "100vw",
          }}
        >
          {hashLoc === "" ? (
            <WelcomeOperator isMobile={isMobile} name={name} />
          ) : hashLoc === "#updateuser" ? (
            <UpdateProfile isMobile={isMobile} />
          ) : hashLoc === "#registercliente" ? (
            <AdminRegister isMobile={isMobile} />
          ) : hashLoc === "#registerpay" ? (
            <Box>
              <OperatorList />
            </Box>
          ) : hashLoc === "#pay" ? (
            <SuccessfulPayment isMobile={isMobile} />
          ) : hashLoc === "#users" ? (
            <UserList />
          ) : getUpdateID(hashLoc)[0] === "#users" ? (
            <UserForm idUser={getUpdateID(hashLoc)[1]} isMobile={isMobile} />
          ) : getUpdateID(hashLoc)[0] === "#map" ? (
            <Map />
          ) : null}
        </Grid>
      </Main>
    </Box>
  );
};

export default Operador;

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [sortUp, setsortUp] = useState(true);

  const navigate = useNavigate();

  const deleteConfirmation = (id) => {
    Swal.fire({
      title: "Are you sure you want to delete this user?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        id && handleDelete(id);
      }
    });
  };

  function compare_id(a, b) {
    if (a.id < b.id) {
      if (sortUp) {
        return -1;
      } else {
        return 1;
      }
    }
    if (a.id > b.id) {
      if (sortUp) {
        return 1;
      } else {
        return -1;
      }
    }
    return 0;
  }

  const listUsers = async (sortBy) => {
    setisLoading(true);
    try {
      const res = await UserAPI.listUsers();
      const data = await res.json();
      const ls = data.users;
      ls.sort(compare_id);
      const filteredUsers = ls.filter((user) => user.role !== "Admin");
      setUsers(filteredUsers);
      setisLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useMemo(() => {
    listUsers(sortUp);
    // eslint-disable-next-line
  }, [sortUp]);

  // eslint-disable-next-line
  const handleDelete = async (userId) => {
    await UserAPI.deleteUser(userId);
    listUsers();
  };

  const handleMap = (id) => {
    const user = users.filter((user) => user.id === id)[0];
    window.localStorage.setItem("userAddress", JSON.stringify(user.address));
    navigate(`/Operador#map/${id}`);
  };

  return (
    <Box>
      {isLoading ? (
        <h2>Cargando...</h2>
      ) : (
        <Box
          sx={{
            borderRadius: 5,
            mb: 3,
            p: 3,
            backgroundColor: "rgba(119, 136, 153, 0.3)",
          }}
        >
          <Grid container sx={{ mb: 3, alignItems: "center" }}>
            <Grid item>
              <h2>
                <strong>Lista de usuarios</strong>
              </h2>
            </Grid>
          </Grid>
          <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow sx={{ ".MuiTableCell-root": { fontSize: 14 } }}>
                  {[
                    "ID",
                    "Nombre",
                    "Apellido",
                    "Email",
                    "Dirección",
                    "Teléfono",
                    "Rol",
                    "Estado",
                    "",
                  ].map((name) =>
                    name === "ID" ? (
                      <TableCell key={name}>
                        <TableSortLabel
                          active={true}
                          direction={sortUp ? "asc" : "desc"}
                          onClick={() => setsortUp(!sortUp)}
                        >
                          <strong>{name}</strong>
                        </TableSortLabel>
                      </TableCell>
                    ) : (
                      <TableCell align="center" key={name}>
                        <strong>{name}</strong>
                      </TableCell>
                    )
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow
                    key={user.id}
                    sx={{
                      "&:last-child td, &:last-child th": {
                        border: 0,
                      },
                      ".MuiTableCell-root": {
                        fontSize: 13,
                        color: user.isActive === false ? "gray" : undefined,
                      },
                    }}
                  >
                    <TableCell align="center" component="th" scope="row">
                      {user.id}
                    </TableCell>
                    <TableCell align="center">{user.firstName}</TableCell>
                    <TableCell align="center">{user.lastName}</TableCell>
                    <TableCell align="center">{user.email}</TableCell>
                    <TableCell align="center">{user.address}</TableCell>
                    <TableCell align="center">{user.phone}</TableCell>
                    <TableCell align="center">{user.role}</TableCell>
                    <TableCell align="center">
                      {user.isActive === true ? <>Activo</> : <>Inactivo</>}
                    </TableCell>
                    <TableCell component="td" align="left">
                      {user.role === "Operador" ? (
                        <Tooltip title="Editar" placement="top">
                          <IconButton
                            disableRipple
                            size="small"
                            sx={{
                              ":hover": {
                                color: "#2E5894",
                              },
                            }}
                            onClick={() =>
                              navigate(`/Operador#users/${user.id}`)
                            }
                          >
                            <ModeEditIcon />
                          </IconButton>
                        </Tooltip>
                      ) : (
                        <Grid>
                          <Tooltip title="Editar" placement="top">
                            <IconButton
                              disableRipple
                              size="small"
                              sx={{
                                ":hover": {
                                  color: "#2E5894",
                                },
                              }}
                              onClick={() =>
                                navigate(`/Operador#users/${user.id}`)
                              }
                            >
                              <ModeEditIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Eliminar" placement="top">
                            <IconButton
                              disableRipple
                              size="small"
                              sx={{
                                px: 1.5,
                                ":hover": {
                                  color: "#E30022",
                                },
                              }}
                              onClick={() => deleteConfirmation(user.id)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                          {user.isActive === false ? null : (
                            <Tooltip title="Ver en el mapa" placement="top">
                              <IconButton
                                disableRipple
                                size="small"
                                sx={{
                                  ":hover": {
                                    color: "#008000",
                                  },
                                }}
                                onClick={() => handleMap(user.id)}
                              >
                                <LocationOn />
                              </IconButton>
                            </Tooltip>
                          )}
                        </Grid>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </Box>
  );
};

const UserForm = ({ idUser, isMobile }) => {
  const initialState = {
    id: 0,
    lastName: "",
    firstName: "",
    email: "",
    birthDate: "",
    address: "",
    phone: "",
    role: "",
    isActive: false,
  };

  const navigate = useNavigate();
  const [user, setUser] = useState(initialState);
  const [isLoading, setisLoading] = useState(false);

  const loggedInUser = window.localStorage.getItem("loggedInUser");
  const userJson = JSON.parse(loggedInUser);

  const handleSubmit = async () => {
    try {
      await UserAPI.updateUser(idUser, user);
      if (idUser === JSON.stringify(userJson.id)) {
        console.log("User updated successfully");
        window.localStorage.setItem("loggedInUser", JSON.stringify(user));
      }
      setTimeout(navigate("/Operador#users"), 2000);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.checked,
    });
  };

  const handleInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
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
        height: "100vh",
        width: "100vw",
        display: "grid",
        placeItems: "center",
      }}
    >
      {isLoading ? (
        <Box
          display="flex"
          flexDirection="column"
          height="100vh"
          width="100vw"
          justifyContent="center"
          alignItems="center"
          marginTop={8}
        >
          <h1>Cargando...</h1>
        </Box>
      ) : (
        <Box
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            rowGap: 3,
            width: "50%",
            height: "100vh",
            borderRadius: 5,
            mt: 8,
            mb: 30,
          }}
        >
          <Typography variant="h4" fontWeight="bold">
            Editar usuario
          </Typography>
          <Grid container width="60%" justifyContent="center" rowGap={2}>
            <TextField
              fullWidth
              label="ID"
              name="id"
              type="text"
              value={idUser}
              disabled
              size={isMobile ? "small" : "medium"}
            />
            <Grid
              container
              display="flex"
              justifyContent="space-between"
              rowGap={isMobile ? 3 : 0}
            >
              <Grid item md={5.8}>
                <TextField
                  label="Nombre"
                  name="firstName"
                  type="text"
                  value={user.firstName}
                  onChange={handleInputChange}
                  size={isMobile ? "small" : "medium"}
                />
              </Grid>
              <Grid item md={5.8}>
                <TextField
                  id="lname-input"
                  label="Apellido"
                  name="lastName"
                  type="text"
                  value={user.lastName}
                  onChange={handleInputChange}
                  size={isMobile ? "small" : "medium"}
                />
              </Grid>
            </Grid>
            <TextField
              fullWidth
              id="email-input"
              label="Email"
              name="email"
              type="text"
              value={user.email}
              onChange={handleInputChange}
              size={isMobile ? "small" : "medium"}
            />
            <Grid
              container
              display="flex"
              justifyContent="space-between"
              rowGap={isMobile ? 3 : 0}
            >
              <Grid item md={7}>
                <TextField
                  id="address-input"
                  label="Address"
                  name="address"
                  type="text"
                  value={user.address}
                  onChange={handleInputChange}
                  size={isMobile ? "small" : "medium"}
                />
              </Grid>
              <Grid item md={5}>
                <TextField
                  id="phone-input"
                  label="Phone Number"
                  name="phone"
                  type="text"
                  value={user.phone}
                  onChange={handleInputChange}
                  size={isMobile ? "small" : "medium"}
                />
              </Grid>
            </Grid>
            <TextField
              fullWidth
              id="role-input"
              label="Role"
              name="role"
              type="text"
              value={user.role}
              onChange={handleInputChange}
              disabled={true}
              size={isMobile ? "small" : "medium"}
            />
            <Grid textAlign="center">
              <Typography variant="h6" fontWeight="bold">
                Estado
              </Typography>
              <FormControlLabel
                control={
                  <Switch
                    checked={user.isActive}
                    onChange={handleChange}
                    name="isActive"
                    inputProps={{ "aria-label": "controlled" }}
                  />
                }
                label={user.isActive ? "Activo" : "Inactivo"}
              />
            </Grid>
          </Grid>
          <Button variant="contained" onClick={handleSubmit}>
            Save
          </Button>
        </Box>
      )}
    </Box>
  );
};

const getUpdateID = (path) => {
  const id = path.split("/");
  return id;
};

const UpdateProfile = ({ isMobile }) => {
  const [isLoading, setisLoading] = useState(false);

  const loggedInUser = window.localStorage.getItem("loggedInUser");
  const userJson = JSON.parse(loggedInUser);
  const idUser = userJson.id;
  console.log(idUser);

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
      navigate("");
    } catch (error) {
      console.log(error);
    }
  };

  const loadUser = async () => {
    setisLoading(true);
    try {
      const res = await UserAPI.getUser(idUser);
      const data = await res.json();
      console.log(data.user);
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

const SuccessfulPayment = ({ isMobile }) => {
  const navigate = useNavigate();
  return (
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
        fontSize={isMobile ? 22 : 36}
        sx={{
          fontWeight: 800,
          color: "#124265",
          textAlign: "center",
          fontFamily: "Montserrat",
        }}
      >
        Registro de pago exitoso
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
        Usted acaba de registrar el pago de manera exitosa el cliente se
        encuentra al día
      </Typography>
      <Grid container justifyContent={"center"}>
        <Button
          variant="contained"
          sx={{ mt: 2.5, mb: 2.5 }}
          onClick={() => navigate("/Operador#registerpay")}
        >
          Go back
        </Button>
      </Grid>
    </Box>
  );
};

const WelcomeOperator = ({ isMobile, name }) => {
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
            {" "}
            Bienvenido a thunder{" "}
            {<span style={{ color: "#33b4db" }}>{name + ", "}</span>}
            somos una aplicación segura para generar facturas automáticas del
            consumo energético de cada uno de nuestros usuarios, con su rol de
            operador usted podrá gestionar el pago y actualización de clientes
            le agradecemos su apoyo y esperemos que su experiencia en nuestra
            aplicación sea la mejor
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
