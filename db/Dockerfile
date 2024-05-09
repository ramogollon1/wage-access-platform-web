# Usa la imagen oficial de PostgreSQL como base
FROM postgres:latest

# Copia el script SQL para inicializar la base de datos a la carpeta de inicialización de PostgreSQL
COPY create_tables.sql /docker-entrypoint-initdb.d/

# Exponer el puerto de PostgreSQL
EXPOSE 5432
