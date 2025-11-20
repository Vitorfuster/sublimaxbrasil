import styled from "styled-components";

export const Container = styled.div`
  form {
    display: flex;
    /* flex-direction: column; */
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;

    .cep {
      width: 90%;
      margin-bottom: 40px;
    }

    /* .complement {
     label {
      text-align: center;
     }
    } */
  }
  margin-bottom: 20px;
`;

export const Field = styled.div`
  width: 45%;
`;

export const Label = styled.label`
  display: block;
  font-weight: 500;
  font-size: var(--fsMM);
  line-height: 16px;
  color: var(--colorT1);
  margin-bottom: 8px;
  letter-spacing: 0.5px;
`;

export const Input = styled.input`
  width: 100%;
  height: 45px;
  background-color: rgba(255, 255, 255, 0.9);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  /* border-radius: 8px; */
  padding-left: 15px;
  font-size: 16px;
  transition: all 0.3s ease;
  border: ${(props) =>
    props.error ? "2px solid #cc1717;" : "1px solid var(--colorT4)"};

  &:focus {
    outline: none;
  }
`;

export const Select = styled.select`
  width: 100%;
  height: 45px;
  background-color: rgba(255, 255, 255, 0.9);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  /* border-radius: 8px; */
  padding-left: 15px;
  font-size: 16px;
  transition: all 0.3s ease;
  border: ${(props) =>
    props.error ? "2px solid #cc1717;" : "1px solid var(--colorT4)"};

  &:focus {
    outline: none;
  }
`;
