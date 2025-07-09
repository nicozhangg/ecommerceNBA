package com.api.ecommerce.model;

import lombok.Data;

@Data
public class ItemCarrito {
    private String productoId;
    private int cantidad;
    private String talle;
}

