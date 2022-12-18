import "./App.css";
import UserList from "./components/UserList/UserList";
import AdminLogin from "./components/Adminlogin/AdminLogin";
import Form from "./components/UserData/UserData";
import React from 'react';

import { BrowserRouter, Routes, Route} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AdminLogin/>} />
        <Route path="/UserList" element={<UserList />} />
        <Route path="/update/:id" element={<Form />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
