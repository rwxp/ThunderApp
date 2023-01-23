import React from "react";
import "./Login.css";
import * as UserAPI from "../UserList/UserAPI";

import logo from "../LandingPage/Images/logo2.png";

import { verifyUser } from "../UserList/UserAPI";
import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import {
  Box,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
  TextField,
  Button,
  Menu,
  MenuItem,
  Divider,
  Paper,
  MenuList,
} from "@mui/material";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { EmailIcon } from "@mui/icons-material/Email";

import Swal from "sweetalert2";

import * as FacturaAPI from "../Bill/FacturaAPI";
import { useAuth } from "../../context/Context";

const Login = () => {
  const { setName } = useAuth();
  const [bill, setBill] = useState();

  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [respuesta, setRespuesta] = useState("");

  const getBill = async (userID) => {
    try {
      const res = await FacturaAPI.getBill(userID);
      const data = await res.json();
      console.log("YEAHH", data.bill)
      setBill(data.bill);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRole = ({ target }) => {
    setRole(target.value);
    const usuario = (users.filter(user => user.id === parseInt(id)))[0];
    console.log(usuario);
    setUser(usuario);
    getBill(usuario.id);
  };

  const navigate = useNavigate();

  async function handleSubmit(event) {
    try {
      event.preventDefault();
      var ans = await verifyUser(id, password, role);
      var res = await ans.json();
      setRespuesta(res.message);
      window.localStorage.setItem("loggedInUser", JSON.stringify(user));
      window.localStorage.setItem("clientBill", JSON.stringify(bill));
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Los datos que ingresó no son correctos",
        background: "rgb(176, 55, 55)",
        color: "white",
        timer: 2000,
      });
      setRespuesta(null);
    }
  }

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [isMenuOpen, setMenuOpen] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [users, setUsers] = useState([]);

  const initialState = {
    id: 0,
    lastName: "",
    firstName: "",
    birthDate: "",
    password: "",
    address: "",
    phone: "",
    role: "",
    isActive: false,
  };

  const [user, setUser] = useState(initialState);

  const listUsers = async () => {
    try {
      const res = await UserAPI.listUsers();
      const data = await res.json();
      setUsers(data.users);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    listUsers();
  }, []);

  const saveValues = () => {
    console.log(user.firstName);
    setMenuOpen(true);
    setName(user.firstName + " " + user.lastName);
    setAll();
    handleClose();
  };

  const getAdmin = () => {
    setUser(users.filter((user) => user.role === "Admin")[0]);
  };

  const getCliente = () => {
    getBill(users.filter((user) => user.role === "Cliente")[0].id);
    setUser(users.filter((user) => user.role === "Cliente")[0]);
  };

  const getOperador = () => {
    setUser(users.filter((user) => user.role === "Operador")[0]);
  };

  const getGerente = () => {
    setUser(users.filter((user) => user.role === "Gerente")[0]);
  };

  const setUsuario = async () => {
    await getBill(user.id);
    setUser(users.filter((user) => user.id === parseInt(id)));
  };

  const setAll = () => {
    setId(user.id);
    setPassword(user.password);
    setRole(user.role);
  };

  const handleChange = (ev) => {
    setPassword(ev.target.value);
    setName(user[0].firstName);
  };

  return (
    <Box sx={{ mt: "80px" }}>
      <form onSubmit={handleSubmit}>
        <Grid container>
          <Grid item md={6} sx={{ px: 12 }}>
            <div className="d-flex flex-column ms-3">
              <div className="text-center">
                <img
                  src={logo}
                  style={{
                    width: "100px",
                    marginTop: "59px",
                    marginBottom: "30px",
                  }}
                  alt="logo"
                />
              </div>
              <p>Por favor ingresa a tu cuenta</p>
              <div>
                {useEffect(() => {
                  if (respuesta && respuesta !== "Success") {
                    Swal.fire({
                      title: "Error",
                      text: "Los datos que ingresó no son correctos",
                      background: "rgb(176, 55, 55)",
                      color: "white",
                      timer: 2000,
                    });
                    setRespuesta(null);
                  } else {
                    if (respuesta === "Success" && role === "Cliente") {
                      navigate(`/Cliente`);
                    }
                    if (respuesta === "Success" && role === "Operador") {
                      navigate(`/Operador`);
                    }
                    if (respuesta === "Success" && role === "Gerente") {
                      navigate(`/Gerente`);
                    }
                    if (respuesta === "Success" && role === "Admin") {
                      navigate("/Dashboard");
                    }
                  }
                }, [respuesta, role, navigate])}
              </div>
              <Grid
                container
                display="flex"
                direction="column"
                rowGap={2}
                marginBottom={isMobile ? 3 : 1}
              >
                <TextField
                  placeholder="ID"
                  value={isMenuOpen ? user.id : id}
                  size="small"
                  onChange={(event) => setId(event.target.value)}
                />
                <TextField
                  placeholder="Password"
                  id="form2"
                  value={isMenuOpen ? user.password : password}
                  size="small"
                  onFocus={setUsuario}
                  onChange={(event) => handleChange(event)}
                />
              </Grid>
              <select
                className="w-100 mb-2 select"
                id="role"
                onChange={(e) => handleRole(e)}
              >
                {/*isMobile ? (
                      <>Seleccione el rol</>
                    ) : (
                      <>Seleccione el rol a desempeñar</>
                    )*/}
                <option value={isMenuOpen ? user.role : ""}>
                  {isMenuOpen ? user.role : "Seleccione el rol a desempeñar"}
                </option>
                <option value="Cliente">Cliente</option>
                <option value="Gerente">Gerente </option>
                <option value="Operador">Operador</option>
                <option value="Admin">Administrador</option>
              </select>
              <Grid
                container
                sx={{
                  textAlign: "center",
                  mb: 5,
                  pb: 1,
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Grid item xs={12}>
                  <Button
                    className="gradient-custom-2"
                    type="submit"
                    fullWidth
                    sx={{ mb: 2.5, mt: 3, color: "white" }}
                  >
                    Ingresar
                  </Button>
                </Grid>
                <Grid item textAlign="center">
                  <a className="text-muted" href="#!">
                    Olvidaste tu contraseña?
                  </a>
                </Grid>
              </Grid>
            </div>
          </Grid>
          {isMobile ? (
            <></>
          ) : (
            <Grid item md={6}>
              <div className="d-flex flex-column justify-content-center gradient-custom-1">
                <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                  <Typography
                    variant="h5"
                    fontFamily="Montserrat"
                    fontWeight="bold"
                    mb={3}
                  >
                    Somos más que sólo una compañía
                  </Typography>
                  <Typography className="small" fontFamily="Montserrat">
                    Una empresa de energía eléctrica que desarrolla un sistema
                    para gestionar la información de sus clientes ya sean
                    corporativos o personas naturales, su consumo y la
                    facturación.
                  </Typography>
                </div>
              </div>
            </Grid>
          )}
        </Grid>
      </form>
      <Grid container position="fixed" top="120px" left="10vh">
        <Button
          id="demo-customized-button"
          aria-controls={open ? "demo-customized-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          variant="contained"
          disableElevation
          onClick={handleClick}
          endIcon={<KeyboardArrowDownIcon />}
        >
          <Typography fontSize={12}>
            Ingreso
            <br />
            rápido
          </Typography>
        </Button>
        <Menu
          id="demo-customized-menu"
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          MenuListProps={{
            "aria-labelledby": "demo-customized-button",
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          <MenuList>
            <MenuItem onClick={getAdmin}>Admin</MenuItem>
            <Divider />
            <MenuItem onClick={getCliente}>Cliente</MenuItem>
            <Divider />
            <MenuItem onClick={getOperador}>Operador</MenuItem>
            <Divider />
            <MenuItem onClick={getGerente}>Gerente</MenuItem>
            <Divider />
            <MenuItem
              sx={{ color: "green", fontWeight: 600 }}
              onClick={saveValues}
            >
              Guardar
            </MenuItem>
          </MenuList>
        </Menu>
      </Grid>
    </Box>
  );
};

export default Login;
