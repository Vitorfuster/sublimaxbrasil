import styled, { keyframes } from "styled-components";

import CupomBackground from "../../../../assets/CupomBackground.png";

export const FreteContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 13px;
  margin-top: 10px;
  margin-bottom: 20px;
`;

export const FreeShippingPrice = styled.p`
  align-self: self-start;
  padding: 4px 8px;
  border-radius: 8px;
  background-color: var(--colorD5);
  font-size: var(--fsP);
  font-weight: 500;
  color: var(--colorT0);
`;

export const FastShipping = styled.div`
  p {
    margin-bottom: 3px;
    font-size: var(--fsMM);

    color: var(--colorD5);
    font-weight: 500;

    span {
      font-size: var(--fsMM);

      color: var(--colorT2);

      font-weight: 400;
    }
  }
  span {
    font-size: var(--fsM);
    color: var(--colorT2);
    font-weight: 400;
  }

  span {
    color: var(--colorT2);

    span {
      color: var(--colorT1);
    }
  }
`;

export const FreeShipping = styled.p`
  display: grid;
  font-size: var(--fsMM);
  margin-bottom: 3px;
  color: #00d312ff;
  font-weight: 500;
  gap: 5px;

  span {
    font-size: var(--fsM);
    color: var(--colorD1);
    font-weight: 450;
  }
`;

export const EnvioBrasil = styled.p`
  display: grid;
  gap: 3px;
  color: var(--colorT2);
  font-size: var(--fsMM);
  font-weight: 450;

  span {
    font-size: var(--fsM);
    margin-bottom: 3px;
    color: var(--colorT4);
    font-weight: 400;
  }
`;

const dots = keyframes`
  0% {
    content: " ";
  }
  25% {
    content: ".";
  }
  50% {
    content: "..";
  }
  75% {
    content: "...";
  }

   100% {
    content: "....";
  }
`;

export const Desconto = styled.div`
  display: grid;
  gap: 8px;

  p {
    font-size: var(--fsMM);
    gap: 3px;
    color: var(--colorD5);
    font-weight: 500;

    ${(props) =>
      props.freteGratis &&
      "border: 2px solid var(--colorD5); text-align: center; padding: 3px 0px; color: var(--colorD5); border-radius: 15px;"}

    ${(props) =>
      props.onlyDiscount && "text-align: start; color: var(--colorD1a); "}
  }

  ${(props) =>
    props.onlyDiscount &&
    " text-align: center; padding: 3px 6px; color: var(--colorD1a); border-radius: 15px; "}

  .loadingText {
    position: relative;
    font-weight: bold;
    color: #333;
    &::after {
      content: "";
      animation: ${dots} 2s steps(1, end) infinite;
    }
  }
`;

export const FreteCalculate = styled.span`
  font-size: var(--fsM);
  color: var(--colorD1);
  font-weight: 450;
  text-align: start;
  &:hover {
    cursor: pointer;
  }
`;

export const DiscountValues = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  text-align: start;
  font-weight: 700;
  margin-bottom: -8px;
  color: var(--colorD1a);

  span {
    /* margin-top: 5px; */
    font-size: var(--fsM);
    /* text-align: center; */
    color: var(--colorT2);

    span {
      color: ${(props) =>
        props.freteGratis === true ? "var(--colorD5);" : "var(--colorT1);"};
    }
  }
`;

export const CupomImgContainer = styled.div`
  background-image: url(${CupomBackground});
  /* background-size: cover; */
  background-size: 100% 100%;
  background-repeat: no-repeat;
  min-height: 70px;
  max-width: 200px;
  align-self: self-start;
  padding: 10px 18px;
  margin-top: -3px;

  @media (max-width: 1200px) {
    max-width: 180px;
  }
`;

export const CupomText = styled.div`
  /* background-color: black; */
  color: var(--colorT1);
  p {
    color: #c47611ff;
    text-align: center;
    font-weight: 900;
    font-size: var(--FsM);

    /* background-color: purple; */
  }

  .gradeCupom {
    gap: 8px;
    height: 100%;
    /* background-color: red; */
    align-items: center;
    display: grid;
  }

  @media (max-width: 1200px) {
    p {
      font-size: var(--FsG);
      /* background-color: purple; */
    }
  }
`;

export const CupomTextInfo = styled.div`
  font-size: var(--fsM);

  gap: 8px;
  display: flex;
  height: 100%;

  @media (max-width: 1200px) {
    font-size: var(--fsMM);
  }
  span {
    &:nth-child(1) {
      /* background-color: yellow; */
      text-align: center;
      font-size: var(--fsP);
      @media (max-width: 1200px) {
        font-size: var(--fsM);
      }
    }

    &:nth-child(2) {
      /* background-color: green; */
      font-size: var(--fsP);

      text-align: start;
      font-weight: 700;
      color: #000;
      white-space: nowrap;
      align-self: center;
      @media (max-width: 1200px) {
        font-size: var(--fsM);
      }
    }
  }
`;
