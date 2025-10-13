import React from "react";
import {
  ProgressContainer,
  ProgressBar,
  ProgressLine,
  ProgressStep,
  StepCircle,
  StepLabel,
} from "./style";

const DEFAULT_STEPS = [
  "Informações Básicas",
  "Valores e configurações",
  "Descrição e finalização",
];

/**
 * FormProgress
 * steps: array de labels (opcional, default para 3 passos)
 * current: passo atual (1-based)
 * progress: percentual opcional; se não informado, calcula automaticamente
 */
const FormProgress = ({ steps = DEFAULT_STEPS, current = 1, progress }) => {
  const total = steps.length;
  const safeCurrent = Math.min(Math.max(current, 1), total);
  const computed = Math.round((safeCurrent / total) * 100);
  const percent = typeof progress === "number" ? progress : computed;

  return (
    <ProgressContainer>
      <ProgressBar>
        <ProgressLine progress={percent} />
        {steps.map((label, idx) => {
          const stepNumber = idx + 1;
          const active = stepNumber <= safeCurrent; // mantém o mesmo padrão visual usado nos formulários
          const completed = false; // mantido como false para reproduzir o estilo atual
          return (
            <ProgressStep key={label + idx}>
              <StepCircle active={active} completed={completed}>
                {stepNumber}
              </StepCircle>
              <StepLabel active={active} completed={completed}>
                {label}
              </StepLabel>
            </ProgressStep>
          );
        })}
      </ProgressBar>
    </ProgressContainer>
  );
};

export default FormProgress;