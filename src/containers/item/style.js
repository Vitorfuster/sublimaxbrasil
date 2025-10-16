import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  min-height: 100vh;
  width: 100vw;
  background: #fffdf5ff;

  justify-content: center;
`;

export const ContainerItem = styled.div`
  width: 1250px;
  padding: 20px;
  border: 1px solid gray;
  background-color: white;
  display: grid;
  gap: 20px;
  grid-template-columns: 1.8fr 1fr;
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
  justify-content: center;
`;

export const Image = styled.img`
  max-width: 80px;
  border-radius: 5px;
  border: 1px solid gray;
  cursor: pointer;
`;

export const ImagemTop = styled.div`
  img {
    border-radius: 10px;

    max-height: 600px;
    border: 1px solid gray;
  }
`;

export const BuyContainer = styled.div`
  border: 1px solid #000;
  border-radius: 15px;

  padding: 20px;
  flex-direction: column;
  gap: 5px;
  /* background-color: green; */
`;

export const ItemTitle = styled.h1`
  font-weight: 500;
`;

export const TypeItem = styled.p`
  align-self: self-start;
  padding: 5px 10px;
  border-radius: 12px;
  border: 1px solid #00c3ffff;
  color: #00c3ffff;
  background-color: #e9f3ffff;
`;

export const PriceContainer = styled.div`
  margin-top: 20px;
`;

export const PriceBefore = styled.span`
  font-size: 1.3rem;
  font-weight: 350;
  color: #ff4f4fff;
  text-decoration: line-through;
`;

export const PriceItem = styled.p`
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 350;
  font-size: 2.1rem;

  span {
    margin-bottom: -5px;
    font-size: 1.2rem;
    color: #00d312ff;
  }
`;

export const DeliveryContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 13px;
  margin-top: 10px;
  margin-bottom: 20px;
`;

export const FreeShippingPrice = styled.p`
  align-self: self-start;
  padding: 4px 8px;
  border-radius: 8px;
  background-color: #00d312ff;
  font-size: 14px;
  font-weight: 500;
  color: white;
`;

export const FastShipping = styled.div`
  p {
    margin-bottom: 3px;
    color: #00d312ff;
    font-weight: 500;

    span {
      color: #000;
      font-weight: 400;
    }
  }
  span {
    color: #000;
    font-weight: 400;
  }

  span {
    color: #313131ff;

    span {
      color: #000000ff;
    }
  }
`;

export const FreeShipping = styled.p`
  display: grid;
  margin-bottom: 3px;
  color: #00d312ff;
  font-weight: 500;

  span {
    color: #0098fdff;
    font-weight: 450;
  }
`;

export const StockContainer = styled.div`
  margin-bottom: 20px;
  p {
    display: flex;
    align-items: center;
    font-size: 1.2rem;
    display: flex;
    gap: 10px;
    margin-bottom: 5px;
    div {
      display: flex;
      height: 28px;

      button {
        font-size: 1.3rem;
        font-weight: 300;
        height: 100%;
        width: 25px;
        background: none;
        border: 1px solid gray;
      }

      input {
        color: #0098fdff;

        font-size: 1.3rem;
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
  font-size: 1rem;
`;

export const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const DescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  /* border: 1px solid #000; */
  padding: 20px;
`;

export const DescriptionTitle = styled.h2`
  color: #0098fdff;

  font-size: 2rem;
`;

export const DescriptionOne = styled.p`
  font-size: 1rem;
  color: #555555ff;

  font-weight: 500;
`;

export const Specifications = styled.p``;

export const Obs = styled.p`
  font-size: 1rem;

  font-weight: 550;
  color: #a80000ff;
`;

export const DescriptionTwo = styled.p`
  font-size: 1rem;
  color: #555555ff;

  font-weight: 500;
`;
