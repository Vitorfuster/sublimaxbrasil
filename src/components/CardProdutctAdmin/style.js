import styled from "styled-components";

export const Container = styled.div`
  display: grid;
  gap: 2px;
  max-width: 212px;
  min-height: 300px;
`;

export const ImageContainer = styled.div`
  display: grid;
  justify-content: center;
  background-color: white;
  margin-bottom: 4px;
  max-height: 212px;
`;

export const Image = styled.img`
  max-width: 212px;
  max-height: 212px;
  object-fit: cover;
`;

export const Titulo = styled.p`
  font-weight: 500;
`;

export const Descricao = styled.div`
  display: flex;
  flex-wrap: wrap;

  justify-content: space-between;
  p {
    font-size: 14px;
    margin-bottom: 4px;
  }
`;

export const Codigo = styled.p`
  span {
    color: red;
  }
`;

export const Visibilidade = styled.p`
  span {
    color: white;
    background-color: green;
    font-size: 12px;
    padding: 3px;
    padding-bottom: 1px;
    border-radius: 5px;
  }
`;

export const Button = styled.button`
  align-self: flex-end;
  padding: 7px 0px;
  max-height: 35px;
`;
