import styled from "styled-components";

export const Label = styled.p`
  font-size: 1rem;
  font-weight: 500;
  color: #111;
  margin-bottom: 8px;
  letter-spacing: 0.5px;
`;

export const Input = styled.input`
  height: 45px;
  background: #fff;
  border-radius: 12px;
  padding: 0 15px;
  border: none;
  font-size: 16px;
  transition: color 0.2s ease, background-color 0.2s ease;
  width: 100%;
  color: #111;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: #777;
  }

  &:hover {
    cursor: pointer;
  }
`;

export const TextArea = styled.textarea`
  min-height: 120px;
  background: #fff;
  border-radius: 12px;
  padding: 15px;
  border: none;
  font-size: 16px;
  transition: color 0.2s ease, background-color 0.2s ease;
  width: 100%;
  resize: vertical;
  font-family: inherit;
  color: #111;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: #777;
  }
`;

// Progress components moved to components/FormProgress

export const CodeInput = styled.textarea`
  width: 100%;
  min-height: 120px;
  padding: 16px;
  border: none;
  border-radius: 12px;
  background-color: transparent;
  color: #111;
  font-family: "Fira Code", "Monaco", "Consolas", "Courier New", monospace;
  font-size: 14px;
  line-height: 1.5;
  resize: vertical;
  outline: none;
  transition: color 0.2s ease, background-color 0.2s ease;

  &::placeholder {
    color: #777;
    font-style: italic;
  }

  &:focus {
    background-color: transparent;
  }

  &:hover {
    cursor: pointer;
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

export const CodeWrap = styled.div`
  position: relative;
  width: 100%;
  border-radius: 12px;
  border: 1px solid #000000ff;
  overflow: hidden;
  background: #ffe6f2; /* rosa claro */

  &:hover > .border-draw .border-rect {
    stroke-dashoffset: 0;
    stroke-width: 3px;
  }

  &:hover {
    cursor: pointer;
  }

  .border-draw {
    pointer-events: none;
  }

  textarea {
    border-radius: 12px;
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
  background: #fff;
  border: 1px solid #000000ff;
  border-radius: 12px;
  padding: 10px 20px;
  color: #111;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  position: relative;
  overflow: hidden;

  &:hover {
    background: #fff;
  }

  &:hover > .border-draw .border-rect {
    stroke-dashoffset: 0;
    stroke-width: 3px;
  }

  &:active {
  }

  svg {
    width: 16px;
    height: 16px;
  }

  .border-draw {
    pointer-events: none;
  }

  > *:not(.border-draw) {
    position: relative;
    z-index: 1;
  }
`;

// Wrappers com borda animada para inputs e textareas
export const InputWrap = styled.div`
  position: relative;
  width: 100%;
  border-radius: 12px;
  border: 1px solid #000000ff;
  overflow: hidden;
  background: #fff;

  &:hover > .border-draw .border-rect {
    stroke-dashoffset: 0;
    stroke-width: 3px;
  }

  &:hover {
    cursor: pointer;
  }

  input {
    border-radius: 12px;
  }
`;

export const TextAreaWrap = styled.div`
  position: relative;
  width: 100%;
  border-radius: 12px;
  border: 1px solid #000000ff;
  overflow: hidden;
  background: #fff;

  &:hover > .border-draw .border-rect {
    stroke-dashoffset: 0;
    stroke-width: 3px;
  }

  &:hover {
    cursor: pointer;
  }

  textarea {
    border-radius: 12px;
  }
`;
