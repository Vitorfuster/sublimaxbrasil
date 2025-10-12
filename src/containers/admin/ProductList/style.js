import styled from "styled-components";

export const Container = styled.div`
  min-height: calc(100vh - 70px);
  padding: 20px 20px 0px 20px;
  max-height: 100%;
  color: #111;
`;

export const Title = styled.h2`
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 20px;
  color: #111;
  text-align: center;
`;

export const Header = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  position: relative;
  background: #ffeaf1; /* rosa claro */
  border-radius: 12px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.14);
  padding: 25px;
  margin-bottom: 20px;
  border: 1px solid #000000ff;
  overflow: hidden; /* garante cantos realmente arredondados para o SVG */

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  &:hover > .border-draw .border-rect {
    stroke-dashoffset: 0;
    stroke-width: 4px;
  }
`;

export const FilterDiv = styled.div`
  display: flex;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 15px;
  }

  p {
    font-size: 16px;
    color: #111;
    margin-bottom: 8px;
    font-weight: 500;
  }
`;

export const SelectContainer = styled.div`
  width: 100%;
  min-width: 200px;
`;

export const SelectWrap = styled.div`
  position: relative;
  width: 100%;
  border-radius: 12px;
  overflow: hidden; /* clipa o stroke do SVG nos cantos */

  &:hover > .border-draw .border-rect {
    stroke-dashoffset: 0;
    stroke-width: 5px;
  }
`;

export const BuscaDiv = styled.div`
  display: flex;
  justify-content: flex-end;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

export const Pesquisar = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 450px;

  p {
    font-size: 16px;
    margin-bottom: 8px;
    color: #111;
    font-weight: 500;
  }
`;

export const InputWrap = styled.div`
  position: relative;
  flex: 1;
  border-radius: 12px;
  overflow: hidden; /* clipa o stroke do SVG nos cantos */

  &:hover > .border-draw .border-rect {
    stroke-dashoffset: 0;
    stroke-width: 5px;
  }
`;

export const BarraPesquisa = styled.div`
  display: flex;
  align-items: center;
  width: 100%;

  input {
    font-size: 16px;
    padding: 12px 15px;
    width: 100%;
    background-color: #fff;
    color: #111;
    border: 1px solid #000; /* borda padrão preta de 1px */
    border-radius: 12px;
    outline: none;
    transition: background-color 0.3s ease;

    &::placeholder {
      color: #888;
    }

    &:focus {
      background-color: #f9f9f9;
    }
  }

  button {
    min-width: 50px;
    height: 100%;
    padding: 12px 15px;
    background-color: rgba(26, 86, 219, 0.7);
    color: #fff;
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-left: none;
    border-radius: 0 8px 8px 0;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      background-color: rgba(26, 86, 219, 0.9);
    }

    i {
      font-size: 16px;
    }
  }

  @media (max-width: 768px) {
    input {
      padding: 10px;
    }

    button {
      padding: 10px;
    }
  }

  @media (max-width: 480px) {
    input {
      padding: 8px;
    }

    button {
      padding: 8px;
      min-width: 40px;
    }
  }
`;

export const ContainerItems = styled.div`
  display: flex;
  height: 100%;
  gap: 20px;
  position: relative;
  padding: 16px;
  border-radius: 16px;
  border: 1px solid #000000ff;
  background: #fff;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.14);
  overflow: hidden; /* clipa o stroke do SVG nos cantos */

  &:hover > .border-draw .border-rect {
    stroke-dashoffset: 0;
    stroke-width: 3px;
  }
`;

export const BorderSvg = styled.svg`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 2;

  .border-rect {
    fill: none;
    stroke: #000;
    stroke-width: 3px;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-dasharray: 2000;
    stroke-dashoffset: 2000;
    transition: stroke-dashoffset 1000ms ease;
    vector-effect: non-scaling-stroke; /* mantém espessura do traço consistente */
  }
`;
