// Bibliotecas
import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { createPortal } from "react-dom";

//Api
import api from "../../../../../../services/api";

// Estilos
import {
  Over,
  ModalBox,
  CepTitle,
  ModalHeader,
  CuponsContainer,
  Cupom,
  CardCondition,
  CuponIcon,
  CupomName,
  CupomPrice,
  CupomInfo,
  CupomQuantity,
  CupomExpires,
  CupomContent,
  CuponConditions,
  TitleCupons,
} from "./style";

// Componentes
import { ButtonClean } from "../../../../../../components";
import { toast } from "react-toastify";

import formatCurrency from "../../../../../../utils/formatCurrency";

import { FaInfinity } from "react-icons/fa6";
import UserCupons from "../../../../../../utils/UserCupons";

export default function Modal({
  open,
  onClose,
  freteOptions,
  cupomSelected,
  quantity,
  freteLoad,
  userLog,
}) {
  const [isValidCupom, setIsValidCupom] = useState();
  const [cupomSelectedId, setCupomSelectedId] = useState();
  // const userCupons = [
  //   {
  //     id: 1,
  //     name: "Lançamento",
  //     discount: 10,
  //     icon: "😄",
  //     quantity: 10,
  //     expires: "01/12/2025",
  //     situation: undefined,
  //     condition: null,
  //   },
  //   {
  //     id: 2,
  //     name: "Bem-vindo",
  //     discount: 12,
  //     icon: "💖",
  //     quantity: 1,
  //     expires: 0,
  //     situation: undefined,
  //     condition: [
  //       {
  //         id: 3,
  //         name: "FisrtTimeBuy",
  //         value: 0,
  //         text: "Primeira compra",
  //         valid: undefined,
  //       },
  //     ],
  //   },

  //   {
  //     id: 3,
  //     name: "Frete Grátis",
  //     discount: 20,
  //     icon: "🎁",
  //     quantity: 10,
  //     expires: 0,
  //     situation: undefined,
  //     condition: [
  //       {
  //         id: 1,
  //         name: "quantityBuy",
  //         value: 2,
  //         text: "Comprar 2 unidades",
  //         valid: undefined,
  //       },
  //       {
  //         id: 2,
  //         name: "fretePrice",
  //         value: 20,
  //         text: null,
  //         valid: undefined,
  //       },
  //     ],
  //   },
  // ];

  useEffect(() => {
    console.log(freteLoad);
    if (freteLoad === false || freteLoad === true) {
      return;
    } else {
      setIsValidCupom(freteLoad.userCupons);
      setCupomSelectedId(freteLoad.cupomSelect.id);
    }
  }, [freteLoad]);

  useEffect(() => {
    if (freteLoad === false || freteLoad === true) {
      const cuponsValidados = UserCupons(userLog?.id, freteOptions, quantity);

      setIsValidCupom(cuponsValidados);
    }
  }, [freteLoad]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden"; // trava scroll
    } else {
      document.body.style.overflow = ""; // libera scroll
    }

    return () => {
      document.body.style.overflow = ""; // garante liberar ao desmontar
    };
  }, [open]);

  const cupomSelectedValid = (cupom) => {
    if (cupom.situation === false) {
      toast.error("Cupom inválido");
      return;
    }
    cupomSelected(cupom);
    onClose();
  };

  if (!open) return null;
  return createPortal(
    <Over onClick={onClose}>
      <ModalBox onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <CepTitle>
            Seus cupons <span>Você poderá ver todos os seus cupons</span>
          </CepTitle>
          <button onClick={onClose}>
            <IoMdClose />
          </button>
        </ModalHeader>
        <TitleCupons>Escolha um cupom</TitleCupons>
        <CuponsContainer>
          {isValidCupom &&
            isValidCupom.map((cupom) => (
              <Cupom
                key={cupom.id}
                onClick={() => {
                  cupomSelectedValid(cupom);
                  {
                    cupom.situation === true && setCupomSelectedId(cupom.id);
                  }
                }}
                situation={!cupom.situation}
                cupomSelectedId={
                  cupomSelectedId === cupom.id && cupom.situation
                }
              >
                <CupomContent>
                  <CuponIcon>{cupom.icon}</CuponIcon>
                  <div>
                    <CupomName>{cupom.name}</CupomName>
                    <CupomInfo>
                      <CupomQuantity>{cupom.quantity} Unidades</CupomQuantity>
                      {cupom.expires === 0 ? (
                        <CupomExpires>
                          Expira em:
                          <FaInfinity className="infinityIcon" />
                        </CupomExpires>
                      ) : (
                        <CupomExpires>Expira em: {cupom.expires}</CupomExpires>
                      )}
                    </CupomInfo>
                  </div>
                  <CupomPrice>{formatCurrency(cupom.discount)}</CupomPrice>
                </CupomContent>

                <div>
                  {cupom.condition !== null && (
                    <CuponConditions>
                      <p>Condições: </p>
                      {cupom.condition.map((condition) => (
                        <CardCondition isValid={condition.valid}>
                          {condition.text !== null && (
                            <span key={condition.id}>{condition.text}</span>
                          )}
                        </CardCondition>
                      ))}
                    </CuponConditions>
                  )}
                </div>
              </Cupom>
            ))}
        </CuponsContainer>
      </ModalBox>
    </Over>,
    document.getElementById("modal-root")
  );
}
