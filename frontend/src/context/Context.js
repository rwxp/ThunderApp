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
  const [isSidebar, setIsSidebar] = useState(false);
  const [hideList, sethideList] = useState(false);

  return (
    <authContext.Provider
      value={{
        name,
        setName,
        isNavbar,
        setNavbar,
        isSidebar,
        setIsSidebar,
        hideList,
        sethideList,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export default ContextProvider;
