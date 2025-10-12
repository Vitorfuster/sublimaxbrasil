// Bibliotecas
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

// Estilo
import {
  Label,
  Input,
  TextArea,
  ProgressContainer,
  ProgressBar,
  ProgressLine,
  ProgressStep,
  StepCircle,
  StepLabel,
  CodeInput,
  HeaderContainer,
  BackButton,
} from "./style";

// Componentes
import { ErroMessage } from "../../../../../components";
import { Button } from "../../../../../components";

//API
import api from "../../../../../services/api";

export const FormDescription = ({ onDataChange }) => {
  const formObject = {
    title: "",
    descriptionOne: "",
    specifications: "",
    obs: "",
    descriptionTwo: "",
  };

  const [stateFormData, setStateFormData] = useState(formObject);

  // Validação yup
  const schema = Yup.object().shape({
    titulo: Yup.string().required(),
    descriptionOne: Yup.string().required(),
    espec: Yup.string(),
    obs: Yup.string(),
    descriptionTwo: Yup.string(),
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
      title: data.titulo,
      descriptionOne: data.descriptionOne,
      specifications: data.espec,
      obs: data.obs,
      descriptionTwo: data.descriptionTwo,
    }));
  };

  useEffect(() => {
    if (stateFormData.title === "" || stateFormData.descriptionOne === "") {
    } else {
      onDataChange(stateFormData);
    }
  }, [stateFormData]);

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <ProgressContainer>
        <ProgressBar>
          <ProgressLine progress={100} />

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
            <StepCircle active={true} completed={false}>
              3
            </StepCircle>
            <StepLabel active={true} completed={false}>
              Descrição e finalização
            </StepLabel>
          </ProgressStep>
        </ProgressBar>
      </ProgressContainer>

      <HeaderContainer>
        <h2>Descrição do produto</h2>
        <BackButton>
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
          </svg>
          Voltar Etapa
        </BackButton>
      </HeaderContainer>
      <div>
        <Label>Título</Label>
        <Input
          type="text"
          {...register("titulo")}
          placeholder="Digite um título para descrição"
        />
        <ErroMessage>{errors.titulo?.message}</ErroMessage>
      </div>

      <div>
        <Label>Descrição principal</Label>
        <TextArea
          {...register("descriptionOne")}
          placeholder="Esse produto é ideal para sublimação e oferece excelente qualidade de impressão..."
          rows="4"
        />
        <ErroMessage>{errors.descriptionOne?.message}</ErroMessage>
      </div>

      <div>
        <Label>Especificações</Label>
        <CodeInput
          {...register("espec")}
          rows={6}
          defaultValue={`{
  "marca": "Metalnox",
  "material": "Porcelana",
  "cor": "Branca"
}`}
        />
        <ErroMessage>{errors.espec?.message}</ErroMessage>
      </div>

      <div>
        <Label>Observações</Label>
        <TextArea
          {...register("obs")}
          placeholder="Atenção, os produtos devem ser manuseados com cuidado. Recomenda-se o uso de equipamentos de proteção individual durante o processo de sublimação..."
          rows="4"
        />
        <ErroMessage>{errors.obs?.message}</ErroMessage>
      </div>

      <div>
        <Label>Descrição final</Label>
        <TextArea
          {...register("descriptionTwo")}
          placeholder="Informações adicionais sobre o produto, como cuidados especiais, garantia, ou características técnicas..."
          rows="4"
        />
        <ErroMessage>{errors.descriptionTwo?.message}</ErroMessage>
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
        Criar produto
      </Button>
    </form>
  );
};
