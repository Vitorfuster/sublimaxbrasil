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

export const ConfigSection = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);

  h3 {
    color: #fff;
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 15px;
    text-align: center;
  }
`;

export const CheckboxContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const CheckboxItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px;
  border-radius: 8px;
  transition: background-color 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
  }
`;

export const Checkbox = styled.input`
  width: 20px;
  height: 20px;
  accent-color: #4a90e2;
  cursor: pointer;
`;

export const CheckboxLabel = styled.label`
  color: #fff;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  user-select: none;
`;

// Progress components moved to components/FormProgress

export const HeaderContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 5px;

  h2 {
    grid-column: -1 / 1;
    padding-bottom: 10px;
  }
`;

export const BackButton = styled.div`
  justify-self: start;
  background: #f97316;
  border: 2px solid #f97316;
  border-radius: 8px;
  padding: 10px 20px;
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background: #ea580c;
    border-color: #ea580c;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(249, 115, 22, 0.3);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 6px rgba(249, 115, 22, 0.3);
  }

  svg {
    width: 16px;
    height: 16px;
  }
`;
