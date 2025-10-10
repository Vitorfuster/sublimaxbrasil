import React from "react";

import {
  Container,
  ImageContainer,
  Image,
  Titulo,
  Descricao,
  Codigo,
  Visibilidade,
  Button,
} from "./style";

import PropTypes from "prop-types";

export function CardProductAdmin({ item }) {
  console.log(item);
  return (
    <Container>
      <ImageContainer>
        <Image src={item.cover_url} alt="imagem do produto" />
      </ImageContainer>
      <Titulo>{item.name}</Titulo>
      <Descricao>
        <Codigo>
          Cód: <span>CPA172532</span>
        </Codigo>
        <p>17/10/2025</p>
        <Visibilidade>
          Visiblidade: <span>PUBLICO</span> <span>ESGOTADO</span>
        </Visibilidade>
      </Descricao>
      <Button>Mais informações</Button>
    </Container>
  );
}

CardProductAdmin.propTypes = {
  item: PropTypes.object.isRequired,
};
