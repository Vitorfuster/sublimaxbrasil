import React, { useEffect, useState } from "react";

// Estilos
import {
  Container,
  ResumeContainer,
  ResumeTitle,
  ResumeInfo,
  ResumeProduct,
  ResumeFrete,
  Total,
} from "./style";

function BuyResume({ userInformations, changeStep }) {
  return (
    <Container>
      <ResumeContainer>
        <ResumeTitle>Resumo da compra</ResumeTitle>
        <ResumeInfo>
          <ResumeProduct>
            Produto <span>R$ 49</span>
          </ResumeProduct>
          <ResumeFrete>
            Produto <span>Grátis</span>
          </ResumeFrete>
        </ResumeInfo>
        <Total>
          Total <span>R$ 49</span>
        </Total>
      </ResumeContainer>
    </Container>
  );
}

export default BuyResume;
