import React, { createContext, useContext, useEffect, useState } from "react";

import PropTypes from "prop-types";

const UserContext = createContext({});

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState({});

  // função que atualiza o estado
  const putUserData = async (userInfo) => {
    setUserData(userInfo); // atualiza o estado com as informações do usuário

    await localStorage.setItem(
      "sublimaxBrasil:userData",
      JSON.stringify(userInfo)
    ); // Gravar os dados no LOCALSTORAGE
  };

  // Deslogar o usuário
  const logout = async () => {
    await localStorage.removeItem("sublimaxBrasil:userData");
  };

  useEffect(() => {
    // recuperar os dados do LOCALSTORAGE
    const loadUserData = async () => {
      const clientInfo = await localStorage.getItem("sublimaxBrasil:userData");

      if (clientInfo) {
        setUserData(JSON.parse(clientInfo));
      }
    };

    loadUserData();
  }, []);

  return (
    <UserContext.Provider value={{ putUserData, logout, userData }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUser must be used with UserContext");
  }

  return context;
};

UserProvider.propTypes = {
  children: PropTypes.node,
};
