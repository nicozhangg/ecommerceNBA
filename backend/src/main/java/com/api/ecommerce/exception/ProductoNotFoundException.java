package com.api.ecommerce.exception;

public class ProductoNotFoundException extends RuntimeException {
    public ProductoNotFoundException(String id) {
        super("Producto no encontrado con id: " + id);
    }
}
