package com.crudMySql.demo.controller;


import lombok.RequiredArgsConstructor;
import com.crudMySql.demo.models.Usuario;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.crudMySql.demo.services.UsuarioService;

@RestController
@RequestMapping("/usuario")
@RequiredArgsConstructor
public class usuarioController {
    private final UsuarioService usuarioService;

    @PostMapping
    public ResponseEntity<Void> salvarUsuario(@RequestBody Usuario usuario) {
        usuarioService.salvaUsuario(usuario);
        return ResponseEntity.ok().build();
    }

    @GetMapping
    public ResponseEntity<Usuario> buscarUsuarioPorEmail(@RequestParam String email) {
        return ResponseEntity.ok(usuarioService.buscarUsuarioPorEmail(email));
    }

    @DeleteMapping
    public ResponseEntity<Void> deletarUsuarioPorEmail(@RequestParam String email) {
        usuarioService.deletarUsuarioPorEmail(email);
        return ResponseEntity.ok().build();
    }

    @PutMapping
    public ResponseEntity<Void> AtualizarUsuarioPorId(@RequestParam Long id, @RequestBody Usuario usuario) {
        usuarioService.atualizarDadosPorID(id, usuario);
        return ResponseEntity.ok().build();
    }
}