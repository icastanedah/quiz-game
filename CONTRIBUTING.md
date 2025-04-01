# Contribuir al proyecto Code Skribbl

¡Gracias por tu interés en contribuir a Code Skribbl! Este documento proporciona directrices para contribuir al proyecto.

## Cómo contribuir

### Reportar errores

Si encuentras un error, por favor abre un issue con la siguiente información:
- Descripción clara del error
- Pasos para reproducirlo
- Comportamiento esperado vs. comportamiento actual
- Capturas de pantalla si es necesario
- Entorno (navegador, sistema operativo, etc.)

### Sugerir mejoras

Las sugerencias de mejora son bienvenidas:
- Abre un issue describiendo la mejora
- Explica por qué sería útil
- Describe cómo debería funcionar

### Contribuir con código

1. Haz un fork del repositorio
2. Crea una rama para tu contribución (`git checkout -b feature/nueva-funcionalidad`)
3. Implementa tus cambios
4. Asegúrate de que el código funciona correctamente
5. Envía un pull request

### Añadir ejemplos de code smells o patrones de diseño

Para añadir nuevos ejemplos:
1. Edita el archivo `src/app/data/codeExamples.ts`
2. Añade un nuevo objeto al array `codeExamples` siguiendo el formato existente
3. Asigna un ID único
4. Incluye código, nombre, categoría, pista y descripción

## Configuración del entorno de desarrollo

### Requisitos previos
- Node.js (versión 18 o superior)
- npm o yarn

### Pasos para configurar el entorno
1. Clona el repositorio
2. Instala las dependencias: `npm install`
3. Inicia el servidor de desarrollo: `npm run dev`
4. Navega a `http://localhost:3000` para ver la aplicación

## Estructura del proyecto

- `src/app/`: Código principal de la aplicación
  - `components/`: Componentes React
  - `context/`: Contextos de React, incluyendo la lógica principal del juego
  - `data/`: Datos del juego, incluyendo ejemplos de code smells y patrones de diseño
  - `pages/`: Páginas de la aplicación
  - `hooks/`: Hooks personalizados

## Pautas de estilo

- Utiliza TypeScript para todo el código
- Sigue el estilo de código existente
- Utiliza nombres descriptivos para variables y funciones
- Comenta el código cuando sea necesario

## Licencia

Al contribuir a este proyecto, aceptas que tus contribuciones se licenciarán bajo la misma licencia que el proyecto (MIT). 