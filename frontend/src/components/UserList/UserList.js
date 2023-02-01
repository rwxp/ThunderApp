import React, { useState, useEffect, useMemo } from "react";
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
  Grid,
  TableSortLabel,
  IconButton,
  Tooltip,
} from "@mui/material";

import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import LocationOn from "@mui/icons-material/LocationOn";

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
      setUsers(ls);
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
    navigate(`/Dashboard#map/${id}`);
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
                      {user.role === "Admin" ? (
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
                              navigate(`/Dashboard#users/${user.id}`)
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
                                navigate(`/Dashboard#users/${user.id}`)
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

export default UserList;