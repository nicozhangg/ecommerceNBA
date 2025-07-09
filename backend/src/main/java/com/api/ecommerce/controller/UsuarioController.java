// UsuarioController.java
package com.api.ecommerce.controller;

import com.api.ecommerce.model.Usuario;
import com.api.ecommerce.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/usuarios")
@RequiredArgsConstructor
public class UsuarioController {

    private final UsuarioRepository usuarioRepository;

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    public List<Usuario> listarTodos() {
        return usuarioRepository.findAll();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/{id}")
    public Usuario obtenerPorId(@PathVariable String id) {
        return usuarioRepository.findById(id).orElse(null);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public Usuario crear(@RequestBody Usuario usuario) {
        return usuarioRepository.save(usuario);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public Usuario actualizar(@PathVariable String id, @RequestBody Usuario usuario) {
        Optional<Usuario> usuarioOptional = usuarioRepository.findById(id);
        if (usuarioOptional.isPresent()) {
            Usuario existente = usuarioOptional.get();
            existente.setNombre(usuario.getNombre());
            existente.setApellido(usuario.getApellido());
            existente.setEmail(usuario.getEmail());
            existente.setPassword(usuario.getPassword());
            existente.setRole(usuario.getRole());
            return usuarioRepository.save(existente);
        }
        return null;
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable String id) {
        usuarioRepository.deleteById(id);
    }
}