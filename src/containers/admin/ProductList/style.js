import styled from "styled-components";

export const Container = styled.div`
  min-height: calc(100vh - 70px);
  padding: 20px;
  color: #fff;
`;

export const Title = styled.h2`
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 20px;
  color: #fff;
  text-align: center;
`;

export const Header = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  background-color: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  padding: 25px;
  margin-bottom: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

export const FilterDiv = styled.div`
  display: flex;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 15px;
  }

  p {
    font-size: 16px;
    color: #fff;
    margin-bottom: 8px;
    font-weight: 500;
  }
`;

export const SelectContainer = styled.div`
  width: 100%;
  min-width: 200px;
`;

export const BuscaDiv = styled.div`
  display: flex;
  justify-content: flex-end;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

export const Pesquisar = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 450px;

  p {
    font-size: 16px;
    margin-bottom: 8px;
    color: #fff;
    font-weight: 500;
  }
`;

export const BarraPesquisa = styled.div`
  display: flex;
  align-items: center;
  width: 100%;

  input {
    font-size: 16px;
    padding: 12px 15px;
    width: 100%;
    background-color: rgba(255, 255, 255, 0.1);
    color: #fff;
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-right: none;
    border-radius: 8px 0 0 8px;
    outline: none;
    transition: all 0.3s ease;

    &::placeholder {
      color: rgba(255, 255, 255, 0.5);
    }

    &:focus {
      border-color: rgba(107, 165, 253, 0.5);
      background-color: rgba(255, 255, 255, 0.15);
    }
  }

  button {
    min-width: 50px;
    height: 100%;
    padding: 12px 15px;
    background-color: rgba(26, 86, 219, 0.7);
    color: #fff;
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-left: none;
    border-radius: 0 8px 8px 0;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      background-color: rgba(26, 86, 219, 0.9);
    }

    i {
      font-size: 16px;
    }
  }

  @media (max-width: 768px) {
    input {
      padding: 10px;
    }

    button {
      padding: 10px;
    }
  }

  @media (max-width: 480px) {
    input {
      padding: 8px;
    }

    button {
      padding: 8px;
      min-width: 40px;
    }
  }
`;

export const ContainerItems = styled.div`
  display: flex;
  gap: 20px;
`;
