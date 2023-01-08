import * as React from "react";

import {
  AppBar,
  Box,
  Toolbar,
  Button,
  IconButton,
  Grid,
  useMediaQuery,
  useTheme,
  Menu,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import { useState } from "react";

import logo from "./Images/logo3.png";

import MenuItem from "@mui/material/MenuItem";

import { useNavigate } from "react-router-dom";

import HomeIcon from "@mui/icons-material/Home";
import MenuIcon from "@mui/icons-material/Menu";
import InfoIcon from "@mui/icons-material/Info";
import EmailIcon from "@mui/icons-material/Email";
import LoginIcon from "@mui/icons-material/Login";

function Navbar() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [anchor, setAnchor] = useState(null);
  const open = Boolean(anchor);
  const handleClick = (event) => {
    setAnchor(event.currentTarget);
  };

  const [fix, setFix] = useState(false);

  const setFixed = () => {
    if (window.scrollY >= 50) {
      setFix(true);
    } else {
      setFix(false);
    }
  };

  window.addEventListener("scroll", setFixed);

  const handleClose = () => {
    setAnchor(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar>
        <Toolbar
          className={fix ? "Navbar fixed" : "Navbar"}
          sx={{ backgroundColor: "#124265" }}
        >
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            sx={{ paddingLeft: 2 }}
          >
            <img
              className="App-logo"
              width="80"
              height="80"
              src={logo}
              alt="logo"
            />
          </IconButton>

          {isMobile ? (
            <Grid
              container
              spacing={2}
              sx={{
                justifyContent: "flex-end",
                alignItems: "center",
                mt: 0.1,
              }}
            >
              <Button
                sx={{ color: "white" }}
                id="resources-button"
                onClick={handleClick}
                aria-controls={open ? "resources-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
              >
                <MenuIcon />
              </Button>

              <Menu
                id="resources-menu"
                anchorEl={anchor}
                open={open}
                MenuListProps={{ "aria-labelledby": "resources-button" }}
                onClose={handleClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              >
                <MenuItem onClick={() => navigate("/")}>
                  <ListItemIcon>
                    <HomeIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Home</ListItemText>
                </MenuItem>

                <MenuItem onClick={() => navigate("/About")}>
                  <ListItemIcon>
                    <InfoIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>About</ListItemText>
                </MenuItem>

                <MenuItem onClick={() => navigate("/Contact")}>
                  <ListItemIcon>
                    <EmailIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Contact us</ListItemText>
                </MenuItem>

                <MenuItem onClick={() => navigate("/Login")}>
                  <ListItemIcon>
                    <LoginIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Login</ListItemText>
                </MenuItem>
              </Menu>
            </Grid>
          ) : (
            <Grid
              container
              spacing={2}
              sx={{
                justifyContent: "flex-end",
                paddingRight: 2,
                alignItems: "center",
              }}
            >
              <Grid item>
                <Button
                  onClick={() => navigate("/About")}
                  sx={{
                    color: "white",
                    fontWeight: 550,
                    fontFamily: "Montserrat",
                    ":hover": {
                      bgcolor: "lightblue",
                      color: "white",
                    },
                  }}
                >
                  Acerca de
                </Button>
              </Grid>
              <Grid item>
                <Button
                  onClick={() => navigate("/Contact")}
                  sx={{
                    color: "white",
                    fontWeight: 550,
                    fontFamily: "Montserrat",
                    ":hover": {
                      bgcolor: "lightblue",
                      color: "white",
                    },
                  }}
                >
                  Contactanos
                </Button>
              </Grid>
              <Grid item>
                <Button
                  onClick={() => navigate("/Login")}
                  sx={{
                    color: "white",
                    fontWeight: 550,
                    fontFamily: "Montserrat",
                    ":hover": {
                      bgcolor: "lightblue",
                      color: "white",
                    },
                  }}
                >
                  Ingresar
                </Button>
              </Grid>
              <Grid item>
                <IconButton
                  onClick={() => navigate("/")}
                  sx={{
                    color: "white",
                    ":hover": {
                      bgcolor: "lightblue",
                      color: "white",
                    },
                  }}
                >
                  <HomeIcon />
                </IconButton>
              </Grid>
            </Grid>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;
