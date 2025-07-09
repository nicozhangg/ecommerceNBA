package com.api.ecommerce.exception;

public class PrecioNegativoException extends IllegalArgumentException {
    public PrecioNegativoException() {
        super("El precio no puede ser negativo");
    }
}