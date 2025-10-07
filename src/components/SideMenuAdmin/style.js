import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.div`
  background: linear-gradient(139.44deg, rgb(3, 30, 73) 0%, rgb(9, 11, 43) 100%);
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.3);
  width: 300px;
  top: 0;
  left: 0;
  height: 100vh;
  position: relative;
  backdrop-filter: blur(5px);
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;

  hr {
    margin: 30px 15px;
    border: none;
    height: 1px;
    background: rgba(255, 255, 255, 0.1);
  }
  
  @media (max-width: 768px) {
    width: 250px;
  }
  
  @media (max-width: 480px) {
    width: 220px;
  }
`;

export const ItemContainer = styled.div`
  height: 50px;
  padding-left: 20px;
  display: flex;
  align-items: center;
  background: ${(props) => (props.isActive ? "rgba(26, 86, 219, 0.3)" : "none")};
  border-radius: 8px;
  margin: 12px;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(26, 86, 219, 0.2);
    transform: translateX(5px);
  }

  .icon {
    color: white;
  }
`;

export const ListLink = styled(Link)`
  font-size: 1rem;
  padding: 15px 10px;
  width: 100%;
  line-height: 19px;
  color: #fff;
  text-decoration: none;
  margin-left: 5px;
  font-weight: ${(props) => (props.isActive ? "600" : "400")};
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
  
  &:hover {
    color: #6ba5fd;
  }
`;
