import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form"; // Biblioteca de formulários
import axios from "axios";

//  Estilos
import { Container, Label, Input, Field, Select } from "./style";
import { toast } from "react-toastify";

function UserAdress({ submitButton, responseSubmit, submitButtonResponse }) {
  // Biblioteca de validação
  const schema = Yup.object().shape({
    cep: Yup.string().required("O CEP é obrigatório"),
    state: Yup.string().min(2).required("Selecione seu estado"),
    city: Yup.string().min(2).required("Selecione sua cidade"),
    district: Yup.string().required("Selecione seu bairro"),
    number: Yup.string().required("Informe o número do endereço"),
    complement: Yup.string().required("Informe o complemento"),
  });

  // Estados brasileiros
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
  const [cep, setCep] = useState();

  // Bibiblioteca de formulários
  const {
    register,
    handleSubmit,
    getValues,
    trigger,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // Mapear selects
  const stateSelected = watch("state"); // nome do campo
  const citySelected = watch("city"); // nome do campo

  const onSubmit = (form) => {
    console.log(form);
  };

  // Enviar dados para o componente principal
  useEffect(() => {
    if (submitButton === 1) {
      const handleExternalSubmit = async () => {
        const valid = await trigger(); // <- força o Yup a validar tudo

        if (valid) {
          const values = getValues(); // <- pega os dados validados
          // aqui você pode enviar os dados manualmente, chamar uma API etc
          responseSubmit(values);
        } else {
          submitButtonResponse(0);
        }
      };

      handleExternalSubmit();
    }
  }, [submitButton]);

  useEffect(() => {
    if (stateSelected !== "") {
      const findCities = async () => {
        try {
          const citiesResponse = await axios.get(
            `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${stateSelected}/municipios`
          );
          const citiesNames = citiesResponse.data.map((c) => c.nome); // retorna só os nomes das cidades
          setCities(citiesNames);
        } catch (err) {
          toast.error(
            "Erro ao buscar cidades, por favor entre em contato com o suporte"
          );
        }
      };

      findCities();
    }
  }, [stateSelected]);

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

          <Select
            {...register("state")}
            error={errors.state?.message}
            placeholder="000.000.000-00"
          >
            {" "}
            <option value="">Selecione seu estado</option>
            {brasilianStates.map((state, index) => (
              <option value={state.value} key={index}>
                {state.state}
              </option>
            ))}
          </Select>
        </Field>

        <Field>
          <Label>Cidade</Label>
          <Select
            {...register("city")}
            error={errors.city?.message}
            placeholder="000.000.000-00"
          >
            <option value="">Selecione sua cidade</option>{" "}
            {cities &&
              cities.map((city, index) => <option key={index}>{city}</option>)}
          </Select>
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
      </form>
    </Container>
  );
}

export default UserAdress;
