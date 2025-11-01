import styled from "styled-components";
import backgroundImage from "../../../../../../../../assets/sublimation-bg.svg";

export const Container = styled.div`
  height: 100vh;
  width: 100vw;
  justify-content: center;
  display: flex;
  align-items: center;
  background-image: url(${backgroundImage});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

export const ContainerItens = styled.div`
  background: rgba(13, 31, 97, 0.85);
  border-radius: 25px;
  height: auto;
  min-height: 500px;
  width: 450px;
  max-width: 90%;
  padding: 40px 50px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(4px);
  border: 1px solid rgba(255, 255, 255, 0.1);

  display: flex;
  flex-direction: column;
  justify-content: center;

  form {
    display: flex;
    flex-direction: column;
  }

  h1 {
    font-weight: 600;
    font-size: 32px;
    line-height: 38px;
    color: #fff;
    text-align: center;
    margin-top: 20px;
    margin-bottom: 40px;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  }

  h2 {
    color: #eeff00ff;
    margin-top: -20px;
    font-size: 25px;
    text-align: center;
  }

  @media (max-width: 768px) {
    padding: 30px 25px;
    min-height: 450px;

    h1 {
      font-size: 28px;
      margin-bottom: 30px;
    }
  }

  @media (max-width: 480px) {
    padding: 25px 20px;
    min-height: 400px;

    h1 {
      font-size: 24px;
      margin-bottom: 25px;
    }
  }
`;

export const Label = styled.p`
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  color: #fff;
  margin-top: 28px;
  margin-bottom: 8px;
  letter-spacing: 0.5px;
`;

export const Input = styled.input`
  width: 100%;
  height: 45px;
  background-color: rgba(255, 255, 255, 0.9);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  border: ${(props) =>
    props.error ? "2px solid #cc1717;" : "1px solid rgba(255, 255, 255, 0.2)"};
  padding-left: 15px;
  font-size: 16px;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border: 1px solid #4a90e2;
    box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.3);
  }
`;

export const SignInLink = styled.p`
  font-weight: 400;
  font-size: 15px;
  letter-spacing: 0.3px;
  color: #fff;
  text-align: center;
  margin-top: 25px;

  a {
    text-decoration: underline;
    cursor: pointer;
    color: #4a90e2 !important;
    font-weight: 500;
    transition: color 0.3s ease;

    &:hover {
      color: #6ba5e7 !important;
    }
  }
`;
