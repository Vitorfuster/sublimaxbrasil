import React, { useEffect, useState } from "react";

// Api
import api from "../../services/api";

// Hooks
import { useUser } from "../../hooks/UserContext";
import { toast } from "react-toastify";

// Componentes
import UserInformations from "./Components/UserInformations";
import BuyReview from "./Components/BuyReview";

// Estilos
import { Container, CheckoutContainer, ContainerButton } from "./style";
import { ButtonClean } from "../../components";

export function CheckoutBuy() {
  const [step, setStep] = useState(1);
  const [order, setOrder] = useState();
  // // Hook buscar usuário localStorage
  const { userData } = useUser();
  const [userInfo, setUserInfo] = useState();
  const [userAdress, setUserAdress] = useState();
  // const [submit, setSubmit] = useState(0);

  // Buscar informações do pedido no localSotorage
  useEffect(() => {
    const orderLocal = JSON.parse(localStorage.getItem("sublimaxBrasil:order"));

    if (!userData.id) {
      console.log("Pedido deslogado");
      return;
    }

    if (!orderLocal) {
      console.log("Pedido não encontrado");
      return;
    }

    setOrder(orderLocal);
  }, [userData]);

  // Busca informações do cadastro do user
  useEffect(() => {
    const buscarUserInfo = async () => {
      try {
        if (userData.id) {
          const { data: userInfoApi } = await api.get(
            `/user-info/${userData.id}`
          );

          const { data: userAdressApi } = await api.get(
            `/user-adress/${userData.id}`
          );

          // Muda os estágios
          if (userInfoApi === false || userAdressApi === false) {
            setStep(1);
            setUserInfo(userInfoApi);
            setUserAdress(userAdressApi);
          } else {
            setStep(2);
          }
        }
      } catch (error) {
        toast.error(
          "Serviço indisponível no momento, por favor, notifique o suporte"
        );
      }
    };

    buscarUserInfo();
  }, [userData]);

  console.log(order);
  return (
    <Container>
      {step === 1 ? (
        <UserInformations
          userInformations={{ userInfo, userAdress }}
          changeStep={() => {
            setStep(2);
          }}
        />
      ) : (
        <BuyReview />
      )}
    </Container>
  );
}
