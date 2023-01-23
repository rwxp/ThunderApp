import {
  Grid,
  TextField,
  Button,
  Box,
  FormControlLabel,
  Switch,
} from "@mui/material";

import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import React from "react";
import * as UserAPI from "../UserList/UserAPI.js";

import PageNotFound from "./../PageNotFound";

const Form = () => {
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

  const params = useParams();

  const handleSubmit = async () => {
    console.log(user);
    try {
      await UserAPI.updateUser(params.id, user);
      setTimeout(navigate("/UserList"), 3000);
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
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const loadUser = async (id) => {
    const res = await fetch(`http://localhost:8000/api/users/${id}`);
    const data = await res.json();
    setUser({
      id: data.user.id,
      lastName: data.user.lastName,
      firstName: data.user.firstName,
      birthDate: data.user.birthDate,
      address: data.user.address,
      phone: data.user.phone,
      role: data.user.role,
      isActive: data.user.isActive,
    });
  };

  useEffect(() => {
    if (params.id) {
      loadUser(params.id);
    }
  });

  return (
    <Box sx={{mt: 15}}>
      <form onSubmit={handleSubmit}>
        <Grid
          container
          alignItems="center"
          justify="center"
          direction="column"
          spacing="12px"
          sx={{ mt: 8 }}
        >
          <Grid item>
            <h1>{params.id}</h1>
          </Grid>
          <Grid item>
            <TextField
              id="fname-input"
              name="firstName"
              type="text"
              value={user.firstName}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item>
            <TextField
              id="lname-input"
              name="lastName"
              type="text"
              value={user.lastName}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item>
            <TextField
              id="bdate-input"
              name="birthDate"
              type="text"
              value={user.birthDate}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item>
            <TextField
              id="address-input"
              name="address"
              type="text"
              value={user.address}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item>
            <TextField
              id="phone-input"
              name="phone"
              type="text"
              value={user.phone}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item>
            <TextField
              id="role-input"
              name="role"
              type="text"
              value={user.role}
              onChange={handleInputChange}
              disabled={true}
            />
          </Grid>
          <Grid item>
            <FormControlLabel
              control={
                <Switch
                  checked={user.isActive}
                  onChange={handleChange}
                  name="isActive"
                  inputProps={{ "aria-label": "controlled" }}
                />
              }
              label={JSON.stringify(user.isActive)}
            />
          </Grid>
          <Grid item sx={{ mb: 10 }}>
            <Button variant="contained" onClick={handleSubmit}>
              Save
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};
export default Form;
