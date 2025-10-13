// Bibliotecas
import React, { useEffect, useState } from "react";
import ReactSelect, { components } from "react-select";

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
  InputWrap,
  SelectWrap,
} from "./style";
import AnimatedBorder from "../../../components/AnimatedBorder";

function ProductList() {
  const [categories, setCategories] = useState([]);
  const [categorySelected, setCategorySelected] = useState(null);
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Opções do select de produtos
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
    setProductOptions();

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
      // Categoria removida: restaurar lista completa e opções de produto
      setFilteredItems(items);
      const formatProductOptions = items.map((item) => ({
        value: item.id,
        label: item.name,
      }));
      setProductOptions(formatProductOptions);
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
        ? "#f2f2f2"
        : state.isFocused
        ? "#fafafa"
        : "#fff",
      color: "#111",
      padding: "10px 15px",
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "#fff",
      borderRadius: "12px",
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
      overflow: "visible",
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

  // Menu customizado com borda animada minimalista
  const CustomMenu = (props) => {
    const [animate, setAnimate] = useState(false);
    useEffect(() => {
      const t = setTimeout(() => setAnimate(true), 10);
      return () => clearTimeout(t);
    }, []);
    return (
      <components.Menu {...props}>
        <div
          style={{ position: "relative", borderRadius: 12, overflow: "hidden" }}
        >
          <AnimatedBorder rx={12} ry={12} active={animate} />
          {props.children}
        </div>
      </components.Menu>
    );
  };

  // Opção customizada com borda animada em cada item
  const CustomOption = (props) => {
    const [hover, setHover] = useState(false);
    const { isFocused, isSelected, children } = props;
    const active = hover; // anima apenas no hover, não no foco inicial
    return (
      <components.Option {...props}>
        <div
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          style={{
            position: "relative",
            borderRadius: 12,
            overflow: "hidden",
            padding: "10px 15px",
            background: isSelected ? "#f2f2f2" : isFocused ? "#fafafa" : "#fff",
            color: "#111",
          }}
        >
          <AnimatedBorder rx={12} ry={12} active={active} />
          {children}
        </div>
      </components.Option>
    );
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
                components={{ Menu: CustomMenu, Option: CustomOption }}
                menuPortalTarget={document.body}
                menuPosition="fixed"
              />
              <AnimatedBorder rx={12} ry={12} />
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
                components={{ Menu: CustomMenu, Option: CustomOption }}
                menuPortalTarget={document.body}
                menuPosition="fixed"
              />
              <AnimatedBorder rx={12} ry={12} />
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
                <AnimatedBorder rx={12} ry={12} />
              </InputWrap>

              <button onClick={handleSearch}>
                &#128269;
                <AnimatedBorder rx={999} ry={999} />
              </button>
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
