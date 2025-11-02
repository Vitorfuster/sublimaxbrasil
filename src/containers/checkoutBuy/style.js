import styled from "styled-components";
import backgroundImage from "../../assets/sublimation-bg.svg";

export const Container = styled.div`
  display: grid;
  justify-content: center;
  align-items: center;
  min-height: 100vh;

  background-image: url(${backgroundImage});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

export const CheckoutContainer = styled.div`
  background: var(--colorT0);
  border-radius: 25px;
  height: auto;
  min-height: 500px;
  width: 900px;
  max-width: 90%;
  padding: 40px 50px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(4px);
  border: 1px solid rgba(255, 255, 255, 0.1);

  h1 {
    margin-bottom: 50px;
    text-align: center;
  }
`;
