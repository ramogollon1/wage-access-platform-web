# Usa la imagen oficial de Node como base
FROM node:18 AS BUILD_IMAGE

# Establece el directorio de trabajo en /app
WORKDIR /app/backend

# Copia el package.json y el package-lock.json al directorio de trabajo
COPY package*.json ./

COPY src/user_data.json /app/backend/user_data.json

# Instala las dependencias del proyecto
RUN npm install

# Copia el resto de los archivos al directorio de trabajo
COPY . .

# Compila el código TypeScript
RUN npm run build

# Expone el puerto 3000 para que el contenedor sea accesible desde fuera
EXPOSE 3000

# Define el comando por defecto para ejecutar el servidor
CMD ["npm", "start"]
