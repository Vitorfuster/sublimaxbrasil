// Bibliotecas
import React from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form"; // Biblioteca de formulários
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

// Estilos
import { Container, ContainerItens, Label, Input, SignInLink } from "./style";

// Apis
import api from "../../../../../../../../services/api";

// Componentes
import { Button } from "../../../../../../../../components";
import { ErroMessage } from "../../../../../../../../components";

import { useUser } from "../../../../../../../../hooks/UserContext";

export function Login({ renderPage, onClose, userModalLog }) {
  const navigate = useNavigate();
  const { putUserData } = useUser();

  // Biblioteca de validação
  const schema = Yup.object().shape({
    email: Yup.string()
      .required("O e-mail é obrigatório")
      .email("Digite um e-mail válido"),
    password: Yup.string()
      .required("A senha é obrigatória")
      .min(6, "A senha deve ter no minimo 6 digitos"),
  });

  // Bibiblioteca de formulários
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (clientData) => {
    // console.log(clientData);
    try {
      const { data } = await toast.promise(
        api.post("sessions", {
          email: clientData.email,
          password: clientData.password,
        }),
        {
          pending: "Vereficando seus dados",
          success: "Seja bem-vindo(a)",
          error: "Verefique seu e-mail e senha",
        }
      );

      putUserData(data); // chama a função importada de useContext com os dados do usuário
      // setTimeout serve para esperar um tempo para executar seu conteúdo

      setTimeout(() => {
        userModalLog();
        onClose();
      }, 1000);
    } catch (error) {
      console.log(error.response.data.error);
    }
  };

  return (
    <Container>
      <ContainerItens>
        <h1>Sublimax Brasil</h1>
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <Label>Email</Label>
          <Input
            type="email"
            {...register("email")}
            error={errors.email?.message}
            placeholder="Digite seu email"
          />
          <ErroMessage>{errors.email?.message}</ErroMessage>

          <Label>Senha</Label>
          <Input
            type="password"
            {...register("password")}
            error={errors.password?.message}
            placeholder="Digite sua senha"
          />
          <ErroMessage>{errors.password?.message}</ErroMessage>
          <Button
            WidthTotal="true"
            style={{
              marginTop: 40,
              marginBottom: 20,
              height: "50px",
              borderRadius: "8px",
              fontSize: "16px",
              fontWeight: "600",
              backgroundColor: "#1a56db",
              transition: "background-color 0.3s ease",
            }}
          >
            Entrar
          </Button>
        </form>

        <SignInLink>
          Não possui conta?{" "}
          <Link
            onClick={() => {
              renderPage(2);
            }}
          >
            Cadastrar
          </Link>
        </SignInLink>
      </ContainerItens>
    </Container>
  );
}
