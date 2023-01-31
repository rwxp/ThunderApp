import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as UserAPI from "../../UserList/UserAPI";
import "./OperatorList.css";
import Swal from "sweetalert2";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

import logo from "../../LandingPage/Images/logo2.png";

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
} from "@mui/material";
import SearchBar from "material-ui-search-bar";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from '@mui/icons-material/Delete';

const OperatorList = () => {
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

  const listUsers = async (searchVal) => {
    try {
      const res = await UserAPI.listUsers();
      const data = await res.json();
      for(let i = 0; i < data.users.length; i++){
        if (data.users[i].id == searchVal && data.users[i].role == "Cliente"){
            console.log(data.users[i]);
            setUsers([data.users[i]])
        }
      }
      
    } catch (error) {
      console.log(error);
    }
  };

  // eslint-disable-next-line
  const handleDelete = async (userId) => {
    await UserAPI.deleteUser(userId);
    listUsers();
  };

  return (
    true ? (<Box className="User-list">
    <Box
      component={Paper}
      sx={{ background: "aliceblue", borderRadius: 5, mt: 3, mb: 3 }}
    >
      <Grid container sx={{ mb: 3, mt: 3, ml: 3, alignItems: "center" }}>
        <img src={logo} alt="logo" height={90} width={90}></img>
        <Grid item sx={{ ml: 4 }}>
          <h1 style={{ color: "#124265" }}>
            <strong>Ingrese ID para registrar pago</strong>
          </h1>
        </Grid>
        <Grid item sx={{ ml: 4 }}>
        <SearchBar 
        onChange={(searchVal) => listUsers  (searchVal)}/>
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
              <TableCell />
              <TableCell />
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
                    <ModeEditIcon/>
                  </IconButton>
                </TableCell>
                <TableCell component="td" align="center">
                  <IconButton
                    disableRipple
                    size="small"
                    sx={{
                      ":hover": {
                        color: "#E30022",
                      },
                    }}
                    onClick={() => deleteConfirmation(user.id)}
                  >
                    <AttachMoneyIcon />
                  </IconButton>
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
  </Box>): <div>esdfsdf</div>
    
  );
};

export default OperatorList;
