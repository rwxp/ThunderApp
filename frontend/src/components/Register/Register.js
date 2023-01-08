import React from "react";
import Navbar from "../LandingPage/Navbar.js";
import {
  MDBInput,
} from "mdb-react-ui-kit";
import logo from "../LandingPage/Images/logo2.png";
import { getUser, registerUser } from "../UserList/UserAPI";
import { useState } from "react";

import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

function AdminRegister() {
  const [id, setId] = useState(0);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Admin");
  const [isActive, setIsActive] = useState(true);
  const [respuesta, setRespuesta] = useState("");

  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  async function handleSubmit(event) {
    event.preventDefault();
    var ans = await registerUser(
      id,
      firstName,
      lastName,
      birthdate,
      address,
      phone,
      password,
      role,
      isActive
    );
    var res = await ans.json();
    setRespuesta(res.message);
  }

  return (
    <Box sx={{ mt: "80px" }}>
      <form onSubmit={handleSubmit}>
        <Grid container sx={{ justifyContent: "center" }}>
          <Grid item sx={{ px: 8 }} md={6}>
            <div className="d-flex flex-column">
              <div className="text-center">
                <img
                  src={logo}
                  style={{
                    width: "100px",
                    marginTop: "45px",
                    marginBottom: "30px",
                  }}
                  alt="logo"
                />

                <h3
                  className="mt-1 mb-5 pb-1"
                  style={{
                    fontSize: 28,
                    fontWeight: 800,
                    color: "#124265",
                    textAlign: "center",
                    fontFamily: "Arial",
                  }}
                >
                  Registrar usuario
                </h3>
              </div>
            </div>
            <p>Por favor añade un nuevo usuario</p>
            <div>
              {respuesta && respuesta !== "Success" ? (
                <div className="alert alert-danger" role="alert">
                  Los datos ingresados son incorrectos
                </div>
              ) : respuesta === "Success" ? (
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
              <MDBInput
                label="ID"
                id="id"
                type="id"
                onChange={(e) => setId(e.target.value)}
              />
              <MDBInput
                label="First name"
                id="fname"
                type="id"
                onChange={(e) => setFirstName(e.target.value)}
              />
              <MDBInput
                label="Last name"
                id="lname"
                type="id"
                onChange={(e) => setLastName(e.target.value)}
              />
              <MDBInput
                label="Birthdate YYYY-MM-DD"
                id="bdate"
                type="id"
                onChange={(e) => setBirthdate(e.target.value)}
              />
              <MDBInput
                label="Address"
                id="address"
                type="Address"
                onChange={(e) => setAddress(e.target.value)}
              />
              <MDBInput
                label="Phone"
                id="phone"
                type="Address"
                onChange={(e) => setPhone(e.target.value)}
              />
              <MDBInput
                label="Password"
                id="password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item marginBottom={5}>
              <select
                className="w-100 select"
                id="role"
                onChange={(e) => setRole(e.target.value)}
              >
                <option selected="true" disabled="disabled">
                  {isMobile ? (
                    <>Seleccione el rol</>
                  ) : (
                    <>Seleccione el rol a desempeñar</>
                  )}
                </option>
                <option value="Cliente">Cliente</option>
                <option value="Gerente">Gerente </option>
                <option value="Operador">Operador</option>
                <option value="Admin">Administrador</option>
              </select>
            </Grid>

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
                  sx={{ mb: 1.5, color: "white" }}
                >
                  Crear usuario
                </Button>
              </Grid>

              <Grid item xs={12}>
                <Button
                  variant="outlined"
                  type="submit"
                  fullWidth
                  sx={{ mb: 2.5 }}
                >
                  Regresar a la página principal
                </Button>
              </Grid>
            </Grid>
          </Grid>

          {isMobile ? (
            <></>
          ) : (
            <Grid item md={6}>
              <div className="d-flex flex-column gradient-custom-2 h-100">
                <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                  <Typography
                    sx={{ pt: 14 }}
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
}

export default AdminRegister;
