package com.api.ecommerce.controller;
 
import com.api.ecommerce.model.Producto;
import com.api.ecommerce.repository.ProductoRepository;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.api.ecommerce.exception.ProductoNotFoundException;
import com.api.ecommerce.exception.StockNegativoException;
import com.api.ecommerce.exception.PrecioNegativoException;

 
import java.util.*;
 
@RestController
@RequestMapping("/api/productos")
public class ProductoController {
 
    private final ProductoRepository productoRepository;
 
    public ProductoController(ProductoRepository productoRepository) {
        this.productoRepository = productoRepository;
    }
 
    @GetMapping
    public List<Producto> getAllProductos() {
        return productoRepository.findAll();
    }
 
    @GetMapping("/{id}")
    public Producto getProductoById(@PathVariable String id) {
        return productoRepository.findById(id)
            .orElseThrow(() -> new ProductoNotFoundException(id));
    }
 
    @PostMapping
    public Producto crearProducto(@RequestBody Producto producto) {
        // Validar precio
        if (producto.getPrecio() != null && producto.getPrecio() < 0) {
            throw new PrecioNegativoException();
        }

        // Validar nombre obligatorio
        if (producto.getNombre() == null || producto.getNombre().trim().isEmpty()) {
            throw new IllegalArgumentException("El nombre del producto es obligatorio.");
        }

        // Validar equipo obligatorio
        if (producto.getEquipo() == null || producto.getEquipo().trim().isEmpty()) {
            throw new IllegalArgumentException("El equipo es obligatorio y debe ser seleccionado.");
        }

        return productoRepository.save(producto);
    }
 
    @PutMapping("/{id}")
    public ResponseEntity<?> actualizarProducto(@PathVariable String id, @RequestBody Producto productoNuevo) {
        // Lanza excepción si el producto no existe
        productoRepository.findById(id)            
            .orElseThrow(() -> new ProductoNotFoundException(id));

        // Validación del precio
        if (productoNuevo.getPrecio() < 0) {
            throw new PrecioNegativoException();
        }

        productoNuevo.setId(id); // Asegura que se actualice el existente
        return ResponseEntity.ok(productoRepository.save(productoNuevo));

    }
 
    @PatchMapping("/{id}")
    public ResponseEntity<?> actualizarParcialProducto(@PathVariable String id, @RequestBody Map<String, Object> updates) {
        Producto producto = productoRepository.findById(id)
            .orElseThrow(() -> new ProductoNotFoundException(id)); // Lanza excepción si no existe
 
        updates.forEach((key, value) -> {
            switch (key) {
                case "nombre" -> {
                    String nombre = (String) value;
                    if (nombre.trim().isEmpty()) {
                        throw new IllegalArgumentException("El nombre no puede estar vacío.");
                    }
                    producto.setNombre(nombre);
                }
                case "descripcion" -> producto.setDescripcion((String) value);
                case "precio" -> {
                    Double precio = Double.valueOf(value.toString());
                    if (precio < 0) {
                        throw new PrecioNegativoException();
                    }
                    producto.setPrecio(precio);
                }
                case "imagenUrl" -> producto.setImagenUrl((String) value);
                case "imagenes" -> {
                    List<?> rawList = (List<?>) value;
                    List<String> imagenes = new ArrayList<>();
                    for (Object obj : rawList) {
                        imagenes.add(obj.toString());
                    }
                    producto.setImagenes(imagenes);
                }
                case "equipo" -> {
                    String equipo = (String) value;
                    if (equipo.trim().isEmpty()) {
                        throw new IllegalArgumentException("El equipo no puede estar vacío.");
                    }
                    producto.setEquipo(equipo);
                }
                case "jugador" -> producto.setJugador((String) value);
                case "categoria" -> producto.setCategoria((String) value);
                case "stockPorTalle" -> {
                    Map<?, ?> rawMap = (Map<?, ?>) value;
                    Map<String, Integer> stockMap = new HashMap<>();

                    rawMap.forEach((k, v) -> {
                        if (k == null || v == null) {
                            throw new IllegalArgumentException("Las claves y valores del mapa no pueden ser nulos.");
                        }
                        String talle = k.toString();
                        Integer stock;
                        try {
                            stock = Integer.valueOf(v.toString());
                        } catch (NumberFormatException e) {
                            throw new IllegalArgumentException("El stock debe ser un número válido.", e);
                        }

                        if (stock < 0) {
                            throw new StockNegativoException("El stock para el talle '" + talle + "' no puede ser negativo.");
                        }

                    });
                    producto.setStockPorTalle(stockMap);
                }
            }
        });
 
        return ResponseEntity.ok(productoRepository.save(producto));
    }
 
    @DeleteMapping("/{id}")
    public ResponseEntity<String> eliminarProducto(@PathVariable String id) {
        Producto producto = productoRepository.findById(id)
            .orElseThrow(() -> new ProductoNotFoundException(id));
        productoRepository.delete(producto);
        return ResponseEntity.ok("Producto eliminado correctamente.");
    }

 
    @PostMapping("/importarMock")
    public ResponseEntity<String> importarMock() {
        try {
            List<Producto> productos = List.of(
                new Producto(null,
                    "Camiseta LeBron Lakers City Edition",
                    "Camiseta oficial City Edition de LeBron James",
                    75000.0,
                    "https://www.redrat.co.nz/content/products/nike-x-nba-los-angeles-lakers-lebron-james-icon-swingman-jersey-youth-amarillo-side-detail-53964.jpg",
                    List.of(
                        "https://images.footballfanatics.com/los-angeles-lakers/los-angeles-lakers-nike-icon-swingman-jersey-james-23-mens_ss5_p-202685708",
                        "https://fanatics.frgimages.com/los-angeles-lakers/mens-fanatics-lebron-james-gold-los-angeles-lakers-fast-break-replica-jersey-icon-edition.jpg"
                    ),
                    "Lakers", "LeBron James", "City Edition",
                    Map.of("S", 1, "M", 4, "L", 2, "XL", 1)
                )
                // Agregá más si querés
            );

            int nuevos = 0;
            for (Producto p : productos) {
                boolean yaExiste = productoRepository
                    .findByNombreAndEquipoAndJugador(p.getNombre(), p.getEquipo(), p.getJugador())
                    .isPresent();

                if (!yaExiste) {
                    productoRepository.save(p);
                    nuevos++;
                }
            }

            return ResponseEntity.ok(nuevos + " productos nuevos agregados.");

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                .body("Error al importar productos mock: " + e.getMessage());
        }
    }

 
    @DeleteMapping("/eliminarTodos")
    public ResponseEntity<String> eliminarTodosLosProductos() {
        try {
            productoRepository.deleteAll();
            return ResponseEntity.ok("Todos los productos fueron eliminados.");
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Error al eliminar productos: " + ex.getMessage());
        }
    }


    @GetMapping("/equipo/{equipo}")
    public ResponseEntity<List<Producto>> obtenerPorEquipo(@PathVariable String equipo) {
        if (equipo == null || equipo.trim().isEmpty()) {
            throw new IllegalArgumentException("El parámetro 'equipo' no puede estar vacío");
        }
        List<Producto> productos = productoRepository.findByEquipoIgnoreCase(equipo);
        return ResponseEntity.ok(productos);
    }

}

