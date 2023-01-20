import React, { useState, createContext, useContext } from "react";

const authContext = createContext();

export const useAuth = () => {
  const context = useContext(authContext);
  if (!context) throw new Error("There is no Context provider");
  return context;
};

const ContextProvider = ({ children }) => {
  const [name, setName] = useState("Nombre Usuario");
  const [isNavbar, setNavbar] = useState(true);

  return (
    <authContext.Provider value={{ name, setName, isNavbar, setNavbar}}>
      {children}
    </authContext.Provider>
  );
};

export default ContextProvider;