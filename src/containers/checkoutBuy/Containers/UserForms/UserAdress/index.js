import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form"; // Biblioteca de formulários
import axios from "axios";

//  Estilos
import {
  Container,
  Label,
  Input,
  PhoneContainer,
  Field,
  ButtonContainer,
} from "./style";

//  Componentes
import { ButtonClean } from "../../../../../components";

function UserAdress() {
  // Biblioteca de validação
  const schema = Yup.object().shape({
    phone: Yup.string().required("O telefone é obrigatório"),
    cpf: Yup.string().required("O CPF é obrigatório"),
  });

  const brasilianStates = [
    { state: "Acre", value: "AC" },
    { state: "Alagoas", value: "AL" },
    { state: "Amapá", value: "AP" },
    { state: "Amazonas", value: "AM" },
    { state: "Bahia", value: "BA" },
    { state: "Ceará", value: "CE" },
    { state: "Distrito Federal", value: "DF" },
    { state: "Espírito Santo", value: "ES" },
    { state: "Goiás", value: "GO" },
    { state: "Maranhão", value: "MA" },
    { state: "Mato Grosso", value: "MT" },
    { state: "Mato Grosso do Sul", value: "MS" },
    { state: "Minas Gerais", value: "MG" },
    { state: "Pará", value: "PA" },
    { state: "Paraíba", value: "PB" },
    { state: "Paraná", value: "PR" },
    { state: "Pernambuco", value: "PE" },
    { state: "Piauí", value: "PI" },
    { state: "Rio de Janeiro", value: "RJ" },
    { state: "Rio Grande do Norte", value: "RN" },
    { state: "Rio Grande do Sul", value: "RS" },
    { state: "Rondônia", value: "RO" },
    { state: "Roraima", value: "RR" },
    { state: "Santa Catarina", value: "SC" },
    { state: "São Paulo", value: "SP" },
    { state: "Sergipe", value: "SE" },
    { state: "Tocantins", value: "TO" },
  ];

  const [cities, setCities] = useState();

  // Bibiblioteca de formulários
  const {
    register,
    handleSubmit,
    getValues,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (form) => {
    console.log(form);
  };

  const handleExternalSubmit = async () => {
    const valid = await trigger(); // <- força o Yup a validar tudo

    if (valid) {
      const values = getValues(); // <- pega os dados validados
      console.log("Enviado pelo botão externo:", values);
      // aqui você pode enviar os dados manualmente, chamar uma API etc
    } else {
      console.log("❌ Campos inválidos, verifique os erros!");
    }
  };

  const stateSelected = async (state) => {
    try {
      const citiesResponse = await axios.get(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${state}/municipios`
      );
      const citiesNames = citiesResponse.data.map((c) => c.nome); // retorna só os nomes das cidades
      setCities(citiesNames);
    } catch (err) {
      console.error("Erro ao buscar cidades:", err);
    }
  };
  console.log(cities);
  return (
    <Container>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <Field className="cep">
          <Label>CEP</Label>
          <Input
            {...register("cep")}
            error={errors.cep?.message}
            placeholder="00000-000"
          />
        </Field>

        <Field>
          <Label>Estado</Label>
          <select
            {...register("state")}
            error={errors.state?.message}
            placeholder="000.000.000-00"
          >
            {" "}
            {brasilianStates.map((state, index) => (
              <option key={index}>{state.state}</option>
            ))}
          </select>
        </Field>

        <Field>
          <Label>Cidade</Label>
          <select
            {...register("city")}
            error={errors.city?.message}
            placeholder="000.000.000-00"
          >
            {" "}
            {cities &&
              cities.map((city, index) => <option key={index}>{city}</option>)}
          </select>
        </Field>

        <Field>
          <Label>Bairro</Label>
          <Input
            {...register("district")}
            error={errors.district?.message}
            placeholder="00000-000"
          />
        </Field>

        <Field>
          <Label>Numero</Label>
          <Input
            {...register("number")}
            error={errors.number?.message}
            placeholder="00000-000"
          />
        </Field>

        <Field className="complement">
          <Label>Complemento</Label>
          <Input
            {...register("complement")}
            error={errors.complement?.message}
            placeholder="00000-000"
          />
        </Field>

        {/* <ButtonContainer>
              <ButtonClean onSubmit="submit">Enviar</ButtonClean>
            </ButtonContainer> */}
      </form>
      {/* <button
        onClick={() => {
          stateSelected("SP");
        }}
      >
        Ver cidades
      </button> */}
      {/* <ButtonClean onClick={handleExternalSubmit}>Sem</ButtonClean> */}
    </Container>
  );
}

export default UserAdress;
