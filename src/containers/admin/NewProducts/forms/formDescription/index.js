// Bibliotecas
import React, { useEffect, useState, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

// Estilo
import {
  Label,
  Input,
  TextArea,
  CodeInput,
  CodeWrap,
  HeaderContainer,
  BackButton,
  InputWrap,
  TextAreaWrap,
} from "./style";
import FormProgress from "../../../../../components/FormProgress";

// Componentes
import { ErroMessage } from "../../../../../components";
import { Button } from "../../../../../components";
import AnimatedBorder from "../../../../../components/AnimatedBorder";

export const FormDescription = ({ onDataChange, goBackForm, formValue }) => {
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
    formState: { errors, isDirty },
  } = useForm({
    resolver: yupResolver(schema), // usa o yup para validar os erros
    defaultValues: {
      titulo: formValue?.title ?? "",
      descriptionOne: formValue?.descriptionOne ?? "",
      espec: formValue?.specifications ?? "",
      obs: formValue?.obs ?? "",
      descriptionTwo: formValue?.descriptionTwo ?? "",
    },
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
    if (!isDirty) return;

    if (stateFormData.title && stateFormData.descriptionOne) {
      onDataChange(stateFormData);
    }
  }, [stateFormData]);

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <FormProgress current={3} />

      <HeaderContainer>
        <h2>Descrição do produto</h2>
        <Button
          type="button"
          onClick={() => goBackForm(2)}
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
        <Label>Título</Label>
        <InputWrap>
          <Input
            type="text"
            {...register("titulo")}
            placeholder="Digite um título para descrição"
          />
          <AnimatedBorder rx={12} ry={12} />
        </InputWrap>
        <ErroMessage>{errors.titulo?.message}</ErroMessage>
      </div>

      <div>
        <Label>Descrição principal</Label>
        <TextAreaWrap>
          <TextArea
            {...register("descriptionOne")}
            placeholder="Esse produto é ideal para sublimação e oferece excelente qualidade de impressão..."
            rows="4"
          />
          <AnimatedBorder rx={12} ry={12} />
        </TextAreaWrap>
        <ErroMessage>{errors.descriptionOne?.message}</ErroMessage>
      </div>

      <div>
        <Label>Especificações</Label>
        <CodeWrap>
          <CodeInput
            {...register("espec")}
            rows={6}
            defaultValue={
              formValue?.specifications ??
              `{
  "marca": "Metalnox",
  "material": "Porcelana",
  "cor": "Branca"
}`
            }
          />
          <AnimatedBorder rx={12} ry={12} />
        </CodeWrap>
        <ErroMessage>{errors.espec?.message}</ErroMessage>
      </div>

      <div>
        <Label>Observações</Label>
        <TextAreaWrap>
          <TextArea
            {...register("obs")}
            placeholder="Atenção, os produtos devem ser manuseados com cuidado. Recomenda-se o uso de equipamentos de proteção individual durante o processo de sublimação..."
            rows="4"
          />
          <AnimatedBorder rx={12} ry={12} />
        </TextAreaWrap>
        <ErroMessage>{errors.obs?.message}</ErroMessage>
      </div>

      <div>
        <Label>Descrição final</Label>
        <TextAreaWrap>
          <TextArea
            {...register("descriptionTwo")}
            placeholder="Informações adicionais sobre o produto, como cuidados especiais, garantia, ou características técnicas..."
            rows="4"
          />
          <AnimatedBorder rx={12} ry={12} />
        </TextAreaWrap>
        <ErroMessage>{errors.descriptionTwo?.message}</ErroMessage>
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
        Criar produto
      </Button>
    </form>
  );
};
