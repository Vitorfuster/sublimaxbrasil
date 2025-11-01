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

export function Register({ renderPage, onClose, userModalLog }) {
  const navigate = useNavigate();
  const { putUserData } = useUser();

  // Bibilioteca de validação
  const schema = Yup.object().shape({
    name: Yup.string().required("O nome é obrigatório"),
    email: Yup.string()
      .required("O e-mail é obrigatório")
      .email("Digite um e-mail válido"),
    password: Yup.string()
      .required("A senha é obrigatória")
      .min(6, "A senha deve ter no minimo 6 digitos"),

    confirmPassword: Yup.string()
      .required("A senha é obrigatória")
      .oneOf([Yup.ref("password")], "As senhas devem ser iguais"),
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
    try {
      await api.post("users", {
        name: clientData.name,
        email: clientData.email,
        password: clientData.password,
      });
      toast.success("Cadastro criado com sucesso");

      const { data } = await api.post("sessions", {
        email: clientData.email,
        password: clientData.password,
      });

      putUserData(data);

      setTimeout(() => {
        userModalLog();
        onClose();
      }, 1000);
    } catch (error) {
      if (error.response.data.error) {
        toast.error(error.response.data.error);
      } else {
        toast.error("Falha no sistema! tente novamente");
      }
    }
  };

  return (
    <Container>
      <ContainerItens>
        <h1>Sublimax Brasil</h1>
        <h2>Criar conta</h2>
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <Label error={errors.name?.message}>Nome</Label>
          <Input
            type="text"
            {...register("name")}
            error={errors.name?.message}
            placeholder="Digite seu nome"
          />
          <ErroMessage>{errors.name?.message}</ErroMessage>

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

          <Label error={errors.confirmPassword?.message}>Confirmar senha</Label>
          <Input
            type="password"
            {...register("confirmPassword")}
            error={errors.confirmPassword?.message}
            placeholder="Confirme sua senha"
          />
          <ErroMessage>{errors.confirmPassword?.message}</ErroMessage>

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
            Criar conta
          </Button>
        </form>

        <SignInLink>
          Já possui conta?{" "}
          <Link
            onClick={() => {
              renderPage(1);
            }}
          >
            Entrar
          </Link>
        </SignInLink>
      </ContainerItens>
    </Container>
  );
}
