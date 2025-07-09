package com.api.ecommerce.controller;

import com.api.ecommerce.model.Carrito;
import com.api.ecommerce.model.ItemCarrito;
import com.api.ecommerce.model.Producto;
import com.api.ecommerce.repository.CarritoRepository;
import com.api.ecommerce.repository.ProductoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/carrito")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class CarritoController {

    private final CarritoRepository carritoRepository;
    private final ProductoRepository productoRepository;

    @PostMapping
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> crearCarrito(@RequestBody Carrito carrito) {
        String error = validarStock(carrito);
        if (error != null) return ResponseEntity.badRequest().body(error);
        return ResponseEntity.ok(carritoRepository.save(carrito));
    }

    @GetMapping("/{usuarioId}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Carrito> obtenerCarrito(@PathVariable String usuarioId) {
        return carritoRepository.findByUsuarioId(usuarioId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/actualizar")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> actualizarCarrito(@RequestBody Carrito actualizado) {
        Optional<Carrito> existente = carritoRepository.findByUsuarioId(actualizado.getUsuarioId());

        if (existente.isPresent()) {
            String error = validarStock(actualizado);
            if (error != null) return ResponseEntity.badRequest().body(error);

            Carrito carrito = existente.get();
            carrito.setItems(actualizado.getItems());
            carritoRepository.save(carrito);
            return ResponseEntity.ok("Carrito actualizado.");
        }

        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/vaciar/{usuarioId}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<String> vaciarCarrito(@PathVariable String usuarioId) {
        carritoRepository.deleteByUsuarioId(usuarioId);
        return ResponseEntity.ok("Carrito vaciado.");
    }

    private String validarStock(Carrito carrito) {
        for (ItemCarrito item : carrito.getItems()) {
            Optional<Producto> productoOpt = productoRepository.findById(item.getProductoId());
            if (productoOpt.isEmpty()) {
                return "Producto no encontrado: " + item.getProductoId();
            }
            Producto producto = productoOpt.get();
            int stock = producto.getStockPorTalle().getOrDefault(item.getTalle(), 0);
            if (item.getCantidad() > stock) {
                return "No hay stock suficiente para " + producto.getNombre() + " talle " + item.getTalle();
            }
        }
        return null;
    }
}
