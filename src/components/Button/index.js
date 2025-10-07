import React from "react";

import { ContainerButton } from "./style";

export function Button({ children, ...rest }) {
  return <ContainerButton {...rest}>{children}</ContainerButton>;
}
