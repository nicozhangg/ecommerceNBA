package com.api.ecommerce.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "productos")
public class Producto {
    @Id
    private String id;

    @JsonProperty("title") // Mapea JSON "title" <-> atributo nombre
    private String nombre;
    private String descripcion;
    @JsonProperty("price")
    private Double precio;
    @JsonProperty("image")
    private String imagenUrl;
    private List<String> imagenes;
    private String equipo;
    private String jugador;
    private String categoria;
    @JsonProperty("stock")
    private Map<String, Integer> stockPorTalle;
}
