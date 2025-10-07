import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  min-height: 90vh;
  justify-content: center;
  align-items: center;
  padding: 30px 0;

  form {
    display: flex;
    flex-direction: column;
    gap: 25px;
    background: rgba(13, 31, 97, 0.9);
    backdrop-filter: blur(10px);
    border-radius: 15px;
    padding: 40px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(255, 255, 255, 0.1);
    max-width: 600px;
    width: 90%;

    h2 {
      color: #ffffff;
      font-size: 28px;
      margin-bottom: 10px;
      text-align: center;
      font-weight: 600;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    }
  }

  @media (max-width: 768px) {
    padding: 20px;

    form {
      padding: 30px;
      width: 95%;
    }
  }

  @media (max-width: 480px) {
    form {
      padding: 25px;
      gap: 20px;

      h2 {
        font-size: 24px;
      }
    }
  }
`;

export const Label = styled.p`
  font-size: 1rem;
  font-weight: 500;
  color: #fff;
  margin-bottom: 8px;
  letter-spacing: 0.5px;
`;

export const Input = styled.input`
  height: 45px;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 0 15px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  font-size: 16px;
  transition: all 0.3s ease;
  width: 100%;

  &:focus {
    outline: none;
    border: 1px solid #4a90e2;
    box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.3);
  }

  &::placeholder {
    color: #999;
  }
`;

export const LabelUpload = styled.label`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px dashed rgba(255, 255, 255, 0.5);
  border-radius: 8px;
  padding: 20px;
  gap: 15px;
  color: #fff;
  font-size: 16px;
  background: rgba(255, 255, 255, 0.05);
  transition: all 0.3s ease;
  height: 100px;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: #4a90e2;
  }

  input {
    opacity: 0;
    width: 1px;
    height: 1px;
    position: absolute;
  }
`;

export const CategoryTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 10px;
`;

export const CategoryTag = styled.div`
  display: flex;
  align-items: center;
  background-color: rgba(26, 86, 219, 0.1);
  border-radius: 4px;
  padding: 6px 10px;
  font-size: 14px;
  color: #1a56db;
  font-weight: 500;

  button {
    background: none;
    border: none;
    cursor: pointer;
    color: #1a56db;
    font-weight: bold;
    font-size: 16px;
    margin-left: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 4px;

    &:hover {
      background-color: rgba(26, 86, 219, 0.2);
      border-radius: 50%;
    }
  }
`;

export const ErrorMensage = styled.p`
  color: #ff6b6b;
  font-size: 14px;
  margin-top: 5px;
  font-weight: 500;
`;
