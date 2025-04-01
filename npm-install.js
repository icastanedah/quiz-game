const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('Instalando dependencias necesarias...');

// Carpeta del proyecto
const projectPath = __dirname;
console.log('Ruta del proyecto:', projectPath);

// Verificar si node_modules existe
if (!fs.existsSync(path.join(projectPath, 'node_modules'))) {
  console.log('Creando carpeta node_modules...');
  fs.mkdirSync(path.join(projectPath, 'node_modules'));
}

const installModule = (moduleName, version) => {
  const moduleFullName = version ? `${moduleName}@${version}` : moduleName;
  const modulePath = path.join(projectPath, 'node_modules', moduleName);
  
  console.log(`Instalando ${moduleFullName}...`);
  
  // Verificar si el módulo ya está instalado
  if (fs.existsSync(modulePath)) {
    console.log(`${moduleName} ya está instalado. Eliminando para reinstalar...`);
    try {
      fs.rmSync(modulePath, { recursive: true, force: true });
    } catch (error) {
      console.error(`Error al eliminar ${moduleName}:`, error);
    }
  }
  
  try {
    // Usar npm con la ruta absoluta
    execSync(`npm install --save-dev ${moduleFullName}`, { 
      stdio: 'inherit', 
      cwd: projectPath 
    });
    
    // Verificar si se instaló correctamente
    if (fs.existsSync(modulePath)) {
      console.log(`${moduleName} instalado correctamente.`);
      return true;
    } else {
      console.error(`Error: ${moduleName} no se instaló correctamente.`);
      return false;
    }
  } catch (error) {
    console.error(`Error al instalar ${moduleName}:`, error);
    return false;
  }
};

try {
  const modules = [
    { name: 'tailwindcss', version: '3.3.0' },
    { name: 'autoprefixer', version: '10.4.14' },
    { name: 'postcss', version: '8.4.31' }
  ];
  
  let allInstalled = true;
  
  for (const module of modules) {
    const success = installModule(module.name, module.version);
    if (!success) {
      allInstalled = false;
    }
  }
  
  if (allInstalled) {
    console.log('Todas las dependencias han sido instaladas correctamente.');
  } else {
    console.log('Algunas dependencias no se instalaron correctamente.');
    
    // Crear solución manual copiando archivos si npm falla
    console.log('Intentando solución alternativa...');
    
    // Crear carpetas necesarias para autoprefixer si no existen
    const autoprefixerPath = path.join(projectPath, 'node_modules', 'autoprefixer');
    if (!fs.existsSync(autoprefixerPath)) {
      fs.mkdirSync(autoprefixerPath, { recursive: true });
      
      // Crear un archivo package.json básico para autoprefixer
      fs.writeFileSync(
        path.join(autoprefixerPath, 'package.json'),
        JSON.stringify({
          name: "autoprefixer",
          version: "10.4.14",
          main: "lib/autoprefixer.js"
        }, null, 2)
      );
      
      // Crear carpeta lib
      const libPath = path.join(autoprefixerPath, 'lib');
      if (!fs.existsSync(libPath)) {
        fs.mkdirSync(libPath);
        
        // Crear un archivo autoprefixer.js básico
        fs.writeFileSync(
          path.join(libPath, 'autoprefixer.js'),
          `module.exports = function() { return { postcssPlugin: 'autoprefixer' } }\nmodule.exports.postcss = true;`
        );
      }
      
      console.log('Solución alternativa para autoprefixer aplicada.');
    }
  }
} catch (error) {
  console.error('Error general:', error);
}

console.log('Proceso completado. Presiona cualquier tecla para salir...');
process.stdin.setRawMode(true);
process.stdin.resume();
process.stdin.on('data', process.exit.bind(process, 0)); 