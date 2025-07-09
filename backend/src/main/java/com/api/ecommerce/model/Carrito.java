package com.api.ecommerce.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@Document(collection = "carritos")
public class Carrito {
    @Id
    private String id;
    private String usuarioId;
    private List<ItemCarrito> items;
}

