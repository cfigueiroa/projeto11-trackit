import styled from "styled-components";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useNavigate } from "react-router-dom";
import useMyContext from "../../components/Context";

export default function Footer() {
  const { percentage } = useMyContext();
  const navigate = useNavigate();
  return (
    <Container>
      <p onClick={() => navigate("/habitos")}>Hábitos</p>
      <ProgressbarContainer onClick={() => navigate("/hoje")}>
        <CircularProgressbar
          value={percentage}
          text={`Hoje`}
          background
          backgroundPadding={6}
          styles={buildStyles({
            backgroundColor: "#3e98c7",
            textColor: "#fff",
            pathColor: "#fff",
            trailColor: "transparent",
          })}
        />
      </ProgressbarContainer>
      <p onClick={() => navigate("/historico")}>Histórico</p>
    </Container>
  );
}

export const ProgressbarContainer = styled.div`
  cursor: pointer;
  width: 91px;
  height: 91px;
  position: absolute;
  left: calc(50% - (91px / 2));
  bottom: 10px;
  font-family: "Lexend Deca";
`;

export const Container = styled.div`
  position: relative;
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
    cursor: pointer;
    font-family: "Lexend Deca";
    font-style: normal;
    font-weight: 400;
    font-size: 17.976px;
    line-height: 22px;
    text-align: center;
    color: #52b6ff;
  }
`;
