import React from "react";
import Navbar from "../LandingPage/Navbar.js";
import { MDBInput } from "mdb-react-ui-kit";
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
  const [email, setEmail] = useState("");
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
      email,
      address,
      phone,
      password,
      role,
      isActive
    );
    var res = await ans.json();
    setRespuesta(res.message);
  }

  const loggedInUser = window.localStorage.getItem("loggedInUser");
  const userJson = JSON.parse(loggedInUser);
  const userRole = userJson.role;

  const handleChangePassword = ({ target }) => {
    setPassword(target.value);
    if(userRole !== "Admin") {
      setRole("Cliente")
    }
  }


  return (
    <Box
    sx={{
      backgroundColor: "#E6E6FA",
      mb: 4,
      px: 1,
      borderRadius: "16px",
      width: "700px",
    }}
  >
      <form onSubmit={handleSubmit}>
        <Grid container sx={isMobile ? 6 : 14 } justifyContent = "center">

          <Grid item sx={{ px: 2  }} width={isMobile ? 300 : 600}>
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
                    fontSize: 30,
                    fontWeight: 800,
                    color: "#124265",
                    textAlign: "center",
                    fontFamily: "Montserrat",
                  }}
                >
                  {userRole === "Admin" ? (
                    <>Registrar usuario</>
                  ) : (
                    <>Registrar Cliente</>
                  )}
                </h3>

                <h6
                  className="mt-1 mb-5 pb-1"
                  style={{
                    fontSize: 20,
                    fontWeight: 800,
                    color: "#124265",
                    textAlign: "center",
                    fontFamily: "Montserrat",
                  }}
                >
                  Por favor añade un nuevo usuario
                </h6>
                
              </div>
            </div>
            
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
              rowGap={6}
              
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
                label="Email"
                id="email"
                type="id"
                onChange={(e) => setEmail(e.target.value)}
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
                onChange={(e) => handleChangePassword(e)}
              />
            </Grid>

            {userRole !== "Admin" ? (
              <br></br>
            ) : (
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
            )}

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
        </Grid>
      </form>
    
    </Box>
  );
}

export default AdminRegister;
