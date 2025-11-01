import styled from "styled-components";

export const QuestionsContainer = styled.div`
  padding-left: 20px;
  display: grid;
  gap: 20px;
  border-top: 1px solid var(--colorT8);

  padding-top: 20px;
  h3 {
    font-size: 1.5rem;
    font-weight: 400;
  }
`;

export const InputQuestion = styled.input`
  height: 50px;

  width: 100%;
  max-width: 600px;
  border: 1px solid #555555ff;
  border-radius: 12px;
  padding: 12px 12px;
  font-size: 1rem;
  font-weight: 350;
  background: #fff;
  color: #555555ff;
  margin-top: 10px;
`;

export const SendButton = styled.button`
  height: 50px;
  font-size: 1rem;
  border: 1px solid #555555ff;
  border-radius: 12px;
  background: #fff;
  color: #292929ff;
  font-weight: 400;
  padding: 12px 12px;
  margin-left: 10px;
  background-color: #dbeafe;
  cursor: pointer;
  &:hover {
    border: 1px solid #292929ff;
    box-sizing: border-box;
  }
`;

export const AllQuestions = styled.button`
  justify-self: start;
  text-align: start;
  background: none;
  padding: 8px 8px;

  border: none;
  color: #00c3ffff;
  font-size: 1rem;
  font-weight: 350;
  cursor: pointer;
  &:hover {
    color: #43d6ffff;
  }
`;

export const YourQuestionsContainer = styled.div`
  display: grid;
`;

export const TitleYourQuestion = styled.h4`
  font-size: 1.5rem;
  font-weight: 400;
  margin-bottom: 5px;
`;

export const YourQuestions = styled.div`
  p:nth-child(1) {
    color: #292929ff;

    background-color: #f5f5f5ff;
    padding: 18px 15px;
    padding-bottom: 10px;
    white-space: pre-line;

    ${(props) =>
      props.answered
        ? "border-top-right-radius: 5px; border-top-left-radius: 5px;"
        : " border-radius: 5px;"}
  }

  p:nth-child(2) {
    background-color: #f5f5f5ff;
    padding: 0px 15px 18px 20px;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    color: #0082aaff;
    white-space: pre-line;

    .iconStyle {
      /* transform: rotate(315deg); */
      height: 25px;
      width: 25px;
      margin-right: 5px;
      color: #0082aaff;
      margin-bottom: -2px;
    }
  }
`;

// Novo

export const ReviwsContainer = styled.div`
  border-top: 1px solid var(--colorT8);

  padding-left: 20px;
  padding-top: 50px;

  display: grid;
  grid-template-columns: 1fr 2fr;
`;
export const ScoreContainer = styled.div``;

export const ReviwContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
  padding: 10px;
  padding-bottom: 25px;
  div {
    display: grid;
    gap: 10px;

    p {
      color: #292929ff;
      font-size: var(--fsM);
    }
  }
`;

export const ScoreAndTime = styled.span`
  display: flex;
  font-size: var(--fsP);
  justify-content: space-between;
  div {
    gap: 1px;
    display: flex;
  }
`;

export const Painel = styled.div`
  display: flex;
  gap: 15px;
  padding: 10px;
`;

export const Score = styled.p`
  font-size: var(--fsX);
  font-weight: 500;
`;

export const StarsContainer = styled.div`
  font-size: var(--fsP);
`;

export const NoReview = styled.div`
  border-top: 1px solid var(--colorT8);
  padding-top: 50px;
  font-size: 1rem;
  font-weight: 400;
  padding-left: 20px;
  padding-bottom: 40px;
  font-weight: 350;
  color: var(--colorT2);
`;
