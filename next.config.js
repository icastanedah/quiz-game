/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuración básica sin procesar CSS
  webpack: (config) => {
    // Intento de desactivar postcss-loader
    const rules = config.module.rules;
    const cssRuleIndex = rules.findIndex(
      (rule) => rule.test && rule.test.toString().includes('css')
    );

    if (cssRuleIndex !== -1) {
      // Reemplaza la configuración de CSS para evitar usar postcss
      const cssRule = rules[cssRuleIndex];
      const cssLoaders = cssRule.use || cssRule.loader;
      
      if (cssLoaders) {
        const loaders = Array.isArray(cssLoaders) ? cssLoaders : [cssLoaders];
        const filteredLoaders = loaders.filter(
          (loader) => {
            if (typeof loader === 'string') {
              return !loader.includes('postcss-loader');
            }
            if (typeof loader === 'object' && loader.loader) {
              return !loader.loader.includes('postcss-loader');
            }
            return true;
          }
        );
        
        cssRule.use = filteredLoaders;
      }
    }
    
    return config;
  },
};

module.exports = nextConfig; 