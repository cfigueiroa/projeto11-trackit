import styled from "styled-components";

export default function Footer() {
  return (
    <Container>
      <p>Hábitos</p>
      <p>Hoje</p>
      <p>Histórico</p>
    </Container>
  );
}

export const Container = styled.div`
  min-height: 70px;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 18px;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;
  p {
    font-family: "Lexend Deca";
    font-style: normal;
    font-weight: 400;
    font-size: 17.976px;
    line-height: 22px;
    text-align: center;
    color: #52b6ff;
  }
`;
