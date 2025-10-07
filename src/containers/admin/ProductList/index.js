// Bibliotecas
import React, { useEffect, useState } from "react";
import ReactSelect from "react-select";

import {
  Container,
  Header,
  FilterDiv,
  BuscaDiv,
  Pesquisar,
  BarraPesquisa,
  Title,
  SelectContainer,
} from "./style";

import api from "../../../services/api";

function ProductList() {
  const [categories, setCategories] = useState([]);
  const [categorySelected, setCategorySelected] = useState(null);
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Buscar Categorias
  const loadCategory = async () => {
    try {
      const { data } = await api.get("/categories");
      setCategories(data);
    } catch (error) {
      console.log(error);
    }
  };

  // Buscar itens
  const loadItems = async () => {
    try {
      const { data } = await api.get("/items");
      setItems(data);
      setFilteredItems(data);
    } catch (error) {
      console.log(error);
    }
  };

  // Função para lidar com a mudança de categoria
  const handleCategoryChange = (selectedOption) => {
    setCategorySelected(selectedOption);
    setSelectedProduct(null); // Resetar o produto selecionado

    if (selectedOption) {
      // Filtrar os produtos pela categoria selecionada
      const filtered = items.filter((item) =>
        item.categories.some((category) => category.id === selectedOption.value)
      );

      setFilteredItems(filtered);
    } else {
      // Se nenhuma categoria for selecionada, mostrar todos os produtos
      setFilteredItems(items);
    }
  };

  // Função para lidar com a mudança de produto
  const handleProductChange = (selectedOption) => {
    setSelectedProduct(selectedOption);
    // Adicionar lógica para exibir detalhes do produto selecionado
    // ou realizar outras ações quando um produto é selecionado
  };

  // Função para lidar com a pesquisa
  const handleSearch = () => {
    if (searchTerm.trim() === "") {
      // Se a pesquisa estiver vazia, mostrar todos os produtos ou produtos filtrados por categoria
      if (categorySelected) {
        const filtered = items.filter((item) =>
          item.categories.some(
            (category) => category.id === categorySelected.value
          )
        );
        setFilteredItems(filtered);
      } else {
        setFilteredItems(items);
      }
      return;
    }

    // Filtrar por termo de pesquisa
    let filtered = items;

    // Se uma categoria estiver selecionada, filtrar primeiro por categoria
    if (categorySelected) {
      filtered = filtered.filter((item) =>
        item.categories.some((category) => category.idcategorySelected.value)
      );
    }

    // Depois filtrar pelo termo de pesquisa
    filtered = filtered.filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.code &&
          item.code.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    setFilteredItems(filtered);
  };

  // Chama as funções que buscam na API
  useEffect(() => {
    loadCategory();
    loadItems();
  }, []);

  // Formatar as opções para o ReactSelect
  const categoryOptions = categories.map((category) => ({
    value: category.id,
    label: category.name,
  }));

  // Garantir que as opções de produtos sejam sempre atualizadas corretamente
  const productOptions =
    filteredItems && filteredItems.length > 0
      ? filteredItems.map((item) => ({
          value: item.id,
          label: item.name,
        }))
      : [];

  // Estilo customizado para o ReactSelect
  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      borderColor: "rgba(255, 255, 255, 0.2)",
      borderRadius: "8px",
      padding: "5px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      color: "#fff",
      "&:hover": {
        borderColor: "rgba(107, 165, 253, 0.5)",
      },
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? "rgba(26, 86, 219, 0.7)"
        : state.isFocused
        ? "rgba(26, 86, 219, 0.3)"
        : "rgb(9, 11, 43)",
      color: "#fff",
      padding: "10px 15px",
      "&:hover": {
        backgroundColor: "rgba(26, 86, 219, 0.5)",
      },
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "rgb(9, 11, 43)",
      borderRadius: "8px",
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#fff",
    }),
    input: (provided) => ({
      ...provided,
      color: "#fff",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "rgba(255, 255, 255, 0.5)",
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      color: "rgba(255, 255, 255, 0.7)",
      "&:hover": {
        color: "#6ba5fd",
      },
    }),
  };

  return (
    <Container>
      <Title>Lista de Produtos</Title>
      <Header>
        <FilterDiv>
          <SelectContainer>
            <p>Categoria</p>
            <ReactSelect
              options={categoryOptions}
              onChange={handleCategoryChange}
              value={categorySelected}
              placeholder="Selecione uma categoria"
              isClearable
              styles={customStyles}
            />
          </SelectContainer>
          <SelectContainer>
            <p>Produto</p>
            <ReactSelect
              options={productOptions}
              onChange={handleProductChange}
              value={selectedProduct}
              placeholder="Selecione um produto"
              isDisabled={filteredItems.length === 0}
              styles={customStyles}
            />
          </SelectContainer>
        </FilterDiv>
        <BuscaDiv>
          <Pesquisar>
            <p>Buscar produto</p>
            <BarraPesquisa>
              <input
                placeholder="Código ou nome"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              />
              <button onClick={handleSearch}>&#128269;</button>
            </BarraPesquisa>
          </Pesquisar>
        </BuscaDiv>
      </Header>
    </Container>
  );
}

export default ProductList;
