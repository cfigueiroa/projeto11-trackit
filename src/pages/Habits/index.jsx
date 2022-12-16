import Header from "../../components/Header";
import styled from "styled-components";

export default function Habits() {
  return (
    <Container>
      <Header />
      <p>Habits</p>
    </Container>
  );
}

export const Container = styled.div`
  min-height: 100vh;
  padding-top: 70px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f2f2f2;
`;