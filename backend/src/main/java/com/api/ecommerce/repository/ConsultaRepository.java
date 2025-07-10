package com.api.ecommerce.repository;

import com.api.ecommerce.model.Consulta;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ConsultaRepository extends MongoRepository<Consulta, String> {
}
