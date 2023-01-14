//Navbar used MDB Bootstrap
import React, { useState } from "react";
import Img1 from "../../LandingPage/Images/logo3.png";
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
    <div style={{ marginBottom: "80px" }}>
      <MDBNavbar className="navbar fixed-top" expand="lg">
        <MDBContainer>
          {/* Scroll yo top */}
          <NavLink href="/Operador" onClick={toggleHome}>
            <img
              className="d-block w-120"
              src={Img1}
              height={80}
              width={80}
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
                <NavLink to="/Dashboard" className="navText">
                  <button
                    className="btn btn-outline-secondary btn-rounded ps-30 pe-30"
                    style={{ background: "aliceblue", borderColor: "white" }}
                  >
                    Dashboard
                  </button>
                </NavLink>
              </MDBNavbarItem>
              <MDBNavbarItem className="p-3">
                <NavLink to="/Register" className="navText">
                  <button
                    className="btn btn-outline-secondary btn-rounded ps-10 pe-30"
                    style={{ background: "aliceblue", borderColor: "white" }}
                  >
                    Registrar Usuarios
                  </button>
                </NavLink>
              </MDBNavbarItem>
              <MDBNavbarItem className="p-3">
                <NavLink to="/UserList" className="navText">
                  <button
                    className="btn btn-outline-secondary btn-rounded ps-30 pe-30"
                    style={{ background: "aliceblue", borderColor: "white" }}
                  >
                    Gestionar Usuarios
                  </button>
                </NavLink>
              </MDBNavbarItem>
              <MDBNavbarItem className="p-3">
                <NavLink to="/" className="navText">
                  <button
                    className="btn btn-outline-secondary btn-rounded ps-10 pe-30"
                    style={{ background: "aliceblue", borderColor: "white" }}
                  >
                    Logout
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
