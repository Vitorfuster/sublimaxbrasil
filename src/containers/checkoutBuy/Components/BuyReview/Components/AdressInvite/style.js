import styled from "styled-components";

export const Container = styled.div`
  display: grid;
  gap: 25px;
  grid-template-columns: 2fr 1fr;
`;

export const AdressInfo = styled.div`
  /* background-color: red; */
`;
export const Title = styled.h1`
  font-size: var(--fsGG);
  color: var(--colorT2);
  font-weight: 400;
  padding-bottom: 25px;
`;

export const AdressContainer = styled.div`
  padding-top: 10px;
  /* background-color: blue; */
  border-radius: 10px;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(2px);
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.01); /* aumenta 10% */
  }
`;

export const MyAdressContainer = styled.label`
  display: flex;
  gap: 10px;
  /* background-color: yellow; */
  padding: 10px 15px 15px 10px;
  cursor: pointer;
`;

export const InputAdress = styled.input`
  margin-top: 5px;
  align-self: flex-start;
  height: 15px;
  width: 15px;
`;

export const MyAdressInfo = styled.div`
  width: 100%;
  /* background-color: purple; */
  display: grid;
  gap: 10px;
`;

export const MyAdressTitle = styled.h2`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: var(--fsMM);
  color: var(--colorT2);
  font-weight: 500;

  span {
    font-size: var(--fsG);
    font-weight: 350;

    color: var(--colorD5);
  }
`;

export const MyAdressText = styled.p`
  font-size: var(--fsM);
  color: var(--colorT3);
`;

export const MyAdressType = styled.p`
  font-size: var(--fsM);
  color: var(--colorT3);
`;

export const ChangeAdressContainer = styled.div`
  border-top: 1px solid var(--colorT8);
  padding: 10px 0px 10px 29px;
  cursor: initial;
`;

export const ChangeAdressLink = styled.p`
  color: var(--colorD1);
  font-size: var(--fsM);
  justify-self: start;
  cursor: pointer;
  padding: 5px;

  &:hover {
    color: var(--colorD1a);
  }
`;
