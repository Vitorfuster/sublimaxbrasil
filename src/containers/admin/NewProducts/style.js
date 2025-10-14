import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  min-height: 90vh;
  justify-content: center;
  align-items: center;
  padding: 30px 0;

  form {
    display: flex;
    flex-direction: column;
    gap: 25px;
    background: #dbeafe; /* azul claro */

    backdrop-filter: blur(10px);
    border-radius: 15px;
    padding: 40px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
    border: 1px solid #000;
    max-width: 700px;
    width: 90%;

    h2 {
      color: #000000ff;
      font-size: 28px;
      margin-bottom: 10px;
      text-align: center;
      font-weight: 550;
    }
  }

  @media (max-width: 768px) {
    padding: 20px;

    form {
      padding: 30px;
      width: 95%;
    }
  }

  @media (max-width: 480px) {
    form {
      padding: 25px;
      gap: 20px;

      h2 {
        font-size: 24px;
      }
    }
  }
`;
