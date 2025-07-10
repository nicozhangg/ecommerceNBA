package com.api.ecommerce.controller;

import com.api.ecommerce.model.Consulta;
import com.api.ecommerce.repository.ConsultaRepository;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/contacto")
@CrossOrigin(origins = "http://localhost:3000")
public class ContactoController {

    private final ConsultaRepository consultaRepository;

    public ContactoController(ConsultaRepository consultaRepository) {
        this.consultaRepository = consultaRepository;
    }

    @PostMapping
    public ResponseEntity<String> recibirConsulta(@RequestBody Consulta consulta) {
        consultaRepository.save(consulta);
        return ResponseEntity.ok("Consulta guardada correctamente");
    }
}
