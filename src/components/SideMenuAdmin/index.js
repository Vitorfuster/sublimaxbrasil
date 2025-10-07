// Bibliotecas
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import PropTypes from "prop-types";

// Componentes
import ListMenu from "./menu-list";

// Estilos
import { Container, ItemContainer, ListLink } from "./style";

// UseContext
import { useUser } from "../../hooks/UserContext";

export function SideMenuAdmin({ pathname }) {
  const { logout } = useUser();
  const navigate = useNavigate();
  const logoutUser = () => {
    logout();
  };
  return (
    <Container>
      <hr></hr>
      {ListMenu.map((item) => (
        <ItemContainer key={item.id} isActive={item.link === pathname}>
          <ListLink to={item.link}>{item.label}</ListLink>
        </ItemContainer>
      ))}
      <hr></hr>

      <ItemContainer style={{ position: "fixed", bottom: "30px" }}>
        <ListLink to={"/login"} onClick={logoutUser}>
          Sair
        </ListLink>
      </ItemContainer>
    </Container>
  );
}

SideMenuAdmin.propTypes = {
  pathname: PropTypes.string.isRequired,
};
