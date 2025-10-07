import styled from "styled-components";
import { Link } from "react-router-dom";
export const Container = styled.div`
  background: #3c3c3c;
  box-shadow: 0px 0px 14px rgpa(0, 0, 0, 0.15);
  width: 300px;
  top: 0;
  left: 0;

  hr {
    margin: 50px 15px;
  }
`;

export const ItemContainer = styled.div`
  height: 50px;
  padding-left: 20px;
  display: flex;
  align-items: center;
  background: ${(props) => (props.isActive ? "#565656" : "none")};
  border-radius: 2px;
  margin: 8px;

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
`;
