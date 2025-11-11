import UserCupons from "./UserCupons";

// Api
import api from "../services/api";

const BuscarFrete = async (qtd, cep, idUser) => {
  const frete = { to: cep, quantity: qtd };
  try {
    const { data: freteResponse } = await api.post(
      "http://localhost:3002/frete-calc",
      frete
    );

    const userCupons = UserCupons(idUser, freteResponse, qtd);

    // <SELECIONAR FRETE MAIS BARATO>
    let fretePrice = null;
    freteResponse.forEach((frete) => {
      if (fretePrice === null) {
        fretePrice = frete.price;
      } else {
        if (frete.price < fretePrice) {
          fretePrice = frete.price;
        }
      }
    });

    const freteSelect = freteResponse.filter(
      (frete) => frete.price === fretePrice
    );
    // <SELECIONAR FRETE MAIS BARATO />

    // <SELECIONAR CUPOM VALIDO MAIOR>
    let cupomDiscount = null;
    const userValidsCupons = userCupons.filter(
      (cupom) => cupom.situation === true
    );
    userValidsCupons.forEach((cupom) => {
      if (cupomDiscount === null) {
        cupomDiscount = cupom.discount;
      } else {
        if (cupom.discount > cupomDiscount) {
          cupomDiscount = cupom.discount;
        }
      }
    });

    const cupomSelect = userValidsCupons.filter(
      (cupom) => cupom.discount === cupomDiscount
    );

    const freteGlobalResponse = {
      betterOptions: {
        cupom: cupomSelect[0],
        freteOption: freteSelect[0],
      },

      userCupons: userCupons,
      freteOptions: freteResponse,
    };

    return freteGlobalResponse;
  } catch (error) {
    return { message: error };
  }
};

export default BuscarFrete;
