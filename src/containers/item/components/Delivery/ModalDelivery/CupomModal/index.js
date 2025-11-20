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
  ButtonsContainer,
  NovoBotao,
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
  freteSelect,
  userLog,
  modalCupomConfig,
  cupomDisable,
  cupomLoad,
}) {
  const [isValidCupom, setIsValidCupom] = useState();
  const [cupomSelectedId, setCupomSelectedId] = useState();
  const [cupomSelectedIdBefore, setCupomSelectedIdBefore] = useState(false);

  // Reseta o cupom selecionado, buscando do estado mestre de frete
  useEffect(() => {
    if (modalCupomConfig.action === 1) {
      setCupomSelectedId(modalCupomConfig.id);
    } else if (modalCupomConfig.action === 2) {
      setCupomSelectedId(null);
      setCupomSelectedIdBefore(false);
    }
  }, [modalCupomConfig]);

  // Filtra os cupons a serem renderizados, seleciona default values
  useEffect(() => {
    if (freteLoad === false || freteLoad === true) {
      if (freteSelect) {
        const cuponsValidados = cupomLoad;

        // SELECIONA OS CUPONS DE FRETE GRÁTIS
        const freteGratisCupons = cuponsValidados.filter(
          (cupom) => cupom.id === 3 || cupom.id === 4
        );

        if (freteGratisCupons.length >= 1) {
          let cupomFind = null;
          // SELECIONA O PRIMEIRO CUPOM QUE CONSEGUE ABATER O VALOR DO FRETE
          freteGratisCupons.forEach((cupom) => {
            if (cupom.discount > freteSelect.price && cupomFind === null) {
              cupomFind = cupom;
            } else {
              return;
            }
          });

          // FILTRA APENAS OS CUPONS DE DESCONTOS, OS DE FRETE GRÁTIS SÃO REMOVIDOS DO ARRAY
          const cupomDiscounts = cuponsValidados.filter(
            (cupom) => cupom.id !== 3 && cupom.id !== 4
          );

          // ADICIONA O CUPOM DE FRETE GRATIS ADEQUADO PARA O FRETE SELECIONADO NO ARRAY
          cupomDiscounts.push(cupomFind);

          console.log(cupomDiscounts);

          // ATUALIZA OS CUPONS PARA O FRETE
          setIsValidCupom(cupomDiscounts);
        } else {
          // Caso não tenha nenhum cupom de frete grátis, adiciona todos no estado
          setIsValidCupom(cuponsValidados);
        }
      }
    } else if (freteLoad !== false && freteLoad !== true) {
      // SELECIONA OS CUPONS DE FRETE GRÁTIS
      const freteGratisCupons = freteLoad.userCupons.filter(
        (cupom) => cupom.id === 3 || cupom.id === 4
      );

      if (freteGratisCupons.length >= 1) {
        let cupomFind = null;
        // SELECIONA O PRIMEIRO CUPOM QUE CONSEGUE ABATER O VALOR DO FRETE
        freteGratisCupons.forEach((cupom) => {
          if (cupom.discount > freteSelect.price && cupomFind === null) {
            cupomFind = cupom;
          } else {
            return;
          }
        });

        // FILTRA APENAS OS CUPONS DE DESCONTOS, OS DE FRETE GRÁTIS SÃO REMOVIDOS DO ARRAY
        const cupomDiscounts = freteLoad.userCupons.filter(
          (cupom) => cupom.id !== 3 && cupom.id !== 4
        );

        // ADICIONA O CUPOM DE FRETE GRATIS ADEQUADO PARA O FRETE SELECIONADO NO ARRAY
        cupomDiscounts.push(cupomFind);

        // ATUALIZA OS CUPONS PARA O FRETE
        setIsValidCupom(cupomDiscounts);
        console.log("rodeiii");
        // ESTOU ANALISANDO O SE ESTA TUDO OKAY COM A PARTE DE CUPONS SELECIONADOS QUANDO O USUÁRIO ESTA LOGADO
        // setCupomSelectedId(freteLoad.cupomSelect.id);
      } else {
        // Caso não tenha nenhum cupom de frete grátis, adiciona todos no estado
        setIsValidCupom(freteLoad.userCupons);
      }
    } else {
      return;
    }
  }, [freteLoad, freteSelect]);

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

  // Selecionar cupom
  const enviarCupom = (cupom) => {
    if (cupom.id === cupomSelectedIdBefore || cupom.id === cupomSelectedId) {
      cupomSelected();
      setCupomSelectedId();
      setCupomSelectedIdBefore(false);
      cupomDisable();
      return;
    }

    if (cupom.situation === true) {
      cupomSelected(cupom);
      setCupomSelectedId(cupom.id);
      setCupomSelectedIdBefore(cupom.id);
    } else {
      toast.error("Cupom inválido");
      return;
    }
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
                  enviarCupom(cupom);
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
        <ButtonsContainer>
          <NovoBotao
            ButtonOp={true}
            notVisible={!cupomSelectedId > 0}
            widthDinamico={true}
            onClick={() => {
              cupomSelected();
              setCupomSelectedId();
              setCupomSelectedIdBefore(false);
              cupomDisable();
            }}
          >
            Limpar
          </NovoBotao>
          <NovoBotao
            widthDinamico={true}
            onClick={() => {
              onClose();
            }}
          >
            Ok
          </NovoBotao>
        </ButtonsContainer>
      </ModalBox>
    </Over>,
    document.getElementById("modal-root")
  );
}
