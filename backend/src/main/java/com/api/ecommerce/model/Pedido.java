package com.api.ecommerce.model;

import java.util.Date;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "pedidos")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Pedido {

    @Id
    private String id;
    private String email;
    private String nombre;
    private String direccion;
    private String telefono;
    private String dni;
    private String codigoPostal;
    private List<ProductoPedido> productos;
    private double total;
    private Date fecha;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ProductoPedido {
        private String id;
        private String nombre;
        private String talle;
        private int quantity;
        private double precio;
    }
}
