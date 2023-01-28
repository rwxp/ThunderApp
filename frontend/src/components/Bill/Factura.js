import {
  Box,
  Button,
  Divider as MuiDivider,
  Grid,
  IconButton,
  Paper,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";
import { FormattedNumber, IntlProvider } from "react-intl";

import * as FacturaAPI from "./FacturaAPI";
import "./Factura.css";

import logo from "../LandingPage/Images/logo2.png";
import ad from "../LandingPage/Images/kfc.jpeg";

import Download from "@mui/icons-material/Download";

const Factura = () => {
  const [bill, setBill] = useState([]);
  const [isLoading, setisLoading] = useState(true);

  const getBill = async () => {
    setisLoading(true);
    try {
      const res = await FacturaAPI.getBill(userID);
      const data = await res.json();
      setBill(data.bill);
    } catch (error) {
      console.log(error);
    }
    setisLoading(false);
  };

  useEffect(() => {
    getBill();
    // eslint-disable-next-line
  }, []);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const loggedInUser = window.localStorage.getItem("loggedInUser");
  const userJson = JSON.parse(loggedInUser);
  const name = userJson.firstName + " " + userJson.lastName;
  const address = userJson.address;
  const userID = userJson.id;

  return (
    <IntlProvider locale="en">
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          height: "50em",
          width: "auto",
          py: 5,
        }}
      >
        {isLoading ? (
          <div
            style={{
              display: "grid",
              placeItems: "center",
              height: "100vh",
            }}
          >
            <h2>Cargando...</h2>
          </div>
        ) : isMobile ? (
          <MobileBill bill={bill} name={name} address={address} />
        ) : (
          <Bill bill={bill} name={name} address={address} />
        )}
      </Box>
    </IntlProvider>
  );
};

export default Factura;

