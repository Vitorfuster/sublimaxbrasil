import styled from "styled-components";

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
    background: #9bff65ff;
    border: 1px solid #555555ff;
    border-radius: 3px;
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
    background: #9bff65ff;
    border: 1px solid #555555ff;
    color: #555555ff;
    box-shadow: 0 4px 12px rgba(34, 197, 94, 0.4);
  `
      : props.completed
      ? `
    background: #ffeaf1;
    color: white;
  `
      : `
    background: #ffe3ecff;
    border: 1px solid #a5a5a5ff;
    color: #a5a5a5ff;
    
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
    color: #949494ff;
  `}
`;
