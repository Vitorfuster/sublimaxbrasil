// Bibliotecas
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { HiOutlineArrowTurnDownRight } from "react-icons/hi2";

// Utils
import { formatDateShort } from "../../../../utils/FomatData";

// Estilos
import {
  ReviwsContainer,
  ScoreContainer,
  ReviwContainer,
  Painel,
  Score,
  StarsContainer,
  ScoreAndTime,
  NoReview,
  InputQuestion,
  SendButton,
  AllQuestions,
  YourQuestionsContainer,
  TitleYourQuestion,
  YourQuestions,
  ShowQuestionsContainer,
  ShowQuestionsContainerItems,
} from "./style";

import StarsComponent from "../Stars";

// Informações Hook LocalStorage
import { useUser } from "../../../../hooks/UserContext";

function Questions({ userReviews }) {
  return (
    <div>
      {userReviews.score ? (
        <ReviwsContainer>
          <ScoreContainer>
            <h3>Opiniões do produto</h3>
            <Painel>
              {userReviews.score && (
                <Score>{userReviews.score.toFixed(1)}</Score>
              )}

              <StarsContainer>
                {userReviews.score && (
                  <StarsComponent score={userReviews.score} />
                )}

                <p>{userReviews.reviews.length} avaliações</p>
              </StarsContainer>
            </Painel>
          </ScoreContainer>
          <ReviwContainer>
            {userReviews.reviews.length > 0 ? (
              userReviews.reviews.map((line) => (
                <div>
                  <ScoreAndTime>
                    <div>
                      <StarsComponent score={line.score} starSize={1} />
                    </div>
                    {formatDateShort(line.createdAt)}
                  </ScoreAndTime>
                  <p>{line.review_comment}</p>
                </div>
              ))
            ) : (
              <p>vazio</p>
            )}
          </ReviwContainer>
        </ReviwsContainer>
      ) : (
        <NoReview>
          <p>Nenhuma avaliação</p>
        </NoReview>
      )}
    </div>
  );
}

export default Questions;
