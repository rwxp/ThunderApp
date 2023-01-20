//About Page 1
import React from "react";
import "../../App.css";
//Image import

import About2 from "./About2";
import { useEffect } from "react";


import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import {
  AccountTree,
  BarChart,
  IntegrationInstructions,
} from "@mui/icons-material";

const About = () => {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  return (
    <div className="mainPage">
      <Container sx={{ py: 8, mt: 8, px: 6 }} maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={4}>
            <Card
              className="Card-info"
              variant="filled"
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                px: 2,
                py: 2,
              }}
            >
              <AccountTree
                fontSize="large"
                sx={{ ml: 1.2, mb: 2, color: "#52C41A" }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography
                  variant="h5"
                  component="h2"
                  sx={{ mb: 2, fontWeight: "bold" }}
                >
                  Datos en tiempo real
                </Typography>
                <Typography className="cardText">
                  Recopile datos limpios procesados ​que estén listos para ser
                  analizados para recopilar valiosos conocimientos
                  empresariales.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card
              className="Card-info"
              variant="filled"
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                px: 2,
                py: 2,
              }}
            >
              <IntegrationInstructions
                fontSize="large"
                sx={{ ml: 1.2, mb: 2, color: "#F5222D" }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography
                  variant="h5"
                  component="h2"
                  sx={{ mb: 2, fontWeight: "bold" }}
                >
                  Algoritmos poderosos
                </Typography>
                <Typography className="cardText">
                  Con la ayuda de poderosos algoritmos, reglas de calidad y
                  técnicas, podemos obtener datos de manera simplificada.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card
              className="Card-info"
              variant="filled"
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                px: 2,
                py: 2,
              }}
            >
              <BarChart
                fontSize="large"
                sx={{ ml: 1.2, mb: 2, color: "#1890FF" }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography
                  variant="h5"
                  component="h2"
                  sx={{ mb: 2, fontWeight: "bold" }}
                >
                  Información empresarial
                </Typography>
                <Typography className="cardText">
                  Recopile datos limpios procesados que estén listos para ser
                  analizados para recopilar valiosos conocimientos
                  empresariales.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
      <About2/>
    </div>
  );
};
export default About;
// CODE BY GRACY PATEL
