import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  min-height: 100vh;
  width: 100vw;
  background: #f1f1f1ff;

  justify-content: center;
  position: relative;
`;

export const ContainerItem = styled.div`
  width: 1300px;
  padding: 20px;
  border: 1px solid var(--colorT8);
  background-color: var(--colorBg1);
  display: grid;
  gap: 20px;
  grid-template-columns: 2.5fr 1fr;
`;

export const ImagesContainer = styled.div`
  display: flex;
  /* justify-content: space-around; */
  gap: 20px;
  max-height: 600px;
  /* background-color: #ff9a9aff; */
`;

export const ImagesArray = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: column;
  /* justify-content: center; */
`;

export const Image = styled.img`
  max-width: 80px;
  border-radius: 5px;
  border: 1px solid var(--colorT8);
  border: ${(props) =>
    props.onSelected ? "2px solid #000" : "1px solid #gray"};
  cursor: pointer;
`;

export const ImagemTop = styled.div`
  img {
    border-radius: 10px;

    max-height: 600px;
    /* border: 1px solid gray; */
  }
`;

export const BuyContainer = styled.div`
  border: 1px solid var(--colorT8);

  border-radius: 15px;

  padding: 20px;
  display: flex;
  flex-direction: column;
  align-self: start;
  gap: 5px;
  /* background-color: green; */
`;

export const VendidosSpan = styled.span`
  font-size: var(--fsP);
  font-weight: 450;
  color: var(--colorT3);
`;

export const ItemTitle = styled.h1`
  color: var(--colorT1);
  font-size: var(--fsG);
  font-weight: 450;
`;

export const TypeItem = styled.p`
  align-self: self-start;
  padding: 5px 10px;
  border-radius: 12px;
  border: 1px solid var(--colorD2);
  color: var(--colorD2);
  background-color: #e9f3ffff;
`;

export const PriceContainer = styled.div`
  margin-top: 20px;
`;

export const PriceBefore = styled.span`
  font-size: var(--fsG);
  font-weight: 350;
  color: var(--colorD4);
  text-decoration: line-through;
`;

export const PriceItem = styled.p`
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 300;
  font-size: var(--fsX);
  color: var(--colorT2);

  span {
    margin-bottom: -5px;
    font-size: var(--fsMM);
    color: var(--colorD5);
  }
`;

export const StockContainer = styled.div`
  margin-bottom: 20px;
  p {
    display: flex;
    align-items: center;
    font-size: var(--fsMM);
    display: flex;
    gap: 10px;
    margin-bottom: 5px;
    color: var(--colorT2);

    div {
      display: flex;
      height: 28px;

      button {
        color: var(--colorT2);

        font-size: var(--fsG);
        font-weight: 300;
        height: 100%;
        width: 25px;
        background: none;
        border: 1px solid gray;
        cursor: pointer;
      }

      input {
        color: var(--colorD1);
        width: 50px;

        font-size: var(--fsG);
        font-weight: 400;

        height: 100%;
        border: 1px solid gray;
        border-left: none;
        border-right: none;
        background: none;

        text-align: center;
      }
    }
  }
`;

export const PaymentContainer = styled.div``;

export const BuyButtonContainer = styled.div`
  display: grid;
  gap: 10px;
`;

export const QuantityInfo = styled.span`
  color: red;
  font-size: var(--fsM);
`;

export const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const DescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 40px;

  gap: 20px;
  /* border: 1px solid #000; */

  /* Estilização da tabela de especificações */
  table {
    width: 100%;
    border-collapse: collapse;
    font-size: var(--fsM);
    color: var(--colorT2);

    font-weight: 400;
  }

  th,
  td {
    padding: 5px;
    padding-left: 10px;
    border: 1px solid #292929ff;
  }

  tr {
    :nth-child(2) {
      text-align: center;
    }
  }
`;

export const DescriptionTitle = styled.h2`
  color: var(--colorD1);

  font-size: var(--fsX);
`;

export const DescriptionOne = styled.p`
  font-size: var(--fsG);
  color: var(--colorT2);
  font-weight: 300;
  white-space: pre-line;
`;

export const Specifications = styled.p``;

export const Obs = styled.p`
  font-size: var(--fsM);
  white-space: pre-line;
  font-weight: 550;
  color: var(--colorD3);
`;

export const DescriptionTwo = styled.p`
  font-size: var(--fsG);
  color: var(--colorT2);
  font-weight: 300;
  white-space: pre-line;
`;

export const ContainerScore = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

export const ScoreText = styled.p`
  ${(props) =>
    props.highScore
      ? "color: #0000ffff; font-weight: 400; background-color: #fffbe6; padding: 3px 5px; border-radius: 10px; border: 1px solid #ffee9bff"
      : "color: gray;  font-weight: 350;"};
`;

export const ReviewsText = styled.p`
  ${(props) =>
    props.highScore
      ? "color: #0000ffff; font-weight: 500; "
      : "color: gray;  font-weight: 350;"};
`;

export const OpenQuestionsWindow = styled.div`
  min-height: 100vh;
  bottom: 0px;

  width: 100vw;
  background: rgba(0, 0, 0, 0.4);
  position: fixed;
`;
export const WindowContainer = styled.div`
  position: fixed;
  height: 80%;
  width: 50%;
  top: 10%;
  bottom: 10%;
  left: 25%;
  right: 25%;
  background-color: var(--colorBg1);

  padding: 60px;
  padding-top: 80px;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const AllQuestions = styled.button`
  text-align: start;
  background: none;
  border: none;
  color: var(--colorD2);
  font-size: var(--fsM);
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
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: var(--fsX);
  padding: 0px 0px 20px 20px;
  border-bottom: 1px solid #292929ff;

  font-weight: 400;
  margin-bottom: 5px;

  button {
    margin-bottom: -5px;
    padding: 0px;
    background: none;
    border: none;
    font-size: var(--fsX);
    color: #0082aaff;
    cursor: pointer;
  }
`;

export const YourQuestions = styled.div`
  p:nth-child(1) {
    color: #4d4d4dff;

    padding: 18px 15px;
    padding-bottom: 3px;
    white-space: pre-line;

    ${(props) =>
      props.answered
        ? "border-top-right-radius: 5px; border-top-left-radius: 5px;"
        : " border-radius: 5px;"}
  }

  p:nth-child(2) {
    color: #0082aaff;
    white-space: pre-line;
    padding-top: 8px;
    padding-left: 3px;
  }

  div {
    display: grid;
    grid-template-columns: 25px auto;

    padding: 0px 15px 18px 18px;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
  }
  .iconStyle {
    /* transform: rotate(315deg); */
    height: 25px;
    width: 25px;
    margin-right: 5px;
    color: #0082aaff;
    margin-bottom: -2px;
  }
`;
