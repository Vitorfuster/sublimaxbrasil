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
`;

// Progress components moved to components/FormProgress

export const LabelUpload = styled.label`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #000000ff;
  border-radius: 12px;
  padding: 20px;
  gap: 15px;
  color: #111;
  font-size: 16px;
  background: #fff;
  transition: all 0.3s ease;
  height: 100px;
  position: relative;
  overflow: hidden;

  &:hover {
    background: #fff;
  }

  &:hover > .border-draw .border-rect {
    stroke-dashoffset: 0;
    stroke-width: 3px;
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
  border: 1px solid #000000ff;
  border-radius: 12px;
  padding: 20px;
  background-color: #fff;
  color: #111;
  font-weight: 500;
  transition: all 0.3s ease;
  min-height: 120px;
  gap: 8px;
  position: relative;
  overflow: hidden;

  &:hover {
    border-color: #000000ff;
    background-color: #fff;
  }

  &:hover > .border-draw .border-rect {
    stroke-dashoffset: 0;
    stroke-width: 3px;
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

// Wrappers com borda animada para inputs e selects
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
`;

export const UploadsContainer = styled.div`
  background: #fffbe6;
  border-radius: 12px;
  border: 1px solid #000;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 16px;
`;
