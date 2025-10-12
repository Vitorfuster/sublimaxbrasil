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
  BorderSvg,
} from "./style";

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
      <BorderSvg className="border-draw" preserveAspectRatio="none">
        <rect x="0" y="0" width="100%" height="100%" rx="16" ry="16" className="border-rect" />
      </BorderSvg>
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
        <BorderSvg className="border-draw" preserveAspectRatio="none">
          <rect x="0" y="0" width="100%" height="100%" rx="12" ry="12" className="border-rect" />
        </BorderSvg>
        Ver produto
      </Button>
      <OptionsWrapper ref={optionsRef}>
        <OptionButton onClick={() => setShowOptions((prev) => !prev)}>
          {/* SVG de borda para animação de desenho no botão de opções */}
          <BorderSvg className="border-draw" preserveAspectRatio="none">
            <rect x="0" y="0" width="100%" height="100%" rx="12" ry="12" className="border-rect" />
          </BorderSvg>
          Opções
        </OptionButton>

        {showOptions && (
          <OptionsPanel>
            {/* SVG de borda para animação de desenho no painel de opções */}
            <BorderSvg className="border-draw" preserveAspectRatio="none">
              <rect x="0" y="0" width="100%" height="100%" rx="12" ry="12" className="border-rect" />
            </BorderSvg>
            <h4>Opções</h4>
            <OptionItem onClick={() => deleteProduct(item.id)}>
              {/* SVG de borda para animação de desenho no item de opção */}
              <BorderSvg className="border-draw" preserveAspectRatio="none">
                <rect x="0" y="0" width="100%" height="100%" rx="12" ry="12" className="border-rect" />
              </BorderSvg>
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
