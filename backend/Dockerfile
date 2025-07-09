# Etapa 1: construir el proyecto
FROM maven:3.8.7-eclipse-temurin-17 AS build

WORKDIR /app

# Copiar archivos necesarios
COPY pom.xml .
COPY ./src ./src


# Compilar el proyecto
RUN mvn clean package -DskipTests

# Etapa 2: imagen liviana para ejecutar el JAR
FROM eclipse-temurin:17-jdk

WORKDIR /app

# Copiar el JAR desde la etapa de build
COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
