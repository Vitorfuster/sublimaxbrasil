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
  @media (max-width: 500px) {
    padding-right: 0px;
    padding-left: 0px;
  }
`;

export const ModalBox = styled.div`
  background: white;
  display: grid;
  width: 100%;
  max-width: 900px;
  padding: 20px;
  border-radius: 10px;
  gap: 20px;
  padding-bottom: 20px;

  @media (max-width: 500px) {
    gap: 5px;
    border-radius: 0px;
  }

  @media (max-width: 380px) {
    padding: 0px;
    padding-bottom: 10px;
    gap: 5px;
  }
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

  @media (max-width: 380px) {
    padding: 10px;
  }
`;

export const CepContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  padding-left: 20px;
  align-items: center;

  a {
    font-size: var(--fsM);
    color: var(--colorD1);
    font-weight: 450;
  }

  @media (max-width: 600px) {
    display: grid;
    padding-bottom: 8px;
  }

  @media (max-width: 380px) {
    padding-left: 0px;
    padding-bottom: 5px;
    gap: 5px;

    a {
      padding-left: 15px;
    }
  }
`;

export const FindCepContainer = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  width: 100%;
  align-items: center;
  gap: 12px;
  height: 45px;
  input {
    font-size: var(--fsMM);
    padding: 5px;
    font-weight: 500;
    height: 95%;
  }

  button {
    height: 100%;
    @media (max-width: 1200px) {
      font-size: var(--fsMM);
    }
  }

  @media (max-width: 570px) {
    grid-template-columns: 3fr 1fr;
    height: 100%;

    button {
      width: 100%;
    }
  }

  @media (max-width: 380px) {
    padding: 10px;
    justify-content: start;
  }
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;

  button {
    margin-bottom: -5px;
    padding: 0px;
    padding-right: 5px;
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
  padding: 0px 20px 20px 20px;
  margin-bottom: 5px;
  font-weight: 450;
  text-align: center;
  font-size: var(--fsM);

  .frete {
    &:nth-child(odd) {
      background-color: #f5f5f5ff;
    }
  }

  @media (max-width: 700px) {
    padding: 5px 0px 5px 0px;
    font-size: var(--fsM);
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

  @media (max-width: 700px) {
    margin-bottom: 0px;
  }

  @media (max-width: 450px) {
    /* font-size: var(--fsP); */
  }
`;

export const Frete = styled.label`
  padding: 20px 5px;
  display: grid;
  align-items: center;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  justify-content: center;
  @media (max-width: 700px) {
    padding: 10px 8px;
  }

  @media (max-width: 550px) {
    gap: 0px;
  }

  @media (max-width: 450px) {
    /* font-size: var(--fsPP); */
  }
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
    height: 20px;
    width: 15px;
    border-radius: 0px;
  }

  @media (max-width: 600px) {
    img {
      max-height: 15px;
    }

    input {
      height: 15px;
      width: 12px;
      border-radius: 0px;
    }
  }

  @media (max-width: 500px) {
    img {
      max-height: 12px;
    }

    input {
      height: 12px;
      width: 10px;
      border-radius: 0px;
    }
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

  @media (max-width: 600px) {
    gap: 4px;
    button {
      padding: 2px 6px;

      p {
        display: grid;
        gap: 5px;
        div {
          display: flex;
          align-items: center;
          gap: 2px;
        }
      }
    }
  }

  @media (max-width: 380px) {
    padding-left: 10px;
  }
`;

export const FreteFooter = styled.div`
  display: flex;
  gap: 10px;
  justify-content: space-between;
  align-items: end;

  padding-right: 10px;

  @media (max-width: 380px) {
    padding-right: 10px;
  }

  @media (max-width: 350px) {
    display: grid;
    justify-content: unset;
  }
`;

export const ButtonOkContainer = styled.div`
  display: grid;
  justify-content: end;

  button {
    @media (max-width: 700px) {
      max-width: 150px;
      max-height: 50px;
    }

    @media (max-width: 450px) {
      max-width: 100px;
      max-height: 50px;
    }

    @media (max-width: 380px) {
      max-width: 120px;
      max-height: 50px;
    }

    @media (max-width: 350px) {
      max-width: 200px;
      max-height: 50px;
    }
  }

  @media (max-width: 350px) {
    justify-content: center;
  }
`;
