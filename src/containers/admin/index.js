import React from "react";

import { useParams, useLocation } from "react-router-dom";

import { Container, ContainerItems } from "./style";
import { SideMenuAdmin } from "../../components";
import paths from "../../constants/paths";
import NewProducts from "./NewProducts";

export function Admin() {
  const params = useParams();
  const { pathname } = useLocation();
  return (
    <Container>
      <SideMenuAdmin pathname={pathname} />
      <ContainerItems>
        {paths.NewProducts === pathname && <NewProducts />}
      </ContainerItems>
    </Container>
  );
}
