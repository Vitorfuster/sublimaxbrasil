import React, { useEffect, useState } from "react";

// Api
import api from "../../services/api";

// Hooks
import { useUser } from "../../hooks/UserContext";
import { toast } from "react-toastify";

// Componentes
import UserAdress from "./Containers/UserForms/UserAdress";
import UserInfo from "./Containers/UserForms/UserInfo";

// Estilos
import { Container, CheckoutContainer } from "./style";

export function CheckoutBuy() {
  const [order, setOrder] = useState();
  // Hook buscar usuário localStorage
  const { userData } = useUser();
  const [userInfo, setUserInfo] = useState();
  const [userAdress, setUserAdress] = useState();

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
  }, []);

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

          setUserInfo(userInfoApi);
          setUserAdress(userAdressApi);
        }
      } catch (error) {
        toast.error(
          "Serviço indisponível no momento, por favor, notifique o suporte"
        );
      }
    };

    buscarUserInfo();
  }, [userData]);
  console.log(userInfo, userAdress);
  return (
    <Container>
      <CheckoutContainer>
        {userInfo === false && <UserInfo />}
        {userAdress === false && <UserAdress />}
      </CheckoutContainer>
    </Container>
  );
}
