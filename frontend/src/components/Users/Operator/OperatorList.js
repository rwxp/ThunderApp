import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as UserAPI from "../../UserList/UserAPI";
import "./OperatorList.css";
import Swal from "sweetalert2";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

import logo from "../../LandingPage/Images/logo2.png";
import * as FacturaAPI from "../../Bill/FacturaAPI";

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
<<<<<<< HEAD
import DeleteIcon from '@mui/icons-material/Delete';
=======
import DeleteIcon from "@mui/icons-material/Delete";
import LocationOn from "@mui/icons-material/LocationOn";
>>>>>>> d35d30c30909869aa24d43887ec0fb170c91bdd7

const OperatorList = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [bill, setBill] = useState();

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

  const getBill = async (searchVal) => {
    setisLoading(true);
    try {
      const res = await FacturaAPI.getBill(searchVal);
      const data = await res.json();
      console.log(data.bill);
      setBill(data.bill);
    } catch (error) {
      console.log(error);
    }
    setisLoading(false);
  };

  const listUsers = async (searchVal) => {
    console.log(searchVal);
    try {
      const res = await UserAPI.listUsers();
      const data = await res.json();
      console.log(data.users);
      for (let i = 0; i < data.users.length; i++) {
        // eslint-disable-next-line
        if (data.users[i].id == searchVal && data.users[i].role == "Cliente") {
          console.log(data.users[i]);
          setUsers([data.users[i]]);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = (searchVal) => {
    listUsers(searchVal);
    getBill(searchVal);
  };

  // eslint-disable-next-line
  const handleDelete = async (userId) => {
    await UserAPI.deleteUser(userId);
    listUsers();
  };

  return (
    <Box>
      <Box
        component={Paper}
        sx={{ background: "aliceblue", borderRadius: 5, mt: 3, mb: 3 }}
      >
        <Grid container sx={{ mb: 3, mt: 3, ml: 3, alignItems: "center" }}>
          <Grid item>
            <h3 style={{ color: "#124265" }}>
              <strong>Ingrese ID para registrar pago</strong>
            </h3>
          </Grid>
          <Grid item sx={{ ml: 4 }}>
            <SearchBar onChange={(searchVal) => handleSearch(searchVal)} />
          </Grid>
        </Grid>
        {isLoading ? (
          <h1>Cargando...</h1>
        ) : (
          <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow sx={{ ".MuiTableCell-root": { fontSize: 14 } }}>
                  {[
                    "ID",
                    "Nombre",
                    "Apellido",
                    "Email",
                    "Rol",
                    "ID Factura",
                    "Valor",
                  ].map((name) => (
                    <TableCell align="center" key={name}>
                      <strong>{name}</strong>
                    </TableCell>
                  ))}
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
                    <TableCell align="center">{user.email}</TableCell>
                    <TableCell align="center">{user.role}</TableCell>
                    <TableCell align="center">{bill.billID}</TableCell>
                    <TableCell align="center">{bill.amount}</TableCell>
                    <TableCell component="td" align="center">
                      <Button
                        disableRipple
                        size="small"
                        variant="contained"
                        sx={{
                          ":hover": {
                            bgcolor: "#008000",
                          },
                        }}
                        onClick={() => navigate()}
                      >
                        Pagar
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
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

export default OperatorList;
