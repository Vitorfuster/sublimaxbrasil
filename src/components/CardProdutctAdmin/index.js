import React, { useState, useEffect, useRef } from "react";

import {
  Container,
  ImageContainer,
  Image,
  Titulo,
  Descricao,
  Codigo,
  Visibilidade,
  Button,
  OptionsPanel,
  OptionItem,
  OptionsWrapper,
  OptionButton,
} from "./style";
import AnimatedBorder from "../AnimatedBorder";

import PropTypes from "prop-types";

export function CardProductAdmin({ item }) {
  const [showOptions, setShowOptions] = useState(false);
  const optionsRef = useRef(null);

  const deleteProduct = (id) => {
    // Apenas chama a função de apagar produto com o id
    // A implementação real será feita por você
    console.log("Apagar produto:", id);
  };

  useEffect(() => {
    if (!showOptions) return;
    const handleClickOutside = (e) => {
      if (optionsRef.current && !optionsRef.current.contains(e.target)) {
        setShowOptions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showOptions]);
  return (
    <Container hasOptions={showOptions}>
      {/* SVG de borda para animação de desenho */}
      <AnimatedBorder rx={16} ry={16} />
      <ImageContainer>
        <Image src={item.cover_url} alt="imagem do produto" />
      </ImageContainer>
      <Titulo>{item.name}</Titulo>
      <Descricao>
        <Codigo>
          Cód: <span>CPA172532</span>
        </Codigo>
        <p>17/10/2025</p>
        <Visibilidade>
          Visiblidade: <span>PUBLICO</span> <span>ESGOTADO</span>
        </Visibilidade>
      </Descricao>
      <Button>
        {/* SVG de borda para animação de desenho no botão */}
        <AnimatedBorder rx={12} ry={12} />
        Ver produto
      </Button>
      <OptionsWrapper ref={optionsRef}>
        <OptionButton onClick={() => setShowOptions((prev) => !prev)}>
          {/* SVG de borda para animação de desenho no botão de opções */}
          <AnimatedBorder rx={12} ry={12} />
          Opções
        </OptionButton>

        {showOptions && (
          <OptionsPanel>
            {/* SVG de borda para animação de desenho no painel de opções */}
            <AnimatedBorder rx={12} ry={12} />
            <h4>Opções</h4>
            <OptionItem onClick={() => deleteProduct(item.id)}>
              {/* SVG de borda para animação de desenho no item de opção */}
              <AnimatedBorder rx={12} ry={12} />
              Apagar produto
            </OptionItem>
          </OptionsPanel>
        )}
      </OptionsWrapper>
    </Container>
  );
}

CardProductAdmin.propTypes = {
  item: PropTypes.object.isRequired,
};
