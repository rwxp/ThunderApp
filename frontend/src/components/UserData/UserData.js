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

const UserForm = () => {
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
  const [isLoading, setisLoading] = useState(false);
  const params = useParams();

  const handleSubmit = async () => {
    console.log(user);
    try {
      await UserAPI.updateUser(params.id, user);
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
      const res = await UserAPI.getUser(params.id);
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
      <Box
        component="form"
        sx={{
          mt: 10,
          display: isLoading ? "grid" : "flex",
          flexDirection: "column",
          rowGap: 3,
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100vh",
        }}
      >
        {isLoading ? (
          <h1>Cargando...</h1>
        ) : (
          <>
            <Typography variant="h4">Editar usuario</Typography>
            <Grid container width="30%" justifyContent="center" rowGap={2}>
              <TextField
                fullWidth
                label="ID"
                name="id"
                type="text"
                value={params.id}
                disabled
              />
              <Grid container display="flex" justifyContent="space-between">
                <Grid item md={5.8}>
                  <TextField
                    label="Nombre"
                    name="firstName"
                    type="text"
                    value={user.firstName}
                    onChange={handleInputChange}
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
                  />
                </Grid>
              </Grid>
              <TextField
                fullWidth
                id="bdate-input"
                label="Fecha de nacimiento (YYYY-MM-DD)"
                name="birthDate"
                type="text"
                value={user.birthDate}
                onChange={handleInputChange}
              />
              <Grid container display="flex" justifyContent="space-between">
                <Grid item md={7}>
                  <TextField
                    id="address-input"
                    label="Address"
                    name="address"
                    type="text"
                    value={user.address}
                    onChange={handleInputChange}
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
              />
              <Grid textAlign="center">
                <Typography variant="h6" fontWeight="bold">
                  {" "}
                  Estado{" "}
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
          </>
        )}
      </Box>
    </div>
  );
};
export default UserForm;
