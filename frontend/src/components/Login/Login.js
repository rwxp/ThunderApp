import React from "react";
import "./Login.css";
import * as UserAPI from "../UserList/UserAPI";

import logo from "../LandingPage/Images/logo2.png";

import { verifyUser } from "../UserList/UserAPI";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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

const Login = () => {
  const [id, setId] = useState(0);
  const [password, setPassword] = useState("");
  const [respuesta, setRespuesta] = useState("");
  const [role, setRole] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    var ans = await verifyUser(id, password, role);
    var res = await ans.json();
    console.log(res);
    setRespuesta(res.message);
  }

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

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
    setAll();
    handleClose();
  }

  const getAdmin = () => {
    setUser(users.filter((user) => user.role === "Admin")[0]);
    console.log(user);
  };

  const getCliente = () => {
    setUser(users.filter((user) => user.role === "Cliente")[0]);
    console.log(user);
  };

  const getOperador = () => {
    setUser(users.filter((user) => user.role === "Operador")[0]);
    console.log(user);
  };

  const getGerente = () => {
    setUser(users.filter((user) => user.role === "Gerente")[0]);
    console.log(user);
  };

  const setAll = () => {
    setId(user.id);
    setPassword(user.password);
    setRole(user.role);
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
                {respuesta && respuesta !== "Success" ? (
                  <div className="alert alert-danger" role="alert">
                    Los datos que ingresó no son correctos
                  </div>
                ) : respuesta === "Success" && role === "Cliente" ? (
                  navigate(`/Cliente`)
                ) : respuesta === "Success" && role === "Operador" ? (
                  navigate(`/Operador`)
                ) : respuesta === "Success" && role === "Gerente" ? (
                  navigate(`/Gerente`)
                ) : respuesta === "Success" && role === "Admin" ? (
                  navigate("/Dashboard")
                ) : (
                  <div></div>
                )}
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
                  id="form1"
                  value={user.id}
                  size="small"
                  onChange={(event) => setId(event.target.value)}
                />
                <TextField
                  placeholder="Password"
                  id="form2"
                  value={user.password}
                  size="small"
                  onChange={(event) => {
                    setPassword(event.target.value);
                  }}
                />
              </Grid>

              <select
                className="w-100 mb-2 select"
                id="role"
                onChange={(e) => setRole(user.role)}
              >
                {/*isMobile ? (
                    <>Seleccione el rol</>
                  ) : (
                    <>Seleccione el rol a desempeñar</>
                  )*/}
                <option value={user.role}>{user.role}</option>
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
              <div className="d-flex flex-column  justify-content-center gradient-custom-2 h-100">
                <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                  <Typography
                    variant="h5"
                    fontFamily="Montserrat"
                    fontWeight="bold"
                    mb={3}
                  >
                    Somos más que sólo una compañía
                  </Typography>
                  <Typography className="small mb-0" fontFamily="Montserrat">
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

      <Grid container position="fixed" top="120px" left="170vh">
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
          Ingreso rápido
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
            <MenuItem disableRipple onClick={getCliente}>
              Cliente
            </MenuItem>
            <Divider />
            <MenuItem disableRipple onClick={getOperador}>
              Operador
            </MenuItem>
            <Divider />
            <MenuItem disableRipple onClick={getGerente}>
              Gerente
            </MenuItem>
            <Divider />
            <MenuItem sx={{color:'green', fontWeight:600}} onClick={saveValues}>Guardar</MenuItem>
          </MenuList>
        </Menu>
      </Grid>
    </Box>
  );
};

export default Login;
