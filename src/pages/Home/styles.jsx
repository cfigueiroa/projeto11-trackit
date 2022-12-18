import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f2f2f2;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 6px;
  input {
    min-width: 303px;
    font-family: "Lexend Deca";
    height: 45px;
    padding-left: 10px;
    border: 1px solid #d4d4d4;
    border-radius: 4.63636px;
    &::placeholder {
      color: #dbdbdb;
    }
  }
  input[type="submit"] {
    border: none;
    background: #52b6ff;
    font-size: 20.976px;
    line-height: 26px;
    text-align: center;
    color: #ffffff;
  }
`;

export const StyledLink = styled(Link)`
  margin-top: 25px;
  font-family: "Lexend Deca";
  font-style: normal;
  font-weight: 400;
  font-size: 13.976px;
  line-height: 17px;
  text-align: center;
  text-decoration-line: underline;
  color: #52b6ff;
`;
