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
} from "./style";

// Componentes
import { ButtonClean } from "../../../../../../components";

// Modais
import CupomModal from "../CupomModal";
import LoginModal from "../../../../../../components/LoginModal";

import { toast } from "react-toastify";

import formatCurrency from "../../../../../../utils/formatCurrency";

export default function Modal({
  open,
  onClose,
  quantity,
  userLog,
  freteValues,
  userModalLog,
  freteLoad,
  loginByModal,
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
    if (freteLoad === false) {
      return;
    } else {
      setChangeQuantity(quantity);
      setCupomSelected(freteLoad.cupomSelect);
      setFreteSelected(freteLoad.freteSelect);
      setFreteOptions(freteLoad.freteOptions);
    }
  }, [freteLoad]);

  // useEffect(() => {
  //   console.log("Verificar quantidades");

  //   console.log(quantity);
  //   console.log(changeQuantity);
  //   console.log("Verificar quantidades");

  //   if (quantity !== changeQuantity) {
  //     console.log("LIMPEI O FRETE");
  //     setLastCep("");
  //     // setCep("");
  //     setFreteOptions();
  //     setCepDisable(false);
  //   }
  // });

  const handleBuscarFrete = async () => {
    setCepDisable(true);

    if (cep === "" || cep.length < 9) {
      toast.error("Digite um CEP válido");
      return;
    }

    if (cep === lastCep) {
      return;
    }
    setLastCep(cep);
    setChangeQuantity(quantity);
    const frete = { to: cep, quantity: quantity };
    try {
      const { data: freteResponse } = await toast.promise(
        api.post("http://localhost:3002/frete-calc", frete),
        {
          pending: "Verificando frete",
          success: "Frete calculado com sucesso!",
          error: "CEP inválido",
        }
      );

      setCupomSelected(null);
      setFreteSelected(null);
      setFreteOptions(freteResponse);
      setCepDisable(false);
    } catch (error) {
      setFreteOptions(0);
      setCepDisable(false);
    }
  };

  const subimitAll = () => {
    if (!freteSelected) {
      toast.error("Selecione uma opção de envio");
      return;
    }
    const value = {
      freteOption: freteSelected,
      cupom: cupomSelected,
    };
    freteValues(value);
    onClose();
  };

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

  if (!open) return null;
  return createPortal(
    <Over onClick={onClose}>
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
            <ButtonClean onClick={handleBuscarFrete} Opacity={cep === lastCep}>
              Buscar
            </ButtonClean>
          ) : (
            <ButtonClean onClick={handleBuscarFrete} disabled={cepDisable}>
              Buscar
            </ButtonClean>
          )}

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
                        setFreteSelected(option);
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

              <ButtonClean
                onClick={() => {
                  subimitAll();
                }}
                className="ok"
              >
                OK
              </ButtonClean>
            </FreteFooter>
            <CupomModal
              open={openCupomModal}
              onClose={() => setOpenCupomModal(false)}
              cupomSelected={(cupom) => setCupomSelected(cupom)}
              freteOptions={freteOptions}
              quantity={quantity}
              freteLoad={freteLoad}
              userLog={userLog}
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
