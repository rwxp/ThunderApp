import React from 'react';
import  '../Adminlogin/AdminLogin.css';
import Navbar from '../Operador/NavbarOp.js'
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput
}
from 'mdb-react-ui-kit';
import logo from "../LandingPage/Images/logo2.png";
import {getUser, registerUser} from '../UserList/UserAPI';
import {useState} from 'react';

function ClientRegister() {
  const [id, setId] = useState(0);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [address, setAddress] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState(""); 
  const [role, setRole] = useState("Cliente");
  const [isActive, setIsActive] = useState(true)

  async function handleSubmit(event){
    event.preventDefault()
    var ans = await registerUser(id, firstName, lastName, birthdate, address, phone
      , password, role, isActive);
    var res = await ans.json();
  }
  return (
    <MDBContainer className="my-5 gradient-form" >
      <Navbar /> 
      <form onSubmit={handleSubmit}>
      <MDBRow>

        <MDBCol col='6' className="mb-5" style={{
                
                marginTop:'20px'}}>
          <div className="d-flex flex-column ms-5">

            <div className="text-center">
            <h2 className="mt-3 mb-5 pb-1">
                  <img src={logo}
                style={{width: '100px'}} alt="logo" /></h2>

              
              <h2 className="mt-1 mb-5 pb-1"
                style={{
                fontSize: 30,
                fontWeight: 800,
                color:  "#124265",
                textAlign: "center",
                fontFamily: "Arial",}}>
                  Registrar Cliente</h2>
            </div>

            <p>Please add the new client</p>

            <MDBInput wrapperClass='mb-4' label='ID' id='id' type='id' onChange={(e)=> setId(e.target.value)}/>
            <MDBInput wrapperClass='mb-4' label='First name' id='fname' type='id' onChange={(e)=> setFirstName(e.target.value)}/>
            <MDBInput wrapperClass='mb-4' label='Last name' id='lname' type='id' onChange={(e)=> setLastName(e.target.value)}/>
            <MDBInput wrapperClass='mb-4' label='Birthdate YYYY-MM-DD' id='bdate' type='id' onChange={(e)=> setBirthdate(e.target.value)}/>
            <MDBInput wrapperClass='mb-4' label='Address' id='address' type='Address' onChange={(e)=> setAddress(e.target.value)}/>
            <MDBInput wrapperClass='mb-4' label='Phone' id='phone' type='Address' onChange={(e)=> setPhone(e.target.value)}/>
            <MDBInput wrapperClass='mb-2' label='Password' id='password' type='password' onChange={(e)=> setPassword(e.target.value)}/>

            

            <MDBRow>
                <div className="text-center pt-1 mb-5 pb-1">
                    <MDBBtn className="mb-4 w-100 gradient-custom-2" type="submit">Sign in</MDBBtn>
                </div>
            </MDBRow>


          </div>

        </MDBCol>

        <MDBCol col='6' className="mb-5">
          <div className="d-flex flex-column  justify-content-center gradient-custom-2 h-100 mb-4">

            <div className="text-white px-3 py-4 p-md-5 mx-md-4">
              <h4 className="mb-4">We are more than just a company</h4>
              <p className="small mb-0">Una empresa de energía eléctrica que desarrolla un sistema para gestionar la información
                de sus clientes ya sean corporativos o personas naturales, su consumo y la facturación.
              </p>
            </div>

          </div>

        </MDBCol>

      </MDBRow>
    </form>
    </MDBContainer>
  );
}

export default ClientRegister;
