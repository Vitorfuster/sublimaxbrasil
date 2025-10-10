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
  LabelUpload,
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
  LabelUploadImages,
  NextStep,
} from "./style";
import api from "../../../services/api";
import { Button } from "../../../components";
import { ErrorMensage } from "../../../components/ErrorMessage/style";
import { toast } from "react-toastify";

function NewProducts() {
  const [coverName, setCoverName] = useState(null);
  const [imagesName, setImagesName] = useState(null);
  const [imagesCount, setImagesCount] = useState(0);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  // CheckBox
  const [visibilidade, setVisibilidade] = useState(true);
  const [emOferta, setEmOferta] = useState(false);
  const [demanda, setDemanda] = useState(false);

  // Etapa do formulário
  const [thisForm, setThisForm] = useState(1);

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
    // O formData serve para enviar dados com arquivos para a API
    const productDataFormData = new FormData();

    // Aqui inserimos os dados na variavel, ela fica parecida com um objeto
    productDataFormData.append("name", data.name);
    productDataFormData.append("price", data.price);
    productDataFormData.append("price_offer", data.priceOffer);

    // Adiciona todas as categorias selecionadas
    const categoryArray = data.categories.map((category) => category.id);
    productDataFormData.append(`category_ids`, JSON.stringify(categoryArray));

    // ## NOVOS CAMPOS

    // Imagens
    const imagesArray = Array.from(data.images);
    imagesArray.forEach((image) => {
      productDataFormData.append("images", image);
    });
    // Imagem capa
    productDataFormData.append("cover", data.file[0]);

    // Descrição
    const description = [];
    description.push({
      title: data.titulo,
      descriptionOne: data.descriptionOne,
      specifications: data.espec,
      obs: data.obs,
      descriptionTwo: data.descriptionTwo,
    });
    // Json.stringify converte nosso bojeto para uma string, pois o formdata não aceita objetos, dps la no back_end convertemos para objeto novamente.
    productDataFormData.append("description", JSON.stringify(description));

    // Checkbox
    productDataFormData.append("visible", true);
    productDataFormData.append("offer", true);

    console.log(description);
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
      {thisForm && thisForm === 1 ? (
        <form noValidate>
          <ProgressContainer>
            <ProgressBar>
              <ProgressLine progress={50} />

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
                  Finalização
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
            <ErrorMensage>{errors.name?.message}</ErrorMensage>
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
            <ErrorMensage>{errors.file?.message}</ErrorMensage>
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
                  {imagesCount === 1
                    ? "Arquivo carregado"
                    : "Arquivos carregados"}
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
                  setImagesName(files[0]?.name);
                }}
              />
            </LabelUploadImages>
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

          <NextStep widthtotal="true" onClick={() => setThisForm(2)}>
            Próxima Etapa
          </NextStep>
        </form>
      ) : thisForm && thisForm === 2 ? (
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <ProgressContainer>
            <ProgressBar>
              <ProgressLine progress={100} />

              <ProgressStep>
                <StepCircle completed={true}>✓</StepCircle>
                <StepLabel completed={true}>Informações Básicas</StepLabel>
              </ProgressStep>

              <ProgressStep>
                <StepCircle active={true}>2</StepCircle>
                <StepLabel active={true}>Finalização</StepLabel>
              </ProgressStep>
            </ProgressBar>
          </ProgressContainer>

          <h2>Adicionar Novo Produto</h2>

          <div>
            <Label>Preço (R$)</Label>
            <Input type="number" {...register("price")} placeholder="0,00" />
            <ErrorMensage>{errors.price?.message}</ErrorMensage>
          </div>

          <div>
            <Label>Preço em promoção(R$)</Label>
            <Input
              type="number"
              {...register("priceOffer")}
              placeholder="0,00"
            />
            <ErrorMensage>{errors.priceOffer?.message}</ErrorMensage>
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
                <CheckboxLabel htmlFor="visibilidade">
                  Visibilidade
                </CheckboxLabel>
              </CheckboxItem>

              <CheckboxItem>
                <Checkbox
                  type="checkbox"
                  id="demanda"
                  checked={demanda}
                  onChange={(e) => setDemanda(e.target.checked)}
                />
                <CheckboxLabel htmlFor="visibilidade">
                  Sob demanda
                </CheckboxLabel>
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
            <Input type="number" {...register("quantity")} placeholder="0,00" />
            <ErrorMensage>{errors.quantity?.message}</ErrorMensage>
          </div>

          <NextStep widthtotal="true" onClick={() => setThisForm(3)}>
            Próxima Etapa
          </NextStep>
        </form>
      ) : (
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <ProgressContainer>
            <ProgressBar>
              <ProgressLine progress={100} />

              <ProgressStep>
                <StepCircle completed={true}>✓</StepCircle>
                <StepLabel completed={true}>Informações Básicas</StepLabel>
              </ProgressStep>

              <ProgressStep>
                <StepCircle active={true}>2</StepCircle>
                <StepLabel active={true}>Finalização</StepLabel>
              </ProgressStep>
            </ProgressBar>
          </ProgressContainer>

          <h2>Descrição do Produto</h2>

          <div>
            <Label>Título</Label>
            <Input
              type="text"
              {...register("titulo")}
              placeholder="Digite um título para descrição"
            />
            <ErrorMensage>{errors.titulo?.message}</ErrorMensage>
          </div>

          <div>
            <Label>Descrição principal</Label>
            <TextArea
              {...register("descriptionOne")}
              placeholder="Esse produto é ideal para sublimação e oferece excelente qualidade de impressão..."
              rows="4"
            />
            <ErrorMensage>{errors.descriptionOne?.message}</ErrorMensage>
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
            <ErrorMensage>{errors.espec?.message}</ErrorMensage>
          </div>

          <div>
            <Label>Observações</Label>
            <TextArea
              {...register("obs")}
              placeholder="Atenção, os produtos devem ser manuseados com cuidado. Recomenda-se o uso de equipamentos de proteção individual durante o processo de sublimação..."
              rows="4"
            />
            <ErrorMensage>{errors.obs?.message}</ErrorMensage>
          </div>

          <div>
            <Label>Descrição final</Label>
            <TextArea
              {...register("descriptionTwo")}
              placeholder="Informações adicionais sobre o produto, como cuidados especiais, garantia, ou características técnicas..."
              rows="4"
            />
            <ErrorMensage>{errors.descriptionTwo?.message}</ErrorMensage>
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
            Criar produto
          </Button>
        </form>
      )}
    </Container>
  );
}

export default NewProducts;
