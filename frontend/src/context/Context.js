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
  const [download, setdownload] = useState(false);

  return (
    <authContext.Provider value={{ name, setName, isNavbar, setNavbar, download, setdownload }}>
      {children}
    </authContext.Provider>
  );
};

export default ContextProvider;
