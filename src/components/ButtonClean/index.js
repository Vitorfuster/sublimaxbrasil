import React from "react";
import { ButtonContainer } from "./style";

export function ButtonClean({ children, ...rest }) {
  return <ButtonContainer {...rest}>{children}</ButtonContainer>;
}
