import styled from "styled-components";

export const ContainerButton = styled.button`
  width: ${(props) => (props.widthTotal ? "100%" : "182px")};
  height: 40px;
  background: #fff;
  border-radius: 12px;
  border: 1px solid #000000ff;
  cursor: pointer;
  position: relative;
  overflow: hidden; /* necessário para clipar o stroke da borda animada */

  font-weight: 600;
  color: #111;
  font-size: 16px;
  letter-spacing: 0.2px;
  text-align: center;

  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0 16px;

  /* animação de desenho da borda no hover */
  &:hover > .border-draw .border-rect {
    stroke-dashoffset: 0;
    stroke-width: 3px;
  }

  &:active {
    opacity: 0.9;
  }
`;
