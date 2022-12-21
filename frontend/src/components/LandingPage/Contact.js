import React from 'react';
import "./Contact.css";
import Img1 from "./Images/logo3.png";
import { useEffect } from "react";
import Navbar from './Navbar.js'
import { MDBBtn, MDBCard, MDBCardBody, MDBCol, MDBIcon, MDBInput, MDBRow, MDBTypography } from 'mdb-react-ui-kit';

function Contact () { 
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  return (
    <>
    <Navbar />
      <div className="mx-auto gradient-custom mt-10" style={{  maxWidth: '800px', height: '470px' }}>
      <Navbar /> 
        <MDBRow className="pt-3 mx-3">
          <MDBCol md="3">
            <div className="text-center" style={{ marginTop: '50px', marginLeft: '10px' }}>
              <MDBIcon fas icon="shipping-fast text-white" size="3x" />
              <MDBTypography tag="h3" className="text-white">
              <img  className="d-block w-100" src={Img1} alt="LOGO MAIN"/>
                  </MDBTypography>
              <p className="white-text">Send us an email for contact us with you</p>
            </div>
            <div className="back-button">
                <MDBBtn rounded style={{ backgroundColor: '#6FC6C9'}}href="/">Go back</MDBBtn>
            </div>
          </MDBCol>
          <MDBCol md="9" className="justify-content-center">
            <MDBCard className="card-custom pb-4">
              <MDBCardBody className="mt-0 mx-5">
                <div className="text-center mb-3 pb-2 mt-3">
                  <MDBTypography tag="h4" 
                  style={{fontSize: 30, fontWeight: 800, color: "#124265",textAlign: "center",fontFamily: "sans-serif",}} 
                  >Contact us</MDBTypography>
                </div>

                <form className="mb-0">
                  <MDBRow className="mb-4">
                     <MDBInput label='Name' type='text' />
                  </MDBRow>
                  <MDBRow className="mb-4">
                    <MDBCol>
                      <MDBInput label='City' type='text' />
                    </MDBCol>
                    <MDBCol>
                      <MDBInput label='Email' type='text' />
                    </MDBCol>
                  </MDBRow>
                  <MDBRow className="mb-4">
                     <MDBInput label='Message' type='text' />
                  </MDBRow>
                
                  <MDBRow className="mb-4">
                     <MDBInput label='Subject' type='text' />
                  </MDBRow>
                  

                  <div className="float-end">
                    <MDBBtn rounded style={{backgroundColor: '#6FC6C9'}}>Contact us</MDBBtn>
                  </div>
                </form>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </div>
    </>
  );
}
export default Contact;