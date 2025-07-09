package com.api.ecommerce.repository;

import com.api.ecommerce.model.Producto;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface ProductoRepository extends MongoRepository<Producto, String> {
    Optional<Producto> findByNombreAndEquipoAndJugador(String nombre, String equipo, String jugador);

    List<Producto> findByEquipoIgnoreCase(String equipo);
}

