import Header from "../../components/Header";
import styled from "styled-components";
import { useEffect, useState } from "react";
import weekDays from "../../constants/weekDays";
import useMyContext from "../../components/Context";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import api from "../../services/api";
import { IonIcon } from "@ionic/react";
import { trashOutline } from "ionicons/icons";
import Spinner from "../../components/Spinner";

export default function Habits() {
  const navigate = useNavigate();
  const { user, getPercentage } = useMyContext();
  const [newHabit, setNewHabit] = useState({ days: [], name: "" });
  const [habitsList, setHabitsList] = useState();
  const [showForm, setShowForm] = useState(false);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    if (!user.token) {
      navigate("/");
    }
    const promise = api.getHabits(user.token);
    promise.then((res) => {
      setHabitsList(res.data.reverse());
    });
    promise.catch((err) => {
      console.log(err);
    });
  }, [reload, user.token, navigate]);

  function createHabit(e) {
    e.preventDefault();
    if (newHabit.days.length === 0) {
      window.alert("Selecione ao menos um dia da semana");
      return;
    }
    const promise = api.createHabit(newHabit, user.token);
    promise.then((res) => {
      getPercentage();
    });
    promise.catch((err) => {
      alert(err.response.data.message);
    });
    promise.finally(() => {
      resetHabits();
      setReload(!reload);
    });
  }

  function deleteHabit(id) {
    if (window.confirm("Tem certeza que deseja deletar esse hábito?")) {
      const promise = api.deleteHabit(id, user.token);
      promise.then((res) => {
        getPercentage();
      });
      promise.catch((err) => {
        alert(err.response.data.message);
      });
      promise.finally(() => {
        setReload(!reload);
      });
    }
  }

  function resetHabits() {
    setNewHabit({ days: [], name: "" });
  }

  const handleDayChange = (day) => {
    if (newHabit.days.includes(day)) {
      setNewHabit({
        ...newHabit,
        days: newHabit.days.filter((d) => d !== day),
      });
    } else {
      const newDays = [...newHabit.days, day].sort();
      setNewHabit({ ...newHabit, days: newDays });
    }
  };

  if (!habitsList) {
    return (
      <>
        <Header />
        <Spinner />
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <Container>
        <Headline>
          <h2>Meus hábitos</h2>
          <button onClick={() => setShowForm(!showForm)}>+</button>
        </Headline>
        {showForm && (
          <FormContainer>
            <Form onSubmit={createHabit}>
              <input
                value={newHabit.name}
                onChange={(e) =>
                  setNewHabit({ ...newHabit, name: e.target.value })
                }
                type="text"
                placeholder="nome do hábito"
                required
              />
              <div>
                {weekDays.map((d) => (
                  <DayBtn
                    selected={newHabit.days.includes(d.id)}
                    type="button"
                    key={d.id}
                    onClick={() => handleDayChange(d.id)}
                  >
                    {d.name}
                  </DayBtn>
                ))}
              </div>
              <div>
                <button type="button" onClick={resetHabits}>
                  Cancelar
                </button>
                <button type="submit">Salvar</button>
              </div>
            </Form>
          </FormContainer>
        )}
        {habitsList.length > 0 ? (
          habitsList.map((h) => (
            <HabitContainer key={h.id}>
              <Habit>
                <HabitHeadline>
                  <h2>{h.name}</h2>
                  <IonIcon
                    icon={trashOutline}
                    onClick={() => deleteHabit(h.id)}
                    size="large"
                    title="Deletar hábito"
                  />
                </HabitHeadline>
                <HabitBtns>
                  {weekDays.map((d) => (
                    <DayBtn
                      selected={h.days.includes(d.id)}
                      type="button"
                      key={d.id}
                    >
                      {d.name}
                    </DayBtn>
                  ))}
                </HabitBtns>
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #666666;
`;

export const HabitBtns = styled.div`
  display: flex;
  gap: 4px;
`;

export const Container = styled.div`
  min-height: 100vh;
  padding: 70px 0;
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
