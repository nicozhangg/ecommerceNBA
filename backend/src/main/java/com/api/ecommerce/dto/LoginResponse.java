package com.api.ecommerce.dto;

public class LoginResponse {
    private String message;
    private String nombre;
    private String apellido;
    private String email;
    private String role;

    public LoginResponse() {}

    public LoginResponse(String message) {
        this.message = message;
    }

    public LoginResponse(String message, String nombre, String apellido, String email, String role) {
        this.message = message;
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.role = role;
    }

    // Getters y setters
    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    public String getApellido() { return apellido; }
    public void setApellido(String apellido) { this.apellido = apellido; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
}