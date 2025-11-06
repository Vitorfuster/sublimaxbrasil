import styled from "styled-components";

export const QuestionsContainer = styled.div`
  padding-left: 20px;
  padding-top: 50px;
  padding-bottom: 40px;
  display: grid;
  gap: 20px;
  border-top: 1px solid var(--colorT8);

  h3 {
    font-size: var(--fsGG);
    font-weight: 400;
  }
`;

export const InputContainer = styled.div`
  display: grid;
  grid-template-columns: 2.8fr 1fr;
  align-items: center;
  gap: 20px;
`;

export const InputQuestion = styled.input`
  height: 100%;

  width: 100%;
  max-width: 600px;
  border: 1px solid #555555ff;
  border-radius: 12px;
  padding: 12px 12px;
  font-size: var(--fsM);
  font-weight: 350;
  background: #fff;
  color: #555555ff;
  margin-right: 10px;
`;

export const AllQuestions = styled.button`
  justify-self: start;
  text-align: start;
  background: none;
  padding: 8px 8px;

  border: none;
  color: #00c3ffff;
  font-size: var(--fsMM);
  font-weight: 350;
  cursor: pointer;
  &:hover {
    color: #43d6ffff;
  }
`;

export const NoQuestions = styled.p`
  font-weight: 350;
  color: var(--colorT2);
`;

export const YourQuestionsContainer = styled.div`
  display: grid;
`;

export const TitleYourQuestion = styled.h4`
  font-size: var(--fsMM);
  font-weight: 400;
  margin-bottom: 5px;
`;

export const YourQuestions = styled.div`
  p:nth-child(1) {
    color: #292929ff;
    font-size: var(--fsM);
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
    font-size: var(--fsM);
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
