import React from "react";
import styled from "styled-components";

import { BorderSvgBase } from "./style";

/**
 * AnimatedBorder
 * Componente reutilizável para desenhar a borda animada.
 * - Usa classes "border-draw" e "border-rect" para permitir animações via CSS dos containers.
 * - Se a prop `active` for definida (true/false), controla o strokeDashoffset inline.
 *   Caso contrário, deixa o controle para o CSS externo (hover/focus dos wrappers).
 */
const AnimatedBorder = ({
  rx = 12,
  ry = 12,
  className = "",
  active,
  ...rest
}) => {
  const styleRect =
    typeof active === "undefined"
      ? undefined
      : { strokeDashoffset: active ? 0 : 2000 };

  return (
    <BorderSvgBase
      className={`border-draw ${className}`}
      preserveAspectRatio="none"
      {...rest}
    >
      <rect
        x="0"
        y="0"
        width="100%"
        height="100%"
        rx={rx}
        ry={ry}
        className="border-rect"
        style={styleRect}
      />
    </BorderSvgBase>
  );
};

export default AnimatedBorder;
