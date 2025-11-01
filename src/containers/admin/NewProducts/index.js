// Bibliotecas
import React, { useEffect, useState } from "react";
// Estilo
import { Container } from "./style";
import api from "../../../services/api";
import { toast } from "react-toastify";

// Componentes
import {
  FormBasicInformation,
  FormValueConfigurations,
  FormDescription,
} from "./forms";

function NewProducts() {
  // Etapa do formulário
  const [thisForm, setThisForm] = useState(1);

  const [formData, setFormData] = useState({
    basicInfo: {},
    values: {},
    description: { vazio: true },
  });

  const handleFormDataChange = (step, data) => {
    setFormData((prev) => ({ ...prev, [step]: data }));

    if (thisForm < 3) {
      setThisForm(thisForm + 1);
    }
  };

  useEffect(() => {
    if (thisForm === 3) {
      if (formData.description.vazio !== true) {
        onSubmit();
      }
    }
  }, [formData]);
  const onSubmit = async () => {
    console.log("onSubimit");
    console.log(formData);

    // O formData serve para enviar dados com arquivos para a API
    const productDataFormData = new FormData();
    // Aqui inserimos os dados na variavel, ela fica parecida com um objeto
    productDataFormData.append("name", formData.basicInfo.name);

    // Imagem capa
    productDataFormData.append("cover", formData.basicInfo.file);

    // Imagens
    const imagesArray = Array.from(formData.basicInfo.images);
    imagesArray.forEach((image) => {
      productDataFormData.append("images", image);
    });

    // Adiciona todas as categorias selecionadas
    const categoryArray = formData.basicInfo.categories.map(
      (category) => category.id
    );
    productDataFormData.append(`category_ids`, JSON.stringify(categoryArray));

    productDataFormData.append("price", formData.values.price);

    productDataFormData.append("price_offer", formData.values.price_offer);

    // Checkbox
    productDataFormData.append("visible", formData.values.visible);
    productDataFormData.append("demand", formData.values.demand);
    productDataFormData.append("offer", formData.values.offer);

    productDataFormData.append("quantity", formData.values.quantity);

    // Descrição
    const description = [];
    description.push({
      title: formData.description.title,
      descriptionOne: formData.description.descriptionOne,
      specifications: formData.description.specifications,
      obs: formData.description.obs,
      descriptionTwo: formData.description.descriptionTwo,
    });
    // Json.stringify converte nosso bojeto para uma string, pois o formdata não aceita objetos, dps la no back_end convertemos para objeto novamente.
    productDataFormData.append("description", JSON.stringify(description));
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

  return (
    <Container>
      {thisForm && thisForm === 1 ? (
        <FormBasicInformation
          onDataChange={(data) => handleFormDataChange("basicInfo", data)}
          formValue={formData.basicInfo}
          goBackForm={(step) => setThisForm(step)}
        />
      ) : thisForm && thisForm === 2 ? (
        <FormValueConfigurations
          onDataChange={(data) => handleFormDataChange("values", data)}
          goBackForm={(step) => setThisForm(step)}
          formValue={formData.values}
        />
      ) : (
        <FormDescription
          onDataChange={(data) => handleFormDataChange("description", data)}
          goBackForm={(step) => setThisForm(step)}
          formValue={formData.description}
        />
      )}
    </Container>
  );
}

export default NewProducts;
