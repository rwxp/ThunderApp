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

import Customer from "./components/Users/Customer/Customer";
import Operator from "./components/Users/Operator/Operator";
import Gerente from "./components/Users/Gerente/Gerente";

import ContextProvider from "./context/Context";
import Factura from "./components/Bill/Factura";
import PageNotFound from "./components/PageNotFound";

const OptionalComp = ({ children }) => {
  const loggedUser = window.localStorage.getItem("loggedInUser");
  return (
    <div>{loggedUser === null ? <PageNotFound /> : <div>{children}</div>}</div>
  );
};

const App = () => {

  return (
    <div>
      <ContextProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="*" element={<PageNotFound />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/" element={<Home />} />
            <Route
              path="/Dashboard"
              element={
                <OptionalComp>
                  <Dashboard />
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
                  <Gerente />
                </OptionalComp>
              }
            />
            <Route
              path="/Cliente"
              element={
                <OptionalComp>
                  <Customer />
                </OptionalComp>
              }
            />
            <Route
              path="/Operador"
              element={
                <OptionalComp>
                  <Operator />
                </OptionalComp>
              }
            />
            <Route path="/factura" element={<Factura />} />
          </Routes>
        </Router>
      </ContextProvider>
    </div>
  );
};

export default App;
