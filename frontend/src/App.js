import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/LandingPage/Home";
import About from "./components/LandingPage/About";
import Contact from "./components/LandingPage/Contact";

import Navbar from "./components/LandingPage/Navbar";

import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Form from "./components/UserData/UserData";
import UserList from "./components/UserList/UserList";
import Dashboard from "./components/Users/Admin/Dashboard/Dashboard";

import Customer from "./components/Users/Customer";
import Operator from "./components/Users/Operator";
import Gerente from "./components/Users/Gerente";

import ContextProvider from "./context/Context";
import Factura from "./components/Bill/Factura";
import PageNotFound from "./components/PageNotFound";

const OptionalComp = ({ children }) => {
  const loggedUser = window.localStorage.getItem("loggedInUser");
  const userJson = JSON.parse(loggedUser);

  return (
    <div>
      {loggedUser === null ? (
        <PageNotFound active={true} />
      ) : userJson.isActive ? (
        <div>{children}</div>
      ) : (
        <PageNotFound active={false} />
      )}
    </div>
  );
};

const ShowBill = () => {
  const loggedUser = window.localStorage.getItem("loggedInUser");
  const userJson = JSON.parse(loggedUser);

  return (
    <div>
      {userJson && userJson.role === "Cliente" ? (
        <Factura />
      ) : (
        <PageNotFound active={true} />
      )}
    </div>
  );
};

const AdminIF = ({ children }) => {
  const loggedUser = window.localStorage.getItem("loggedInUser");
  const userJson = JSON.parse(loggedUser);
  return (
    <div>
      {userJson && userJson.role === "Admin" ? (
        <div>{children}</div>
      ) : (
        <PageNotFound active={true} />
      )}
    </div>
  );
};

const CustomerIF = ({ children }) => {
  const loggedUser = window.localStorage.getItem("loggedInUser");
  const userJson = JSON.parse(loggedUser);
  return (
    <div>
      {userJson && userJson.role === "Cliente" ? (
        <div>{children}</div>
      ) : (
        <PageNotFound active={true} />
      )}
    </div>
  );
};

const OperatorIF = ({ children }) => {
  const loggedUser = window.localStorage.getItem("loggedInUser");
  const userJson = JSON.parse(loggedUser);
  return (
    <div>
      {userJson && userJson.role === "Operador" ? (
        <div>{children}</div>
      ) : (
        <PageNotFound active={true} />
      )}
    </div>
  );
};

const GerenteIF = ({ children }) => {
  const loggedUser = window.localStorage.getItem("loggedInUser");
  const userJson = JSON.parse(loggedUser);
  return (
    <div>
      {userJson && userJson.role === "Gerente" ? (
        <div>{children}</div>
      ) : (
        <PageNotFound active={true} />
      )}
    </div>
  );
};

const App = () => {
  return (
    <div>
      <ContextProvider>
        <Router>
          <Navbar
            loggedUser={
              window.localStorage.getItem("loggedInUser") ? true : false
            }
          />
          <Routes>
            <Route path="*" element={<PageNotFound />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/" element={<Home />} />
            <Route
              path="/Dashboard"
              element={
                <OptionalComp>
                  <AdminIF>
                    <Dashboard />
                  </AdminIF>
                </OptionalComp>
              }
            />
            <Route
              path="/Register"
              element={
                <OptionalComp>
                  <Register />
                </OptionalComp>
              }
            />
            <Route
              path="/UserList"
              element={
                <OptionalComp>
                  <UserList />
                </OptionalComp>
              }
            />
            <Route
              path="/update/:id"
              element={
                <OptionalComp>
                  <Form />
                </OptionalComp>
              }
            />
            <Route path="/About" element={<About />} />
            <Route path="/Contact" element={<Contact />} />
            <Route
              path="/Gerente"
              element={
                <OptionalComp>
                  <GerenteIF>
                    <Gerente />
                  </GerenteIF>
                </OptionalComp>
              }
            />
            <Route
              path="/Cliente"
              element={
                <OptionalComp>
                  <CustomerIF>
                    <Customer />
                  </CustomerIF>
                </OptionalComp>
              }
            />
            <Route
              path="/Operador"
              element={
                <OptionalComp>
                  <OperatorIF>
                    <Operator />
                  </OperatorIF>
                </OptionalComp>
              }
            />
            <Route path="/factura" element={<ShowBill />} />
          </Routes>
        </Router>
      </ContextProvider>
    </div>
  );
};

export default App;