import { Container, Form } from "./styles";
import logo from "../../assets/logo.svg";
import { useState } from "react";
import { StyledLink } from "./styles";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import Loading from "../../components/Loading";
import Swal from 'sweetalert2';

export default function Signup() {
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
    const promise = api.createAccount(form);
    promise.then(() => {
      navigate("/");
    });
    promise.catch((err) => {
      Swal.fire({
        title: err.response.data.message,
        icon: 'error'
      });
    });
    promise.finally(() => {
      setLoading(false);
    });
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
        <button type="submit" disabled={loading}>
          {loading ? <Loading width={100} height={100} /> : "Cadastrar"}
        </button>
      </Form>
      <StyledLink to="/">
        <p>Já tem uma conta? Faça login!</p>
      </StyledLink>
    </Container>
  );
}
