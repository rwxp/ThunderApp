import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/LandingPage/Home";
import About from "./components/LandingPage/About";
import Contact2 from "./components/LandingPage/Contact2";

import Navbar from "./components/LandingPage/Navbar";

import Login from "./components/Login/Login";
import Register from "./components/AdminRegister/AdminRegister";
import Form from "./components/UserData/UserData";
import UserList from "./components/UserList/UserList";
import OpRegister from "./components/Operador/OperatorRegister";

import Dashboard from "./components/DashboardPage/Dashboard/index";

import Administrador from "./components/Administrador/Administrador";
import Cliente from "./components/Cliente/Cliente";
import Operador from "./components/Operador/Operador";
import Gerente from "./components/Gerente/Gerente";

function App() {
  return (
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
      </Routes>
    </Router>
  );
}

export default App;
