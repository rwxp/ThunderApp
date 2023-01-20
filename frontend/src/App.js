import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/LandingPage/Home";
import About from "./components/LandingPage/About";
import Contact2 from "./components/LandingPage/Contact2";

import Navbar from "./components/LandingPage/Navbar";

import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Form from "./components/UserData/UserData";
import UserList from "./components/UserList/UserList";
import OpRegister from "./components/Users/Operator/OperatorRegister";

import Dashboard from "./components/DashboardPage/Dashboard/index";

import Administrador from "./components/Users/Admin/Administrador";
import Cliente from "./components/Users/Customer/Cliente";
import Operador from "./components/Users/Operator/Operador";
import Gerente from "./components/Users/Gerente/Gerente";


import ContextProvider from "./context/Context";
import Factura from './components/Users/Factura';

function App() {
  return (
    <div>
      <ContextProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/Login" element={<Login />} />
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/UserList" element={<UserList />} />
            <Route path="/update/:id" element={<Form />} />
            <Route path="/" element={<Home />} />
            <Route path="/About" element={<About />} />
            <Route path="/Contact" element={<Contact2 />} />
            <Route path="/Gerente" element={<Gerente />} />
            <Route path="/Administrador" element={<Administrador />} />
            <Route path="/Cliente" element={<Cliente />} />
            <Route path="/Operador" element={<Operador />} />
            <Route path="/OpRegister" element={<OpRegister />} />
            <Route path="/factura" element={<Factura />} />
          </Routes>
        </Router>
      </ContextProvider>
    </div>
  );
}

export default App;
