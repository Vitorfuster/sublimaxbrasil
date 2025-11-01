// Bibliotecas
import React from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form"; // Biblioteca de formulários

//  Estilos
import { Container, Label, Input } from "./style";

//  Componentes
import { ButtonClean } from "../../../../../components";

function UserInfo() {
  // Biblioteca de validação
  const schema = Yup.object().shape({
    email: Yup.string()
      .required("O e-mail é obrigatório")
      .email("Digite um e-mail válido"),
    // password: Yup.string()
    //   .required("A senha é obrigatória")
    //   .min(6, "A senha deve ter no minimo 6 digitos"),
  });

  // Bibiblioteca de formulários
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (form) => {
    console.log(form);
  };

  return (
    <Container>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <Label>Email</Label>
        <Input
          type="email"
          {...register("email")}
          error={errors.email?.message}
          placeholder="Digite seu email"
        />
        <ButtonClean onSubmit="submit">Enviar</ButtonClean>
      </form>
    </Container>
  );
}

export default UserInfo;
