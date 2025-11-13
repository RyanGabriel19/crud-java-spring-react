package com.crudMySql.demo.services;


import com.crudMySql.demo.models.Usuario;
import org.springframework.stereotype.Service;
import com.crudMySql.demo.repository.UsuarioRepository;
import jakarta.transaction.Transactional;

import java.util.Optional;

@Service
public class UsuarioService {
    private final UsuarioRepository repository;

    public UsuarioService(UsuarioRepository repository) {
        this.repository = repository;
    }

    public void salvaUsuario(Usuario usuario) {
        repository.saveAndFlush(usuario);
    }

    public Usuario buscarUsuarioPorEmail(String email) {
        return repository.findByEmail(email).orElseThrow(
                () -> new RuntimeException("email nao encontrado")
        );
    }

    @Transactional
    public void deletarUsuarioPorEmail(String email) {
        repository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("Usuário não encontrado com o email: " + email));
        repository.deleteByEmail(email);
    }

    public void atualizarDadosPorID(Long id, Usuario usuario) {
        // Busca o usuário no banco
        Optional<Usuario> usuarioOptional = repository.findById(id);

        if (!usuarioOptional.isPresent()) {
            throw new RuntimeException("Usuário não encontrado");
        }

        Usuario usuarioEntity = usuarioOptional.get();

        // Atualiza os campos, mantendo os valores antigos se forem nulos
        if (usuario.getName() != null) {  // atenção: no seu model o campo é 'name'
            usuarioEntity.setName(usuario.getName());
        }

        if (usuario.getEmail() != null) {
            usuarioEntity.setEmail(usuario.getEmail());
        }

        // Salva as alterações no banco
        repository.saveAndFlush(usuarioEntity);
    }
}