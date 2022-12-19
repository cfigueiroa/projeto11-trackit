import axios from "axios";

// Constants
const BASE_URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit";
const AUTHORIZATION_HEADER = "Authorization";

// Endpoints
const ENDPOINTS = {
  SIGN_UP: "/auth/sign-up",
  LOGIN: "/auth/login",
  HABITS: "/habits",
  TODAY: "/habits/today",
  HISTORY_DAILY: "/habits/history/daily",
};

// Axios instance with base URL
const AXIOS_INSTANCE = axios.create({
  baseURL: BASE_URL,
});

// Header object with Authorization header and token
const HEADERS = (token) => ({
  headers: {
    [AUTHORIZATION_HEADER]: `Bearer ${token}`,
  },
});

// API object with functions for each endpoint
const api = {
  // fazerCadastro
  createAccount: (obj) => {
    return AXIOS_INSTANCE.post(ENDPOINTS.SIGN_UP, obj);
  },
  // fazerLogin
  login: (obj) => {
    return AXIOS_INSTANCE.post(ENDPOINTS.LOGIN, obj);
  },
  // criarHabito
  createHabit: (obj, token) => {
    return AXIOS_INSTANCE.post(ENDPOINTS.HABITS, obj, {
      ...HEADERS(token),
    });
  },
  // listarHabitos
  getHabits: (token) => {
    return AXIOS_INSTANCE.get(ENDPOINTS.HABITS, {
      ...HEADERS(token),
    });
  },
  // deletarHabito
  deleteHabit: (id, token) => {
    return AXIOS_INSTANCE.delete(`${ENDPOINTS.HABITS}/${id}`, {
      ...HEADERS(token),
    });
  },
  // buscarHabitosDeHoje
  getTodayHabits: (token) => {
    return AXIOS_INSTANCE.get(ENDPOINTS.TODAY, {
      ...HEADERS(token),
    });
  },
  // marcarHabitoComoFeito
  markHabitAsDone: (id, token) => {
    return AXIOS_INSTANCE.post(
      `${ENDPOINTS.HABITS}/${id}/check`,
      {},
      {
        ...HEADERS(token),
      }
    );
  },
  // desmarcarHabitoComoFeito
  unmarkHabitAsDone: (id, token) => {
    return AXIOS_INSTANCE.post(
      `${ENDPOINTS.HABITS}/${id}/uncheck`,
      {},
      {
        ...HEADERS(token),
      }
    );
  },
  // historicoHabitosDiario
  getDailyHistory: (token) => {
    return AXIOS_INSTANCE.get(ENDPOINTS.HISTORY_DAILY, {
      ...HEADERS(token),
    });
  },
};

export default api;
