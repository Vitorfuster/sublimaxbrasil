import styled from "styled-components";

export const Over = styled.div`
  position: fixed;
  inset: 0;
  padding-right: 20px;
  padding-left: 20px;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
`;

export const ModalBox = styled.div`
  background: white;
  display: grid;
  width: 100%;
  max-width: 900px;
  padding: 20px;
  border-radius: 10px;
  gap: 20px;
  padding-bottom: 50px;
`;

export const CepTitle = styled.p`
  display: grid;
  gap: 3px;
  color: var(--colorT2);
  font-size: var(--fsMM);
  font-weight: 450;
  padding-bottom: 20px;

  span {
    font-size: var(--fsM);
    margin-bottom: 3px;
    color: var(--colorT4);
    font-weight: 400;
  }
`;

export const CepContainer = styled.div`
  display: flex;
  gap: 15px;
  padding-left: 20px;

  align-items: center;
  input {
    font-size: var(--fsMM);
    padding: 5px;
    font-weight: 500;
    height: 100%;
  }

  button {
    height: 100%;
  }

  a {
    font-size: var(--fsM);
    color: var(--colorD1);
    font-weight: 450;
  }

  /* .ok {
    background-color: var(--colorD1);
    opacity: 0.5;

    &:hover {
      background-color: var(--colorD1);
      opacity: 1;
    }
  } */
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;

  button {
    margin-bottom: -5px;
    padding: 0px;
    background: none;
    border: none;
    font-size: var(--fsX);
    color: #0082aaff;
    cursor: pointer;
  }
`;

export const CepResponse = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 20px;
  font-weight: 450;
  text-align: center;

  .frete {
    &:nth-child(odd) {
      background-color: #f5f5f5ff;
    }
  }
`;

export const HeaderFrete = styled.div`
  padding-left: 20px;
  padding-right: 20px;

  margin-bottom: 20px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  text-align: center;
  font-size: var(--fsMM);
  font-weight: 500;
`;

export const Frete = styled.label`
  padding: 20px 0px;
  display: grid;
  align-items: center;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  justify-content: center;
`;

export const FreteSelected = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  background-color: none;

  img {
    max-height: 20px;
    margin-top: -5px;
  }

  input {
    background-color: red;
    height: 20px;
    width: 15px;
    border-radius: 0px;
  }
`;

export const CupomContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  padding-left: 20px;

  p {
    font-size: var(--fsG);
    font-weight: 500;
  }

  button {
    background: none;
    border: 2px solid var(--colorT4);
    font-size: var(--fsM);
    padding: 5px 10px;
    border-radius: 5px;
    color: var(--colorT4);

    p {
      display: grid;
      gap: 10px;
      div {
        display: flex;
        align-items: center;
        gap: 5px;
      }
    }

    &:hover {
      border: 2px solid green;
      cursor: pointer;
    }

    ${(props) =>
      props.cupom &&
      "border: 2px solid var(--colorD5); color: var(--colorD5); background: #e7ffe9ff"}
  }
`;

export const FreteFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: end;
`;
