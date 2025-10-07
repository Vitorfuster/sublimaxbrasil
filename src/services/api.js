import axios from "axios"; // conectando com o back-end

const sublimaxBrasil = axios.create({
  baseURL: "http://localhost:3002",
});

// Adiconar token no header do request

// Interceptar requisição
sublimaxBrasil.interceptors.request.use(async (config) => {
  // Recuperar dados do usuário no local storage
  const userData = await localStorage.getItem("sublimaxBrasil:userData");
  // Faz uma verificação se o userData ja existem em local storage(Usuário logado), se sim ele pega o token do userData após transforma-lo em objeto, evitando quebrar a aplicação
  const token = userData && JSON.parse(userData).token;
  // insirir o iten athorization no header com a formatação correta
  config.headers.authorization = `Bearer ${token}`;

  return config;
});

export default sublimaxBrasil;
