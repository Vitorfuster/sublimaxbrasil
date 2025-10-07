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
      <div style={{ padding: "20px 0", textAlign: "center" }}>
        <h2 style={{ color: "#fff", fontSize: "1.5rem", fontWeight: "600" }}>Sublimax Admin</h2>
      </div>
      <hr></hr>
      {ListMenu.map((item) => (
        <ItemContainer key={item.id} isActive={item.link === pathname}>
          <span style={{ fontSize: "1.2rem", marginRight: "10px" }}>{item.icon}</span>
          <ListLink to={item.link}>{item.label}</ListLink>
        </ItemContainer>
      ))}
      <hr></hr>

      <ItemContainer style={{ position: "absolute", bottom: "30px", width: "calc(100% - 24px)" }}>
        <span style={{ fontSize: "1.2rem", marginRight: "10px" }}>🚪</span>
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
