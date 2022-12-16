import { Container, Form } from "./styles";
import logo from "../../assets/logo.png";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { MyContext } from "../../components/Context";


export default function Home() {
  const navigate = useNavigate();
  const url = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit";
  const [form, setForm] = useState({ email: "", password: "" });
  const { user, setUser } = useContext(MyContext);

  function login(e) {
    e.preventDefault();
    const promise = axios.post(`${url}/auth/login`, form);
    promise.then((res) => {
      navigate("/habitos", { state: { token: res.data.token } });
    });
    promise.catch((err) => {
      alert(err.response.data.message);
    });
  }

  function handleForm(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <Container>
      <p>{user}</p>
      <img src={logo} alt="Logo" />
      <Form onSubmit={login}>
        <input
          required
          name="email"
          onChange={handleForm}
          value={form.email}
          type="email"
          placeholder="email"
        />
        <input
          required
          name="password"
          onChange={handleForm}
          value={form.password}
          type="password"
          placeholder="senha"
        />
        <input type="submit" value="Entrar" />
      </Form>
      <Link to="/cadastro"><p>Não tem uma conta? Cadastre-se!</p></Link>
    </Container>
  );
}
