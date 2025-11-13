package com.crudMySql.demo.repository;


import jakarta.transaction.Transactional;
import  com.crudMySql.demo.models.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    Optional<Usuario> findByEmail(String email);


    @Transactional
    void deleteByEmail(String email);
}