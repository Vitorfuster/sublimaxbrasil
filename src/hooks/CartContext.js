import React, { createContext, useContext, useEffect, useState } from "react";

import PropTypes from "prop-types";

const CartContext = createContext({});

export const CartProvider = ({ children }) => {
  const [cartProducts, setCartProducts] = useState([]);

  // função que atualiza o estado
  const putProductsInCart = async (products) => {
    // console.log(products);
    const getIten = await localStorage.getItem("codeburger:cartInfo");
    const CartAtt = JSON.parse(getIten);
    const cartIndex = CartAtt.findIndex(
      (cartProduct) => cartProduct.id === products.id
    );

    let newCartProduct = [];
    if (cartIndex >= 0) {
      newCartProduct = CartAtt;
      newCartProduct[cartIndex].qtd += 1;

      await localStorage.setItem(
        "codeburger:cartInfo",
        JSON.stringify(newCartProduct)
      );
    } else {
      products.qtd = 1;

      newCartProduct = [...CartAtt, products]; // foi necessário para que o estado não demore dms a executar
      setCartProducts(newCartProduct); // atualiza o estado com as informações do usuário

      await localStorage.setItem(
        "codeburger:cartInfo",
        JSON.stringify(newCartProduct)
      ); // Gravar os dados no LOCALSTORAGE
    }
  };

  const increaseProducts = async (productId) => {
    const newCart = cartProducts.map((product) => {
      return product.id === productId
        ? { ...product, qtd: product.qtd + 1 }
        : product;
    });

    setCartProducts(newCart);

    await localStorage.setItem("codeburger:cartInfo", JSON.stringify(newCart));
  };

  const downProductsInCart = async (productId) => {
    const index = cartProducts.findIndex((product) => product.id === productId);
    if (cartProducts[index].qtd > 1) {
      const newCart = cartProducts.map((product) => {
        return product.id === productId
          ? { ...product, qtd: product.qtd - 1 }
          : product;
      });

      setCartProducts(newCart);
      await localStorage.setItem(
        "codeburger:cartInfo",
        JSON.stringify(newCart)
      );
    } else if (cartProducts[index].qtd === 1) {
      const newCart = cartProducts.map((product) => {
        return product.id === productId ? { ...product, qtd: 0 } : product;
      });

      setCartProducts(newCart);
      await localStorage.setItem(
        "codeburger:cartInfo",
        JSON.stringify(newCart)
      );
    } else {
      const newCart = cartProducts.filter(
        (product) => product.id !== productId
      );
      setCartProducts(newCart);
      await localStorage.setItem(
        "codeburger:cartInfo",
        JSON.stringify(newCart)
      );
    }
  };

  // Bucar itens do carrinho no local storage
  useEffect(() => {
    // recuperar os dados do LOCALSTORAGE
    const loadUserData = async () => {
      const clientCartData = await localStorage.getItem("codeburger:cartInfo");

      if (clientCartData) {
        setCartProducts(JSON.parse(clientCartData));
      }
    };

    loadUserData();
  }, []);

  // O return deixa os itens do Value exposto para toda a aplicação
  return (
    <CartContext.Provider
      value={{
        putProductsInCart,
        downProductsInCart,
        cartProducts,
        increaseProducts,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used with UserContext");
  }

  return context;
};

CartProvider.propTypes = {
  children: PropTypes.node,
};
