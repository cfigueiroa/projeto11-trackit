import { Container, Form } from "./styles";
import logo from "../../assets/logo.png";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import useMyContext from "../../components/Context";

export default function Home() {
  const navigate = useNavigate();
  const url = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit";
  const [form, setForm] = useState({ email: "", password: "" });
  const { user, setUser } = useMyContext();

  function login(e) {
    e.preventDefault();
    const promise = axios.post(`${url}/auth/login`, form);
    promise.then((res) => {
      setUser(res.data, "token");
      navigate("/habitos");
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

  useEffect(() => {
    if (user.token) {
      navigate("/habitos");
    }
    // eslint-disable-next-line
  }, []);

  return (
    <Container>
      <p>{user.token && JSON.stringify(user) + " ok!"}</p>
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
      <Link to="/cadastro">
        <p>Não tem uma conta? Cadastre-se!</p>
      </Link>
    </Container>
  );
}
