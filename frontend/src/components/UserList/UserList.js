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
  Toolbar,
  Paper,
  Button,
  Grid,
  TableSortLabel,
  Typography,
} from "@mui/material";

const UserList = () => {
  const [users, setUsers] = useState([]);

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

  // eslint-disable-next-line
  const handleDelete = async (userId) => {
    await UserAPI.deleteUser(userId);
    listUsers();
  };

  return (
    <Box className="User-list">
      <Box component={Paper} sx={{ background: "aliceblue", borderRadius: 5, mt:3, mb:3}}>
        <Grid container sx={{ mb: 3, mt: 3, ml: 3, alignItems: "center" }}>
          <img src={logo} height={90} width={90}></img>
          <Grid item sx={{ ml: 4 }}>
            <h1 style={{ color: "#124265" }}>
              <strong>Users List</strong>
            </h1>
          </Grid>
        </Grid>

        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">
                  <TableSortLabel>
                    <strong>User ID</strong>
                  </TableSortLabel>
                </TableCell>
                <TableCell align="center">
                  <strong>First Name</strong>
                </TableCell>
                <TableCell align="center">
                  <strong>Last Name</strong>
                </TableCell>
                <TableCell align="center">
                  <strong>
                    Date of Birth
                    <br />
                    (YYYY-MM-DD)
                  </strong>
                </TableCell>
                <TableCell align="center">
                  <strong>Address</strong>
                </TableCell>
                <TableCell align="center">
                  <strong>Phone</strong>
                </TableCell>
                <TableCell align="center">
                  <strong>Role</strong>
                </TableCell>
                <TableCell align="center">
                  <strong>Is Active</strong>
                </TableCell>
                <TableCell align="center">
                  <strong>Change State</strong>
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
                    {JSON.stringify(user.isActive)}
                  </TableCell>
                  <TableCell component="td" align="center">
                    {user.isActive === true ? (
                      <Button
                        variant="contained"
                        size="small"
                        sx={{
                          ":hover": {
                            bgcolor: "lightblue",
                            color: "white",
                          },
                        }}
                        onClick={() => navigate(`/update/${user.id}`)}
                      >
                        Deactivate
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        size="small"
                        sx={{
                          ":hover": {
                            bgcolor: "lightblue",
                            color: "white",
                          },
                        }}
                        onClick={() => navigate(`/update/${user.id}`)}
                      >
                        Activate
                      </Button>
                    )}
                  </TableCell>
                  <TableCell component="td" align="center">
                    <Button
                      variant="contained"
                      size="small"
                      sx={{
                        color: "white",
                        backgroundColor: "#C93456",
                        ":hover": {
                          bgcolor: "pink",
                          color: "white",
                        },
                      }}
                      onClick={() => deleteConfirmation(user.id)}
                    >
                      DELETE
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Grid container justifyContent={"center"}>
          <Button
            variant="contained"
            sx={{ mt: 2.5, mb: 2.5 }}
            onClick={() => navigate("/Dashboard")}
          >
            Go back
          </Button>
        </Grid>
      </Box>
    </Box>
  );
};

export default UserList;
