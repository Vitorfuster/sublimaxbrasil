import styled from "styled-components";

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

// Progress components moved to components/FormProgress

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

export const LabelUploadImages = styled.label`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border: 2px dashed #f97316;
  border-radius: 8px;
  padding: 20px;
  background-color: rgba(249, 115, 22, 0.05);
  color: #f97316;
  font-weight: 500;
  transition: all 0.3s ease;
  min-height: 120px;
  gap: 8px;

  &:hover {
    border-color: #ea580c;
    background-color: rgba(249, 115, 22, 0.1);
    color: #ea580c;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(249, 115, 22, 0.2);
  }

  input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  svg {
    margin-bottom: 8px;
  }
`;
