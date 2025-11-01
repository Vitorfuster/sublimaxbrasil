import styled from "styled-components";

export const ButtonContainer = styled.button`
  padding: 15px 10px;
  width: ${(props) => (props.widthTotal ? "100%" : "182px")};
  font-size: var(--fsM);
  text-align: center;
  border-radius: 10px;
  background-color: var(--colorD1);
  color: #fff;
  border: none;
  cursor: pointer;

  ${(props) =>
    props.ButtonOp
      ? "background-color: var(--colorD2a); color: var(--colorD1); font-weight: 500; &:hover {background-color: var(--colorD2b); }"
      : "background-color: var(--colorD1); color: #fff; &:hover {background-color: var(--colorD1a);}"}
  ${(props) =>
    props.disabled &&
    "background-color: #0098fd7e; &:hover {background-color: #0098fd7e; cursor: initial;}"};

  ${(props) =>
    props.Opacity && "opacity: 0.4; &:hover {background: var(--colorD1)}"};
`;
