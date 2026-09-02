# China 2026 · despliegue en Cloudflare Pages

La aplicación es frontend puro. Los hoteles, transportes, atracciones, paquetes y reglas están incluidos como datos TypeScript; las decisiones del usuario se guardan únicamente en `localStorage`. No usa API propia, base de datos, funciones de servidor ni variables de entorno.

## Configuración de Cloudflare Pages

- Comando de compilación: `npm run build`
- Directorio de salida: `dist/client`
- Versión de Node para compilar: 22 o superior
- Variables de entorno: ninguna

Node se usa solamente durante la compilación. El directorio `dist/client` contiene los archivos HTML, CSS, JavaScript e imágenes que se sirven de forma estática.

## Despliegue directo

El archivo `china-familia-2026-cloudflare-pages.zip` contiene únicamente la salida estática. Descomprímelo y sube el contenido a un proyecto de Cloudflare Pages mediante Direct Upload.

Para reemplazar el sitio existente en `china-web.jchristian1489.workers.dev`, hay que subir esta salida al proyecto de Cloudflare asociado a ese dominio; el código no puede cambiar la propiedad ni la configuración de esa cuenta.
