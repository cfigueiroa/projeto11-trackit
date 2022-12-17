import Header from "../../components/Header";
import styled from "styled-components";
import { useState } from "react";
import weekDays from "../../constants/weekDays";

export default function Habits() {
  const [habits, setHabits] = useState({ days: [], input: "" });
  function teste(e) {
    e.preventDefault();
    console.log(habits);
  }

  const handleDayChange = (day) => {
    if (habits.days.includes(day)) {
      setHabits({ ...habits, days: habits.days.filter((d) => d !== day) });
    } else {
      const newDays = [...habits.days, day].sort();
      setHabits({ ...habits, days: newDays });
    }
  };

  return (
    <Container>
      <Header />
      <Headline>
        <h2>Meus hábitos</h2>
        <button>+</button>
      </Headline>
      <FormContainer>
        <Form onSubmit={teste}>
          <input
            value={habits.input}
            onChange={(e) => setHabits({ ...habits, input: e.target.value })}
            type="text"
            placeholder="nome do hábito"
          />
          <div>
            {weekDays.map((d) => (
              <DayBtn
                selected={habits.days.includes(d.id)}
                type="button"
                key={d.id}
                onClick={() => handleDayChange(d.id)}
              >
                {d.name}
              </DayBtn>
            ))}
          </div>
          <div>
            <button
              type="button"
              onClick={() => setHabits({ days: [], input: "" })}
            >
              Cancelar
            </button>
            <button type="submit">Salvar</button>
          </div>
        </Form>
      </FormContainer>
      <Content>
        <p>
          Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para
          começar a trackear!
        </p>
      </Content>
    </Container>
  );
}

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
    font-family: "Lexend Deca";
    font-size: 27.976px;
    color: #ffffff;
    /* text doesn't look vertically aligned */
  }
`;

export const DayBtn = styled.button`
  border: 1px solid #d4d4d4;
  background-color: ${(props) => (props.selected ? "blue" : "red")};
  border-radius: 5px;
  width: 30px;
  height: 30px;
  font-family: "Lexend Deca";
  font-style: normal;
  font-weight: 400;
  font-size: 19.976px;
  line-height: 25px;
  color: #dbdbdb;
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
