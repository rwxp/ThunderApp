import { Box, Button, Grid, IconButton, Paper } from "@mui/material";
import React from "react";
import jsPDF from "jspdf";

import logo from "../LandingPage/Images/logo2.png";
import ad from "../LandingPage/Images/kfc.jpeg";

import Download from "@mui/icons-material/Download";

const Factura = () => {
  const pdfDownload = (e) => {
    e.preventDefault();
    var doc = new jsPDF("p", "pt", "Letter");
    doc.html(document.getElementById("pdf-view"), {
      callback: () => {
        doc.save("test.pdf");
      },
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        height: "100vh",
        width: "auto",
        marginY: 5,
      }}
    >
      <Grid container justifyContent="center">
        <Grid
          backgroundColor="#4A4A4A"
          paddingX="20px"
          borderRadius="10px"
          height="36em"
        >
          <IconButton
            md={8}
            variant="outlined"
            onClick={pdfDownload}
            sx={{ py: 1.5, color: "white" }}
            disableRipple
          >
            <Download />
          </IconButton>
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
                  padding: 2,
                  height: "792px",
                  "& .MuiGrid-item": { textAlign: "center" },
                }}
              >
                <Grid
                  container
                  sx={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Grid item md={4}>
                    <img
                      src={logo}
                      alt="logo"
                      style={{ width: "80px", height: "auto" }}
                    />
                  </Grid>
                  <Grid item md={6}>
                    <Grid
                      sx={{ backgroundColor: "#b9ffff", fontWeight: "bold" }}
                    >
                      Datos factura
                    </Grid>
                    <Grid sx={{ backgroundColor: "greenyellow" }}>Datos</Grid>
                  </Grid>
                </Grid>
                <Grid item md={12}>
                  <Grid sx={{ backgroundColor: "#b9ffff", fontWeight: "bold" }}>
                    Resumen de la factura
                  </Grid>
                  <Grid sx={{ backgroundColor: "purple", color: "white" }}>
                    Resumen
                  </Grid>
                </Grid>
                <Grid item md={12}>
                  <Grid sx={{ backgroundColor: "#b9ffff", fontWeight: "bold" }}>
                    Información del consumo
                  </Grid>
                  <Grid sx={{ backgroundColor: "pink" }}>Información</Grid>
                </Grid>
                <Grid item md={12}>
                  <Grid sx={{ backgroundColor: "#b9ffff", fontWeight: "bold" }}>
                    Publicidad
                  </Grid>
                  <Paper
                    variant="outlined"
                    square
                    sx={{
                      width: "inherit",
                      height: "30vh",
                      backgroundImage: `url(${ad})`,
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "cover",
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Factura;
