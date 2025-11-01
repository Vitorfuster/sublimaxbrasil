import styled from "styled-components";

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
    color: var(--colorD5);
    font-weight: 500;

    span {
      color: var(--colorT2);

      font-weight: 400;
    }
  }
  span {
    color: var(--colorT2);

    font-weight: 400;
  }

  span {
    color: var(--colorT2);

    span {
      color: #000000ff;
    }
  }
`;

export const FreeShipping = styled.p`
  display: grid;
  margin-bottom: 3px;
  color: #00d312ff;
  font-weight: 500;

  span {
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

export const Desconto = styled.div`
  display: grid;

  p {
    font-size: var(--fsMM);
    gap: 3px;
    margin-bottom: 3px;
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
  padding-bottom: 10px;
  flex-direction: column;
  gap: 5px;
  text-align: start;
  font-weight: 500;
  color: var(--colorD1a);

  span {
    &:nth-child(1) {
      /* margin-top: 5px; */
      font-size: var(--fsM);
      /* text-align: center; */
      color: var(--colorT2);
    }
  }
`;
