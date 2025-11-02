// Bibliotecas
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

function UserInfo() {
  const [countries, setCountries] = useState([]);
  const [countryFind, setCountryFind] = useState({
    name: "Brazil",
    iso2: "br",
    dial: "+55",
    flag: "https://flagcdn.com/w40/br.png",
  });
  useEffect(() => {
    async function loadCountries() {
      try {
        const res = await fetch(
          "https://restcountries.com/v3.1/all?fields=name,idd,flags,cca2"
        );
        const data = await res.json();

        const list = data.map((c) => {
          const iso2 = (c.cca2 || "").toLowerCase();
          const dial = c.idd?.root
            ? `${c.idd.root}${c.idd.suffixes?.[0] || ""}`
            : null;
          const flag = iso2
            ? `https://flagcdn.com/w40/${iso2}.png`
            : c.flags?.png;

          return { name: c.name.common, iso2, dial, flag };
        });

        setCountries(list.filter((c) => c.dial));
      } catch (err) {
        console.error("Erro ao buscar países ❌", err);
      }
    }

    loadCountries();
  }, []);

  // Biblioteca de validação
  const schema = Yup.object().shape({
    phone: Yup.string().required("O telefone é obrigatório"),
    cpf: Yup.string().required("O CPF é obrigatório"),
  });

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

  const findCountry = (number) => {
    const find = countries.filter((country) => country.dial === number);

    setCountryFind(find);
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

  console.log(countryFind);
  return (
    <Container>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <Field>
          <Label>Telefone</Label>
          <PhoneContainer>
            <button>
              <img src={countryFind.flag} />
              {countryFind.dial}
            </button>
            <Input
              type="phone"
              name="phone"
              {...register("phone")}
              error={errors.phone?.message}
              placeholder="Digite seu telefone"
            />
          </PhoneContainer>
        </Field>

        <Field>
          <Label>CPF</Label>
          <Input
            type="cpf"
            name="cpf"
            {...register("cpf")}
            error={errors.cpf?.message}
            placeholder="000.000.000-00"
          />
        </Field>
        {/* <ButtonContainer>
          <ButtonClean onSubmit="submit">Enviar</ButtonClean>
        </ButtonContainer> */}
      </form>
      {/* <ButtonClean onClick={handleExternalSubmit}>Sem</ButtonClean> */}
    </Container>
  );
}

export default UserInfo;
