import { Container, Form } from "./styles";
import logo from "../../assets/logo.svg";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useMyContext from "../../components/Context";
import { StyledLink } from "./styles";
import api from "../../services/api";
import Loading from "../../components/Loading";
import Swal from 'sweetalert2';

export default function Home() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const { user, setUser } = useMyContext();

  function login(e) {
    e.preventDefault();
    setLoading(true);
    const promise = api.login(form);
    promise.then((res) => {
      setUser(res.data, "token");
      navigate("/hoje");
    });
    promise
      .catch((err) => {
        Swal.fire({
          title: err.response.data.message,
          icon: 'error'
        });
      })
      .finally(() => {
        setLoading(false);
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
        <button type="submit" disabled={loading}>
          {loading ? <Loading width={100} height={100} /> : "Entrar"}
        </button>
      </Form>
      <StyledLink to="/cadastro">
        <p>Não tem uma conta? Cadastre-se!</p>
      </StyledLink>
    </Container>
  );
}
