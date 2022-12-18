import Header from "../../components/Header";
import styled from "styled-components";
import { useEffect } from "react";
import useMyContext from "../../components/Context";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";

export default function History() {
  const navigate = useNavigate();
  const { user } = useMyContext();

  useEffect(() => {
    if (!user.token) {
      navigate("/");
    }
  });

  return (
    <>
      <Header />
      <Container>
        <Headline>
          <h2>Histórico</h2>
        </Headline>
        <Content>
          <p>Em breve você poderá ver o histórico dos seus hábitos aqui!</p>
        </Content>
      </Container>
      <Footer />
    </>
  );
}

export const Container = styled.div`
  min-height: 100vh;
  padding-top: 70px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f2f2f2;
`;

export const Headline = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  * {
    margin: 28px 18px;
  }
  h2 {
    font-family: "Lexend Deca";
    font-size: 22.976px;
    line-height: 29px;
    color: #126ba5;
  }
`;

export const Content = styled.div`
  margin: 28px 18px;
  p {
    font-family: "Lexend Deca";
    font-size: 17.976px;
    line-height: 22px;
    color: #666666;
  }
`;
