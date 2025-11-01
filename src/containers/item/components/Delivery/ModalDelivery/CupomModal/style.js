import styled from "styled-components";

export const Over = styled.div`
  position: fixed;
  inset: 0;
  padding-right: 20px;
  padding-left: 20px;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.62);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
`;

export const ModalBox = styled.div`
  background: white;
  display: grid;
  width: 100%;
  max-width: 700px;
  padding: 20px;
  border-radius: 10px;
  gap: 20px;
  padding-bottom: 50px;
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

export const TitleCupons = styled.h1`
  font-size: var(--fsX);
  text-align: center;
`;

export const CuponsContainer = styled.div`
  justify-self: center;
  display: grid;
  max-width: 600px;
  border: 1px solid var(--colorT2);
  align-self: flex-start;
  padding: 15px;
  background-color: #dbeafe;
  gap: 15px;
`;

export const Cupom = styled.div`
  display: grid;
  gap: 15px;
  justify-self: start;
  border: 2px solid #004906ff;
  border-radius: 15px;
  background-color: #edffe3ff;
  padding: 8px;
  &:hover {
    box-sizing: border-box;
    background-color: #c2ffa1ff;
    cursor: pointer;
  }

  ${(props) =>
    props.situation &&
    "background: #ffe3e3ff;  border: 2px solid #c20000ff;  &:hover {background: #ffd3d3ff;};"}
`;

export const CupomContent = styled.div`
  display: grid;
  grid-template-columns: 50px 400px auto;
  align-items: center;
  font-size: var(--fsG);
`;

export const CuponConditions = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;

  p {
    font-size: var(--fsMM);
    font-weight: 500;
  }
`;

export const CardCondition = styled.div`
  span {
    font-size: var(--fsMM);

    padding: 2px 4px;
    border-radius: 8px;

    ${(props) =>
      props.isValid
        ? "color: #004906ff; border: 2px solid #004906ff; background: #b1ffb7ff;"
        : "color: #c20000ff; border: 2px solid #c20000ff; background: #ffb1b1ff;"}
  }
`;

export const CuponIcon = styled.p`
  font-size: var(--fsX);
  padding-right: 15px;
`;

export const CupomName = styled.p`
  padding-right: 15px;
`;

export const CupomPrice = styled.p`
  justify-self: end;
  font-weight: 700;
  color: #000000ff;
`;

export const CupomInfo = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  font-size: var(--fsM);
  color: var(--colorT3);
  font-weight: 450;
`;

export const CupomQuantity = styled.span``;

export const CupomExpires = styled.span`
  display: flex;
  .infinityIcon {
    margin-left: 5px;
    align-self: center;
    height: 20px;
    width: 20px;
  }
`;
