# JB's Recetas — Instalación como PWA

## 1. Subir a GitHub
1. Crea un repositorio nuevo en GitHub (público), por ejemplo `jbs-recetas`.
2. Sube **todo el contenido de esta carpeta** (`index.html`, `manifest.json`, `sw.js` y la carpeta `icons/`) a la raíz del repositorio. Nada dentro de subcarpetas extra.

## 2. Activar GitHub Pages
1. En el repositorio: **Settings → Pages**.
2. En "Source" elige la rama `main` y la carpeta `/ (root)`.
3. Guarda. En 1-2 minutos tu app estará en:
   `https://TU-USUARIO.github.io/jbs-recetas/`

## 3. Instalar en el móvil
1. Abre esa dirección en Chrome (Android) o Safari (iPhone).
2. Android: te aparecerá un aviso "Añadir a pantalla de inicio" (o menú ⋮ → "Instalar app").
3. iPhone: botón compartir 📤 → "Añadir a pantalla de inicio".
4. Ya tendrás el icono de "Mi Recetario de Cocina" como una app normal, sin barra del navegador.

## Si algún día cambias algo (icono, código, etc.)
- Sube los archivos nuevos a GitHub normalmente.
- Abre `sw.js` y sube en 1 el número de `CACHE_VERSION` (ej. `jb-recetas-v1` → `jb-recetas-v2`).
  Este paso es imprescindible: si no lo haces, los móviles que ya instalaron la app seguirán viendo la versión vieja guardada en caché.
- Si cambiaste el **icono**, además de subir la versión del caché, quien ya la tenga instalada deberá desinstalar y volver a instalar la app para ver el icono nuevo (es una limitación normal de las PWA, no un fallo).
