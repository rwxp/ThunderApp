import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  Button,
  TextField,
  Paper,
  useTheme,
  useMediaQuery,
} from "@mui/material";

import "./Contact.css";

import { useNavigate } from "react-router-dom";

import logo from "./Images/logo3.png";

const MyPaper = ({ children, landing }) => {
  return (
    <div>
      {landing ? (
        <Paper
          sx={{
            borderRadius: "20px",
            py: 2,
            backgroundImage:
              "linear-gradient(to right,#124265,#1a5c83,#2278a1,#2a96be,#33b4db);",
          }}
        >
          {children}
        </Paper>
      ) : (
        <Paper
          sx={{
            borderRadius: "20px",
            py: 2,
            backgroundColor: "white",
          }}
        >
          {children}
        </Paper>
      )}
    </div>
  );
};

const Contact2 = ({ landing }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      className={
        landing
          ? "Contact-landing"
          : isMobile
          ? "Contact-gradient-mob"
          : "Contact-gradient"
      }
    >
      <Box
        className={isMobile ? "Contact-form-mob" : "Contact-form"}
        marginTop={landing ? "0px" : isMobile ? "0px" : "50px"}
      >
        <MyPaper landing={landing}>
          <Grid
            container
            textAlign="center"
            paddingX={isMobile ? (landing ? 0 : 4) : 4}
            sx={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {isMobile ? (
              <></>
            ) : (
              <Grid item md={4}>
                <Card
                  variant="contained"
                  sx={{ backgroundColor: "rgba(255,255,255,0)" }}
                >
                  <CardMedia>
                    <img
                      src={logo}
                      alt="Thunder Logo"
                      width="120px"
                      height="auto"
                    />
                  </CardMedia>
                  <CardContent>
                    <Typography
                      variant="body"
                      color={landing ? "white" : "black"}
                    >
                      Send us an email for <br /> contact us with you
                    </Typography>
                  </CardContent>
                  <CardActions
                    sx={{ alignItems: "center", justifyContent: "center" }}
                  >
                    {landing ? (
                      <Button variant="contained" sx={{ color: "white" }}>
                        Go back
                      </Button>
                    ) : (
                      <Button variant="outlined">Go back</Button>
                    )}
                  </CardActions>
                </Card>
              </Grid>
            )}

            <Grid
              item
              md={8}
              xs={8}
              sm={8}
              paddingX={isMobile ? (landing ? 4 : 0) : 4}
              sx={{ py: 2, borderRadius: 4, justifyContent: "center" }}
              backgroundColor={landing ? "white" : undefined}
            >
              <Typography
                fontSize={isMobile ? 22: 30}
                sx={{
                  fontWeight: 800,
                  color: "#124265",
                  textAlign: "center",
                  fontFamily: "Montserrat",
                }}
              >
                Contáctanos
              </Typography>
              <Box component="form" sx={{ py: 2 }}>
                <TextField
                  fullWidth
                  label="Name"
                  variant="outlined"
                  size="small"
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Email"
                  variant="outlined"
                  size="small"
                  sx={{ mb: 2 }}
                />
                <Grid
                  container
                  sx={{
                    columnGap: 4.2,
                    direction: "column",
                    mb: 2,
                  }}
                >
                  <Grid item md={5.5} marginBottom={isMobile ? 2 : 0}>
                    <TextField
                      label="Subject"
                      variant="outlined"
                      size="small"
                    />
                  </Grid>
                  <Grid item md={5.5}>
                    <TextField label="City" variant="outlined" size="small" />
                  </Grid>
                </Grid>
                <TextField
                  fullWidth
                  placeholder="Message"
                  variant="outlined"
                  size="small"
                  multiline
                  rows={4}
                />
                <Button variant="contained" sx={{ mt: 2 }}>
                  Contact us
                </Button>
              </Box>
            </Grid>
          </Grid>
        </MyPaper>
      </Box>
    </Box>
  );
};

export default Contact2;
