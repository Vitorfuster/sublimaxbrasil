import React, { useEffect, useState } from "react";

// Api
import api from "../../../../services/api";

// Hooks
import { useUser } from "../../../../hooks/UserContext";
import { toast } from "react-toastify";

// Componentes
import UserAdress from "./UserForms/UserAdress";
import UserInfo from "./UserForms/UserInfo";

// Estilos
import { Container, CheckoutContainer, ContainerButton } from "./style";
import { ButtonClean } from "../../../../components";

function UserInformations({ userInformations, changeStep }) {
  // const [order, setOrder] = useState();
  // Hook buscar usuário localStorage
  const { userData } = useUser();
  const [userInfo, setUserInfo] = useState();
  const [userAdress, setUserAdress] = useState();
  const [submit, setSubmit] = useState(0);

  // Forms
  const [userInfoForm, setUserInfoForm] = useState(null);
  const [userAdressForm, setUserAdressForm] = useState(null);

  // Buscar informações do pedido no localSotorage
  // useEffect(() => {
  //   const orderLocal = JSON.parse(localStorage.getItem("sublimaxBrasil:order"));

  //   if (!userData.id) {
  //     console.log("Pedido deslogado");
  //     return;
  //   }

  //   if (!orderLocal) {
  //     console.log("Pedido não encontrado");
  //     return;
  //   }

  //   setOrder(orderLocal);
  // }, []);

  // Envia as informações do user bucadas da api
  useEffect(() => {
    setUserInfo(userInformations.userInfo);
    setUserAdress(userInformations.userAdress);
  }, [userInformations]);

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
          phone: userInfoForm.phone,
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
        sendForm("/user-adress", infoComplet);
      }
    } else {
      if (userInfoForm === null) {
        setSubmit(0);
        return;
      } else {
        // Enviar o formulário
        const infoComplet = { user_id: userData.id, ...userInfoForm };

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

      changeStep();
    } catch (error) {
      toast.error("Algo deu errado");
    }
  };

  return (
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
  );
}

export default UserInformations;
