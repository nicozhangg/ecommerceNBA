package com.api.ecommerce.exception;

public class MailNotFoundException extends RuntimeException {
    public MailNotFoundException(String email) {
        super("No se encontró el usuario con el correo: " + email);
    }
}


