import React from "react";
import "../../App.css";
import Img1 from "./Images/logo.png";
import Img2 from "./Images/facebook-icon.png";
import Img3 from "./Images/twitter-3.png";
import Img4 from "./Images/instagram-2016.png";
import { TableRow } from "@mui/material";
import { MDBRow } from "mdb-react-ui-kit";
const Footer = () => {
  return (
    <div className="mainPage">
      <div className="footer d-flex justify-content-evenly flex-wrap p-5">
        {/* Div with Icon and Data */}
        <div>
          <div className="logo-img-footer">
            <img className="d-block" src={Img1} alt="Image1" />
          </div>
          <div className="paraFooter">
            <p>
               Una App que ofrece el servicio de gestión de usuario con gráficas y 
              estadísticas que muestran el consumo de sus clientes y toda la información relevante 
              que su empresa necesite, también permite asignar roles para cada trabajador de su empresa.
            </p>
            <div className="footer d-flex justify-content-evenly flex-wrap p-5">
              <div >
                <a href="https://www.facebook.com/"> <img className="d-block2" src={Img2} alt="icon" /></a>
              </div>
              <div >
                <a href="https://twitter.com/"> <img className="d-block2" src={Img3} alt="icon" /></a>
              </div>
              <div >
                <a href="https://www.instagram.com/"> <img className="d-block2" src={Img4} alt="icon" /></a>
              </div>
            </div>
            
          </div>
        </div>
        <div className="alignDiv">
          <h3 className="footerDiv">Products</h3>
          <p>Connections</p>
          <p>Protocols</p>
          <p>Personas</p>
          <p>Integrations</p>
          <p>Catalog</p>
          <p>Pricing</p>
          <p>Security</p>
        </div>
        <div>
          <h3 className="footerDiv">For Developers</h3>
          <p>Docs</p>
          <p>API</p>
          <p>Open Source</p>
          <p>Engineering Team</p>
        </div>
        <div>
          <h3 className="footerDiv">Company</h3>
          <p>Careers</p>
          <p>Blog</p>
          <p>Press</p>
        </div>
        <div>
          <h3 className="footerDiv">Support</h3>
          <p>Help Center</p>
          <p>Contact Us</p>
          <p>Security Bulletins</p>
          <p>Documentation</p>
          <p>Partner Portal</p>
        </div>
        <div className="pb-5">
          <h3 className="footerDiv">Newsletter</h3>
          <div className="form-outline">
            <i className="fas fa-angle-double-right trailing iconFooter1"></i>
            {/* Email Input */}
            <input
              type="text"
              id="form1"
              className="form-control form-icon-trailing"
            />
            <label className="form-label">Email</label>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Footer;
// CODE BY GRACY PATEL

