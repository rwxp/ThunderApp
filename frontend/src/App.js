import './App.css';
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './components/LandingPage/Home';
import About from './components/LandingPage/About';
import Contact from './components/LandingPage/Contact';
import Navbar from './components/LandingPage/Navbar';
import ScrollToTop from './components/LandingPage/ScrollToTop';
import Login from './components/Adminlogin/AdminLogin';
import Form from "./components/UserData/UserData";
import UserList from "./components/UserList/UserList";



function App() {
  return (
    <Router>
    
    <Routes>
      <Route path="/" element={<Login/>} />
      <Route path="/UserList" element={<UserList />} />
      <Route path="/update/:id" element={<Form />} />
      <Route path="/Home" element={<Home/>} />
      <Route path="/About" element={<About />} />
      <Route path="/Contact" element={<Contact />} />
    </Routes>
  </Router>
  );
}

export default App;
// CODE BY GRACY PATEL