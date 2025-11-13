// const API_URL = process.env.REACT_APP_API_URL;
const API_URL = process.env.REACT_APP_API_URL + "/usuario";


export const buscarUsuarioPorEmail = async (email) => {
  const response = await fetch(`${API_URL}?email=${email}`);
  return response.json();
};

export const salvarUsuario = async (usuario) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(usuario)
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Falha ao salvar usuário. Status: ' + response.status);
  }
};

export const atualizarUsuario = async (id, usuario) => {
  const response = await fetch(`${API_URL}?id=${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(usuario)
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Falha ao atualizar usuário. Status: ' + response.status);
  }
};

export const deletarUsuario = async (email) => {
  const response = await fetch(`${API_URL}?email=${email}`, {
    method: "DELETE"
  });

  // Verifica se a resposta do backend NÃO foi um sucesso
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Falha ao deletar usuário. Status: ' + response.status);
  }
};
