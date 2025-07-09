package com.api.ecommerce.exception;

public class StockNegativoException extends IllegalArgumentException {
    public StockNegativoException() {
        super("El stock no puede ser negativo.");
    }

    public StockNegativoException(String message) {
        super(message);
    }

}