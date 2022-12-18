import Header from "../../components/Header";
import styled from "styled-components";
import { useEffect, useState } from "react";
import weekDays from "../../constants/weekDays";
import useMyContext from "../../components/Context";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import check from "../../assets/check.png";

export default function Today() {
  const navigate = useNavigate();
  const url = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit";
  const { user } = useMyContext();
  const [habitsList, setHabitsList] = useState();
  const [reload, setReload] = useState(false);
  const [percentage, setPercentage] = useState(0);
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
    const headers = { headers: { Authorization: `Bearer ${user.token}` } };
    const promise = axios.get(`${url}/habits/today`, headers);
    promise.then((res) => {
      const tempHabit = res.data.reverse()
      setHabitsList(tempHabit);
      const total = tempHabit.length;
      const done = tempHabit.filter((h) => h.done).length;
      const percent = Number(((done / total) * 100).toFixed(0));
      setPercentage(percent);
    });
    promise.catch((err) => {
      console.log(err);
    });
  }, [reload, user.token, navigate]);

  function toggleHabit(id, done) {
    const headers = { headers: { Authorization: `Bearer ${user.token}` } };
    const body = {};
    let promise;
    if (!done) {
      promise = axios.post(`${url}/habits/${id}/check`, body, headers);
    } else {
      promise = axios.post(`${url}/habits/${id}/uncheck`, body, headers);
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
                  <Bilola selected={h.done}>
                    <img
                      src={check}
                      alt="check"
                      onClick={() => toggleHabit(h.id, h.done)}
                    />
                  </Bilola>
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
      <Footer percentage={percentage}/>
    </>
  );
}

export const Bilola = styled.div`
  position: absolute;
  display: grid;
  place-items: center;
  top: 10px;
  right: 10px;
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 180px;
  width: 90.67%;
  background-color: #fff;
  border-radius: 5px;
  margin-bottom: 10px;
`;

export const HabitHeadline = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const HabitBtns = styled.div`
  display: flex;
  gap: 4px;
`;

export const Container = styled.div`
  min-height: 100vh;
  padding-top: 70px;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: center; */
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
  button {
    border: none;
    padding: 0;
    width: 40px;
    height: 35px;
    line-height: 35px;
    text-align: center;
    background: #52b6ff;
    border-radius: 4.63636px;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 27.976px;
    color: #ffffff;
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

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 180px;
  width: 90.67%;
  background-color: #fff;
  border-radius: 5px;
  margin-bottom: 10px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 0 20px;
  gap: 15px;
  input {
    width: 89.12%;
    min-height: 45px;
    font-family: "Lexend Deca";
    font-size: 19.976px;
    line-height: 25px;
  }
  input::placeholder {
    color: #dbdbdb;
  }
  div:first-of-type {
    display: flex;
    width: 100%;
    /* justify-content: center; */
    gap: 4px;
  }
  div:last-of-type {
    display: flex;
    justify-content: flex-end;
    button:first-of-type {
      border: none;
      height: 35px;
      width: 84px;
      border-radius: 4.636363506317139px;
      background-color: #fff;
      color: #52b6ff;
    }
    button:last-of-type {
      border: none;
      height: 35px;
      width: 84px;
      border-radius: 4.636363506317139px;
      background-color: #52b6ff;
      color: #fff;
    }
  }
`;
