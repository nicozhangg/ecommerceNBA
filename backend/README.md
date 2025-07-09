Ecommerce Backend - Spring Boot + MongoDB + JWT

Este proyecto representa un backend de ecommerce implementado en Java utilizando Spring Boot, MongoDB, JWT para autenticación, y control de acceso basado en roles (USER y ADMIN).

🌐 Tecnologías utilizadas

Java 17

Spring Boot 3

Spring Security

JWT (Json Web Token)

MongoDB (Atlas o local)

Maven

Docker + Docker Compose

📁 Estructura del Proyecto

src/main/java/com/api/ecommerce
├── config               --> Configuraciones de seguridad
├── controller           --> Endpoints REST (Auth, Usuario, Carrito)
├── dto                  --> Clases de transferencia (RegisterRequest, AuthResponse...)
├── exception            --> Excepciones personalizadas
├── Jwt                  --> Lógica para generación y validación de tokens
├── model                --> Entidades (Usuario, Carrito, ItemCarrito...)
├── repository           --> Interfaces de acceso a datos Mongo
├── service              --> Lógica de negocio
└── EcommerceApplication --> Clase main

📚 Requisitos Previos

Java 17

Maven 3.8+

Docker y Docker Compose

(Opcional) Cuenta en MongoDB Atlas si usás base en la nube

📆 Instalación y Ejecución

Clonar el repositorio

git clone https://github.com/usuario/tpo-grupo9-backend.git
cd tpo-grupo9-backend

Configurar MongoDB

Crear archivo .env si se desea pasar las variables como:

MONGO_URI=mongodb+srv://Admin:hola12345@backend.sxgqpbe.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=backend


Ejecutar con Docker

docker-compose down  # (opcional, si ya está corriendo)
docker-compose up --build

Esto:

Compila el proyecto con Maven

Empaqueta en un .jar

Ejecuta el contenedor con Spring Boot

🔐 Seguridad y Roles

Registro y login expuestos libremente en /api/auth/**

Todos los demás endpoints requieren JWT

Los roles son:

USER: puede acceder a /api/carrito y similares

ADMIN: puede gestionar /usuarios, /productos, etc.

Para incluir el token en Postman:

Tipo: Bearer Token

Valor: token devuelto en login o register

🛠️ Endpoints disponibles

AuthController

POST /api/auth/register

Campos: nombre, apellido, email, password, role ("USER" o "ADMIN")

POST /api/auth/login

Campos: email, password

CarritoController (solo USER)

POST /api/carrito: crear carrito

GET /api/carrito/{usuarioId}: ver carrito

PUT /api/carrito/actualizar: modificar carrito

DELETE /api/carrito/vaciar/{usuarioId}: vaciar carrito

UsuarioController (solo ADMIN)

GET /usuarios

GET /usuarios/{id}

POST /usuarios

PUT /usuarios/{id}

DELETE /usuarios/{id}

🌐 Pruebas en Postman

Registro

POST http://localhost:8080/api/auth/register
Body (JSON):
{
  "nombre": "Admin",
  "apellido": "Principal",
  "email": "admin@admin.com",
  "password": "admin123",
  "role": "ADMIN"
}

Login

POST http://localhost:8080/api/auth/login
Body (JSON):
{
  "email": "admin@admin.com",
  "password": "admin123"
}

Autenticación con token

Ir a la pestaña Authorization

Tipo: Bearer Token

Pegá el token devuelto

🌟 Extras

El token JWT dura 60 días por defecto

Se utiliza ROLE_ en los authorities para que Spring reconozca @PreAuthorize("hasRole('ADMIN')")

✉️ Contacto

Cualquier problema, contactanos al equipo Grupo 9 🚀

Proyecto realizado para fines educativos - Tecnología Java Backend - 2025
