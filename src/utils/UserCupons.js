const userCupons = [
  {
    id: 1,
    name: "Lançamento",
    discount: 10,
    icon: "😄",
    quantity: 10,
    expires: "01/12/2025",
    situation: undefined,
    condition: null,
  },
  {
    id: 2,
    name: "Bem_vindo",
    discount: 12,
    icon: "💖",
    quantity: 1,
    expires: 0,
    situation: undefined,
    condition: [
      {
        id: 3,
        name: "FisrtTimeBuy",
        value: 0,
        text: "Primeira compra",
        valid: undefined,
      },
    ],
  },
  {
    id: 3,
    name: "Frete_Grátis",
    discount: 20,
    icon: "🎁",
    quantity: 10,
    expires: 0,
    situation: undefined,
    condition: [
      {
        id: 1,
        name: "quantityBuy",
        value: 2,
        text: "Comprar 2 unidades",
        valid: undefined,
      },
      {
        id: 2,
        name: "fretePrice",
        value: 20,
        text: null,
        valid: undefined,
      },
    ],
  },
  {
    id: 4,
    name: "Frete_Grátis",
    discount: 30,
    icon: "🎁",
    quantity: 10,
    expires: 0,
    situation: undefined,
    condition: [
      {
        id: 1,
        name: "quantityBuy",
        value: 3,
        text: "Comprar 3 unidades",
        valid: undefined,
      },
      {
        id: 2,
        name: "fretePrice",
        value: 30,
        text: null,
        valid: undefined,
      },
    ],
  },
];

const UserCupons = (userId, freteOptions, quantity) => {
  // Preços de frete
  const fretePriceArray = freteOptions.map((frete) => {
    const onlyFretePrice = frete.price;
    return onlyFretePrice;
  });

  const cupomConditionsValid = userCupons.map((cupom) => {
    if (cupom.condition === null) {
      const cupomCondition = {
        ...cupom,
        situation: true,
      };
      return cupomCondition;
    }

    const validate = cupom.condition.map((condition) => {
      if (condition.id === 1) {
        if (condition.value <= quantity) {
          const cupomCondition = {
            ...condition,
            valid: true,
          };

          return cupomCondition;
        } else {
          const cupomCondition = {
            ...condition,
            valid: false,
          };

          return cupomCondition;
        }
      }

      if (condition.id === 2) {
        let fretePriceResultado = false;
        fretePriceArray.map((price) => {
          if (price <= condition.value) {
            fretePriceResultado = true;
            return;
          } else if (price > condition.value && fretePriceResultado === false) {
            fretePriceResultado = false;
          } else {
            return;
          }
        });

        const cupomCondition = {
          ...condition,
          valid: fretePriceResultado,
        };

        return cupomCondition;
      }

      if (condition.id === 3) {
        if (condition.value === 0) {
          return { ...condition, valid: true };
        } else {
          return { ...condition, valid: false };
        }
      }
    });
    const cupomValidado = {
      ...cupom,
      condition: validate,
    };
    return cupomValidado;
  });

  const cupomSituation = cupomConditionsValid.map((cupom) => {
    if (cupom.condition !== null) {
      let isValid = true;
      const conditionsValid = cupom.condition.map((condition) => {
        if (condition.valid === false) {
          isValid = false;
        }
      });

      const cupomUpdate = {
        ...cupom,
        situation: isValid,
      };

      return cupomUpdate;
    }
    return cupom;
  });

  return cupomSituation;
};

export default UserCupons;
