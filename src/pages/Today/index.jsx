import Header from "../../components/Header";
import styled from "styled-components";
import { useEffect, useState } from "react";
import weekDays from "../../constants/weekDays";
import useMyContext from "../../components/Context";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import check from "../../assets/check.png";
import api from "../../services/api";

export default function Today() {
  const navigate = useNavigate();
  const { user, getPercentage, percentage } = useMyContext();
  const [habitsList, setHabitsList] = useState();
  const [reload, setReload] = useState(false);
  const today = new Date();
  const dayOfWeek = weekDays[today.getDay()].day;
  const date = today.getDate();
  const month = today.getMonth() + 1;

  function format(date, month) {
    const formattedDate = String(date).padStart(2, "0");
    const formattedMonth = String(month).padStart(2, "0");
    return `${formattedMonth}/${formattedDate}`;
  }

  useEffect(() => {
    if (!user.token) {
      navigate("/");
    }
    const promise = api.getTodayHabits(user.token);
    promise.then((res) => {
      const tempHabit = res.data.reverse();
      setHabitsList(tempHabit);
    });
    promise
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        getPercentage();
      });
  }, [reload, user.token, navigate, getPercentage]);

  function toggleHabit(id, done) {
    let promise;
    if (!done) {
      promise = api.markHabitAsDone(id, user.token);
    } else {
      promise = api.unmarkHabitAsDone(id, user.token);
    }
    promise.catch((err) => {
      alert(err.response.data.message);
    });
    promise.finally(() => {
      setReload(!reload);
    });
  }

  if (!habitsList) {
    return <>Carregando...</>;
  }

  return (
    <>
      <Header />
      <Container>
        <Headline>
          <h2>
            {dayOfWeek}, {format(date, month)}
          </h2>
          {percentage ?  <h3 style={{color: "#8FC549"}}>{percentage}% dos hábitos concluídos</h3> : <h3>Nenhum hábito concluído ainda</h3>}
        </Headline>
        {habitsList.length > 0 ? (
          habitsList.map((h) => (
            <HabitContainer key={h.id}>
              <Habit>
                <HabitHeadline>
                  <h2>{h.name}</h2>
                  <p>
                    Sequência atual: {h.currentSequence} dias
                    <br />
                    Seu recorde: {h.highestSequence} dias
                  </p>
                  <CheckSquare selected={h.done}>
                    <img
                      src={check}
                      alt="check"
                      onClick={() => toggleHabit(h.id, h.done)}
                    />
                  </CheckSquare>
                </HabitHeadline>
              </Habit>
            </HabitContainer>
          ))
        ) : (
          <Content>
            <p>
              Você não tem nenhum hábito cadastrado ainda. Adicione um hábito
              para começar a trackear!
            </p>
          </Content>
        )}
      </Container>
      <Footer />
    </>
  );
}

export const CheckSquare = styled.div`
  position: absolute;
  display: grid;
  place-items: center;
  top: calc(50% - (69px / 2));
  right: 13px;
  width: 69px;
  height: 69px;
  background: ${(props) => (props.selected ? "#8fc549" : "#EBEBEB")};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
`;

export const Habit = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 20px;
  gap: 15px;
  h2 {
    font-family: "Lexend Deca";
    font-size: 19.976px;
    line-height: 25px;
    color: #666666;
  }
`;

export const HabitContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 94px;
  width: 90.67%;
  background-color: #fff;
  border-radius: 5px;
  margin-bottom: 10px;
`;

export const HabitHeadline = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  p {
    margin-top: 7px;
    font-family: "Lexend Deca";
    font-size: 12.976px;
    line-height: 16px;
    color: #666666;
  }
`;

export const HabitBtns = styled.div`
  display: flex;
  gap: 4px;
`;

export const Container = styled.div`
  min-height: 100vh;
  padding: 98px 17px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f2f2f2;
`;

export const Headline = styled.div`
  width: 100%;
  margin-bottom: 17px;
  h2 {
    font-family: "Lexend Deca";
    font-size: 22.976px;
    line-height: 29px;
    color: #126ba5;
  }
  h3 {
    font-family: "Lexend Deca";
    font-size: 17.976px;
    line-height: 22px;
    color: #bababa;
  }
`;

export const DayBtn = styled.button`
  border: 1px solid #d4d4d4;
  background-color: ${(props) => (props.selected ? "#CFCFCF" : "#fff")};
  color: ${(props) => (props.selected ? "#fff" : "#CFCFCF")};
  border-radius: 5px;
  width: 30px;
  height: 30px;
  font-family: "Lexend Deca";
  font-style: normal;
  font-weight: 400;
  font-size: 19.976px;
  line-height: 25px;
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
