import styled from "styled-components";

export const Container = styled.div`
  height: 100vh;
  width: 100vw;

  justify-content: center;
  display: flex;
  align-items: center;
`;

export const ContainerItens = styled.div`
  background: #373737;
  border-radius: 25px;
  height: 70%;
  padding: 25px 75px;

  justify-content: center;

  form {
    display: flex;
    flex-direction: column;
  }

  h1 {
    font-weight: 500;
    font-size: 24px;
    line-height: 28px;
    color: #fff;
    text-align: center;
    margin-top: 100px;
  }
`;
export const Label = styled.p`
  font-weight: 500;
  font-size: 12px;
  line-height: 14px;
  color: #fff;
  margin-top: 28px;
  margin-bottom: 5px;
`;

export const Input = styled.input`
  width: 391px;
  height: 38px;
  background-color: #fff;
  box-shadow: 3px 3px 10px rgba(74, 144, 226, 0.19);
  border-radius: 5px;
  border: ${(props) => (props.error ? "2px solid #cc1717;" : "none")};
  padding-left: 10px;
`;

export const SignInLink = styled.p`
  font-weight: 400;
  font-size: 14px;
  letter-spacing: 0%;
  color: #fff;

  a {
    text-decoration: underline;
    cursor: pointer;
  }
`;
