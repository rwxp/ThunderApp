import React from 'react';
import  '../Adminlogin/AdminLogin.css';
import Navbar from '../Gerente/NavbarGe.js'
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

function GerenteView() {
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
    var ans = await getUser(id, firstName, lastName, birthdate, address, phone
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
                  Bienvenido Gerente</h2>
            </div>

          </div>

        </MDBCol>

      </MDBRow>
    </form>
    </MDBContainer>
  );
}

export default GerenteView;
