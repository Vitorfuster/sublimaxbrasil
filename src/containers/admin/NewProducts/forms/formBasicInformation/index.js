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
  LabelUpload,
  ProgressContainer,
  ProgressBar,
  ProgressLine,
  ProgressStep,
  StepCircle,
  StepLabel,
  LabelUploadImages,
  NextStep,
} from "./style";

// Componentes
import { ErroMessage } from "../../../../../components";
import { Button } from "../../../../../components";

//API
import api from "../../../../../services/api";
import { waitFor } from "@testing-library/dom";

export const FormBasicInformation = ({ onDataChange }) => {
  const formObject = {
    name: "",
    categories: [],
    file: [],
    images: [],
  };

  const [imagesCount, setImagesCount] = useState(0);
  const [coverName, setCoverName] = useState(null);
  const [imagesName, setImagesName] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [stateFormData, setStateFormData] = useState(formObject);

  // Validação yup
  const schema = Yup.object().shape({
    name: Yup.string().required("Digite o nome do produto"),
    categories: Yup.array()
      .min(1, "Selecione pelo menos uma categoria")
      .required("Escolha pelo menos uma categoria"),
    file: Yup.mixed() // podemos validar o campo file com o mexed(), e os test() para realizar teste nos arquivos
      .test("required", "Carregue um arquivo", (value) => {
        return value?.length > 0;
      })
      .test("tamanhoArquivo", "A imagem deve conter até 2MB", (value) => {
        return value[0]?.size <= 2000000;
      })
      .test("tipoArquivo", "O arquivo deve ser png", (value) => {
        return (
          value[0]?.type === "image/jpeg" || value[0]?.type === "image/png"
        );
      }),
  });

  const onSubmit = (data) => {
    const imagens = Array.from(data.images);

    setStateFormData((prev) => ({
      ...prev,
      name: data.name,
      categories: data.categories,
      file: data.file[0],
      images: imagens,
    }));
  };

  useEffect(() => {
    if (
      stateFormData.name === "" ||
      stateFormData.categories.length === 0 ||
      stateFormData.file.length === 0
    ) {
    } else {
      onDataChange(stateFormData);
    }
  }, [stateFormData]);

  // Buscar categorias na api
  useEffect(() => {
    loadCategory();
  }, []);

  const loadCategory = async () => {
    try {
      const { data } = await api.get("/categories");
      setCategories(data);
    } catch (error) {
      console.log(error);
    }
  };

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

  const handleCategoryChange = (selectedOptions) => {
    setSelectedCategories(selectedOptions || []);
  };

  const removeCategory = (categoryToRemove) => {
    const updatedCategories = selectedCategories.filter(
      (category) => category.id !== categoryToRemove.id
    );
    setSelectedCategories(updatedCategories);
  };

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <ProgressContainer>
        <ProgressBar>
          <ProgressLine progress={33} />

          <ProgressStep>
            <StepCircle active={true} completed={false}>
              1
            </StepCircle>
            <StepLabel active={true} completed={false}>
              Informações Básicas
            </StepLabel>
          </ProgressStep>

          <ProgressStep>
            <StepCircle active={false} completed={false}>
              2
            </StepCircle>
            <StepLabel active={false} completed={false}>
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

      <h2>Adicionar Novo Produto</h2>

      <div>
        <Label>Nome do Produto</Label>
        <Input
          type="text"
          {...register("name")}
          placeholder="Digite o nome do produto"
        />
        <ErroMessage>{errors.name?.message}</ErroMessage>
      </div>

      <div>
        <Label>Capa do Produto</Label>
        <LabelUpload>
          {coverName || (
            <>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 16L12 8"
                  stroke="#fff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9 11L12 8 15 11"
                  stroke="#fff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M20 16.7428C21.2215 15.734 22 14.2079 22 12.5C22 9.46243 19.5376 7 16.5 7C16.2815 7 16.0771 6.886 15.9661 6.69774C14.6621 4.48484 12.2544 3 9.5 3C5.35786 3 2 6.35786 2 10.5C2 12.5661 2.83545 14.4371 4.18695 15.7935"
                  stroke="#fff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M16 16L16 22"
                  stroke="#fff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M19 19L16 22 13 19"
                  stroke="#fff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Carregue a capa do produto
            </>
          )}
          <input
            type="file"
            accept="image/png, image/jpg"
            {...register("file")}
            onChange={(value) => {
              setCoverName(value.target.files[0]?.name);
            }}
          />
        </LabelUpload>
        <ErroMessage>{errors.file?.message}</ErroMessage>
      </div>

      <div>
        <Label>Imagens do Produto</Label>
        <LabelUploadImages>
          {imagesCount > 0 ? (
            <>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 12L11 14L15 10"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {imagesCount}{" "}
              {imagesCount === 1 ? "Arquivo carregado" : "Arquivos carregados"}
            </>
          ) : (
            <>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 16L12 8"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9 11L12 8 15 11"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M20 16.7428C21.2215 15.734 22 14.2079 22 12.5C22 9.46243 19.5376 7 16.5 7C16.2815 7 16.0771 6.886 15.9661 6.69774C14.6621 4.48484 12.2544 3 9.5 3C5.35786 3 2 6.35786 2 10.5C2 12.5661 2.83545 14.4371 4.18695 15.7935"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M16 16L16 22"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M19 19L16 22 13 19"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Carregue as imagens do produto
            </>
          )}
          <input
            type="file"
            accept="image/png, image/jpg"
            multiple
            {...register("images")}
            onChange={(value) => {
              const files = value.target.files;
              setImagesCount(files.length);
            }}
          />
        </LabelUploadImages>
        <ErroMessage>{errors.file?.message}</ErroMessage>
      </div>

      <div>
        <Label>Categorias</Label>
        {/* Esse controller serve para comportar componentes controlados , o ReactSelect é um componente controlado forasteiro, então ele precisa dessa estrutura adicional do reactUseForm  */}
        <Controller
          name="categories"
          control={control}
          render={({ field: { onChange, value } }) => {
            return (
              <ReactSelect
                isMulti
                value={selectedCategories}
                onChange={(selected) => {
                  onChange(selected);
                  handleCategoryChange(selected);
                }}
                options={categories}
                getOptionLabel={(cat) => cat.name}
                getOptionValue={(cat) => cat.id}
                placeholder={"Selecione as categorias"}
                styles={{
                  control: (base) => ({
                    ...base,
                    minHeight: "45px",
                    borderRadius: "8px",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    "&:hover": {
                      border: "1px solid #4a90e2",
                    },
                  }),
                  menu: (base) => ({
                    ...base,
                    backgroundColor: "#fff",
                    borderRadius: "8px",
                    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.15)",
                  }),
                  option: (base, state) => ({
                    ...base,
                    backgroundColor: state.isSelected
                      ? "#1a56db"
                      : state.isFocused
                      ? "rgba(26, 86, 219, 0.1)"
                      : "transparent",
                    color: state.isSelected ? "#fff" : "#333",
                    "&:hover": {
                      backgroundColor: state.isSelected
                        ? "#1a56db"
                        : "rgba(26, 86, 219, 0.1)",
                    },
                  }),
                  multiValue: (base) => ({
                    ...base,
                    backgroundColor: "rgba(26, 86, 219, 0.1)",
                    borderRadius: "4px",
                  }),
                  multiValueLabel: (base) => ({
                    ...base,
                    color: "#1a56db",
                    fontWeight: 500,
                  }),
                  multiValueRemove: (base) => ({
                    ...base,
                    color: "#1a56db",
                    "&:hover": {
                      backgroundColor: "#1a56db",
                      color: "white",
                    },
                  }),
                }}
              />
            );
          }}
        />
        <ErroMessage>{errors.categories?.message}</ErroMessage>
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
