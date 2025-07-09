package com.api.ecommerce.repository;

import com.api.ecommerce.model.Carrito;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface CarritoRepository extends MongoRepository<Carrito, String> {
    Optional<Carrito> findByUsuarioId(String usuarioId);
    void deleteByUsuarioId(String usuarioId);
}
