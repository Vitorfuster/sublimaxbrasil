// Bibliotecas
import React, { useEffect, useState } from "react";
import ReactSelect from "react-select";
import { useForm, Controller } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

// Estilo
import {
  Label,
  Input,
  ConfigSection,
  CheckboxContainer,
  CheckboxItem,
  Checkbox,
  CheckboxLabel,
  HeaderContainer,
  InputWrap,
} from "./style";
import FormProgress from "../../../../../components/FormProgress";
import AnimatedBorder from "../../../../../components/AnimatedBorder";

// Componentes
import { ErroMessage } from "../../../../../components";
import { Button } from "../../../../../components";

export const FormValueConfigurations = ({
  onDataChange,
  goBackForm,
  formValue,
}) => {
  const formObject = {
    price: null,
    price_offer: null,
    quantity: null,
    visible: true,
    offer: false,
    demand: false,
  };

  // CheckBox
  const [visibilidade, setVisibilidade] = useState(true);
  const [emOferta, setEmOferta] = useState(false);
  const [demanda, setDemanda] = useState(false);

  // Dados do form
  const [stateFormData, setStateFormData] = useState(formObject);

  // Validação yup
  const schema = Yup.object().shape({
    price: Yup.number().required("Digite o preço do produto"),
    priceOffer: Yup.number()
      .transform((value, originalValue) => {
        // Se o campo estiver vazio, transforma em undefined
        return originalValue === "" || originalValue === null
          ? undefined
          : value;
      })
      .nullable()
      .notRequired(),
    quantity: Yup.number()
      .transform((value, originalValue) => {
        // Se o campo estiver vazio, transforma em undefined
        return originalValue === "" || originalValue === null
          ? undefined
          : value;
      })
      .nullable()
      .notRequired(),
  });

  // UseForms
  const {
    register,
    handleSubmit,
    watch,
    control, // para componentes externos e controlados
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema), // usa o yup para validar os erros
    defaultValues: {
      price: formValue?.price ?? null,
      priceOffer: formValue?.price_offer ?? null,
      quantity: formValue?.quantity ?? null,
    },
  });

  const onSubmit = (data) => {
    setStateFormData((prev) => ({
      ...prev,
      price: data.price,
      price_offer: data.priceOffer ? data.priceOffer : null,
      quantity: data.quantity ? data.quantity : null,
      visible: visibilidade,
      offer: emOferta,
      demand: demanda,
    }));
  };

  useEffect(() => {
    if (stateFormData.price === null) {
    } else {
      onDataChange(stateFormData);
    }
  }, [stateFormData]);
  // Inicializar checkboxes com valores anteriores
  useEffect(() => {
    if (formValue) {
      setVisibilidade(
        typeof formValue.visible === "boolean" ? formValue.visible : true
      );
      setEmOferta(
        typeof formValue.offer === "boolean" ? formValue.offer : false
      );
      setDemanda(
        typeof formValue.demand === "boolean" ? formValue.demand : false
      );
    }
  }, [formValue]);
  const goBack = () => {
    goBackForm(1);
  };
  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <FormProgress current={2} />

      <HeaderContainer>
        <h2>Adicionar Novo Produto</h2>
        <Button
          type="button"
          onClick={goBack}
          style={{
            background: "#ff9e9eff",
            justifySelf: "start",
            height: "40px",
          }}
        >
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            style={{
              marginRight: 8,
              width: 16,
              height: 16,
            }}
          >
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
          </svg>
          Voltar Etapa
        </Button>
      </HeaderContainer>

      <div>
        <Label>Preço (R$)</Label>
        <InputWrap>
          <Input type="number" {...register("price")} placeholder="0,00" />
          <AnimatedBorder rx={12} ry={12} />
        </InputWrap>
        <ErroMessage>{errors.price?.message}</ErroMessage>
      </div>

      <div>
        <Label>Preço em promoção(R$)</Label>
        <InputWrap>
          <Input type="number" {...register("priceOffer")} placeholder="0,00" />
          <AnimatedBorder rx={12} ry={12} />
        </InputWrap>
        <ErroMessage>{errors.priceOffer?.message}</ErroMessage>
      </div>

      <ConfigSection>
        <AnimatedBorder rx={12} ry={12} />
        <h3>Configurações</h3>
        <CheckboxContainer>
          <CheckboxItem>
            <Checkbox
              type="checkbox"
              id="visibilidade"
              checked={visibilidade}
              onChange={(e) => setVisibilidade(e.target.checked)}
            />
            <CheckboxLabel htmlFor="visibilidade">Visibilidade</CheckboxLabel>
          </CheckboxItem>

          <CheckboxItem>
            <Checkbox
              type="checkbox"
              id="demanda"
              checked={demanda}
              onChange={(e) => setDemanda(e.target.checked)}
            />
            <CheckboxLabel htmlFor="visibilidade">Sob demanda</CheckboxLabel>
          </CheckboxItem>

          <CheckboxItem>
            <Checkbox
              type="checkbox"
              id="emOferta"
              checked={emOferta}
              onChange={(e) => setEmOferta(e.target.checked)}
            />
            <CheckboxLabel htmlFor="emOferta">Em oferta</CheckboxLabel>
          </CheckboxItem>
        </CheckboxContainer>
      </ConfigSection>

      <div>
        <Label>Quantidade(R$)</Label>
        <InputWrap>
          <Input
            type="number"
            {...register("quantity")}
            placeholder="0,00"
            disabled={demanda}
            style={{
              opacity: demanda ? 0.5 : 1,
            }}
          />
          <AnimatedBorder rx={12} ry={12} />
        </InputWrap>
        <ErroMessage>{errors.quantity?.message}</ErroMessage>
      </div>

      <Button
        widthTotal="true"
        type="submit"
        style={{
          background: "#9bff65ff",
          marginTop: "30px",
          height: "50px",
        }}
      >
        Próxima Etapa
      </Button>
    </form>
  );
};
