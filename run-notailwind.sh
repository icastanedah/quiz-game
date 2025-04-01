#!/bin/bash

echo "Iniciando aplicación sin Tailwind..."

# Crear configuraciones temporales sin Tailwind
cat > temp-postcss.config.js << EOL
module.exports = { plugins: {} }
EOL

cat > temp-next.config.js << EOL
/** @type {import('next').NextConfig} */
const nextConfig = {}
module.exports = nextConfig
EOL

# Guardar las configuraciones originales
if [ -f "postcss.config.js" ]; then
  mv postcss.config.js postcss.config.js.bak
fi

if [ -f "next.config.js" ]; then
  mv next.config.js next.config.js.bak
fi

# Usar las configuraciones temporales
mv temp-postcss.config.js postcss.config.js
mv temp-next.config.js next.config.js

# Ejecutar la aplicación
echo "Ejecutando Next.js..."
NODE_OPTIONS=--no-warnings npm run dev

# Restaurar configuraciones originales al terminar
trap 'echo "Restaurando configuraciones originales..."; [ -f postcss.config.js.bak ] && mv postcss.config.js.bak postcss.config.js; [ -f next.config.js.bak ] && mv next.config.js.bak next.config.js' EXIT 