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

  &:focus {
    outline: none;
  }

  &:hover {
    cursor: pointer;
  }

  &::placeholder {
    color: #777;
  }
`;

export const ConfigSection = styled.div`
  position: relative;
  background: #fff;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #000000ff;
  overflow: hidden;

  &:hover > .border-draw .border-rect {
    stroke-dashoffset: 0;
    stroke-width: 3px;
  }

  &:hover {
    cursor: pointer;
  }

  h3 {
    color: #111;
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
  color: #111;
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

  .border-draw {
    pointer-events: none;
  }

  > *:not(.border-draw) {
    position: relative;
    z-index: 1;
  }

  &:active {
  }

  svg {
    width: 16px;
    height: 16px;
  }
`;

// Wrappers com borda animada para inputs e selects, seguindo o form1
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

  input {
    border-radius: 12px;
  }
`;

export const SelectWrap = styled.div`
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
`;
