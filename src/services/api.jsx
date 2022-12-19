import axios from "axios";

const api = {
  url: "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit",

  // Fazer cadastro
  fazerCadastro: (obj) => {
    const { url } = api;
    return axios.post(`${url}/auth/sign-up`, obj);
  },

  // Fazer login
  fazerLogin: (obj) => {
    const { url } = api;
    return axios.post(`${url}/auth/login`, obj);
  },

  // Criar hábito
  criarHabito: (obj, token) => {
    const { url } = api;
    return axios.post(`${url}/habits`, obj, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  // Listar hábitos
  listarHabitos: (token) => {
    const { url } = api;
    return axios.get(`${url}/habits`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  // Deletar hábito
  deletarHabito: (id, token) => {
    const { url } = api;
    return axios.delete(`${url}/habits/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  // Buscar hábitos de hoje
  buscarHabitosDeHoje: (token) => {
    const { url } = api;
    return axios.get(`${url}/habits/today`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  // Marcar hábito como feito
  marcarHabitoComoFeito: (id, token) => {
    const { url } = api;
    return axios.post(
      `${url}/habits/${id}/check`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  },

  // Desmarcar hábito como feito
  desmarcarHabitoComoFeito: (id, token) => {
    const { url } = api;
    return axios.post(
      `${url}/habits/${id}/uncheck`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  },

  // Histórico de hábitos diário
  historicoHabitosDiario: (token) => {
    const { url } = api;
    return axios.get(`${url}/habits/history/daily`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};

export default api;
