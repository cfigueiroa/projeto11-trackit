import axios from "axios";

const api = {
  url: "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit",

  // Fazer cadastro
  fazerCadastro: (obj) => {
    return axios.post(`${this.url}/auth/sign-up`, obj)
      .then(res => console.log(res))
      .catch(err => console.log(err));
  },

  // Fazer login
  fazerLogin: (obj) => {
    return axios.post(`${this.url}/auth/login`, obj);
  },

  // Criar hábito
  criarHabito: (obj, token) => {
    return axios.post(`${this.url}/habits`, obj, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  // Listar hábitos
  listarHabitos: (token) => {
    return axios.get(`${this.url}/habits`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  // Deletar hábito
  deletarHabito: (id, token) => {
    return axios.delete(`${this.url}/habits/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};

export default api;
