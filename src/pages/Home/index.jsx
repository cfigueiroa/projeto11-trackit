import { Container, Form } from "./styles";
import logo from "../../assets/logo.png";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useMyContext from "../../components/Context";
import { StyledLink } from "./styles";
import api from "../../services/api";

export default function Home() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const { user, setUser } = useMyContext();

  function login(e) {
    e.preventDefault();
    const promise = api.login(form);
    promise.then((res) => {
      setUser(res.data, "token");
      navigate("/hoje");
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
      navigate("/hoje");
    }
    // eslint-disable-next-line
  }, []);

  return (
    <Container>
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
      <StyledLink to="/cadastro">
        <p>Não tem uma conta? Cadastre-se!</p>
      </StyledLink>
    </Container>
  );
}
