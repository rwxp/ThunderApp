import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as UserAPI from "./UserAPI";
import "./UserList.css";
import Swal from "sweetalert2";

import logo from "../LandingPage/Images/logo2.png";

// mui material components

import {
  Box,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  Paper,
  Button,
  Grid,
  TableSortLabel,
  IconButton,
  Skeleton,
  CircularProgress,
  Tooltip,
} from "@mui/material";

import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import LocationOn from "@mui/icons-material/LocationOn";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setisLoading] = useState(false);

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

  const listUsers = async () => {
    setisLoading(true);
    try {
      const res = await UserAPI.listUsers();
      const data = await res.json();
      setUsers(data.users);
      setisLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    listUsers();
  }, []);

  // eslint-disable-next-line
  const handleDelete = async (userId) => {
    await UserAPI.deleteUser(userId);
    listUsers();
  };

  const handleEditUser = (id) => {
    const user = users.filter((user) => user.id === id)[0];
    window.localStorage.setItem("userAddress", JSON.stringify(user.address));
    navigate(`/profile/${id}`);
  };

  return (
    <Box>
      {isLoading ? (
        <h1>Cargando...</h1>
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
              <h1>
                <strong>Lista de usuarios</strong>
              </h1>
            </Grid>
          </Grid>
          <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow sx={{ ".MuiTableCell-head": { fontSize: 14 } }}>
                  <TableCell align="center">
                    <strong>ID</strong>
                  </TableCell>
                  <TableCell align="center">
                    <strong>Nombre</strong>
                  </TableCell>
                  <TableCell align="center">
                    <strong>Apellido</strong>
                  </TableCell>
                  <TableCell align="center">
                    <strong>Fecha de nacimiento</strong>
                  </TableCell>
                  <TableCell align="center">
                    <strong>Dirección</strong>
                  </TableCell>
                  <TableCell align="center">
                    <strong>Teléfono</strong>
                  </TableCell>
                  <TableCell align="center">
                    <strong>Rol</strong>
                  </TableCell>
                  <TableCell align="center">
                    <strong>Estado</strong>
                  </TableCell>
                  <TableCell />
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
                    }}
                  >
                    <TableCell align="center" component="th" scope="row">
                      {user.id}
                    </TableCell>
                    <TableCell align="center">{user.firstName}</TableCell>
                    <TableCell align="center">{user.lastName}</TableCell>
                    <TableCell align="center">{user.birthDate}</TableCell>
                    <TableCell align="center">{user.address}</TableCell>
                    <TableCell align="center">{user.phone}</TableCell>
                    <TableCell align="center">{user.role}</TableCell>
                    <TableCell align="center">
                      {user.isActive === true ? <>Activo</> : <>Inactivo</>}
                    </TableCell>

                    <TableCell component="td" align="center">
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
                            onClick={() => navigate(`/update/${user.id}`)}
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

                        <Tooltip title="Ver perfil" placement="top">
                          <IconButton
                            disableRipple
                            size="small"
                            sx={{
                              ":hover": {
                                color: "#008000",
                              },
                            }}
                            onClick={() => handleEditUser(user.id)}
                          >
                            <LocationOn />
                          </IconButton>
                        </Tooltip>
                      </Grid>
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

export default UserList;