const Bill = ({ bill, name, address }) => {
  const pdfDownload = (e) => {
    var doc = new jsPDF("p", "pt", "Letter");
    doc.html(document.getElementById("pdf-view"), {
      callback: () => {
        doc.save("test.pdf");
        if (window.location.pathname === "/factura") {
          window.close();
        }
      },
    });
  };

  const handleDownload = () => {
    pdfDownload();
  };

  return (
    <div style={{ marginTop: 30 }}>
      {bill.isGenerated === false ? (
        <div
          style={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <h2>Aún no hay facturas generadas</h2>
          <MuiDivider sx={{ my: 2 }} />
          <h3 style={{ color: "rgb(0, 122, 165)" }}>
            La próxima factura será generada el {bill.billingDate}
          </h3>
        </div>
      ) : (
        <Grid container justifyContent="center">
          <Grid
            backgroundColor="#4A4A4A"
            paddingX="20px"
            borderRadius="10px"
            height="36em"
          >
            <Grid sx={{ textAlign: "right", mr: 3 }}>
              <Tooltip title="Download" placement="top">
                <IconButton
                  variant="outlined"
                  onClick={handleDownload}
                  sx={{ py: 1.5, color: "white" }}
                  disableRipple
                >
                  <Download />
                </IconButton>
              </Tooltip>
            </Grid>
            <Grid
              sx={{
                height: "500px",
                width: "640px",
                overflow: "scroll",
                overflowX: "hidden",
              }}
            >
              <Grid
                id="pdf-view"
                sx={{
                  width: "612px",
                  height: "792px",
                  backgroundColor: "white",
                }}
              >
                <Grid
                  container
                  sx={{
                    padding: 4,
                    height: "792px",
                    "& .MuiGrid-item": {},
                  }}
                >
                  <Grid
                    container
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Grid item md={4} textAlign="center">
                      <img
                        src={logo}
                        alt="logo"
                        style={{ width: "80px", height: "auto" }}
                      />
                    </Grid>
                    <Grid item md={6}>
                      {/*--------------- DATOS FACTURA ---------------*/}
                      <Grid
                        sx={{
                          backgroundColor: "#b9ffff",
                          fontWeight: "bold",
                          pl: 1,
                          mb: 1,
                        }}
                      >
                        Datos factura
                      </Grid>
                      <Grid>
                        <Typography fontSize={14} pl={1}>
                          N° Factura: 0000{bill.billID} <br />
                          Fecha de emisión: {bill.billingDate} <br />
                          Fecha de vencimiento: {bill.dueDate}
                          <br />
                          <MuiDivider sx={{ mt: 1, mb: 2.5 }} />
                          {name} <br />
                          {address}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item md={12} mt={3} pb={4}>
                    {bill.status === "mora" ? (
                      <Typography textAlign={"center"} fontWeight="bold">
                        Estado:
                        <span style={{ color: "#B31B1B" }}>en mora</span>
                      </Typography>
                    ) : undefined}
                    {/*--------------- RESUMEN FACTURA ---------------*/}
                    <Grid
                      sx={{
                        backgroundColor: "#b9ffff",
                        fontWeight: "bold",
                        pl: 1,
                        mb: 1,
                      }}
                    >
                      Resumen de la factura
                    </Grid>
                    <Grid
                      container
                      display="flex"
                      justifyContent="space-between"
                    >
                      <Grid item md={5}>
                        <Typography fontSize={14} pl={1}>
                          Energía:
                          <FormattedNumber
                            value={bill.amount}
                            // eslint-disable-next-line
                            style="currency"
                            currency="USD"
                            minimumFractionDigits={0}
                          />
                          <br />
                          IVA (19%):{" "}
                          <FormattedNumber
                            value={bill.amount * 0.19}
                            // eslint-disable-next-line
                            style="currency"
                            currency="USD"
                            minimumFractionDigits={0}
                          />
                          <br />
                          <MuiDivider sx={{ my: 1 }} />
                          TOTAL:{" "}
                          <FormattedNumber
                            value={bill.amount * 1.19}
                            // eslint-disable-next-line
                            style="currency"
                            currency="USD"
                            minimumFractionDigits={0}
                          />
                        </Typography>
                      </Grid>
                      <Grid item md={5}>
                        <Typography fontSize={14}>
                          Forma de pago: {bill.payMethod}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item md={12} pb={4}>
                    {/*--------------- INFORMACIÓN FACTURA ---------------*/}
                    <Grid
                      sx={{
                        backgroundColor: "#b9ffff",
                        fontWeight: "bold",
                        pl: 1,
                        mb: 1,
                      }}
                    >
                      Información del consumo
                    </Grid>
                    <Typography fontSize={14} pl={1}>
                      Consumo en el periodo: {bill.amount / 500}kWh
                    </Typography>
                  </Grid>
                  <Grid item md={12}>
                    {/*--------------- PUBLICIDAD ---------------*/}
                    <Grid
                      sx={{
                        backgroundColor: "#b9ffff",
                        fontWeight: "bold",
                        pl: 1,
                      }}
                    >
                      Publicidad
                    </Grid>
                    <Paper
                      className="Ad-container"
                      variant="contained"
                      square
                      sx={{
                        height: "70%",
                        backgroundColor: "lightgray",
                        //backgroundImage: `url(${ad})`,
                        //backgroundRepeat: "no-repeat",
                        //backgroundSize: "cover",
                      }}
                    >
                      <img src={ad} alt="ad" />
                    </Paper>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export const MobileBill = ({ bill, name, address }) => {
  return (
    <Box>
      <Grid
        sx={{
          width: "90vw",
          height: "100vh",
          mt: 4,
          px: 4,
        }}
      >
        <Grid container display="flex" flexDirection="column" rowSpacing={2}>
          <Grid
            container
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Grid item md={4} textAlign="center">
              <img
                src={logo}
                alt="logo"
                style={{ width: "60px", height: "auto" }}
              />
            </Grid>
            <Grid item md={6}>
              {/*--------------- DATOS FACTURA ---------------*/}
              <Grid
                sx={{
                  backgroundColor: "#b9ffff",
                  fontWeight: "bold",
                  pl: 1,
                  mb: 1,
                }}
              >
                Datos factura
              </Grid>
              <Grid>
                <Typography fontSize={14} pl={1}>
                  N° Factura: 0000{bill.billID} <br />
                  Fecha de emisión: {bill.billingDate} <br />
                  Fecha de vencimiento: {bill.dueDate}
                  <br />
                  <MuiDivider sx={{ mt: 1, mb: 2.5 }} />
                  {name} <br />
                  {address}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={12} sm={12} xs={12} mt={3} pb={4}>
            {bill.status === "mora" ? (
              <Typography textAlign={"center"} fontWeight="bold">
                Estado:
                <span style={{ color: "#B31B1B" }}>en mora</span>
              </Typography>
            ) : undefined}
            {/*--------------- RESUMEN FACTURA ---------------*/}
            <Grid
              sx={{
                backgroundColor: "#b9ffff",
                fontWeight: "bold",
                pl: 1,
                mb: 1,
              }}
            >
              Resumen de la factura
            </Grid>
            <Grid container display="flex" justifyContent="space-between">
              <Grid item md={5}>
                <Typography fontSize={14} pl={1}>
                  Energía:
                  <FormattedNumber
                    value={bill.amount}
                    // eslint-disable-next-line
                    style="currency"
                    currency="USD"
                    minimumFractionDigits={0}
                  />
                  <br />
                  IVA (19%):{" "}
                  <FormattedNumber
                    value={bill.amount * 0.19}
                    // eslint-disable-next-line
                    style="currency"
                    currency="USD"
                    minimumFractionDigits={0}
                  />
                  <br />
                  <MuiDivider sx={{ my: 1 }} />
                  TOTAL:{" "}
                  <FormattedNumber
                    value={bill.amount * 1.19}
                    // eslint-disable-next-line
                    style="currency"
                    currency="USD"
                    minimumFractionDigits={0}
                  />
                </Typography>
              </Grid>
              <Grid item md={5}>
                <Typography fontSize={14}>
                  Forma de pago: {bill.payMethod}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={12} sm={12} xs={12} pb={4}>
            {/*--------------- INFORMACIÓN FACTURA ---------------*/}
            <Grid
              sx={{
                backgroundColor: "#b9ffff",
                fontWeight: "bold",
                pl: 1,
                mb: 1,
              }}
            >
              Información del consumo
            </Grid>
            <Typography fontSize={14} pl={1}>
              Consumo en el periodo: {bill.amount / 500}kWh
            </Typography>
          </Grid>
          <Grid item md={12} sm={12} xs={12} pb={4}>
            {/*--------------- PUBLICIDAD ---------------*/}
            <Grid
              sx={{
                backgroundColor: "#b9ffff",
                fontWeight: "bold",
                pl: 1,
              }}
            >
              Publicidad
            </Grid>
            <Paper
              className="Ad-container"
              variant="contained"
              square
              sx={{
                height: "70%",
                backgroundColor: "lightgray",
                //backgroundImage: `url(${ad})`,
                //backgroundRepeat: "no-repeat",
                //backgroundSize: "cover",
              }}
            >
              <img src={ad} alt="ad" />
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};
