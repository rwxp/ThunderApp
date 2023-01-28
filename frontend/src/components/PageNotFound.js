import { Button } from "@mui/material";
import React from "react";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PageNotFound = ({ active }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    window.localStorage.removeItem("loggedInUser");
    navigate("/Login");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <h1>PAGE NOT FOUND</h1>
      {active ? (
        <div style={{ textAlign: "center" }}>
          <h3> Puede que no tengas permisos para ver esta página </h3>
          <Button onClick={() => navigate("/")}>
            Regresar a la página principal
          </Button>
        </div>
      ) : (
        <div style={{ textAlign: "center" }}>
          <h2> Su cuenta está desactivada </h2>
          <Button onClick={handleLogout}> Ingresar con otra cuenta </Button>
        </div>
      )}
    </div>
  );
};

export default PageNotFound;
