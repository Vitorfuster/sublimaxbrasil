import styled from "styled-components";

export const Container = styled.div`
  form {
    display: flex;
    /* flex-direction: column; */
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
  }
  margin-bottom: 20px;
`;

export const Field = styled.div`
  width: 45%;
`;

export const Label = styled.label`
  display: block;
  font-weight: 500;
  font-size: var(--fsMM);
  line-height: 16px;
  color: var(--colorT1);
  margin-bottom: 8px;
  letter-spacing: 0.5px;
`;

export const Input = styled.input`
  width: 100%;
  height: 45px;
  background-color: rgba(255, 255, 255, 0.9);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  /* border-radius: 8px; */
  padding-left: 15px;
  font-size: 16px;
  transition: all 0.3s ease;
  border: ${(props) =>
    props.error ? "2px solid #cc1717;" : "1px solid var(--colorT4)"};

  &:focus {
    outline: none;
  }
`;

export const PhoneContainer = styled.div`
  display: flex;
  position: relative;

  input {
    border-left: none;
  }
`;

export const PhoneButton = styled.div`
  display: flex;
  gap: 10px;
  padding: 0px 10px;
  font-size: var(--fsM);
  font-weight: 550;
  background-color: var(--colorT0);
  border: 1px solid var(--colorT4);
  align-items: center;

  img {
    max-width: 50px;
  }

  &:hover {
    cursor: pointer;
  }
`;

export const PhoneListContainer = styled.div`
  border: 1px solid var(--colorT4);
  background-color: var(--colorT0);
  top: 45px;
  border-top: none;
  position: absolute;
  width: 100%;
`;

export const PhoneList = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 0px;
  padding-bottom: 60px;
  height: 260px;

  overflow-y: scroll;
`;

export const PhoneItem = styled.div`
  display: flex;
  align-items: center;
  max-width: 100%;
  padding: 15px 10px;
  gap: 10px;
  font-size: var(--fsMM);
  cursor: pointer;

  &:hover {
    background-color: var(--colorT9);
  }
`;

export const InputContainer = styled.div`
  width: 97%;
  bottom: 2px;
  padding: 5px 10px;
  input {
    width: 100%;
    height: 45px;
    /* border-radius: 8px; */
    border: 1px solid var(--colorT3);
    padding-left: 15px;
    font-size: 16px;
    transition: all 0.3s ease;

    &:focus {
      outline: none;
    }
  }
`;

export const PhoneInfo = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  gap: 10px;
  justify-content: space-between;
`;
