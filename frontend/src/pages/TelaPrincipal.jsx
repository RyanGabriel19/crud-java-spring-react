import { useState, useCallback } from "react";
import Modal from "../components/Modal.jsx";
import { 
  salvarUsuario, 
  buscarUsuarioPorEmail, 
  atualizarUsuario, 
  deletarUsuario 
} from "../service/serviceUsuario.js";
// Certifique-se que o caminho para o CSS esteja correto (usando o seu CSS estilizado)
import "./tela.css"; 

export default function TelaPrincipal1() {
  const [openModal, setOpenModal] = useState("");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [id, setId] = useState("");
  const [usuarioBuscado, setUsuarioBuscado] = useState(null);
  const [erro, setErro] = useState("");

  // Função para limpar estados e fechar o modal
  const fecharModal = useCallback(() => {
    setOpenModal("");
    setNome("");
    setEmail("");
    setId("");
    setUsuarioBuscado(null);
    setErro("");
  }, []);

  // Handler para o Cadastro (Create)
  const handleCadastrar = async () => {
    try {
      if (!nome || !email) {
        setErro("Nome e Email são obrigatórios.");
        return;
      }
      await salvarUsuario({ name: nome, email });
      alert("Usuário cadastrado com sucesso!");
      fecharModal();
    } catch (error) {
      setErro("Erro ao cadastrar: " + error.message);
    }
  };

  // Handler para a Listagem (Read)
  const handleListar = async () => {
    try {
      setErro("");
      setUsuarioBuscado(null);
      if (!email) {
        setErro("Email é obrigatório para a busca.");
        return;
      }
      const usuario = await buscarUsuarioPorEmail(email);
      if (usuario) {
        setUsuarioBuscado(usuario);
      } else {
        setErro("Usuário não encontrado.");
      }
    } catch (error) {
      setErro("Erro ao buscar usuário.");
      setUsuarioBuscado(null);
    }
  };

  // Handler para a Atualização (Update)
  const handleAtualizar = async () => {
    try {
      if (!id || !nome || !email) {
        setErro("ID, Nome e Email são obrigatórios.");
        return;
      }
      await atualizarUsuario(id, { name: nome, email });
      alert("Usuário atualizado com sucesso!");
      fecharModal();
    } catch (error) {
      setErro("Erro ao atualizar: " + error.message);
    }
  };

  // Handler para o Deletar (Delete)
  const handleDeletar = async () => {
    try {
      if (!email) {
        setErro("Email é obrigatório para deletar.");
        return;
      }
      await deletarUsuario(email);
      alert("Usuário deletado com sucesso!");
      fecharModal();
    } catch (error) {
      setErro("Erro ao deletar: Usuário não encontrado ou erro de conexão.");
    }
  };

  return (
    <div className="tela-container"> {/* Aplica o estilo do CSS */}
      <h1>CRUDIZINHO BASICO 🛠️</h1>
      <div className="button-group">
        <button onClick={() => setOpenModal("cadastrar")}>Cadastrar</button>
        <button onClick={() => setOpenModal("listar")}>Listar</button>
        <button onClick={() => setOpenModal("atualizar")}>Atualizar</button>
        <button onClick={() => setOpenModal("deletar")}>Deletar</button>
      </div>
      
      {/* 🔴 Exibição de Erro Geral */}
      {erro && (
        <div style={{ color: 'red', marginTop: '20px', fontWeight: '500' }}>
          {erro}
        </div>
      )}

      {/* --- Modal de Cadastrar --- */}
      <Modal isOpen={openModal === "cadastrar"} onClose={fecharModal}>
        <h2>Cadastrar Usuário ➕</h2>
        <input 
          placeholder="Nome" 
          value={nome} 
          onChange={(e) => setNome(e.target.value)} 
        />
        <input 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />
        <button onClick={handleCadastrar}>Salvar</button>
      </Modal>

      {/* --- Modal de Listar --- */}
      <Modal isOpen={openModal === "listar"} onClose={fecharModal}>
        <h2>Buscar Usuário por Email 🔎</h2>
        <input 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />
        <button onClick={handleListar}>Buscar</button>
        
        {/* Exibe o resultado da busca */}
        {usuarioBuscado && (
          <div className="resultado-container"> {/* Aplica o estilo de resultado */}
            <p><strong>ID:</strong> {usuarioBuscado.id}</p>
            <p><strong>Nome:</strong> {usuarioBuscado.name}</p>
            <p><strong>Email:</strong> {usuarioBuscado.email}</p>
          </div>
        )}
        
        {/* Exibe erro específico de busca, se houver */}
        {erro && openModal === "listar" && (
            <p style={{ color: 'red', margin: '10px 0 0 0' }}>{erro}</p>
        )}
      </Modal>

      {/* --- Modal de Atualizar --- */}
      <Modal isOpen={openModal === "atualizar"} onClose={fecharModal}>
        <h2>Atualizar Usuário ✏️</h2>
        <input 
          placeholder="ID do Usuário a ser Atualizado" 
          value={id} 
          onChange={(e) => setId(e.target.value)} 
        />
        <input 
          placeholder="Novo Nome" 
          value={nome} 
          onChange={(e) => setNome(e.target.value)} 
        />
        <input 
          placeholder="Novo Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />
        <button onClick={handleAtualizar}>Atualizar</button>
      </Modal>

      {/* --- Modal de Deletar --- */}
      <Modal isOpen={openModal === "deletar"} onClose={fecharModal}>
        <h2>Deletar Usuário 🗑️</h2>
        <input 
          placeholder="Email do Usuário a ser Deletado" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />
        <button onClick={handleDeletar}>Deletar</button>
      </Modal>
    </div>
  );
}