import styled from "styled-components";

export const Container = styled.div``;

export const Label = styled.label`
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
