import styled from "styled-components";

export const ContainerButton = styled.button`
  width: ${(props) => (props.WidthTotal ? "100%" : "182px")};
  height: 36px;
  background-color: #0c0042ff;
  border-radius: 20px;
  border: none;
  cursor: pointer;

  font-weight: 500;
  color: #fff;
  font-size: 16px;
  letter-spacing: 0%;
  text-align: center;

  &:hover {
    opacity: 0.8;
  }

  &:active {
    opacity: 0.6;
  }
`;
