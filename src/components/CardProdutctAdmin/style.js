import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background: linear-gradient(
    145deg,
    rgba(255, 255, 255, 0.1),
    rgba(255, 255, 255, 0.05)
  );
  backdrop-filter: blur(10px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  padding: 20px;
  max-width: 280px;
  min-height: 380px;
  transition: all 0.3s ease;
  color: #fff;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 40px rgba(26, 86, 219, 0.4);
    border-color: rgba(107, 165, 253, 0.5);
  }
`;

export const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(
    135deg,
    rgba(26, 86, 219, 0.1),
    rgba(107, 165, 253, 0.1)
  );
  border-radius: 16px;
  margin-bottom: 16px;
  height: 200px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 16px;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

export const Titulo = styled.h3`
  font-weight: 600;
  font-size: 18px;
  margin-bottom: 12px;
  color: #fff;
  text-align: center;
  line-height: 1.3;
`;

export const Descricao = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;
  flex: 1;

  p {
    font-size: 14px;
    color: rgba(255, 255, 255, 0.8);
    margin: 0;
  }
`;

export const Codigo = styled.p`
  font-size: 13px;
  color: rgba(255, 255, 255, 0.7);

  span {
    color: #ff6b6b;
    font-weight: 600;
    background: rgba(255, 107, 107, 0.1);
    padding: 2px 6px;
    border-radius: 8px;
    margin-left: 4px;
  }
`;

export const Visibilidade = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  align-items: center;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.7);

  span {
    color: #fff;
    font-size: 11px;
    font-weight: 500;
    padding: 4px 8px;
    border-radius: 12px;
    text-transform: uppercase;
    letter-spacing: 0.5px;

    &:first-of-type {
      background: linear-gradient(135deg, #4ade80, #22c55e);
      box-shadow: 0 2px 8px rgba(34, 197, 94, 0.3);
    }

    &:last-of-type {
      background: linear-gradient(135deg, #f59e0b, #d97706);
      box-shadow: 0 2px 8px rgba(217, 119, 6, 0.3);
    }
  }
`;

export const Button = styled.button`
  background: linear-gradient(
    135deg,
    rgba(26, 86, 219, 0.8),
    rgba(107, 165, 253, 0.8)
  );
  color: #fff;
  border: none;
  border-radius: 12px;
  padding: 12px 20px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 4px 15px rgba(26, 86, 219, 0.3);

  &:hover {
    background: linear-gradient(
      135deg,
      rgba(26, 86, 219, 1),
      rgba(107, 165, 253, 1)
    );
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(26, 86, 219, 0.5);
  }

  &:active {
    transform: translateY(0);
  }
`;
