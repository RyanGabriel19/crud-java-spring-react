// const API_URL = process.env.REACT_APP_API_URL;
const API_URL ='http://localhost:8080/usuario';


export const buscarUsuarioPorEmail = async (email) => {
  const response = await fetch(`${API_URL}?email=${email}`);
  return response.json();
};

export const salvarUsuario = async (usuario) => {
  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(usuario)
  });
};

export const atualizarUsuario = async (id, usuario) => {
  await fetch(`${API_URL}?id=${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(usuario)
  });
};

export const deletarUsuario = async (email) => {
  await fetch(`${API_URL}?email=${email}`, { method: "DELETE" });
};
