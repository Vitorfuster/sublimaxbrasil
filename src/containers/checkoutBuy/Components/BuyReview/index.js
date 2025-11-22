import React, { useEffect, useState } from "react";

// Estilos
import { Container, CheckoutContainer, ContainerButton } from "./style";

// Componentes
import AdressInvite from "./Components/AdressInvite";

function BuyReview({ userInformations, changeStep }) {
  return (
    <CheckoutContainer>
      <AdressInvite />
    </CheckoutContainer>
  );
}

export default BuyReview;
