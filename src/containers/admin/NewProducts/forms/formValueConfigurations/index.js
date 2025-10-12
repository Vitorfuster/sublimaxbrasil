// Bibliotecas
import React, { useEffect, useState } from "react";
import ReactSelect from "react-select";
import { useForm, Controller } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

// Estilo
import {
  Container,
  Label,
  Input,
  TextArea,
  ConfigSection,
  CheckboxContainer,
  CheckboxItem,
  Checkbox,
  CheckboxLabel,
  ProgressContainer,
  ProgressBar,
  ProgressLine,
  ProgressStep,
  StepCircle,
  StepLabel,
  CodeInput,
  NextStep,
  HeaderContainer,
  BackButton,
} from "./style";

// Componentes
import { ErroMessage } from "../../../../../components";
import { Button } from "../../../../../components";

//API
import api from "../../../../../services/api";

export const FormValueConfigurations = ({ onDataChange }) => {
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
    priceOffer: Yup.number(),
    quantity: Yup.number(),
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
  });

  const onSubmit = (data) => {
    setStateFormData((prev) => ({
      ...prev,
      price: data.price,
      price_offer: data.priceOffer,
      quantity: data.quantity,
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

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <ProgressContainer>
        <ProgressBar>
          <ProgressLine progress={66} />

          <ProgressStep>
            <StepCircle active={true} completed={false}>
              1
            </StepCircle>
            <StepLabel active={true} completed={false}>
              Informações Básicas
            </StepLabel>
          </ProgressStep>

          <ProgressStep>
            <StepCircle active={true} completed={false}>
              2
            </StepCircle>
            <StepLabel active={true} completed={false}>
              Valores e configurações
            </StepLabel>
          </ProgressStep>

          <ProgressStep>
            <StepCircle active={false} completed={false}>
              3
            </StepCircle>
            <StepLabel active={false} completed={false}>
              Descrição e finalização
            </StepLabel>
          </ProgressStep>
        </ProgressBar>
      </ProgressContainer>

      <HeaderContainer>
        <h2>Adicionar Novo Produto</h2>
        <BackButton>
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
          </svg>
          Voltar Etapa
        </BackButton>
      </HeaderContainer>

      <div>
        <Label>Preço (R$)</Label>
        <Input type="number" {...register("price")} placeholder="0,00" />
        <ErroMessage>{errors.price?.message}</ErroMessage>
      </div>

      <div>
        <Label>Preço em promoção(R$)</Label>
        <Input type="number" {...register("priceOffer")} placeholder="0,00" />
        <ErroMessage>{errors.priceOffer?.message}</ErroMessage>
      </div>

      <ConfigSection>
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
        <Input
          type="number"
          {...register("quantity")}
          placeholder="0,00"
          disabled={demanda}
          style={{
            opacity: demanda ? 0.5 : 1,
            cursor: demanda ? "not-allowed" : "text",
          }}
        />
        <ErroMessage>{errors.quantity?.message}</ErroMessage>
      </div>

      <Button
        widthtotal="true"
        type="submit"
        style={{
          marginTop: "30px",
          height: "50px",
          borderRadius: "8px",
          fontSize: "16px",
          fontWeight: "600",
          backgroundColor: "#1a56db",
          transition: "background-color 0.3s ease",
        }}
      >
        Próxima Etapa
      </Button>
    </form>
  );
};
