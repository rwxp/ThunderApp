import React from "react";
import "../../App.css";

import logo from "./Images/whiteLogo.png";

import {
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  IconButton,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
  Link,
} from "@mui/material";

import { makeStyles } from "@material-ui/core";
import { useNavigate } from "react-router-dom";

import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

import { Send } from "@mui/icons-material";

const Footer = () => {
  const productsRows = [
    "Connections",
    "Protocols",
    "Personas",
    "Integrations",
    "Catalog",
    "Pricing",
    "Security",
  ];

  const forDevRows = ["Docs", "API", "Open Source", "Engineering Team"];

  const supportRows = [
    "Help Center",
    "Contact Us",
    "Security Bulletins",
    "Documentation",
    "Partner Portal",
  ];

  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();

  return (
    <>
      <Box className="Footer" sx={{ pt: 4, pb: 4, mt: 12 }}>
        <Container maxWidth="lg">
          <Grid
            container
            spacing={isMobile ? 1 : 4}
            sx={{ justifyContent: "center", alignItems: "top", paddingX: 2 }}
          >
            <Grid item xs={12} sm={4} md={3}>
              <Card
                variant="contained"
                className={isMobile ? classes.cardsMobile : classes.cards}
                sx={{ backgroundColor: "rgba(255, 255, 255, 0)" }}
              >
                <CardContent sx={{ textAlign: "center", position: "relative" }}>
                  <Grid container>
                    <Link href="https://www.facebook.com/" target="_blank">
                      <FacebookIcon sx={{ fontSize: 36, color: "aliceblue" }} />
                    </Link>
                    <Link href="https://twitter.com/" target="_blank">
                      <TwitterIcon sx={{ fontSize: 36, color: "aliceblue" }} />
                    </Link>
                    <Link href="https://www.instagram.com/" target="_blank">
                      <InstagramIcon
                        sx={{ fontSize: 36, color: "aliceblue" }}
                      />
                    </Link>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4} md={6}>
              <Card
                variant="contained"
                className={isMobile ? classes.cardsMobile : classes.cards}
                sx={{ backgroundColor: "rgba(255, 255, 255, 0)" }}
              >
                <CardContent sx={{ textAlign: "center" }}>
                  <img src={logo} alt="Logo" width="100px"></img>
                </CardContent>
              </Card>
            </Grid>

            {isMobile ? undefined : (
              <Grid item xs={12} sm={4} md={3}>
                <Card />
              </Grid>
            )}

            <Grid item xs={isMobile ? 6 : 12} sm={4} md={3}>
              <Card
                variant="contained"
                className={isMobile ? classes.cardsMobile : classes.cards}
                sx={{ backgroundColor: "rgba(255, 255, 255, 0)" }}
              >
                <CardContent>
                  <h3>Products</h3>
                  {productsRows.map((product) => (
                    <Typography key={product} sx={{ fontSize: 14, py: 0.2 }}>
                      {product}
                    </Typography>
                  ))}
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={isMobile ? 6 : 12} sm={4} md={3}>
              <Card
                variant="contained"
                className={isMobile ? classes.cardsMobile : classes.cards}
                sx={{ backgroundColor: "rgba(255, 255, 255, 0)" }}
              >
                <CardContent>
                  <h3>For developers</h3>
                  {forDevRows.map((item) => (
                    <Typography key={item} sx={{ fontSize: 14, py: 0.2 }}>
                      {item}
                    </Typography>
                  ))}
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={isMobile ? 6 : 12} sm={4} md={3}>
              <Card
                variant="contained"
                className={isMobile ? classes.cardsMobile : classes.cards}
                sx={{ backgroundColor: "rgba(255, 255, 255, 0)" }}
              >
                <CardContent>
                  <h3>Support</h3>
                  {supportRows.map((item) => (
                    <Typography key={item} sx={{ fontSize: 14, py: 0.2 }}>
                      {item}
                    </Typography>
                  ))}
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={isMobile ? 6 : 12} sm={4} md={3}>
              <Card
                variant="contained"
                className={isMobile ? classes.cardsMobile : classes.cards}
                sx={{
                  backgroundColor: "rgba(255, 255, 255, 0)",
                }}
              >
                <CardContent>
                  <h3>Newsletter</h3>
                  <Grid container display="row" paddingX="2px" spacing={1}>
                    <Grid item xs={8}>
                      <TextField variant="standard" placeholder="Email" />
                    </Grid>
                    <Grid item>
                      <IconButton variant="filled">
                        <Send sx={{ color: "aliceblue" }} />
                      </IconButton>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={isMobile ? 8 : 12} sm={4} md={8}>
              <Card
                variant="contained"
                className={isMobile ? classes.cardsMobile : classes.cards}
                sx={{
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "rgba(255, 255, 255, 0)",
                }}
              >
                <Typography
                  fontSize={isMobile ? "14px" : "16px"}
                  variant="body"
                  textAlign="center"
                  fontFamily="montserrat"
                >
                  Una App que ofrece el servicio de gestión de usuario con
                  gráficas y estadísticas que muestran el consumo de sus
                  clientes y toda la información relevante que su empresa
                  necesite, también permite asignar roles para cada trabajador
                  de su empresa.
                </Typography>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};
export default Footer;

const useStyles = makeStyles((theme) => ({
  cards: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    padding: 10,
  },

  cardsMobile: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    padding: 10,
    alignItems: "center",
  },
}));
