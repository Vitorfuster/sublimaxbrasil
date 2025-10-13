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

// Progress components moved to components/FormProgress

export const CodeInput = styled.textarea`
  width: 100%;
  min-height: 120px;
  padding: 16px;
  border: 2px solid #374151;
  border-radius: 8px;
  background-color: #1f2937;
  color: #f9fafb;
  font-family: "Fira Code", "Monaco", "Consolas", "Courier New", monospace;
  font-size: 14px;
  line-height: 1.5;
  resize: vertical;
  outline: none;
  transition: all 0.3s ease;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.3);

  &::placeholder {
    color: #9ca3af;
    font-style: italic;
  }

  &:focus {
    border-color: #3b82f6;
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.3),
      0 0 0 3px rgba(59, 130, 246, 0.1);
    background-color: #111827;
  }

  &:hover {
    border-color: #4b5563;
  }

  /* Scrollbar styling */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #374151;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: #6b7280;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #9ca3af;
  }
`;

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
