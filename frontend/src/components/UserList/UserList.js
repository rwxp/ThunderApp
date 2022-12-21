import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as UserAPI from "./UserAPI";
import "./UserList.css";
import Swal from "sweetalert2";

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
} from "@mui/material";

const UserList = () => {
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();

  function compare(a, b) {
    const idA = a.id;
    const idB = b.id;

    let comparison = 0;
    if (idA > idB) {
      comparison = 1;
    } else if (idA < idB) {
      comparison = -1;
    }
    return comparison;
  }

  users.sort(compare);

  // eslint-disable-next-line
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
      } else {
        navigate("/");
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
      <Box>
        <Grid sx={{ marginBottom: 3, marginTop: 3 }}>
          <h1 style={{ color: "#E8F9FF" }}>
            <strong>Users List</strong>
          </h1>
        </Grid>
        <TableContainer component={Paper} sx={{ borderRadius: 5 }}>
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
                  <TableCell component="th" scope="row">
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
                        onClick={() => navigate(`/update/${user.id}`)}
                      >
                        Deactivate
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => navigate(`/update/${user.id}`)}
                      >
                        Activate
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Grid container justifyContent={"center"}>
          <Button
            variant="contained"
            sx={{ mt: 2.5, mb: 2.5}}
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
