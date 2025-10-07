// Bibliotecas
import React, { useEffect, useState } from "react";
import ReactSelect from "react-select";
import { useForm, Controller } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

// Estilo
import { Container, Label, Input, LabelUpload } from "./style";
import api from "../../../services/api";
import { Button } from "../../../components";
import { ErrorMensage } from "../../../components/ErrorMessage/style";
import { toast } from "react-toastify";

function NewProducts() {
  const [fileName, setFileName] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  // Validação yup
  const schema = Yup.object().shape({
    name: Yup.string().required("Digite o nome do produto"),
    price: Yup.string().required("Digite o preço do produto"),
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

  const onSubmit = async (data) => {
    const categoryArray = data.categories.map((category) => category.id);

    // O formData serve para enviar dados com arquivos para a API
    const productDataFormData = new FormData();

    // Aqui inserimos as os dados na variavel, ela fica parecida com um objeto
    productDataFormData.append("name", data.name);
    productDataFormData.append("price", data.price);

    // Adiciona todas as categorias selecionadas
    productDataFormData.append(`category_ids`, JSON.stringify(categoryArray));

    productDataFormData.append("file", data.file[0]);

    try {
      await toast.promise(api.post("/items", productDataFormData), {
        pending: "Criando novo produto...",
        success: "Produto criado com sucesso!",
        error: "Falha ao criar o produto",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleCategoryChange = (selectedOptions) => {
    setSelectedCategories(selectedOptions || []);
  };

  const removeCategory = (categoryToRemove) => {
    const updatedCategories = selectedCategories.filter(
      (category) => category.id !== categoryToRemove.id
    );
    setSelectedCategories(updatedCategories);
  };

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

  return (
    <Container>
      {/*noValidate não deixa o html validar os campos  */}
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <h2>Adicionar Novo Produto</h2>

        <div>
          <Label>Nome do Produto</Label>
          <Input
            type="text"
            {...register("name")}
            placeholder="Digite o nome do produto"
          />
          <ErrorMensage>{errors.name?.message}</ErrorMensage>
        </div>

        <div>
          <Label>Preço (R$)</Label>
          <Input type="number" {...register("price")} placeholder="0,00" />
          <ErrorMensage>{errors.price?.message}</ErrorMensage>
        </div>

        <div>
          <Label>Imagem do Produto</Label>
          <LabelUpload>
            {fileName || (
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
                Carregue a imagem do produto
              </>
            )}
            <input
              type="file"
              accept="image/png, image/jpg"
              {...register("file")}
              onChange={(value) => {
                setFileName(value.target.files[0]?.name);
              }}
            />
          </LabelUpload>
          <ErrorMensage>{errors.file?.message}</ErrorMensage>
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
          <ErrorMensage>{errors.categories?.message}</ErrorMensage>
        </div>

        <Button
          widthtotal="true"
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
          Adicionar produto
        </Button>
      </form>
    </Container>
  );
}

export default NewProducts;
