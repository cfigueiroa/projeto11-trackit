import styled from "styled-components";

import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function Footer({ percentage }) {
  return (
    <Container>
      <p>Hábitos</p>
      <Example>
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
      </Example>
      <p>Histórico</p>
    </Container>
  );
}

function Example(props) {
  return <div style={{width: "30%"}}>{props.children}</div>;
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
