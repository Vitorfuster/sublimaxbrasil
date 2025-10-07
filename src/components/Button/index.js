import React from "react";

import { ContainerButton } from "./style";

export function Button({ children, WidthTotal, ...rest }) {
  return <ContainerButton widthtotal={WidthTotal} {...rest}>{children}</ContainerButton>;
}
