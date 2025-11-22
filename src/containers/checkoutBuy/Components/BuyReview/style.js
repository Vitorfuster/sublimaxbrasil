import styled from "styled-components";
import backgroundImage from "../../../../assets/sublimation-bg.svg";

export const CheckoutContainer = styled.div`
  display: grid;
  background: var(--colorT0);
  border-radius: 25px;
  /* height: auto; */
  /* min-height: 900px; */
  width: 1400px;
  padding: 40px 50px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(4px);
  border: 1px solid rgba(255, 255, 255, 0.1);

  @media (max-width: 1000px) {
    width: 90vw;
  }

  @media (max-width: 800px) {
    justify-content: start;
    padding: 20px;
  }

  @media (max-width: 600px) {
    height: 100%;
    border-radius: 0px;

    h1 {
      margin-bottom: 0px;
      /* font-size: var(--fsGG); */
    }
  }

  @media (max-width: 400px) {
    padding: 20px 10px;
    width: 100vw;
  }
`;

export const ContainerButton = styled.div`
  padding-top: 40px;
`;
