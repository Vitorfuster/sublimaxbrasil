// Bibliotecas
import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { createPortal } from "react-dom";

// Api
import api from "../../../../../../services/api";

// UserLog

// Estilos
import {
  Over,
  ModalBox,
  CepTitle,
  CepContainer,
  ModalHeader,
  CepResponse,
  Frete,
  HeaderFrete,
  FreteSelected,
  CupomContainer,
  FreteFooter,
  ButtonOkContainer,
  FindCepContainer,
} from "./style";

// Componentes
import { ButtonClean } from "../../../../../../components";

// Modais
import CupomModal from "../CupomModal";
import LoginModal from "../../../../../../components/LoginModal";

import { toast } from "react-toastify";

import formatCurrency from "../../../../../../utils/formatCurrency";
import BuscarFrete from "../../../../../../utils/BuscarFrete";

export default function Modal({
  open,
  onClose,
  quantity,
  userLog,
  freteValues,
  freteGlobalProp,
  userModalLog,
  freteLoad,
  loginByModal,
  modalCupomConfig,
  resetFreteLoad,
  blockTempFrete,
}) {
  const [freteOptions, setFreteOptions] = useState();
  // Imput cep
  const [cep, setCep] = useState("");
  const [lastCep, setLastCep] = useState("");
  const [cepDisable, setCepDisable] = useState(false);
  const [openCupomModal, setOpenCupomModal] = useState(false);
  const [cupomSelected, setCupomSelected] = useState(null);
  const [freteSelected, setFreteSelected] = useState(null);
  const [changeQuantity, setChangeQuantity] = useState();
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [cupomIdSelected, setCupomIdSelected] = useState();
  const [freteGlobal, setFreteGlobal] = useState();
  const [newSeach, setNewSeach] = useState(false);
  // console.log("EU SOU O FRETELOAD'");
  // console.log(freteLoad);
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

  useEffect(() => {
    if (freteLoad === false || freteLoad === true) {
      return;
    } else {
      setChangeQuantity(quantity);
      if (newSeach === false) {
        setFreteSelected(freteLoad.freteSelect);
        setCupomSelected(freteLoad.cupomSelect);
      }
      setFreteOptions(freteLoad.freteOptions);
      if (open === false) {
        setLastCep(freteLoad.userCep);
        setCep(freteLoad.userCep);
      }
    }
  }, [freteLoad]);

  // Atualiza o id do cupom selecionado conforme a mudança do frete
  useEffect(() => {
    setCupomIdSelected({ action: 1, id: modalCupomConfig });
  }, [modalCupomConfig]);

  // Buscar frete
  const handleBuscarFrete = async () => {
    setCepDisable(true);

    if (cep === "" || cep.length < 9) {
      toast.error("Digite um CEP válido");
      setCepDisable(false);
      return;
    }

    if (cep === lastCep) {
      return;
    }

    // Caso tenha valores já carregados pelo freteLoad, vai limpar todos os valores para fazer uma nova pesquisa.
    if (freteLoad !== false || freteLoad !== true) {
      setCupomSelected();
      setFreteSelected();
      setFreteOptions();
      setLastCep();
      setCep();
      resetFreteLoad();
      setNewSeach(true);
    }

    setLastCep(cep);
    setChangeQuantity(quantity);
    try {
      blockTempFrete(true);

      const freteResponse = await toast.promise(
        BuscarFrete(quantity, cep, userLog.id),
        {
          pending: "Calculando frete",
          success: "Frete calculado com sucesso!",
        }
      );

      setCupomSelected(null);
      setFreteSelected(null);
      setFreteGlobal(freteResponse);
      setFreteOptions(freteResponse.freteOptions);
      setCepDisable(false);
      blockTempFrete(false);
    } catch (error) {
      if (error.status === 400) {
        setLastCep();
        toast.error("Algo deu errado, verifique sua conexão");
      }

      if (error.status > 500 && error.status > 600) {
        setLastCep();
        toast.error(
          "Estamos com problemas técnicos, por favor, tente novamente mais tarde"
        );
      }
      setFreteOptions(0);
      setCepDisable(false);
    }
  };

  // Botão enviar tudo
  const subimitAll = () => {
    if (!freteSelected) {
      toast.error("Selecione uma opção de envio");
      return;
    }
    const value = {
      freteOption: freteSelected,
      cupom: cupomSelected,
      quantity: quantity,
    };
    freteValues(value);
    freteGlobalProp(freteGlobal);
    onClose();
  };

  // Envia dados selecionados ao clicar fora do container
  const clickOut = () => {
    if (freteSelected === null) {
      onClose();
      return;
    }

    const value = {
      freteOption: freteSelected,
      cupom: cupomSelected,
    };
    freteValues(value);
    freteGlobalProp(freteGlobal);
    onClose();
  };

  // Remove o cupom selecionado
  const removeCupom = () => {
    // Caso o cupom ja seja null, sai da função
    if (cupomSelected === null) {
      return;
    }

    const value = {
      freteOption: freteSelected,
      cupom: null,
    };
    freteValues(value);
  };

  // Abre modal de login se o usuário estiver deslogado
  const cupomLog = () => {
    if (!userLog?.id) {
      setOpenLoginModal(true);
      return;
    }
    setOpenCupomModal(true);
  };

  // Abrir modal de cupom com o login
  const openCupomLogin = () => {
    userModalLog(1);
    setOpenCupomModal(true);
  };

  const whatIsHappining = (option) => {
    setNewSeach(true);
    setFreteSelected(option);

    console.log("frete selecionado", freteSelected);
    console.log("frete Escolhido", option);
  };

  if (!open) return null;
  return createPortal(
    <Over
      onClick={() => {
        clickOut();
      }}
    >
      <ModalBox onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <CepTitle>
            Selecione como quer receber suas compras{" "}
            <span>
              Você poderá ver custos e prazos de entrega precisos em tudo que
              procurar
            </span>
          </CepTitle>
          <button onClick={onClose}>
            <IoMdClose />
          </button>
        </ModalHeader>
        <CepContainer>
          <FindCepContainer>
            <input
              type="text"
              placeholder="Digite o CEP"
              value={cep}
              autoComplete="postal-code"
              onChange={(e) => {
                let value = e.target.value.replace(/\D/g, ""); // mantém só números

                if (value.length > 8) return; // limita o CEP a 8 dígitos

                // adiciona máscara: 12345-678
                if (value.length > 5) {
                  value = value.replace(/^(\d{5})(\d)/, "$1-$2");
                }

                setCep(value);
              }}
            />
            {freteOptions && freteOptions[0].id ? (
              <ButtonClean
                onClick={handleBuscarFrete}
                Opacity={cep === lastCep}
              >
                Buscar
              </ButtonClean>
            ) : (
              <ButtonClean onClick={handleBuscarFrete} disabled={cepDisable}>
                Buscar
              </ButtonClean>
            )}
          </FindCepContainer>
          <a>Não sei meu cep</a>
        </CepContainer>

        {freteOptions && freteOptions[0].id ? (
          <div>
            <HeaderFrete>
              <p>Companhia</p>
              <p>Cupom desconto</p>
              <p>Valor final</p>
              <p>Entrega</p>
            </HeaderFrete>
            <CepResponse>
              {freteOptions.map((option) => (
                <Frete name="freteSelected" key={option.id} className="frete">
                  <FreteSelected>
                    <input
                      type="radio"
                      name="freteSelected"
                      onChange={() => {
                        whatIsHappining(option);
                        setCupomSelected(null);
                        removeCupom();
                        setCupomIdSelected({
                          action: 2,
                          id: `frete: ${option.id}`,
                        });
                      }}
                      value={option.id}
                      checked={freteSelected?.id === option.id}
                    />
                    <img src={option.company.picture} alt="company" />
                  </FreteSelected>
                  <p>
                    {cupomSelected
                      ? formatCurrency(cupomSelected?.discount)
                      : formatCurrency(0)}
                  </p>
                  <p>
                    {cupomSelected && option.price - cupomSelected.discount > 0
                      ? formatCurrency(option.price - cupomSelected.discount)
                      : cupomSelected &&
                        option.price - cupomSelected.discount <= 0
                      ? formatCurrency(0)
                      : formatCurrency(option.price)}
                  </p>
                  <p>Entrega em até {option.delivery_time} dias úteis</p>
                </Frete>
              ))}
            </CepResponse>
            <FreteFooter>
              <CupomContainer cupom={cupomSelected?.id > 0}>
                <p>Cupom:</p>
                <button
                  onClick={() => {
                    cupomLog();
                  }}
                >
                  {cupomSelected ? (
                    <p>
                      Cupom Aplicado!{" "}
                      <div>
                        <span>{cupomSelected.icon}</span>
                        <span>{cupomSelected.name}</span>
                        <span>{formatCurrency(cupomSelected.discount)}</span>
                      </div>
                    </p>
                  ) : (
                    <p>Selecione um cupom</p>
                  )}
                </button>
              </CupomContainer>
              <ButtonOkContainer>
                <ButtonClean
                  onClick={() => {
                    subimitAll();
                  }}
                  className="ok"
                >
                  OK
                </ButtonClean>
              </ButtonOkContainer>
            </FreteFooter>
            <CupomModal
              open={openCupomModal}
              onClose={() => setOpenCupomModal(false)}
              cupomSelected={(cupom) => setCupomSelected(cupom)}
              freteOptions={freteOptions}
              freteSelect={freteSelected}
              cupomLoad={freteGlobal?.userCupons}
              quantity={quantity}
              freteLoad={freteLoad}
              userLog={userLog}
              modalCupomConfig={cupomIdSelected}
              cupomDisable={() => {
                removeCupom();
              }}
            />
            <LoginModal
              open={openLoginModal}
              onClose={() => setOpenLoginModal(false)}
              userModalLog={() => {
                openCupomLogin();
                loginByModal();
              }}
            />
          </div>
        ) : (
          <></>
        )}
      </ModalBox>
    </Over>,
    document.getElementById("modal-root")
  );
}
