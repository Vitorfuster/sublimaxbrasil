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
    max-width: 700px;
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

export const TextArea = styled.textarea`
  min-height: 120px;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 15px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  font-size: 16px;
  transition: all 0.3s ease;
  width: 100%;
  resize: vertical;
  font-family: inherit;

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

export const ProgressContainer = styled.div`
  width: 100%;
  margin-bottom: 30px;
  padding: 0 20px;
`;

export const ProgressBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  margin-bottom: 15px;
`;

export const ProgressLine = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 4px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 2px;
  z-index: 1;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: ${(props) => props.progress}%;
    background: linear-gradient(135deg, #22c55e, #16a34a);
    border-radius: 2px;
    transition: width 0.3s ease;
  }
`;

export const ProgressStep = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 2;
`;

export const StepCircle = styled.div`
  width: 40px;
  height: 40px;
  margin-top: -20px;
  margin-bottom: 10px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 16px;
  transition: all 0.3s ease;

  ${(props) =>
    props.active
      ? `
    background: linear-gradient(135deg, #22c55e, #16a34a);
    color: white;
    box-shadow: 0 4px 12px rgba(34, 197, 94, 0.4);
  `
      : props.completed
      ? `
    background: linear-gradient(135deg, #22c55e, #16a34a);
    color: white;
  `
      : `
    background: rgba(255, 255, 255, 0.1);
    color: rgba(255, 255, 255, 0.6);
    border: 2px solid rgba(255, 255, 255, 0.2);
  `}
`;

export const StepLabel = styled.span`
  margin-top: 8px;
  font-size: 12px;
  font-weight: 500;
  text-align: center;

  ${(props) =>
    props.active
      ? `
    color: #22c55e;
  `
      : props.completed
      ? `
    color: #22c55e;
  `
      : `
    color: rgba(255, 255, 255, 0.6);
  `}
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
