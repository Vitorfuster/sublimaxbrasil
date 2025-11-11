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
  CupomImgContainer,
  CupomText,
  CupomTextInfo,
} from "./style";
import formatCurrency from "../../../../utils/formatCurrency";
import UserCupons from "../../../../utils/UserCupons";
import BuscarFrete from "../../../../utils/BuscarFrete";

function Frete({ quantity, freteAndTicket }) {
  const { userData } = useUser();
  const [userLog, setUserLog] = useState(userData);
  const [openModalFrete, setOpenModalFrete] = useState(false);
  const [freteValues, setFreteValues] = useState();
  const [userModalLog, setUserModalLog] = useState();
  // Informações do usuário
  const [userInfo, setUserInfo] = useState();
  const [userAdress, setUserAdress] = useState();
  const [freteLoad, setFreteLoad] = useState(false);
  const [loginByModal, setLoginByModal] = useState(false);
  const [moreFrete, setMoreFrete] = useState([]);
  const [awaitRequestFrete, setAwaitRequestFrete] = useState(false);

  useEffect(() => {
    if (userModalLog === 1) {
      setUserLog(userData);
    }
  }, [userModalLog]);

  // Busca informações do cadastro do user
  useEffect(() => {
    if (loginByModal === false) {
      const UserCadastro = async () => {
        try {
          if (userData.id) {
            const { data: userInfoApi } = await api.get(
              `/user-info/${userData.id}`
            );

            const { data: userAdressApi } = await api.get(
              `/user-adress/${userData.id}`
            );

            setUserInfo(userInfoApi);
            setUserAdress(userAdressApi);
          }
        } catch (error) {
          // toast.error(
          //   "Serviço indisponível no momento, por favor, notifique o suporte"
          // );
        }
      };

      UserCadastro();
    } else {
      return;
    }
  }, []);

  // UseEffect que chama a função de buscar único frete e renderizar na tela
  useEffect(() => {
    if (userAdress) {
      const callTheFunction = async () => {
        if (quantity === 1 && moreFrete.length === 0) {
          setFreteLoad(true);
          setFreteValues();
          try {
            const freteResponse = await BuscarFrete(
              quantity,
              userAdress.cep,
              userData.id
            );

            const newResponse = { ...freteResponse, quantity: quantity };

            setMoreFrete([newResponse]);
          } catch (error) {
            setFreteLoad(false);
          }
        }
      };
      callTheFunction();
    }
  }, [userAdress, quantity]);

  // Buscar mais fretes
  useEffect(() => {
    if (userAdress) {
      const callTheFunction = async () => {
        if (quantity <= 4) {
          if (
            moreFrete.length >= 0 &&
            moreFrete.length <= 4 &&
            moreFrete.length !== 4 &&
            awaitRequestFrete === false
          ) {
            setAwaitRequestFrete(true);
            let fretes = [];
            for (let i = 2; i <= 4; i++) {
              const response = await BuscarFrete(
                i,
                userAdress.cep,
                userData.id
              );
              fretes.push({ ...response, quantity: i });
            }
            setMoreFrete((prev) => [...prev, ...fretes]);
            setAwaitRequestFrete(false);
          } else {
            return;
          }
        } else if (quantity <= 8 && quantity > 4) {
          if (
            moreFrete.length >= 0 &&
            moreFrete.length <= 8 &&
            moreFrete.length !== 8 &&
            awaitRequestFrete === false
          ) {
            setAwaitRequestFrete(true);
            let fretes = [];
            for (let i = 5; i <= 8; i++) {
              const response = await BuscarFrete(
                i,
                userAdress.cep,
                userData.id
              );
              fretes.push({ ...response, quantity: i });
            }
            setMoreFrete((prev) => [...prev, ...fretes]);
            setAwaitRequestFrete(false);
          } else {
            return;
          }
        }
      };

      callTheFunction();
    }
  }, [userAdress, quantity, awaitRequestFrete]);

  // Função que seleciona o frete para exibir os resultados
  useEffect(() => {
    if (moreFrete.length >= 1) {
      const selectFrete = moreFrete.filter(
        (frete) => frete.quantity === quantity
      );
      console.log("EU SOU O FRETE ENCONTRADO NO ARRAY");
      console.log(selectFrete);
      if (selectFrete.length === 1) {
        console.log("PASSEI COMO TRUE");
        setFreteValues({
          cupom: selectFrete[0].betterOptions.cupom,
          freteOption: selectFrete[0].betterOptions.freteOption,
        });

        setFreteLoad({
          userCupons: selectFrete[0].userCupons,
          freteOptions: selectFrete[0].freteOptions,
          cupomSelect: selectFrete[0].betterOptions.cupom,
          freteSelect: selectFrete[0].betterOptions.freteOption,
        });
      } else {
        setFreteValues();
        setFreteLoad(true);
      }
    }
  }, [quantity, awaitRequestFrete, moreFrete]);

  // PENSO EM FAZER UMA BUSCA DE ATÉ 5 itens NA API DE UMA VEZ, PARA EVITAR FAZER REQUISIÇÕES AO ALTERAR A QUANTIDADE, SOMENTE EM QUANTIDADES ACIMA DE 5

  console.log("RESPOSTA MOREFRETE");
  console.log(moreFrete);
  console.log("RESPOSTA MOREFRETE");
  console.log(freteValues);
  return (
    <FreteContainer>
      {userLog && userLog.id ? (
        <>
          {freteValues && freteValues.cupom ? (
            <>
              <FreeShippingPrice>FRETE GRÁTIS ACIMA DE R$ 59</FreeShippingPrice>
              <Desconto
              // freteGratis={
              //   freteValues.cupom.discount >= freteValues.freteOption.price
              // }
              // onlyDiscount={
              //   freteValues.cupom.discount < freteValues.freteOption.price
              // }
              >
                <p>Cupom aplicado!</p>
                <CupomImgContainer>
                  <CupomText>
                    <p>Cupom</p>
                    <div className="gradeCupom">
                      <CupomTextInfo>
                        <span>
                          {freteValues.cupom.icon}
                          {/* {freteValues.cupom.name} */}
                          {freteValues.cupom.name}
                        </span>
                        <span>
                          {
                            /* {(
                            (freteValues.cupom.discount /
                              freteValues.freteOption.price) *
                            100
                          ).toFixed(0)} */
                            freteValues.cupom.discount <
                            freteValues.freteOption.price
                              ? (
                                  (freteValues.cupom.discount /
                                    freteValues.freteOption.price) *
                                  100
                                ).toFixed(0)
                              : 100
                          }
                          % OFF
                        </span>
                      </CupomTextInfo>
                    </div>
                  </CupomText>
                </CupomImgContainer>

                <DiscountValues
                  freteGratis={
                    freteValues.cupom.discount >= freteValues.freteOption.price
                  }
                >
                  <span>
                    Frete:{" "}
                    <span>
                      {freteValues.cupom.discount >=
                      freteValues.freteOption.price
                        ? "Grátis"
                        : formatCurrency(
                            freteValues.freteOption.price -
                              freteValues.cupom.discount
                          )}
                    </span>
                  </span>
                </DiscountValues>

                <FreteCalculate onClick={() => setOpenModalFrete(true)}>
                  Ver opções de frete
                </FreteCalculate>
              </Desconto>
              <FastShipping>
                {freteValues.freteOption.delivery_time > 3 ? (
                  <p>
                    Chegará{" "}
                    <span>
                      {freteValues.freteOption.delivery_time === 1
                        ? "Amanhã"
                        : `em ${freteValues.freteOption.delivery_time} dias`}
                    </span>
                  </p>
                ) : (
                  <p>
                    Chegará rápido{" "}
                    <span>
                      {freteValues.freteOption.delivery_time === 1
                        ? "Amanhã"
                        : `em ${freteValues.freteOption.delivery_time} dias`}
                    </span>
                  </p>
                )}
                {/* 
                <span>
                  Comprando dentro das próximas <span>2h 20min </span>
                </span> */}
              </FastShipping>
            </>
          ) : freteValues ? (
            <>
              <Desconto>
                <p>Sem frete grátis neném</p>
                <DiscountValues>
                  <span>
                    Frete: {formatCurrency(freteValues.freteOption.price)}
                  </span>
                </DiscountValues>
                <FreteCalculate onClick={() => setOpenModalFrete(true)}>
                  Ver opções de frete
                </FreteCalculate>
              </Desconto>
              <FastShipping>
                {freteValues.freteOption.delivery_time > 3 ? (
                  <p>
                    Chegará{" "}
                    <span>
                      {freteValues.freteOption.delivery_time === 1
                        ? "Amanhã"
                        : `em ${freteValues.freteOption.delivery_time} dias`}
                    </span>
                  </p>
                ) : (
                  <p>
                    Chegará rápido{" "}
                    <span>
                      {freteValues.freteOption.delivery_time === 1
                        ? "Amanhã"
                        : `em ${freteValues.freteOption.delivery_time} dias`}
                    </span>
                  </p>
                )}
                {/* 
                <span>
                  Comprando dentro das próximas <span>2h 20min </span>
                </span> */}
              </FastShipping>
            </>
          ) : freteLoad === true ? (
            <Desconto>
              <p className="loadingText">Calculando frete</p>
            </Desconto>
          ) : (
            <Desconto>
              <p>Frete Grátis?</p>
              <FreteCalculate onClick={() => setOpenModalFrete(true)}>
                Calcular frete
              </FreteCalculate>
            </Desconto>
          )}
          {/* <Desconto>
            <p>Frete Grátis?</p>
            <FreteCalculate onClick={() => setOpenModalFrete(true)}>
              Ver opções
            </FreteCalculate>
          </Desconto> */}
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
        freteLoad={freteLoad}
        loginByModal={() => {
          setLoginByModal(true);
        }}
      />
    </FreteContainer>
  );
}
export default Frete;
