import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background: #dbeafe; /* azul claro */
  border-radius: 16px;
  border: 1px solid #000000ff; /* borda cinza fininha como padrão */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15); /* sombra suave */
  padding: 20px;
  width: 280px; /* trava largura para evitar esticar */
  min-height: 380px;
  transition: none;
  color: #111;
  position: relative;
  overflow: visible; /* garante que o painel flutue sem afetar o tamanho */
  flex: 0 0 auto; /* evita flex parent esticar o card */
  z-index: ${(props) => (props.hasOptions ? 10 : 1)};

  &:hover {
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.18);
    /* border-color: #000; borda preta durante hover do card */
  }

  /* animação de desenho da borda no hover do card */
  &:hover > .border-draw .border-rect {
    stroke-dashoffset: 0;
  }
`;

export const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff; /* moldura branca */
  border-radius: 12px;
  margin-bottom: 16px;
  height: 230px;
  overflow: hidden;
  border: 1px solid #9ca3af; /* borda fina cinza padrão */
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.14); /* sombra suave */
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 12px;
  transition: none;
`;

export const Titulo = styled.h3`
  font-weight: 600;
  font-size: 18px;
  margin-bottom: 12px;
  color: #111;
  text-align: center;
  line-height: 1.3;
  border-bottom: 1px solid #9ca3af; /* borda fina cinza padrão */
  padding-bottom: 6px;
`;

export const Descricao = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;
  flex: 1;

  p {
    font-size: 14px;
    color: #333;
    margin: 0;
  }
`;

export const Codigo = styled.p`
  font-size: 13px;
  color: #333;

  span {
    color: #111;
    font-weight: 700;
    background: #fff;
    border: 1px solid #9ca3af; /* borda fina cinza padrão */
    padding: 2px 6px;
    border-radius: 8px;
    margin-left: 4px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  }
`;

export const Visibilidade = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  align-items: center;
  font-size: 12px;
  color: #333;

  span {
    color: #111;
    font-size: 11px;
    font-weight: 500;
    padding: 4px 8px;
    border-radius: 12px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    background: #fff;
    border: 1px solid #9ca3af; /* borda fina cinza padrão */
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  }
`;

export const Button = styled.button`
  background: #fff;
  color: #111;
  border: none;
  border-radius: 12px;
  padding: 12px 20px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: none;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12); /* sombra suave */
  border: 1px solid #000000ff; /* borda fina cinza padrão */
  width: 100%;
  position: relative; /* necessário para posicionar o SVG da borda */

  &:hover {
    background: #fff;
    transform: none;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
  }

  /* animação de desenho da borda no hover */
  &:hover .border-draw .border-rect {
    stroke-dashoffset: 0;
  }

  &:active {
    transform: translateY(0);
  }
`;

export const OptionButton = styled(Button)`
  background: #fff7ed; /* laranja bem claro para contraste suave */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12);

  &:hover {
    background: #fff7ed;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
  }
`;

export const OptionsPanel = styled.div`
  position: absolute;
  top: -5px;

  left: calc(100% + 8px);
  width: 240px;
  background: #fffdf5; /* papel claro */
  border: 1px solid #000000ff; /* borda fina cinza padrão */
  border-radius: 12px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.14);
  backdrop-filter: none;
  padding: 16px;
  z-index: 1000;

  /* animação de desenho da borda apenas para o SVG direto do painel */
  &:hover > .border-draw .border-rect {
    stroke-dashoffset: 0;
  }

  h4 {
    margin: 0 0 12px 0;
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    color: #111;
  }
`;

export const OptionItem = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px;
  border-radius: 12px;
  background: #fff;
  border: 1px solid #000000ff; /* borda fina cinza padrão */
  color: #111;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12);
  position: relative; /* necessário para posicionar o SVG da borda */

  &:hover {
    background: #fff;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
    transform: none;
  }

  /* animação de desenho da borda no hover */
  &:hover .border-draw .border-rect {
    stroke-dashoffset: 0;
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
    transition: stroke-dashoffset 600ms ease;
  }
`;

export const OptionsWrapper = styled.div`
  position: relative;
  display: block;
  width: 100%;
  margin-top: 10px; /* espaçamento entre os botões */
`;
