import React, { useRef } from "react";
import "./Login.css";
import * as UserAPI from "../UserList/UserAPI";
import ReCAPTCHA from "react-google-recaptcha";

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
  Divider,
} from "@mui/material";

import Swal from "sweetalert2";

import * as FacturaAPI from "../Bill/FacturaAPI";

const Login = () => {
  const [captchaValido, cambiarCaptchaValido] = useState(null);
  const [bill, setBill] = useState();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [respuesta, setRespuesta] = useState("");

  const getBill = async (userID) => {
    try {
      const res = await FacturaAPI.getBill(userID);
      const data = await res.json();
      setBill(data.bill);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRole = ({ target }) => {
    setRole(target.value);
    const usuario = users.filter((user) => user.email === email)[0];
    setUser(usuario);
    getBill(usuario.id);
  };

  const navigate = useNavigate();

  const captcha = React.createRef(null);

  const handleCaptcha = () => {
    if (captcha.current.getValue()) {
      cambiarCaptchaValido(true);
    } else {
      cambiarCaptchaValido(false);
    }
  };

  async function handleSubmit(event) {
    event.preventDefault();

    if (!captchaValido) {
      Swal.fire({
        title: "Error",
        text: "Debes verificar que no eres un robot",
        background: "rgb(176, 55, 55)",
        color: "white",
        timer: 2000,
      });
      return;
    }

    try {
      var ans = await verifyUser(email, password, role);
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

  const [users, setUsers] = useState([]);

  const initialState = {
    id: 0,
    lastName: "",
    firstName: "",
    birthDate: "",
    password: "",
    email: "",
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

  const setUsuario = async () => {
    await getBill(user.id);
    setUser(users.filter((user) => user.email === email));
  };

  const handleChange = (ev) => {
    setPassword(ev.target.value);
  };

  return (
    <Box sx={{ mt: "80px" }}>
      <form onSubmit={handleSubmit} >
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
                  placeholder="Email Address"
                  value={email}
                  size="small"
                  onChange={(event) => setEmail(event.target.value)}
                />
                <TextField 
                  placeholder="Password"
                  id="form2"
                  type="Password"
                  value={password}
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
                <option value={""}>
                  {isMobile
                    ? "Seleccione el rol"
                    : "Seleccione el rol a desempeñar"}
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
                <ReCAPTCHA
                  ref={captcha}
                  sitekey="6LcJ2UAkAAAAAGA8oKYdI-U3HhIp6OGpjgghpgUk"
                  onChange={handleCaptcha}
                />

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
    </Box>
  );
};

export default Login;
