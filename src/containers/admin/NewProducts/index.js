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

  // Validação yup
  const schema = Yup.object().shape({
    name: Yup.string().required("Digite o nome do produto"),
    price: Yup.string().required("Digite o preço do produto"),
    category: Yup.object().required("Escolha uma categoria"),
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
    // O formData serve para enviar dados com arquivos para a API
    const productDataFormData = new FormData();

    // Aqui inserimos as os dados na variavel, ela fica parecida com um objeto
    productDataFormData.append("name", data.name);
    productDataFormData.append("price", data.price);
    productDataFormData.append("category_ids", data.category.id);
    productDataFormData.append("file", data.file[0]);

    try {
      await toast.promise(api.post("/products", productDataFormData), {
        pending: "Criando novo produto...",
        success: "Produto criado com sucesso!",
        error: "Falha ao criar o produto",
      });
    } catch (error) {
      console.log(error);
    }
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
        <div>
          <Label>Nome</Label>
          <Input type="text" {...register("name")} />
          <ErrorMensage>{errors.name?.message}</ErrorMensage>
        </div>
        <div>
          <Label>Preço</Label>
          <Input type="number" {...register("price")} />
          <ErrorMensage>{errors.price?.message}</ErrorMensage>
        </div>
        <div>
          <LabelUpload>
            {/* Verefica se o estado existe, se existir, mostra o valor do estado, se não, mostra o texto padrão*/}
            {fileName || <>Carregue a imagem do produto</>}
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
          {/* Esse controller serve para comportar componentes controlados , o ReactSelect é um componente controlado forasteiro, então ele precisa dessa estrutura adicional do reactUseForm  */}
          <Controller
            name="category"
            control={control}
            render={({ field }) => {
              return (
                <ReactSelect
                  {...field}
                  options={categories}
                  getOptionLabel={(cat) => cat.name}
                  getOptionValue={(cat) => cat.id}
                  placeholder={"Categorias"}
                />
              );
            }}
          ></Controller>
          <ErrorMensage>{errors.category?.message}</ErrorMensage>
        </div>

        <Button WidthTotal style={{ marginTop: "25px" }}>
          Adicionar produto
        </Button>
      </form>
    </Container>
  );
}

export default NewProducts;
