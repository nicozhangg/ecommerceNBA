package com.api.ecommerce.dto;

import com.api.ecommerce.model.Role;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AuthResponse {
    private String token;
    private String nombre;
    private String apellido;
    private String email;
    private Role role;
}
