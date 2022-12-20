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
import Loading from "../../components/Loading";

export default function Habits() {
  const navigate = useNavigate();
  const { user, getPercentage } = useMyContext();
  const [newHabit, setNewHabit] = useState({ days: [], name: "" });
  const [habitsList, setHabitsList] = useState();
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newRequest, setNewRequest] = useState(false);

  useEffect(() => {
    if (!user.token) {
      navigate("/");
    }
    const promise = api.getHabits(user.token);
    promise.then((res) => {
      setHabitsList(res.data);
    });
    promise.catch((err) => {
      console.log(err);
    });
  }, [newRequest, user.token, navigate]);

  function createHabit(e) {
    setLoading(true);
    e.preventDefault();
    const promise = api.createHabit(newHabit, user.token);
    promise.then(() => {
      setLoading(false);
      getPercentage();
      resetHabits();
      setShowForm(false);
      setNewRequest(!newRequest);
    });
    promise.catch((err) => {
      setLoading(false);
      window.alert(err.response.data.message);
    });
  }

  function deleteHabit(id) {
    if (window.confirm("Tem certeza que deseja deletar esse hábito?")) {
      const promise = api.deleteHabit(id, user.token);
      promise.then((res) => {
        getPercentage();
        setNewRequest(!newRequest);
      });
      promise.catch((err) => {
        alert(err.response.data.message);
      });
    }
  }

  function resetHabits() {
    setNewHabit({ days: [], name: "" });
    setShowForm(false);
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
          <button
            onClick={() => setShowForm(!showForm)}
            data-test="habit-create-btn"
          >
            +
          </button>
        </Headline>
        {showForm && (
          <FormContainer data-test="habit-create-container">
            <Form onSubmit={createHabit}>
              <input
                value={newHabit.name}
                onChange={(e) =>
                  setNewHabit({ ...newHabit, name: e.target.value })
                }
                placeholder="nome do hábito"
                disabled={loading}
                data-test="habit-name-input"
              />
              <div>
                {weekDays.map((d) => (
                  <DayBtn
                    selected={newHabit.days.includes(d.id)}
                    type="button"
                    key={d.id}
                    onClick={() => handleDayChange(d.id)}
                    disabled={loading}
                    data-test="habit-day"
                  >
                    {d.name}
                  </DayBtn>
                ))}
              </div>
              <div>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  data-test="habit-create-cancel-btn"
                  disabled={loading}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  data-test="habit-create-save-btn"
                  disabled={loading}
                >
                  {loading ? <Loading width={84} height={35} /> : "Salvar"}
                </button>
              </div>
            </Form>
          </FormContainer>
        )}
        {habitsList.length > 0 ? (
          habitsList.map((h) => (
            <HabitContainer data-test="habit-container" key={h.id}>
              <Habit>
                <HabitHeadline>
                  <h2 data-test="habit-name">{h.name}</h2>
                  <IonIcon
                    data-test="habit-delete-btn"
                    icon={trashOutline}
                    onClick={() => deleteHabit(h.id)}
                    size="large"
                    title="Deletar hábito"
                  />
                </HabitHeadline>
                <HabitBtns>
                  {weekDays.map((d) => (
                    <DayBtn
                      data-test="habit-day"
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
  font-family: "Lexend Deca";
  input {
    padding-left: 10px;
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
