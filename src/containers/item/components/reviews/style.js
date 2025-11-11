import styled from "styled-components";

// Novo

export const ReviwsContainer = styled.div`
  border-top: 1px solid var(--colorT8);

  padding-left: 20px;
  padding-top: 50px;

  display: grid;
  grid-template-columns: 1fr 2fr;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    padding-left: 20px;
    padding-top: 20px;
  }
`;
export const ScoreContainer = styled.div``;

export const Painel = styled.div`
  display: flex;
  gap: 15px;
  padding: 10px;
`;

export const Score = styled.p`
  font-size: var(--fsX);
  font-weight: 500;

  @media (max-width: 900px) {
    font-size: var(--fsXX);
    font-weight: 900;
    color: blue;
  }
`;

export const StarsContainer = styled.div`
  font-size: var(--fsP);
  color: var(--colorT2);

  @media (max-width: 900px) {
    color: var(--colorT2);
    font-size: var(--fsM);
  }
`;

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

      @media (max-width: 900px) {
        font-size: var(--fsMM);
      }
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
  @media (max-width: 900px) {
    font-size: var(--fsM);
  }
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
