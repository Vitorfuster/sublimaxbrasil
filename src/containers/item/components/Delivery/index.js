// Bibliotecas
import React, { useEffect, useState } from "react";
import axios from "axios";

import FreteModal from "./ModalDelivery/FreteModal"; // Modal de frete

import { toast } from "react-toastify";
import { HiOutlineArrowTurnDownRight } from "react-icons/hi2";

// Api
import api from "../../../../services/api";

import { useUser } from "../../../../hooks/UserContext";

// Estilos
import {
  FreteContainer,
  FreeShippingPrice,
  FastShipping,
  FreeShipping,
  EnvioBrasil,
  Desconto,
  DiscountValues,
  FreteCalculate,
} from "./style";
import formatCurrency from "../../../../utils/formatCurrency";

function Frete({ quantity, freteAndTicket }) {
  const { userData } = useUser();
  const [userLog, setUserLog] = useState(userData);
  const [openModalFrete, setOpenModalFrete] = useState(false);
  const [freteValues, setFreteValues] = useState();
  const [userModalLog, setUserModalLog] = useState();
  console.log(freteValues);

  useEffect(() => {
    setFreteValues();
  }, [quantity]);

  useEffect(() => {
    if (userModalLog === 1) {
      setUserLog(userData);
    }
  }, [userModalLog]);
  return (
    <FreteContainer>
      {userLog && userLog.id ? (
        <>
          <FreeShippingPrice>FRETE GRÁTIS ACIMA DE R$ 59</FreeShippingPrice>
          <FastShipping>
            <p>
              Chegará rápido <span>amanhã</span>
            </p>
            <span>
              Comprando dentro das próximas <span>2h 20min </span>
            </span>
          </FastShipping>
          <FreeShipping>
            Chegará grátis entre amanhã e sábado{" "}
            <span>Mais detalhes e formas de entrega</span>
          </FreeShipping>
          <Desconto>
            <p>Frete Grátis?</p>
            <FreteCalculate onClick={() => setOpenModalFrete(true)}>
              Calcular frete
            </FreteCalculate>
          </Desconto>
        </>
      ) : (
        <>
          <EnvioBrasil>
            Envio para todo Brasil!{" "}
            <span>Saiba os prazos e formas de envio</span>
          </EnvioBrasil>
          {freteValues && freteValues.cupom ? (
            <Desconto
              freteGratis={
                freteValues.cupom.discount >= freteValues.freteOption.price
              }
              onlyDiscount={
                freteValues.cupom.discount < freteValues.freteOption.price
              }
            >
              <p>
                {freteValues.cupom.discount >= freteValues.freteOption.price
                  ? "Frete Grátis!"
                  : "Desconto no frete"}
              </p>
              {freteValues.cupom.discount < freteValues.freteOption.price && (
                <DiscountValues>
                  <span>
                    Frete:{" "}
                    {formatCurrency(
                      freteValues.freteOption.price - freteValues.cupom.discount
                    )}
                  </span>
                </DiscountValues>
              )}

              <FreteCalculate onClick={() => setOpenModalFrete(true)}>
                Calcular outro CEP
              </FreteCalculate>
            </Desconto>
          ) : freteValues ? (
            <Desconto>
              <p>Sem frete grátis neném</p>
              <DiscountValues>
                <span>
                  Frete: {formatCurrency(freteValues.freteOption.price)}
                </span>
              </DiscountValues>
              <FreteCalculate onClick={() => setOpenModalFrete(true)}>
                Calcular outro CEP
              </FreteCalculate>
            </Desconto>
          ) : (
            <Desconto>
              <p>Frete Grátis?</p>
              <FreteCalculate onClick={() => setOpenModalFrete(true)}>
                Calcular frete
              </FreteCalculate>
            </Desconto>
          )}
        </>
      )}
      <FreteModal
        quantity={quantity}
        userLog={userLog}
        open={openModalFrete}
        userModalLog={(log) => {
          setUserModalLog(log);
        }}
        onClose={() => setOpenModalFrete(false)}
        freteValues={(value) => {
          setFreteValues(value);
          freteAndTicket(value);
        }}
      />
    </FreteContainer>
  );
}
export default Frete;
