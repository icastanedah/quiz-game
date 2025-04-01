#!/bin/bash

echo "Script para subir el proyecto Code Skribbl a GitHub"
echo "==================================================="

# Configuración inicial
REPO_URL="https://github.com/icastanedah/quiz-game.git"
BRANCH="main"

# Verificar si git está instalado
if ! command -v git &> /dev/null; then
    echo "Error: Git no está instalado. Por favor, instala Git primero."
    exit 1
fi

# Verificar si estamos en un repositorio git
if [ ! -d ".git" ]; then
    echo "Inicializando repositorio Git..."
    git init
    git remote add origin $REPO_URL
else
    echo "Repositorio Git ya inicializado."
    # Verificar si el remoto 'origin' está configurado correctamente
    if ! git remote -v | grep -q "$REPO_URL"; then
        echo "Configurando remoto 'origin'..."
        git remote remove origin 2>/dev/null
        git remote add origin $REPO_URL
    fi
fi

# Crear archivo .gitignore si no existe
if [ ! -f ".gitignore" ]; then
    echo "Creando archivo .gitignore..."
    cat > .gitignore << EOL
# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# local env files
.env*.local

# typescript
*.tsbuildinfo
next-env.d.ts
EOL
fi

# Crear archivo LICENSE si no existe
if [ ! -f "LICENSE" ]; then
    echo "Creando archivo LICENSE (MIT)..."
    cat > LICENSE << EOL
MIT License

Copyright (c) $(date +%Y) Isaías Castañeda

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
EOL
fi

# Añadir todos los archivos al staging
echo "Añadiendo archivos al staging..."
git add .

# Hacer commit
echo "Creando commit..."
git commit -m "Implementación del juego Code Skribbl con soporte para modo individual y multijugador"

# Subir cambios
echo "Subiendo cambios a GitHub..."
echo "NOTA: Si es la primera vez que subes a GitHub, es posible que te pida autenticación."
echo "      Se recomienda usar un token de acceso personal (PAT) en lugar de contraseña."
echo ""
echo "Presiona Enter para continuar o Ctrl+C para cancelar..."
read

# Intentar hacer push
git push -u origin $BRANCH

# Verificar resultado
if [ $? -eq 0 ]; then
    echo ""
    echo "¡Los cambios se han subido correctamente a GitHub!"
    echo "Puedes visitar tu repositorio en: $REPO_URL"
else
    echo ""
    echo "Hubo un problema al subir los cambios a GitHub."
    echo "Por favor, verifica los mensajes de error y tu configuración de Git."
    echo ""
    echo "Opciones para resolver problemas de autenticación:"
    echo "1. Crear un token de acceso personal (PAT) en GitHub: https://github.com/settings/tokens"
    echo "2. Configurar la autenticación SSH: https://docs.github.com/es/authentication/connecting-to-github-with-ssh"
    echo "3. Usa GitHub CLI para autenticarte: https://cli.github.com/"
fi

echo ""
echo "Presiona Enter para salir..."
read 