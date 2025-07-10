package com.api.ecommerce.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "consultas")
public class Consulta {
    @Id
    private String id;
    private String nombre;
    private String email;
    private String mensaje;
}
