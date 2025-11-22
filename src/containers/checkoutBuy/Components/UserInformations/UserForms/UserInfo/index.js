// Bibliotecas
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import Fuse from "fuse.js";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form"; // Biblioteca de formulários
import axios from "axios";

//  Estilos
import {
  Container,
  Label,
  Input,
  PhoneContainer,
  PhoneButton,
  PhoneListContainer,
  PhoneList,
  InputContainer,
  PhoneItem,
  PhoneInfo,
  Field,
} from "./style";

function UserInfo({ submitButton, responseSubmit, submitButtonResponse }) {
  const [countries, setCountries] = useState([]);
  const [countryFind, setCountryFind] = useState({
    name: "Brazil",
    iso2: "br",
    dial: "+55",
    flag: "https://flagcdn.com/w40/br.png",
  });
  const [openPhoneList, setOpenPhoneList] = useState(false);
  const [countriesFilter, setCountriesFilter] = useState();

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
        const allCountries = list.filter((c) => c.dial);

        // const countriesFormated = allCountries.map((country) => {
        //   const format = {
        //     name: `${country.name} ${country.iso2} ${country.dial}`,
        //   };
        //   return format;
        // });

        // console.log(countriesFormated);

        setCountries(allCountries);
        setCountriesFilter(allCountries);
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

  // Enviar form ao componente principal
  useEffect(() => {
    if (submitButton === 1) {
      console.log("tentativa de submit realizada");

      const handleExternalSubmit = async () => {
        const valid = await trigger(); // <- força o Yup a validar tudo

        if (valid) {
          const values = getValues(); // <- pega os dados validados
          // aqui podemos enviar os dados manualmente, chamar uma API etc

          // Adiciona o dial ao numero formatado
          const newNumber = {
            ...values,
            phone: countryFind.dial + values.phone.replace(/\D/g, ""),
          };
          responseSubmit(newNumber);
        } else {
          submitButtonResponse(0);
        }
      };

      handleExternalSubmit();
    }
  }, [submitButton]);

  const phoneInput = (value) => {
    if (value === "") {
      setCountriesFilter(countries);
    } else {
      const optionsFind = {
        keys: ["name", "dial", "iso2"], // Campo a ser pesquisado
        threshold: 0.4, // Sensibilidade (0 = exato, 1 = mais amplo)
      };

      const fuse = new Fuse(countries, optionsFind);
      const resultado = fuse.search(value);
      const resultadoFormatado = resultado.map((line) => line.item);
      setCountriesFilter(resultadoFormatado);
    }
  };
  // console.log(countries);

  // VOU PASSAR A INFORMAÇÃO DE TELEFONE DE FORMA DINAMICA, POIS ELA ESTÁ ESTATICA
  return (
    <Container>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <Field>
          <Label>Telefone</Label>
          <PhoneContainer>
            <PhoneButton
              onClick={() => {
                setOpenPhoneList(true);
                phoneInput("");
              }}
            >
              <img src={countryFind.flag} />
              {countryFind.dial}
            </PhoneButton>
            <Input
              type="phone"
              name="phone"
              {...register("phone")}
              error={errors.phone?.message}
              placeholder="Digite seu telefone"
            />
            {openPhoneList === true && (
              <PhoneListContainer>
                <PhoneList>
                  {countries &&
                    countriesFilter.map((country, index) => (
                      <PhoneItem
                        key={index}
                        onClick={() => {
                          setCountryFind(country);
                          setOpenPhoneList(false);
                        }}
                      >
                        <img src={country.flag} />
                        <PhoneInfo>
                          <p>{country.name}</p>
                          <p>{country.dial}</p>
                        </PhoneInfo>
                      </PhoneItem>
                    ))}
                </PhoneList>
                <InputContainer>
                  <input
                    onChange={(value) => {
                      phoneInput(value.target.value);
                    }}
                    placeholder="Procure por nome ou DDI"
                  />
                </InputContainer>
              </PhoneListContainer>
            )}
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
      </form>
    </Container>
  );
}

export default UserInfo;
