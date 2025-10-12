import styled from "styled-components";
import { Link } from "react-router-dom";

export const BorderSvg = styled.svg`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 2;

  .border-rect {
    fill: none;
    stroke: transparent; /* sem borda por padrão */
    stroke-width: 2px;
    stroke-dasharray: 1000;
    stroke-dashoffset: 1000;
    transition: stroke-dashoffset 600ms ease;
  }
`;

export const Container = styled.div`
  background: #fff;
  box-shadow: 0px 6px 16px rgba(0, 0, 0, 0.12);
  width: 300px;
  top: 0;
  left: 0;
  min-height: 100vh;
  position: relative;
  backdrop-filter: none;
  border: 1px solid #000;
  transition: all 0.3s ease;

  hr {
    margin: 30px 15px;
    border: none;
    height: 1px;
    background: rgba(0, 0, 0, 0.12);
  }

  @media (max-width: 768px) {
    width: 250px;
  }

  @media (max-width: 480px) {
    width: 220px;
  }
`;

export const ItemContainer = styled.div`
  min-height: 50px;
  padding: 12px;
  display: flex;
  align-items: center;
  gap: 10px;
  background: #fff;
  border-radius: 12px;
  margin: 12px;
  transition: all 0.3s ease;
  position: relative;
  border: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12);
  overflow: visible;

  &:hover {
    background: #fff;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
    border-color: transparent; /* evita borda dupla com o SVG durante animação */
  }

  &:hover > .border-draw .border-rect {
    stroke: #000; /* mostra borda somente no hover */
    stroke-dashoffset: 0;
  }

  .icon {
    color: #000;
  }
`;

export const ListLink = styled(Link)`
  font-size: 1rem;
  padding: 15px 10px;
  width: 100%;
  line-height: 19px;
  color: #000;
  text-decoration: none;
  margin-left: 5px;
  font-weight: 600;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  transition: all 0.3s ease;

  &:hover {
    color: #222;
  }
`;
