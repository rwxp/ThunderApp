//Navbar used MDB Bootstrap
import React, { useState } from "react";
import Img1 from "./Images/logo3.png";
import { animateScroll as scroll } from "react-scroll";
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarToggler,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBCollapse,
  MDBIcon,
} from "mdb-react-ui-kit";
import { NavLink } from "react-router-dom";

import HomeIcon from "@mui/icons-material/Home";

export default function App() {
  const [showNav, setShowNav] = useState(false);
  const toggleHome = () => {
    scroll.scrollToTop();
  };
  return (
    // MDB NAVBAR
    <div style={{ marginBottom: '90px' }}>
      <MDBNavbar
        className="navbar fixed-top navbar-expand-xl"
      >
        <MDBContainer>
          {/* Scroll yo top */}
          <NavLink href="/" onClick={toggleHome}>
            <img
              className="d-block w-120"
              src={Img1}
              width="80"
              height="80"
              alt="LOGO MAIN"
            />
          </NavLink>
          <MDBNavbarToggler
            type="button"
            color="#000"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={() => {
              setShowNav(!showNav);
            }}
            // Responsiveness of Nav
          >
            <MDBIcon icon="bars" fas />
          </MDBNavbarToggler>
          <MDBCollapse navbar show={showNav}>
            <MDBNavbarNav className="d-flex justify-content-end">
              <MDBNavbarItem className="p-3">
                {/* Other Navbar Items */}
                <NavLink to="/About" className="navText">
                  About
                </NavLink>
              </MDBNavbarItem>
              <MDBNavbarItem className="p-3">
                <NavLink to="/Contact" className="navText">
                  Contact Us
                </NavLink>
              </MDBNavbarItem>
              <MDBNavbarItem className="p-3">
                <NavLink to="/Login" className="navText">
                  Login
                </NavLink>
              </MDBNavbarItem>
              <MDBNavbarItem className="m-2">
                <NavLink to="/" onClick={toggleHome}>
                  <button
                    type="button"
                    className="btn btn-outline-secondary btn-rounded ps-5 pe-5"
                    data-mdb-ripple-color="dark"
                    color="white"
                  >
                    <HomeIcon style={{ color: "white" }} />
                  </button>
                </NavLink>
              </MDBNavbarItem>
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>
    </div>
  );
}
