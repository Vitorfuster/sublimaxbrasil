// Bibliotecas
import React, { useEffect, useState } from "react";
import ReactSelect from "react-select";

// Configuração da api
import api from "../../../services/api";

// Componentes
import { CardProductAdmin } from "../../../components";

// Estilos
import {
  Container,
  Header,
  FilterDiv,
  BuscaDiv,
  Pesquisar,
  BarraPesquisa,
  Title,
  SelectContainer,
  ContainerItems,
  BorderSvg,
  InputWrap,
  SelectWrap,
} from "./style";

function ProductList() {
  const [categories, setCategories] = useState([]);
  const [categorySelected, setCategorySelected] = useState(null);
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [productOptions, setProductOptions] = useState();

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

      const formatProductOptions = filtered.map((item) => {
        const newItem = {
          value: item.id,
          label: item.name,
        };
        return newItem;
      });
      setProductOptions(formatProductOptions);
    } else {
      // Se nenhuma categoria for selecionada, mostrar todos os produtos
      setFilteredItems(items);
    }
  };

  // Função para lidar com a mudança de produto
  const handleProductChange = (selectedOption) => {
    const filtered = items.filter((item) => item.id === selectedOption.value);
    setSelectedProduct(selectedOption);
    setFilteredItems(filtered);

    console.log(selectedOption);
    // setFilteredItems(filtered);

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
        item.categories.some(
          (category) => category.id === categorySelected.value
        )
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

  // Estilo customizado para o ReactSelect TRAE IA
  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: "#fff",
      border: "1px solid #000",
      borderRadius: "12px",
      padding: "6px",
      boxShadow: "none",
      color: "#111",
      "&:hover": {
        borderColor: "#000",
      },
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? "#eaf2ff"
        : state.isFocused
        ? "#f5faff"
        : "#fff",
      color: "#111",
      padding: "10px 15px",
      "&:hover": {
        backgroundColor: "#eaf2ff",
      },
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "#fff",
      borderRadius: "8px",
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#111",
    }),
    input: (provided) => ({
      ...provided,
      color: "#111",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#888",
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      color: "#555",
      "&:hover": {
        color: "#000",
      },
    }),
    menuPortal: (base) => ({
      ...base,
      zIndex: 9999,
    }),
  };

  return (
    <Container>
      <Title>Lista de Produtos</Title>
      <Header>
        <FilterDiv>
          <SelectContainer>
            <p>Categoria</p>
            <SelectWrap>
              <ReactSelect
                options={categoryOptions}
                onChange={handleCategoryChange}
                value={categorySelected}
                placeholder="Selecione uma categoria"
                isClearable
                styles={customStyles}
                menuPortalTarget={document.body}
                menuPosition="fixed"
              />
              <BorderSvg className="border-draw" preserveAspectRatio="none">
                <rect
                  x="0"
                  y="0"
                  width="100%"
                  height="100%"
                  rx="12"
                  ry="12"
                  className="border-rect"
                />
              </BorderSvg>
            </SelectWrap>
          </SelectContainer>
          <SelectContainer>
            <p>Produto</p>
            <SelectWrap>
              <ReactSelect
                options={productOptions}
                onChange={handleProductChange}
                value={selectedProduct}
                placeholder="Selecione um produto"
                isDisabled={filteredItems.length === 0}
                styles={customStyles}
                menuPortalTarget={document.body}
                menuPosition="fixed"
              />
              <BorderSvg className="border-draw" preserveAspectRatio="none">
                <rect
                  x="0"
                  y="0"
                  width="100%"
                  height="100%"
                  rx="12"
                  ry="12"
                  className="border-rect"
                />
              </BorderSvg>
            </SelectWrap>
          </SelectContainer>
        </FilterDiv>
        <BuscaDiv>
          <Pesquisar>
            <p>Buscar produto</p>
            <BarraPesquisa>
              <InputWrap>
                <input
                  placeholder="Código ou nome"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                />
                <BorderSvg className="border-draw" preserveAspectRatio="none">
                  <rect
                    x="0"
                    y="0"
                    width="100%"
                    height="100%"
                    rx="12"
                    ry="12"
                    className="border-rect"
                  />
                </BorderSvg>
              </InputWrap>
              <button onClick={handleSearch}>&#128269;</button>
            </BarraPesquisa>
          </Pesquisar>
        </BuscaDiv>
      </Header>

      <ContainerItems>
        {filteredItems.map((filterItem) => (
          <CardProductAdmin key={filterItem.id} item={filterItem} />
        ))}
      </ContainerItems>
    </Container>
  );
}

export default ProductList;
