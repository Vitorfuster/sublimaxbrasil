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
  const [freteGlobal, setFreteGlobal] = useState(false);
  const [userModalLog, setUserModalLog] = useState();
  // Informações do usuário
  const [userInfo, setUserInfo] = useState();
  const [userAdress, setUserAdress] = useState();
  const [freteLoad, setFreteLoad] = useState(false);
  const [findInUserAdress, setFindInUserAdress] = useState(true);
  const [loginByModal, setLoginByModal] = useState(false);
  const [moreFrete, setMoreFrete] = useState([]);
  const [awaitRequestFrete, setAwaitRequestFrete] = useState(false);
  const [blockTempFrete, setBlockTempFrete] = useState(false);

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
    if (findInUserAdress === true) {
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

              // console.log(freteResponse);

              const newResponse = {
                ...freteResponse,
                quantity: quantity,
                userCep: userAdress.cep,
              };

              setMoreFrete([newResponse]);
            } catch (error) {
              setFreteLoad(false);
            }
          }
        };
        callTheFunction();
      }
    }
  }, [userAdress, quantity]);

  // Buscar mais fretes
  useEffect(() => {
    if (findInUserAdress === true) {
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
                fretes.push(response);
              }
              if (blockTempFrete === false) {
                console.log(blockTempFrete);
                setMoreFrete((prev) => [...prev, ...fretes]);
              }
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
                fretes.push(response);
              }
              if (blockTempFrete === false) {
                setMoreFrete((prev) => [...prev, ...fretes]);
              }
              setAwaitRequestFrete(false);
            } else {
              return;
            }
          }
        };

        callTheFunction();
      }
    }
  }, [userAdress, quantity, awaitRequestFrete]);

  // ESTOU ARRUMANDO UM BUG QUE SE O LEAD BUSCAR OUTRO FRETE ENQUANTO O FRETE ANTERIOR CARREGA, ELE MESCLA OS 2

  // useEffect(() => {
  //   if (moreFrete?.length > 0 && freteGlobal !== false) {
  //     console.log("DEI TRUE");
  //     if (moreFrete[0].userCep === freteGlobal.userCep) {
  //       return;
  //     } else {
  //       // setMoreFrete();
  //       setAwaitRequestFrete(true);
  //       setAwaitRequestFrete(false);
  //     }
  //   }
  // }, [freteGlobal, freteValues, moreFrete]);

  // Buscar frete alternativo
  useEffect(() => {
    if (
      findInUserAdress === false &&
      freteValues?.freteOption.id > 0 &&
      freteGlobal !== false
    ) {
      const callTheFunction = async () => {
        if (quantity <= 4 || moreFrete.length < 4) {
          if (
            moreFrete.length >= 0 &&
            moreFrete.length <= 4 &&
            moreFrete.length !== 4 &&
            awaitRequestFrete === false
          ) {
            setAwaitRequestFrete(true);

            let fretes = [];
            for (let i = 1; i <= 4; i++) {
              if (i !== freteGlobal.quantity) {
                const response = await BuscarFrete(
                  i,
                  freteGlobal.userCep,
                  userData.id
                );

                fretes.push({
                  ...response,
                  freteSelected: null,
                  cupomSelected: null,
                });
              } else {
                fretes.push({
                  ...freteGlobal,
                  freteSelected: freteValues.freteOption,
                  cupomSelected: freteValues.cupom,
                });
              }
            }

            if (blockTempFrete === false) {
              setMoreFrete((prev) => [...prev, ...fretes]);
            }
            setAwaitRequestFrete(false);
          } else {
            return;
          }
        }
        if (quantity <= 8 && quantity > 4) {
          if (
            moreFrete.length >= 0 &&
            moreFrete.length <= 8 &&
            moreFrete.length !== 8 &&
            awaitRequestFrete === false
          ) {
            setAwaitRequestFrete(true);
            let fretes = [];
            for (let i = 5; i <= 8; i++) {
              if (i !== freteGlobal.quantity) {
                const response = await BuscarFrete(
                  i,
                  freteGlobal.userCep,
                  userData.id
                );
                fretes.push({
                  ...response,
                  freteSelected: null,
                  cupomSelected: null,
                });
              } else {
                fretes.push({
                  ...freteGlobal,
                  freteSelected: freteValues.freteOption,
                  cupomSelected: freteValues.cupom,
                });
              }
            }
            if (blockTempFrete === false) {
              setMoreFrete((prev) => [...prev, ...fretes]);
            }
            setAwaitRequestFrete(false);
          } else {
            return;
          }
        }
      };

      callTheFunction();
    }
  }, [quantity, awaitRequestFrete, findInUserAdress, freteGlobal]);

  // Função que seleciona o frete para exibir os resultados
  useEffect(() => {
    if (moreFrete.length >= 1) {
      const selectFrete = moreFrete.filter(
        (frete) => frete.quantity === quantity
      );
      if (selectFrete.length === 1) {
        // Seleciona os valores de frete e cupons selecionados se existirem, se não seleciona as melhores opções.
        if (selectFrete[0].freteSelected) {
          setFreteValues({
            cupom: selectFrete[0].cupomSelected,
            freteOption: selectFrete[0].freteSelected,
          });

          setFreteLoad({
            userCupons: selectFrete[0].userCupons,
            freteOptions: selectFrete[0].freteOptions,
            cupomSelect: selectFrete[0].cupomSelected,
            freteSelect: selectFrete[0].freteSelected,
            userCep: selectFrete[0].userCep,
          });
        } else {
          setFreteValues({
            cupom: selectFrete[0].betterOptions.cupom,
            freteOption: selectFrete[0].betterOptions.freteOption,
          });

          setFreteLoad({
            userCupons: selectFrete[0].userCupons,
            freteOptions: selectFrete[0].freteOptions,
            cupomSelect: selectFrete[0].betterOptions.cupom,
            freteSelect: selectFrete[0].betterOptions.freteOption,
            userCep: selectFrete[0].userCep,
          });
        }
      } else {
        // Caso a quantidade atual seja o mesmo do freteValues ele não reseta, somente se o a quantidade mudar, caso mude, tem que esperar o array buscar os valores restantes
        if (freteValues?.quantity === quantity) {
          return;
        } else {
          setFreteValues();
          console.log(moreFrete);
          console.log(freteValues);
          setFreteLoad(true);
        }
      }
    } else if (freteValues?.quantity !== quantity) {
      setFreteValues();
      setFreteLoad(true);
    }
  }, [quantity, awaitRequestFrete, moreFrete]);

  const attOptions = (value) => {
    if (moreFrete.length > 0) {
      const newMoreFrete = moreFrete.map((frete) => {
        if (frete.quantity === value.quantity) {
          const att = {
            ...frete,
            freteSelected: value.freteOption,
            cupomSelected: value.cupom,
          };
          return att;
        } else {
          return frete;
        }
      });
      setMoreFrete(newMoreFrete);
    } else {
      setFreteValues(value);
    }
  };

  // ESTOU COM UM BOG QUE O FRETE QUANDO EU BUSCO UM NOVO FRETE COM A QUANTIDADE ACIMA DE 4, ele aparece inicialmente, porem quando carrega os acima de 4, ele da um loading, e reseta o valor

  console.log("MOREFRETE");
  console.log(moreFrete);
  console.log("MOREFRETE");
  return (
    <FreteContainer>
      {userLog && userLog.id ? (
        <>
          {freteValues && freteValues.cupom ? (
            <>
              <FreeShippingPrice>FRETE GRÁTIS ACIMA DE R$ 59</FreeShippingPrice>
              <Desconto>
                <p>Cupom aplicado!</p>
                <CupomImgContainer>
                  <CupomText>
                    <p>Cupom</p>
                    <div className="gradeCupom">
                      <CupomTextInfo>
                        <span>
                          {freteValues.cupom.icon}

                          {freteValues.cupom.name}
                        </span>
                        <span>
                          {freteValues.cupom.discount <
                          freteValues.freteOption.price
                            ? (
                                (freteValues.cupom.discount /
                                  freteValues.freteOption.price) *
                                100
                              ).toFixed(0)
                            : 100}
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
                    Frete: {formatCurrency(freteValues?.freteOption?.price)}
                  </span>
                </DiscountValues>
                <FreteCalculate onClick={() => setOpenModalFrete(true)}>
                  Ver opções de frete
                </FreteCalculate>
              </Desconto>
              <FastShipping>
                {freteValues?.freteOption?.delivery_time > 3 ? (
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
        modalCupomConfig={freteValues?.cupom?.id}
        userModalLog={(log) => {
          setUserModalLog(log);
        }}
        onClose={() => setOpenModalFrete(false)}
        freteValues={(value) => {
          attOptions(value);
          freteAndTicket(value);
        }}
        freteLoad={freteLoad}
        loginByModal={() => {
          setLoginByModal(true);
        }}
        resetFreteLoad={() => {
          setFreteLoad(false);
          setMoreFrete([]);
          setFreteValues();
          setFindInUserAdress(false);
        }}
        freteGlobalProp={(value) => {
          setFreteGlobal(value);
        }}
        blockTempFrete={(value) => {
          console.log("EU VOU BLOQUEAR HAHAHHA", value);
          setBlockTempFrete(value);
        }}
      />
    </FreteContainer>
  );
}
export default Frete;
