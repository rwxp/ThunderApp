import React from "react";
import Navbar from "../LandingPage/Navbar.js";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
} from "mdb-react-ui-kit";
import logo from "../LandingPage/Images/logo2.png";
import { getUser, registerUser } from "../UserList/UserAPI";
import { useState } from "react";

import { useNavigate } from "react-router-dom";

function AdminRegister() {
  const [id, setId] = useState(0);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Admin");
  const [isActive, setIsActive] = useState(true);
  const [respuesta, setRespuesta] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    var ans = await registerUser(
      id,
      firstName,
      lastName,
      birthdate,
      address,
      phone,
      password,
      role,
      isActive
    );
    var res = await ans.json();
    setRespuesta(res.message);
  }
  return (
    <MDBContainer className="my-5 gradient-form">
      <form onSubmit={handleSubmit}>
        <MDBRow>
          <MDBCol col="6" className="mb-5">
            <div className="d-flex flex-column ms-5">
              <div className="text-center">
                <h2 className="mt-3 mb-5 pb-1">
                  <img src={logo} style={{ width: "100px" }} alt="logo" />
                </h2>

                <h2
                  className="mt-1 mb-5 pb-1"
                  style={{
                    fontSize: 30,
                    fontWeight: 800,
                    color: "#124265",
                    textAlign: "center",
                    fontFamily: "Arial",
                  }}
                >
                  Register User
                </h2>
              </div>
            </div>
            <p>Please add the new user</p>
            <div>
              {respuesta && respuesta !== "Success" ? (
                <div className="alert alert-danger" role="alert">
                  Los datos ingresados son incorrectos
                </div>
              ) : respuesta === "Success" ? (
                navigate("/Dashboard")
              ) : (
                <div></div>
              )}
            </div>

            <MDBInput
              wrapperClass="mb-4"
              label="ID"
              id="id"
              type="id"
              onChange={(e) => setId(e.target.value)}
            />
            <MDBInput
              wrapperClass="mb-4"
              label="First name"
              id="fname"
              type="id"
              onChange={(e) => setFirstName(e.target.value)}
            />
            <MDBInput
              wrapperClass="mb-4"
              label="Last name"
              id="lname"
              type="id"
              onChange={(e) => setLastName(e.target.value)}
            />
            <MDBInput
              wrapperClass="mb-4"
              label="Birthdate YYYY-MM-DD"
              id="bdate"
              type="id"
              onChange={(e) => setBirthdate(e.target.value)}
            />
            <MDBInput
              wrapperClass="mb-4"
              label="Address"
              id="address"
              type="Address"
              onChange={(e) => setAddress(e.target.value)}
            />
            <MDBInput
              wrapperClass="mb-4"
              label="Phone"
              id="phone"
              type="Address"
              onChange={(e) => setPhone(e.target.value)}
            />
            <MDBInput
              wrapperClass="mb-2"
              label="Password"
              id="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />

            <select
              className="mb-5 w-100 select"
              id="role"
              onChange={(e) => setRole(e.target.value)}
            >
              <option selected="true" disabled="disabled">
                Seleccione el rol a desempeñar
              </option>
              <option value="Cliente">Cliente</option>
              <option value="Gerente">Gerente </option>
              <option value="Operador">Operador</option>
              <option value="Admin">Administrador</option>
            </select>

            <MDBRow>
              <div className="text-center pt-1 mb-5 pb-1">
                <MDBBtn className="mb-4 w-100 gradient-custom-2" type="submit">
                  Create User
                </MDBBtn>
              </div>
            </MDBRow>

            <div className="d-flex flex-column align-items-center justify-content-center pb-4 mb-4 ">
              <p className="mb-0">Regresar a la página principal</p>
              <MDBBtn
                outline
                className="mx-2"
                color="primary"
                href="/Dashboard"
              >
                Go back
              </MDBBtn>
            </div>
          </MDBCol>

          <MDBCol col="6" className="mb-5">
            <div className="d-flex flex-column  justify-content-center gradient-custom-2 h-100 mb-4">
              <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                <h4 className="mb-4">We are more than just a company</h4>
                <p className="small mb-0">
                  Una empresa de energía eléctrica que desarrolla un sistema
                  para gestionar la información de sus clientes ya sean
                  corporativos o personas naturales, su consumo y la
                  facturación.
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
