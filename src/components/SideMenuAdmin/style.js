import styled from "styled-components";
import { Link } from "react-router-dom";

/* BorderSvg movido para componente compartilhado em components/AnimatedBorder */

export const Container = styled.div`
  background: #fffbe6; /* amarelo claro no container geral */
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
  padding: 8px 12px;
  display: flex;
  align-items: center;
  background: ${(props) =>
    props.isEven ? "#ffe6e6ff" : "#eaf2ff"}; /* azul clarinho nos itens pares */
  border-radius: 12px;
  margin: 12px;
  transition: all 0.3s ease;
  position: relative;
  border: 1px solid #000000ff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12);
  overflow: visible;

  &:hover {
    background: ${(props) =>
      props.isEven ? "#eaf2ff" : "#fff"}; /* mantém a cor no hover */
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
  }

  &:hover > .border-draw .border-rect {
    stroke-dashoffset: 0;
  }

  .icon {
    color: #000;
  }
`;

export const ListLink = styled(Link)`
  font-size: 14px;
  padding: 5px 5px;
  width: 100%;
  line-height: 19px;
  color: #000;
  text-decoration: none;
  font-weight: 600;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  transition: all 0.3s ease;

  &:hover {
    color: #222;
  }
`;
