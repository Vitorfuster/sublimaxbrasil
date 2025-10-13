import styled from "styled-components";

// Styled base para o SVG de borda animada (padrão unificado)
export const BorderSvgBase = styled.svg`
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
  }
`;
