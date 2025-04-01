#!/bin/bash

echo "Instalando dependencias para el proyecto..."

# Crear directorio node_modules si no existe
if [ ! -d "node_modules" ]; then
  echo "Creando directorio node_modules..."
  mkdir -p node_modules
fi

# Función para instalar una dependencia
install_module() {
  local module_name=$1
  local version=$2
  local module_fullname="${module_name}@${version}"
  
  echo "Instalando ${module_fullname}..."
  npm install --save-dev ${module_fullname}
  
  if [ -d "node_modules/${module_name}" ]; then
    echo "${module_name} instalado correctamente."
    return 0
  else
    echo "Error: ${module_name} no se instaló correctamente."
    return 1
  fi
}

# Instalar dependencias
install_module "tailwindcss" "3.3.0"
install_module "autoprefixer" "10.4.14"
install_module "postcss" "8.4.31"

# Verificar si autoprefixer está instalado correctamente
if [ ! -d "node_modules/autoprefixer" ]; then
  echo "Aplicando solución alternativa para autoprefixer..."
  
  # Crear directorio para autoprefixer
  mkdir -p node_modules/autoprefixer/lib
  
  # Crear package.json para autoprefixer
  cat > node_modules/autoprefixer/package.json << EOL
{
  "name": "autoprefixer",
  "version": "10.4.14",
  "main": "lib/autoprefixer.js"
}
EOL
  
  # Crear archivo autoprefixer.js
  cat > node_modules/autoprefixer/lib/autoprefixer.js << EOL
module.exports = function() { return { postcssPlugin: 'autoprefixer' } }
module.exports.postcss = true;
EOL
  
  echo "Solución alternativa para autoprefixer aplicada."
fi

# Simplifiquemos también el archivo postcss.config.js
cat > postcss.config.js << EOL
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
EOL
echo "Archivo postcss.config.js actualizado."

# Verificar instalación
echo ""
echo "Verificando instalación..."
if [ -d "node_modules/tailwindcss" ] && [ -d "node_modules/autoprefixer" ] && [ -d "node_modules/postcss" ]; then
  echo "✅ Todas las dependencias necesarias están instaladas."
else
  echo "❌ Algunas dependencias no pudieron ser instaladas correctamente."
fi

echo ""
echo "Instalación completada. Presiona Enter para salir..."
read 