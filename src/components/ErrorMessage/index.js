import React from "react";

import { ErrorMensage } from "./style";
import PropTypes from "prop-types";

export function ErroMessage({ children }) {
  return <ErrorMensage>{children}</ErrorMensage>;
}

ErroMessage.propTypes = {
  children: PropTypes.string.isRequired,
};
