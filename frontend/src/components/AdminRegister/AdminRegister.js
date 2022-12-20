import React from 'react';
import  '../Adminlogin/AdminLogin.css';
import Navbar from '../LandingPage/Navbar.js'
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput
}
from 'mdb-react-ui-kit';
import logo from "../Adminlogin/adminloginimages/icon2.png";
import {getUser, registerUser} from '../UserList/UserAPI';
import {useState} from 'react';

function AdminRegister() {
  const [id, setId] = useState(0);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [address, setAddress] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState(""); 
  const [role, setRole] = useState("Admin");
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
            <h2 className="mt-1 mb-5 pb-1"
                style={{
                fontSize: 35,
                fontWeight: 800,
                color: "#124265",
                textAlign: "center",
                fontFamily: "sans-serif",}}>
                  Thunder
                  <img src={logo}
                style={{width: '80px'}} alt="logo" /></h2>

              
              <h2 className="mt-1 mb-5 pb-1"
                style={{
                fontSize: 30,
                fontWeight: 800,
                color:  "#124265",
                textAlign: "center",
                fontFamily: "Arial",}}>
                  Sign in</h2>
            </div>

            <p>Please add the new user</p>

            <MDBInput wrapperClass='mb-4' label='ID' id='form1' type='id' onChange={(e)=> setId(e.target.value)}/>
            <MDBInput wrapperClass='mb-4' label='First name' id='form1' type='id' onChange={(e)=> setFirstName(e.target.value)}/>
            <MDBInput wrapperClass='mb-4' label='Last name' id='form1' type='id' onChange={(e)=> setLastName(e.target.value)}/>
            <MDBInput wrapperClass='mb-4' label='Birthdate YYYY-MM-DD' id='form1' type='id' onChange={(e)=> setBirthdate(e.target.value)}/>
            <MDBInput wrapperClass='mb-4' label='Address' id='form2' type='Address' onChange={(e)=> setAddress(e.target.value)}/>
            <MDBInput wrapperClass='mb-4' label='Phone' id='form2' type='Address' onChange={(e)=> setPhone(e.target.value)}/>
            <MDBInput wrapperClass='mb-4' label='Password' id='form2' type='password' onChange={(e)=> setPassword(e.target.value)}/>
            <div class="btn-group">
                <button
                    type="button"
                    class="btn btn-primary dropdown-toggle"
                    data-mdb-toggle="dropdown"
                    data-mdb-display="static"
                    aria-expanded="false">
                 Rol
                </button>
                <ul class="dropdown-menu dropdown-menu-lg-end">
                     <li><button class="dropdown-item" type="button">Operador</button></li>
                     <li><button class="dropdown-item" type="button">Gerente</button></li>
                     <li><button class="dropdown-item" type="button">Cliente</button></li>
                </ul>
            </div>

            

            <MDBRow>
                <div className="text-center pt-1 mb-5 pb-1">
                    <MDBBtn className="mb-4 w-100 gradient-custom-2" type="submit">Sign in</MDBBtn>
                    <a className="text-muted" href="#!">Forgot password?</a>
                </div>
            </MDBRow>

            <div className="d-flex flex-row align-items-center justify-content-center pb-4 mb-4">
              <p className="mb-0">You already have an account?</p>
              <MDBBtn outline className='mx-2' color='primary' href="/Login">
                Login
              </MDBBtn>
            </div>

          </div>

        </MDBCol>

        <MDBCol col='6' className="mb-5">
          <div className="d-flex flex-column  justify-content-center gradient-custom-2 h-100 mb-4">

            <div className="text-white px-3 py-4 p-md-5 mx-md-4">
              <h4 class="mb-4">We are more than just a company</h4>
              <p class="small mb-0">Una empresa de energía eléctrica que desarrolla un sistema para gestionar la información
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

export default AdminRegister;