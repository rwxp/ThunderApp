import { Box, Button, Grid, useMediaQuery, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";

import Image1 from "./Images/home2.png";

const svgURL =
  "M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z";

const Banner = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <div>
      <Box
        sx={{
          mt: 18,
          px: 5,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid
          container
          sx={{
            justifyContent: "center",
            alignItems: "center",
            direction: "column",
          }}
        >
          <Grid item>
            <h3
              style={{
                fontWeight: 600,
                color: "#1a5c83",
                textAlign: "left",
                fontFamily: "montserrat",
              }}
            >
              Thunder App
            </h3>
            <h6
              className="card-subtitle mb-2 "
              style={{
                fontSize: 20,
                color: "#33b4db",
                textAlign: "left",
                fontFamily: "montserrat",
              }}
            >
              Estadísticas de sus clientes
            </h6>
            <Grid item sx={{ mt: 2, mb: 2 }}>
              <p
                style={{
                  textAlign: "left",
                  fontFamily: "montserrat",
                }}
              >
                Una aplicación para generar facturas automáticas del consumo
                energético de sus clientes
              </p>
            </Grid>
            <Grid container spacing={2} mt={4}>
              <Grid item>
                <Button variant="contained" onClick={() => navigate("/Login")}>
                  Comenzar prueba gratuita
                </Button>
              </Grid>
              <Grid item>
                <Button variant="filled" onClick={() => navigate("/About")}>
                  Leer más
                </Button>
              </Grid>
            </Grid>
          </Grid>
          {/* ======================= IMAGE ======================= */}
          {isMobile ? (
            <Grid item sx={{ mt: 4 }}>
              <img
                src={Image1}
                width="80%"
                height="auto"
                alt="logo"
                alignItems="center"
              />
            </Grid>
          ) : (
            <Grid item xs={4}>
              <img
                src={Image1}
                width="80%"
                height="auto"
                alt="logo"
                style={{ float: "right" }}
              />
            </Grid>
          )}
        </Grid>
      </Box>

      <div
        className={
          isMobile
            ? "custom-shape-divider-bottom-1672727591"
            : "custom-shape-divider-bottom-1672727590"
        }
      >
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path d={svgURL} className="shape-fill"></path>
        </svg>
      </div>
    </div>
  );
};

export default Banner;
