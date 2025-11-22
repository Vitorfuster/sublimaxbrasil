import React, { useEffect, useState } from "react";

// Estilos
import {
  Container,
  AdressInfo,
  Title,
  AdressContainer,
  MyAdressContainer,
  InputAdress,
  MyAdressInfo,
  MyAdressTitle,
  MyAdressText,
  MyAdressType,
  ChangeAdressContainer,
  ChangeAdressLink,
} from "./style";

// Componentes
import BuyResume from "../BuyResume";

function AdressInvite({ userInformations, changeStep }) {
  return (
    <Container>
      <AdressInfo>
        <Title>Escolha a forma de entrega</Title>

        <AdressContainer>
          <MyAdressContainer name="myAdress">
            <InputAdress type="radio" name="myAdress" />
            <MyAdressInfo>
              <MyAdressTitle>
                Enviar no meu endereço <span>Grátis</span>
              </MyAdressTitle>
              <MyAdressText>
                Avenida João Veloso 1346 Casa, Distribuidora - Centro, Ouroeste
                - CEP 15685000
              </MyAdressText>
              <MyAdressType>Residencial</MyAdressType>
            </MyAdressInfo>
          </MyAdressContainer>
          <ChangeAdressContainer>
            <ChangeAdressLink>
              Alterar ou escolher outro endereço
            </ChangeAdressLink>
          </ChangeAdressContainer>
        </AdressContainer>
      </AdressInfo>
      <BuyResume />
    </Container>
  );
}

export default AdressInvite;
