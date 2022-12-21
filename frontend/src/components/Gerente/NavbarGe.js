//Navbar used MDB Bootstrap
import React, { useState } from "react";
import Img1 from "../LandingPage/Images/logo3.png";
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
    <MDBNavbar className="navbar fixed-top" expand="lg" >
      <MDBContainer>
        {/* Scroll yo top */}
        <NavLink className="navbar-brand" to="/Gerente">
          <NavLink href="/Gerente" onClick={toggleHome}>
            <img
              className="d-block w-100"
              src={Img1}
              height={60}
              width={60}
              alt="LOGO MAIN"
            />
          </NavLink>
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
                <NavLink to="/" className="navText">
                  Logout
                </NavLink>
              </MDBNavbarItem>
            <MDBNavbarItem className="m-2">
            </MDBNavbarItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
}
