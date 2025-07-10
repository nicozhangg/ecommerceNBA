package com.api.ecommerce.service;

import com.api.ecommerce.Jwt.JwtService;
import com.api.ecommerce.dto.AuthResponse;
import com.api.ecommerce.dto.LoginRequest;
import com.api.ecommerce.dto.RegisterRequest;
import com.api.ecommerce.exception.MailNotFoundException;
import com.api.ecommerce.model.Role;
import com.api.ecommerce.model.Usuario;
import com.api.ecommerce.repository.UsuarioRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UsuarioRepository usuarioRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    public AuthResponse login(LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        Usuario usuario = usuarioRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new MailNotFoundException("Mail no encontrado"));

        String token = jwtService.getToken(usuario);
        return AuthResponse.builder()
                .token(token)
                .nombre(usuario.getNombre())
                .apellido(usuario.getApellido())
                .email(usuario.getEmail())
                .role(usuario.getRole())
                .build();
    }

    public AuthResponse register(RegisterRequest request) {
        Role roleParsed;
        try {
                roleParsed = Role.valueOf(request.getRole().name()); // Si el frontend manda enum
        } catch (Exception e) {
                roleParsed = Role.USER; // Fallback si falla
        }

        Usuario usuario = Usuario.builder()
                .nombre(request.getNombre())
                .apellido(request.getApellido())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(roleParsed)
                .build();

        usuarioRepository.save(usuario);

        return AuthResponse.builder()
                .token(jwtService.getToken(usuario))
                .nombre(usuario.getNombre())
                .apellido(usuario.getApellido())
                .email(usuario.getEmail())
                .role(usuario.getRole())
                .build();
    }
}

