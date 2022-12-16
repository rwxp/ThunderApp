import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as UserAPI from "./UserAPI";
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


  users.sort(compare)


  const confirmActivation = (id) => {
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

  const handleDelete = async (userId) => {
    await UserAPI.deleteUser(userId);
    listUsers();
  };

  return (
    <Box className="User-list">
      <Box>
        <Grid sx={{ marginBottom:3 }}>
          <h1>
            <strong>Users List</strong>
          </h1>
        </Grid>
        <TableContainer component={Paper} sx={{ borderRadius: 5 }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <TableSortLabel>
                    <strong>User ID</strong>
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <strong>First Name</strong>
                </TableCell>
                <TableCell>
                  <strong>Last Name</strong>
                </TableCell>
                <TableCell>
                  <strong>Date of Birth</strong>
                </TableCell>
                <TableCell>
                  <strong>Address</strong>
                </TableCell>
                <TableCell>
                  <strong>Phone</strong>
                </TableCell>
                <TableCell>
                  <strong>Is Active</strong>
                </TableCell>
                <TableCell>
                  <strong>Change State</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow
                  key={user.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {user.id}
                  </TableCell>
                  <TableCell>{user.firstName}</TableCell>
                  <TableCell>{user.lastName}</TableCell>
                  <TableCell>{user.birthDate}</TableCell>
                  <TableCell>{user.address}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>{JSON.stringify(user.isActive)}</TableCell>
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
      </Box>
    </Box>
  );
};

export default UserList;