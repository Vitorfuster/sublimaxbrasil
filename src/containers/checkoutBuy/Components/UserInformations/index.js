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
import { Container, CheckoutContainer, ContainerButton } from "./style";
import { ButtonClean } from "../../components";

export function CheckoutBuy() {
  const [order, setOrder] = useState();
  // Hook buscar usuário localStorage
  const { userData } = useUser();
  const [userInfo, setUserInfo] = useState();
  const [userAdress, setUserAdress] = useState();
  const [submit, setSubmit] = useState(0);

  // Forms
  const [userInfoForm, setUserInfoForm] = useState(null);
  const [userAdressForm, setUserAdressForm] = useState(null);

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

  // Enviar form
  useEffect(() => {
    if (userInfo === false && userAdress === false) {
      if (userAdressForm === null || userInfoForm === null) {
        setSubmit(0);
        return;
      } else {
        // Enviar os formulários
        const infoComplet = {
          user_id: userData.id,
          // phone: userInfoForm.phone,
          phone: "+5517996080786",
          cpf: userInfoForm.cpf,
          number: userAdressForm.number,
          city: userAdressForm.city,
          state: userAdressForm.state,
          cep: userAdressForm.cep,
          complement: userAdressForm.complement,
          district: userAdressForm.district,
        };
        sendForm("/user-full-info", infoComplet);
      }
    } else if (userInfo !== false && userAdress == false) {
      if (userAdressForm === null) {
        setSubmit(0);
        return;
      } else {
        // Enviar o formulário
        const infoComplet = { user_id: userData.id, ...userAdressForm };
        console.log("info completa ->", infoComplet);
        sendForm("/user-adress", infoComplet);
      }
    } else {
      if (userInfoForm === null) {
        setSubmit(0);
        return;
      } else {
        // Enviar o formulário
        const infoComplet = { user_id: userData.id, ...userInfoForm };
        console.log("info completa ->", infoComplet);
        sendForm("/user-info", infoComplet);
      }
    }
  }, [userAdressForm, userInfoForm]);

  // Função enviar form
  const sendForm = async (endPoint, form) => {
    try {
      await toast.promise(api.post(endPoint, form), {
        pending: "Registrando informações",
        success: "Informações registradas com sucesso!",
        error: "Algo deu errado :(",
      });
    } catch (error) {
      toast.error("Algo deu errado");
    }
  };

  console.log(userInfo, userAdress);

  return (
    <Container>
      <CheckoutContainer>
        <h1>Informações do usuário</h1>

        {userInfo === false && (
          <UserInfo
            submitButton={submit}
            responseSubmit={(values) => {
              setUserInfoForm(values);
            }}
            submitButtonResponse={(value) => {
              setSubmit(value);
            }}
          />
        )}
        {userAdress === false && (
          <UserAdress
            submitButton={submit}
            responseSubmit={(values) => {
              setUserAdressForm(values);
            }}
            submitButtonResponse={(value) => {
              setSubmit(value);
            }}
          />
        )}
        <ContainerButton>
          <ButtonClean
            onClick={() => {
              setSubmit(1);
            }}
            widthTotal={true}
          >
            Registrar
          </ButtonClean>
        </ContainerButton>
      </CheckoutContainer>
    </Container>
  );
}
