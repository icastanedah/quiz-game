#!/bin/bash

echo "Eliminando directorios de caché y construcción..."
rm -rf .next node_modules .cache

echo "Creando un package.json mínimo..."
cat > package.json << EOL
{
  "name": "quiz-game-app",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  },
  "dependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "next": "15.2.4"
  }
}
EOL

echo "Instalando dependencias básicas..."
npm install --no-fund --no-audit

echo "Configurando archivos básicos..."

# Configuración simplificada de PostCSS
cat > postcss.config.js << EOL
module.exports = {
  plugins: {}
}
EOL

# Configuración simplificada de Next.js
cat > next.config.js << EOL
/** @type {import('next').NextConfig} */
const nextConfig = {}
module.exports = nextConfig
EOL

echo "Instalación básica completada. Intenta ejecutar ahora:"
echo "npm run dev"

echo "Presiona Enter para salir..."
read 