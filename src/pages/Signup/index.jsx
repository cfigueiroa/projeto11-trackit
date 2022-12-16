import { Container, Form } from "./styles";
import logo from "../../assets/logo.png";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const url = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit";
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
    name: "",
    image: "",
  });
  const [loading, setLoading] = useState(false);


  function handleForm(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function signup(e) {
    e.preventDefault();
    setLoading(true);
    const promise = axios.post(`${url}/auth/sign-up`, form);
    promise.then(() => {
      alert("Cadastro realizado com sucesso!");
      navigate("/");
    });
    promise.catch((err) => {
      alert(err.response.data.message);
    });
    promise.finally(() => {
      setLoading(false);
    }
    );
  }

  return (
    <Container>
      <img src={logo} alt="Logo" />
      <Form onSubmit={signup}>
        <input
          required
          name="email"
          onChange={handleForm}
          value={form.email}
          type="email"
          placeholder="email"
          disabled={loading}
        />
        <input
          required
          name="password"
          onChange={handleForm}
          value={form.password}
          type="password"
          placeholder="senha"
          disabled={loading}
        />
        <input
          required
          name="name"
          onChange={handleForm}
          value={form.name}
          type="text"
          placeholder="nome"
          disabled={loading}
        />
        <input
          required
          name="image"
          onChange={handleForm}
          value={form.image}
          type="url"
          placeholder="foto"
          disabled={loading}
        />
        <input type="submit" value="Cadastrar" disabled={loading} />
      </Form>
      <Link to="/">
        <p>Já tem uma conta? Faça login!</p>
      </Link>
    </Container>
  );
}
