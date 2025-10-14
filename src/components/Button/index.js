import React from "react";
import AnimatedBorder from "../AnimatedBorder";
import { ContainerButton } from "./style";

export function Button({ children, rx = 12, ry = 12, ...rest }) {
  return (
    <ContainerButton {...rest}>
      <AnimatedBorder rx={rx} ry={ry} />
      {children}
    </ContainerButton>
  );
}
