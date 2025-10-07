import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
* {
  margin: 0px;
  padding: 0px;
  box-sizing: border-box;
  font-family: "Roboto", sans-serif;
   outline: none;
}

img {
  max-width: 100%
}

ul {
  list-style: none;
  margin: 0px;
}
`;
