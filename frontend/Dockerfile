# Stage 1: Construir la aplicación
FROM node:18 AS BUILD_IMAGE

# Establecer el directorio de trabajo en /app/frontend
WORKDIR /app
# Copiar el resto de los archivos al directorio de trabajo
COPY . .

# # Eliminar package-lock.json y node_modules si existen
# RUN rm -rf package-lock.json node_modules

# # Copiar el package.json y package-lock.json al directorio de trabajo
# COPY package.json .

# Instalar las dependencias del proyecto
RUN npm i & npm run build


# # Compilar los assets del frontend
# RUN npm run build

# Exponer el puerto 8080
EXPOSE 8080

# Comando para ejecutar la aplicación
CMD ["npm", "run", "dev"]
