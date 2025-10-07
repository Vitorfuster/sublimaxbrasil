// Bibliotecas
import React from "react";

// Estilos
import { Container, ContainerItens, Label, Input, SignInLink } from "./style";

// Componentes
import { Button } from "../../components";

export function Login() {
  return (
    <Container>
      <ContainerItens>
        <h1>Entrar</h1>
        <form>
          <Label>Email</Label>
          <Input type="email"></Input>

          <Label>Senha</Label>
          <Input type="password"></Input>

          <Button WidthTotal={true} style={{ marginTop: 40, marginBottom: 10 }}>
            Entrar
          </Button>
        </form>

        <SignInLink>
          Não possui conta? <a style={{ color: "white" }}>Cadastrar</a>
        </SignInLink>
      </ContainerItens>
    </Container>
  );
}
