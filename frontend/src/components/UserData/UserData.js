import {
  Grid,
  TextField,
  Button,
  Box,
  FormControlLabel,
  Switch,
  Typography,
} from "@mui/material";

import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import React from "react";
import * as UserAPI from "../UserList/UserAPI.js";

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
      if(idUser === JSON.stringify(userJson.id)){
        console.log("User updated successfully")
        window.localStorage.setItem("loggedInUser", JSON.stringify(user));
      }
      setTimeout(navigate("/Dashboard#users"), 2000);
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
    <div>
      {isLoading ? (
        <h1>Cargando...</h1>
      ) : (
        <Box
          component="form"
          sx={{
            display: isLoading ? "grid" : "flex",
            flexDirection: "column",
            rowGap: 3,
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100vh",
            borderRadius: 5,
            mb: 4,
            backgroundColor: "rgba(119, 136, 153, 0.3)",
          }}
        >
          <Typography variant="h2" fontWeight="bold">
            Editar usuario
          </Typography>
          <Grid container width="35%" justifyContent="center" rowGap={2}>
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
    </div>
  );
};
export default UserForm;
