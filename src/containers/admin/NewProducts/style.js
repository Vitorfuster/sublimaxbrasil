import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;

  form {
    display: flex;
    flex-direction: column;
    gap: 25px;
    background: #565656;
    border-radius: 10px;
    padding: 30px;
  }
`;

export const Label = styled.p`
  font-size: 1rem;
  color: #fff;
  margin-bottom: 3px;
`;

export const Input = styled.input`
  height: 35px;
  background: #fff;
  box-shadow: 0px 4px 14px rgba(0, 0, 0, 8.1);
  border-radius: 8px;
  padding-left: 10px;
  border: none;

  min-width: 280px;
  width: 100%;
`;

export const LabelUpload = styled.label`
  cursor: pointer;
  display: flex;
  align-items: center;
  border: 1px dashed #fff;
  border-radius: 5px;
  padding: 10px;
  gap: 15px;
  input {
    opacity: 0;
    width: 1px;
  }
`;
