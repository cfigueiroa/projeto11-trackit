import axios from "axios";

const instance = axios.create({
  baseURL: "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit",
});

const headers = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

const api = {
  // Fazer cadastro
  fazerCadastro: (obj) => {
    return instance.post(`/auth/sign-up`, obj);
  },

  // Fazer login
  fazerLogin: (obj) => {
    return instance.post(`/auth/login`, obj);
  },

  // Criar hábito
  criarHabito: (obj, token) => {
    return instance.post(`/habits`, obj, {
      ...headers(token),
    });
  },

  // Listar hábitos
  listarHabitos: (token) => {
    return instance.get(`/habits`, {
      ...headers(token),
    });
  },

  // Deletar hábito
  deletarHabito: (id, token) => {
    return instance.delete(`/habits/${id}`, {
      ...headers(token),
    });
  },

  // Buscar hábitos de hoje
  buscarHabitosDeHoje: (token) => {
    return instance.get(`/habits/today`, {
      ...headers(token),
    });
  },

  // Marcar hábito como feito
  marcarHabitoComoFeito: (id, token) => {
    return instance.post(
      `/habits/${id}/check`,
      {},
      {
        ...headers(token),
      }
    );
  },

  // Desmarcar hábito como feito
  desmarcarHabitoComoFeito: (id, token) => {
    return instance.post(
      `/habits/${id}/uncheck`,
      {},
      {
        ...headers(token),
      }
    );
  },

  // Histórico de hábitos diário
  historicoHabitosDiario: (token) => {
    return instance.get(`/habits/history/daily`, {
      ...headers(token),
    });
  },
};

export default api;
