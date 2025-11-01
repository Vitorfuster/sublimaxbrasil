// Bibliotecas
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { HiOutlineArrowTurnDownRight } from "react-icons/hi2";

// Api
import api from "../../../../services/api";

// Estilos
import {
  QuestionsContainer,
  InputContainer,
  InputQuestion,
  SendButton,
  AllQuestions,
  NoQuestions,
  YourQuestionsContainer,
  TitleYourQuestion,
  YourQuestions,
  ShowQuestionsContainer,
  ShowQuestionsContainerItems,
} from "./style";

// Componentes
import { ButtonClean } from "../../../../components";

// Informações Hook LocalStorage
import { useUser } from "../../../../hooks/UserContext";

function Questions({ idProduct, allQuestions, questionsOpen }) {
  const { userData } = useUser();
  const [question, setQuestion] = useState("");
  const [userQuestions, setUserQuestions] = useState([]);
  const [questionsState, setQuestionsState] = useState(allQuestions);
  const [seeAllQuestions, setSeeAllQuestions] = useState(false);

  // Filtrar perguntas do usuário
  useEffect(() => {
    const questionsUser = allQuestions.filter(
      (question) => question.user_id === userData.id
    );

    setUserQuestions(questionsUser);
  }, []);

  // Gravar pergunta no banco de dados
  const sendQuestion = async (question) => {
    if (userData.id) {
      const objectQuestion = {
        item_id: Number(idProduct),
        user_id: userData.id,
        questions: question,
      };

      try {
        await toast.promise(api.post("/question", objectQuestion), {
          pending: "Criando pergunta",
          success: "Pergunta criada com sucesso!",
          error: "Falha ao criar o pergunta",
        });

        setUserQuestions((prev) => [objectQuestion, ...prev]);
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("usuário deslogado");
    }
  };

  return (
    <QuestionsContainer>
      <h3>Perguntas</h3>
      <InputContainer>
        <InputQuestion
          placeholder="Digite sua pergunta"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />

        <ButtonClean widthTotal={true} onClick={() => sendQuestion(question)}>
          Enviar pergunta
        </ButtonClean>
      </InputContainer>
      {userQuestions && userQuestions.length > 1 ? (
        <TitleYourQuestion>Suas perguntas</TitleYourQuestion>
      ) : (
        userQuestions.length === 1 && (
          <TitleYourQuestion>Sua pergunta</TitleYourQuestion>
        )
      )}
      {userQuestions &&
        userQuestions.map((line, index) => (
          <YourQuestionsContainer key={index}>
            <YourQuestions answered={true}>
              <p>{line.questions}</p>
              {line.answer && (
                <p>
                  <HiOutlineArrowTurnDownRight className="iconStyle" />
                  {line.answer}
                </p>
              )}
            </YourQuestions>
          </YourQuestionsContainer>
        ))}
      {allQuestions.length > 0 ? (
        <AllQuestions onClick={() => questionsOpen(true)}>
          Ver todas as perguntas
        </AllQuestions>
      ) : (
        <NoQuestions>Nenhuma pergunta ainda</NoQuestions>
      )}
    </QuestionsContainer>
  );
}

export default Questions;
