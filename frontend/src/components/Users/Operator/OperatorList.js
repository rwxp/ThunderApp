import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as UserAPI from "../../UserList/UserAPI";
import Swal from "sweetalert2";

import * as FacturaAPI from "../../Bill/FacturaAPI";
import SearchIcon from "@mui/icons-material/Search";
// mui material components
import { useAuth } from "../../../context/Context";

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
  TextField,
} from "@mui/material";

const OperatorList = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [bill, setBill] = useState();
  const [searchValue, setsearchValue] = useState();


  const navigate = useNavigate();

  const getBill = async (searchVal) => {
    try {
      const res = await FacturaAPI.getBill(searchVal);
      const data = await res.json();
      setBill(data.bill);
    } catch (error) {
      console.log(error);
    }
    setisLoading(false);
  };

  const listUsers = async () => {
    try {
      const res = await UserAPI.listUsers();
      const data = await res.json();
      for (let i = 0; i < data.users.length; i++) {
        // eslint-disable-next-line
        if (
          data.users[i].id == searchValue &&
          data.users[i].role === "Cliente"
        ) {
          setUsers([]);
          setisLoading(true);
          getBill(searchValue);
          console.log(data.users[i]);
          setUsers([data.users[i]]);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = () => {
    listUsers();
  };

  const handlePay = () => {
    FacturaAPI.payBill(users[0].id);
    navigate('/Operador#pay')
  };

  return (
    <Box>
      <Box
        component={Paper}
        sx={{
          background: "aliceblue",
          borderRadius: 5,
          mt: 3,
          mb: 3,
        }}
      >
        <Grid container sx={{ mb: 3, mt: 3, ml: 3, alignItems: "center" }}>
          <Grid item>
            <h3 style={{ color: "#124265" }}>
              <strong>Ingrese ID para registrar pago</strong>
            </h3>
          </Grid>
          <Grid item sx={{ ml: 4, position: "relative" }}>
            <TextField
              size="small"
              onChange={(e) => setsearchValue(e.target.value)}
            />
            <IconButton
              height="40px"
              sx={{ position: "absolute", right: 0 }}
              onClick={handleSearch}
            >
              <SearchIcon />
            </IconButton>
          </Grid>
        </Grid>
        {isLoading ? (
          <Grid width="100%" textAlign="center">
            <h4>Cargando...</h4>
          </Grid>
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
                        onClick={handlePay}
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
